-- this file was manually created

INSERT INTO
    public.users (
        display_name,
        email,
        handle,
        cognito_user_id
    )
VALUES (
        'Annlee Fores',
        'annleetestmail@gmail.com',
        'annleefores',
        'MOCK'
    ), (
        'Andrew Brown',
        'andrewb@exampro.co',
        'andrewbrown',
        'andrewbrown_pic'
    ), (
        'Andrew Bayko',
        'bayko@exampro.co',
        'bayko',
        'bayko_pic'
    ), (
        'Londo Mollari',
        'lmollari@centari.com',
        'londo',
        'londo_pic'
    ),(
        'Alternate Me',
        'technodudetrickster@gmail.com',
        'alternate_me',
        'MOCK'
    );

INSERT INTO
    public.activities (user_uuid, message, expires_at)
VALUES ( (
            SELECT uuid
            from public.users
            WHERE
                users.handle = 'annleefores'
            LIMIT
                1
        ), 'This was imported as seed data!', current_timestamp + interval '10 day'
    ),
    ( (
            SELECT uuid
            from public.users
            WHERE
                users.handle = 'alternate_me'
            LIMIT
                1
        ), 'I am the other me! ', current_timestamp + interval '10 day'
    );