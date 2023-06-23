SELECT
  activities.uuid,
  users.display_name,
  users.handle,
  users.cognito_user_id,
  activities.message,
  activities.replies_count,
  activities.reposts_count,
  (SELECT COUNT(*) FROM public.likes WHERE activity_id = activities.uuid) AS likes_count,
  CASE
    WHEN %(cognito_user_id)s::text IS NOT NULL THEN (
      EXISTS (
        SELECT 1
        FROM public.likes
        WHERE activity_id = activities.uuid AND user_id = (SELECT uuid 
    FROM public.users 
    WHERE users.cognito_user_id = %(cognito_user_id)s
    LIMIT 1)
      )
    )
    ELSE NULL
  END AS current_user_has_liked,
  activities.expires_at,
  activities.created_at,
  activities.user_uuid
FROM public.activities
LEFT JOIN public.users ON users.uuid = activities.user_uuid
ORDER BY activities.created_at DESC