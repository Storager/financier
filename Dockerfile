FROM node:8 AS Stage1

WORKDIR /app

ADD . /app

RUN npm install
RUN npm run build
RUN npm run docs

FROM node:8 AS Stage2

WORKDIR /financier
RUN npm install express@^4.13.0 helmet@^3.10.0 uuid helmet-csp@^2.7.0 cheerio@^0.22.0

COPY --from=Stage1 /app/dist ./dist/
COPY --from=Stage1 /app/docs ./docs/
COPY --from=Stage1 /app/api ./api

WORKDIR /financier/api

ENV PORT 8080

# RUN apt-get install -y git-core

CMD node ./index.js
