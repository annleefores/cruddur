SELECT 1
FROM public.likes
WHERE activity_id = %(activity_uuid)s
AND user_id = (
    SELECT uuid
    FROM public.users
    WHERE users.cognito_user_id = %(cognito_user_id)s
    LIMIT 1
)
