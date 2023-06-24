SELECT 
  (SELECT COALESCE(row_to_json(object_row),'{}'::json) FROM (
    SELECT
      users.uuid,
      users.cognito_user_id as cognito_user_uuid,
      users.handle,
      users.display_name,
      users.bio,
      (
       SELECT 
        count(true) 
       FROM public.activities
       WHERE
        activities.user_uuid = users.uuid
       ) as cruds_count
  ) object_row) as profile,
  (SELECT COALESCE(array_to_json(array_agg(row_to_json(array_row))),'[]'::json) FROM (
    SELECT
      activities.uuid,
      users.display_name,
      users.handle,
      users.cognito_user_id,
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
      activities.message,
      activities.created_at,
      activities.replies_count,
      activities.expires_at
    FROM public.activities
    WHERE
      activities.user_uuid = users.uuid
    ORDER BY activities.created_at DESC 
    LIMIT 40
  ) array_row) as activities
FROM public.users
WHERE
  users.handle = %(handle)s