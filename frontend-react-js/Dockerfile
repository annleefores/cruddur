FROM node:16.18

ENV PORT=3000

COPY . /frontend-react-js
WORKDIR /frontend-react-js
RUN npm install
EXPOSE ${PORT}

# RUN chmod +x ./script.sh

# CMD ["/bin/bash", "./script.sh"]

CMD ["npm", "start"]