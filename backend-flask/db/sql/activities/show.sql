SELECT
  (SELECT COALESCE(row_to_json(object_row),'{}'::json) FROM (
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
      activities.created_at
  ) object_row) as activity,
  (SELECT COALESCE(array_to_json(array_agg(row_to_json(array_row))),'[]'::json) FROM (
  SELECT
    replies.uuid,
    reply_users.display_name,
    reply_users.handle,
    reply_users.cognito_user_id,
    replies.message,
    replies.replies_count,
    replies.reposts_count,
    (SELECT COUNT(*) FROM public.likes WHERE activity_id = replies.uuid) AS likes_count,
      CASE
      WHEN %(cognito_user_id)s::text IS NOT NULL THEN (
        EXISTS (
          SELECT 1
          FROM public.likes
          WHERE activity_id = replies.uuid AND user_id = (SELECT uuid 
      FROM public.users 
      WHERE users.cognito_user_id = %(cognito_user_id)s
      LIMIT 1)
        )
      )
      ELSE NULL
    END AS current_user_has_liked,
    replies.reply_to_activity_uuid,
    replies.created_at
  FROM public.activities replies
  LEFT JOIN public.users reply_users ON reply_users.uuid = replies.user_uuid
  WHERE
    replies.reply_to_activity_uuid = activities.uuid
  ORDER BY  replies.created_at DESC
  ) array_row) as replies
FROM public.activities
LEFT JOIN public.users ON users.uuid = activities.user_uuid
WHERE activities.uuid = %(uuid)s
ORDER BY activities.created_at DESC