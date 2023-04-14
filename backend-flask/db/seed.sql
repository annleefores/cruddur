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
        'MOCK'
    ), (
        'Andrew Bayko',
        'bayko@exampro.co',
        'bayko',
        'MOCK'
    ), (
        'Londo Mollari',
        'lmollari@centari.com',
        'londo',
        'MOCK'
    ),(
        'Annlee Test',
        'technodudetrickster@gmail.com',
        'Annlee',
        'MOCK'
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