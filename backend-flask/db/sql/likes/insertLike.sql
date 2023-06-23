INSERT INTO public.likes (user_id, activity_id)
VALUES (
(SELECT uuid 
    FROM public.users 
    WHERE users.cognito_user_id = %(cognito_user_id)s
    LIMIT 1), 
    
    %(activity_uuid)s
    );