SELECT
  activities.uuid,
  users.display_name,
  users.handle,
  users.cognito_user_id,
  activities.message,
  activities.replies_count,
  activities.reposts_count,
  activities.likes_count,
  activities.expires_at,
  activities.created_at,
  activities.user_uuid
FROM public.activities
LEFT JOIN public.users ON users.uuid = activities.user_uuid
ORDER BY activities.created_at DESC