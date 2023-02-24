# build image
FROM python:3.10-slim as build

# for compiling packages
RUN apt-get update
RUN apt-get install -y --no-install-recommends \
    build-essential gcc 

WORKDIR /backend-flask

#virtualenv
RUN python3 -m venv /backend-flask/venv
ENV PATH="/backend-flask/venv/bin:$PATH"

# install dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt


# main image
FROM python:3.10-slim-buster

WORKDIR /backend-flask

# copy deps
COPY --from=build /backend-flask/venv ./venv

COPY . .

ENV PATH="/backend-flask/venv/bin:$PATH"

ENV FLASK_ENV=development

EXPOSE ${PORT}


CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]

# RUN chmod +x ./script.sh

# CMD ["/bin/bash", "./script.sh"]
