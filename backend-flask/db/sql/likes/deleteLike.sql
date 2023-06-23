DELETE FROM public.likes WHERE user_id = (
    SELECT uuid
    FROM public.users
    WHERE users.cognito_user_id = %(cognito_user_id)s
    LIMIT 1
)
    AND activity_id = %(activity_uuid)s
