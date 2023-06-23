# from datetime import datetime, timedelta, timezoneas

from lib.db import db

# for rollbar
# import sys
# import rollbar

# # ------------Honeycomb--------
# from opentelemetry import trace

# # from opentelemetry.trace import Status, StatusCode

# tracer = trace.get_tracer("home_activites")
# @tracer.start_as_current_span("do_work")
# def do_work():
#     print("doing some work...")
# --------------------------------------


class HomeActivities:
    def run(cognito_user_id=None):
        # # for cloudwatch-watchtower
        # def run():

        # LOGGER.info('Hello Cloudwatch! from  /api/activities/home')

        # # honeycomb.io create span
        # with tracer.start_as_current_span("home-activities-mock-data"):

        # span = trace.get_current_span()
        # now = datetime.now(timezone.utc).astimezone()
        # span.set_attribute("app.now", now.isoformat())

        sql = db.template("activities", "home")
        results = db.query_array_json(
            sql,
            {
                "cognito_user_id": cognito_user_id,
            },
        )
        return results

        # --- Rollbar -----

        # def ignore_handler(payload, **kw):  # kw is currently unused
        #     if payload["data"]["message"] == "test":
        #         return payload
        #     else:
        #         return False

        # rollbar.events.add_payload_handler(ignore_handler)

        # try:
        #     print(x)
        # except:

        #     payload = {
        #         "level": "error",
        #         "message": "test",
        #         "extra_data": None,  # add any extra data you want to send
        #     }

        #     rollbar.report_message(**payload)

        # return results
