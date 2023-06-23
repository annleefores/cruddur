UPDATE public.activities
SET replies_count = replies_count + 1
WHERE uuid = %(reply_to_activity_uuid)s;