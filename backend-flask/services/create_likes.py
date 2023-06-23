import uuid
from datetime import datetime, timedelta, timezone
from lib.db import db


class CreateLikes:
    def run(cognito_user_id, activity_uuid):
        model = {"errors": None, "data": None}

        if cognito_user_id is None or len(cognito_user_id) < 1:
            model["errors"] = ["cognito_user_id_blank"]

        if activity_uuid is None or len(activity_uuid) < 1:
            model["errors"] = ["activity_uuid_blank"]

        if model["errors"]:
            # return what we provided
            model["data"] = {
                "reply_to_activity_uuid": activity_uuid,
            }
        else:
            CreateLikes.create_like(cognito_user_id, activity_uuid)
            model["data"] = "post liked"
        return model

    def create_like(cognito_user_id, activity_uuid):
        exists = CreateLikes.like_exists(cognito_user_id, activity_uuid)

        if exists:
            sql = db.template("likes", "deleteLike")
            db.query_commit(
                sql,
                {
                    "cognito_user_id": cognito_user_id,
                    "activity_uuid": activity_uuid,
                },
            )
        else:
            sql = db.template("likes", "insertLike")
            db.query_commit(
                sql,
                {
                    "cognito_user_id": cognito_user_id,
                    "activity_uuid": activity_uuid,
                },
            )

    def like_exists(cognito_user_id, activity_uuid):
        sql = db.template("likes", "checkLike")
        user_uuid = db.query_value(
            sql,
            {
                "cognito_user_id": cognito_user_id,
                "activity_uuid": activity_uuid,
            },
        )
        return user_uuid
