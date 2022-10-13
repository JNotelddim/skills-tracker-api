FROM node:16-alpine
# Adding build tools to make yarn install work on Apple silicon / arm64 machines
RUN apk add --no-cache python3 g++ make
WORKDIR /src
COPY . .
RUN yarn install --production
CMD ["node", "main.js"]
