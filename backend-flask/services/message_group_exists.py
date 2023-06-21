from datetime import datetime, timedelta, timezone

from lib.ddb import Ddb
from lib.db import db


class MessageGroupExists:
    def run(cognito_user_id, userhandle):
        model = {"errors": None, "data": None}

        sql = db.template("users", "uuid_from_cognito_user_id")
        my_user_uuid = db.query_value(sql, {"cognito_user_id": cognito_user_id})

        print(f"UUID: {my_user_uuid}")

        ddb = Ddb.client()
        data = Ddb.message_group_exists(ddb, my_user_uuid, userhandle)
        print("list_message_groups: ", data)

        model["data"] = data
        return model
