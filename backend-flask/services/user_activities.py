from datetime import datetime, timedelta, timezone
from aws_xray_sdk.core import xray_recorder


class UserActivities:
  def run(user_handle):
    model = {
      'errors': None,
      'data': None
    }

    # x-ray subsegment
    subsegment = xray_recorder.begin_subsegment('sub_user_activities')
    now = datetime.now(timezone.utc).astimezone()

    data = {
    "about": "this is a user_activities subsegment",
    "time":now.isoformat(),
    "model_data":model
    }

    subsegment.put_metadata('data', data)
    xray_recorder.end_subsegment()


    if user_handle == None or len(user_handle) < 1:
      model['errors'] = ['blank_user_handle']
    else:
      now = datetime.now()
      results = [{
        'uuid': '248959df-3079-4947-b847-9e0892d1bab4',
        'handle':  'Andrew Brown',
        'message': 'Cloud is fun!',
        'created_at': (now - timedelta(days=1)).isoformat(),
        'expires_at': (now + timedelta(days=31)).isoformat()
      }]
      model['data'] = results
    return model