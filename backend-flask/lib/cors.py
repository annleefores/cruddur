from flask_cors import CORS
import os


def init_cors(app):
    frontend = os.getenv("FRONTEND_URL")
    backend = os.getenv("BACKEND_URL")
    newfrontend = os.getenv("NEW_FRONTEND_URL")
    testfrontend = os.getenv("TEST_FRONTEND_URL")
    origins = [frontend, backend, newfrontend, testfrontend]
    cors = CORS(
        app,
        resources={r"/api/*": {"origins": origins}},
        headers=[
            "Content-Type",
            "Authorization",
            "traceparent",
            "if-modified-since",
            "x-current-user",
        ],
        expose_headers=["Authorization", "location", "link", "x-current-user"],
        methods="OPTIONS,GET,HEAD,POST",
    )
