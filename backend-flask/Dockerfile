FROM python:3.10-slim-buster

# Inside container
# make a new directory and move into it
WORKDIR /backend-flask

# local -> inside container
# copy local requirements.txt to inside container
COPY requirements.txt requirements.txt

# install dependencies listed in requirements.txt inside the container
RUN pip3 install -r requirements.txt

# copy contents from current local directory to inside container
COPY . .

# set env variables inside container and will remain when container is running
ENV FLASK_ENV=development

#TODO
EXPOSE ${PORT}

RUN chmod +x ./script.sh

CMD ["sh", "./script.sh"]

# CMD -> command
# Run shell command to run flask app
# python3 -m flask run --host=0.0.0.0 --port=4567
# CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]