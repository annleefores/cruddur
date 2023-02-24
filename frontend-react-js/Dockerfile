#--------------build image----------------
FROM node:16.19.1 AS build

WORKDIR /frontend-react-js

# copy only package-lock.json and package.json files
COPY package*.json /frontend-react-js

# production ready npm install
RUN npm ci --only=production


# ------------- main image ---------------000
FROM node:16.19.1-bullseye-slim

# set node env to production
ENV NODE_ENV production
ENV PORT=3000

WORKDIR /frontend-react-js

# copy deps
COPY --from=build /frontend-react-js/node_modules /frontend-react-js/node_modules 
COPY . /frontend-react-js

EXPOSE ${PORT}

CMD ["npm", "start"]

# RUN chmod +x ./script.sh

# CMD ["/bin/bash", "./script.sh"]
