from lib.db import db

# from aws_xray_sdk.core import xray_recorder


class UserActivities:
    def run(user_handle, cognito_user_id=None):
        model = {"errors": None, "data": None}

        if user_handle is None or len(user_handle) < 1:
            model["errors"] = ["blank_user_handle"]
        else:
            sql = db.template("users", "show")
            results = db.query_object_json(
                sql,
                {
                    "handle": user_handle,
                    "cognito_user_id": cognito_user_id,
                },
            )
            model["data"] = results

        # # x-ray subsegment
        # subsegment = xray_recorder.begin_subsegment('sub_user_activities')

        # data = {
        # "about": "this is a user_activities subsegment",
        # "time":now.isoformat(),
        # "model_data":model
        # }

        # subsegment.put_metadata('data', data)
        # xray_recorder.end_subsegment()

        return model
