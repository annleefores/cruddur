# flask
from flask import request, g

# decorators
from aws_xray_sdk.core import xray_recorder
from lib.cognito_jwt_token import jwt_required
from flask_cors import cross_origin

# services
from services.users_short import UsersShort
from services.update_profile import UpdateProfile
from services.user_activities import UserActivities
from services.show_activity import ShowActivity

# helpers
from lib.helpers import model_json


def load(app):
    def default_data_show_activity(e, handle, activity_uuid):
        app.logger.debug(e)
        app.logger.debug("unauthenicated")
        data = ShowActivity.run(activity_uuid)
        return data, 200

    def default_data_users_activities(e, handle):
        app.logger.debug(e)
        app.logger.debug("unauthenicated")
        model = UserActivities.run(handle)
        return model_json(model)

    @app.route("/api/activities/@<string:handle>", methods=["GET"])
    # @xray_recorder.capture('activities_users')
    @jwt_required(on_error=default_data_users_activities)
    def data_users_activities(handle):
        model = UserActivities.run(handle, cognito_user_id=g.cognito_user_id)
        return model_json(model)

    @app.route(
        "/api/activities/@<string:handle>/status/<string:activity_uuid>",
        methods=["GET"],
    )
    @jwt_required(on_error=default_data_show_activity)
    def data_show_activity(handle, activity_uuid):
        data = ShowActivity.run(activity_uuid, cognito_user_id=g.cognito_user_id)
        return data, 200

    @app.route("/api/users/@<string:handle>/short", methods=["GET"])
    def data_users_short(handle):
        data = UsersShort.run(handle)
        return data, 200

    @app.route("/api/profile/update", methods=["POST", "OPTIONS"])
    @cross_origin()
    @jwt_required()
    def data_update_profile():
        bio = request.json.get("bio", None)
        display_name = request.json.get("display_name", None)
        model = UpdateProfile.run(
            cognito_user_id=g.cognito_user_id, bio=bio, display_name=display_name
        )
        return model_json(model)
