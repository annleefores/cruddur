#--------------build image----------------
FROM node:18.16.0-buster AS build

WORKDIR /frontend-nextjs

# copy only package-lock.json and package.json files
COPY package*.json /frontend-nextjs

# production ready npm install
RUN npm i 


# ------------- main image ---------------000
FROM node:18.16.0-bullseye-slim

# set node env to production
ENV PORT=3001

WORKDIR /frontend-nextjs

# RUN apt update && apt install -y curl

# copy deps
COPY --from=build /frontend-nextjs/node_modules /frontend-nextjs/node_modules 
COPY . /frontend-nextjs

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]

