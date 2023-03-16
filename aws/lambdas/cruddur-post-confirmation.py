import json
import psycopg2
import os


def lambda_handler(event, context):
    user = event["request"]["userAttributes"]
    print("User attributes ----->", user)
    try:
        conn = psycopg2.connect(os.getenv("CONNECTION_URL"))
        cur = conn.cursor()

        cur.execute(
            "INSERT INTO public.users (display_name, email, handle, cognito_user_id) VALUES (%s, %s, %s, %s)",
            (user["name"], user["email"], user["preferred_username"], user["sub"]),
        )

        conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            cur.close()
            conn.close()
            print("Database connection closed.")

    return event
