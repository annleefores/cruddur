from datetime import datetime, timedelta, timezone

from lib.db import db


class ShowActivity:
    def run(activity_uuid, cognito_user_id=None):
        print(">>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<")
        print(cognito_user_id)
        sql = db.template("activities", "show")
        results = db.query_object_json(
            sql,
            {
                "uuid": activity_uuid,
                "cognito_user_id": cognito_user_id,
            },
        )
        return results
