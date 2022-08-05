FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/ 

RUN yarn install --production --frozen-lockfile

COPY . .

EXPOSE 3333

CMD [ "yarn", "start" ]

