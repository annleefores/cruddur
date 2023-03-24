-- this file was manually created

INSERT INTO
    public.users (
        display_name,
        email,
        handle,
        cognito_user_id
    )
VALUES (
        'Andrew Brown',
        'andrewb@exampro.co',
        'andrewbrown',
        '<your-cognito-user-id'
    ), (
        'Andrew Bayko',
        'bayko@exampro.co',
        'bayko',
        '<your-cognito-user-id'
    ), (
        'Londo Mollari',
        'lmollari@centari.com',
        'londo',
        '<your-cognito-user-id'
    );

INSERT INTO
    public.activities (user_uuid, message, expires_at)
VALUES ( (
            SELECT uuid
            from public.users
            WHERE
                users.handle = 'andrewbrown'
            LIMIT
                1
        ), 'This was imported as seed data!', current_timestamp + interval '10 day'
    )