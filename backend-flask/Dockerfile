FROM python:3.10-slim-buster
# Inside container
# make a new directory and move into it
WORKDIR /backend-flask

# # install curl for healthcheck
# RUN apt update && apt install -y curl

# local -> inside container
# copy local requirements.txt to inside container
COPY requirements.txt requirements.txt

# install dependencies listed in requirements.txt inside the container
RUN pip3 install -r requirements.txt

# copy contents from current local directory to inside container
COPY . .

ENV PYTHONUNBUFFERED: 1

EXPOSE ${PORT}

# CMD -> command
# Run shell command to run flask app

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567", "--debug"]