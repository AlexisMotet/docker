# image de départ
FROM alpine:3.15 as builder

# chemin de travail, defaut
WORKDIR /adv

RUN apk update && apk add npm

COPY src /adv/src
COPY package-lock.json package.json tsconfig.json /adv/

RUN npm ci

RUN npm run build

FROM alpine:3.15 as runner

WORKDIR /adv

COPY --from=builder /adv .

RUN apk update && apk add nodejs

# https://stackoverflow.com//49955097/how-do-i-add-a-user-when-im-using-alpine-as-a-base-image 
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

USER nodeuser

CMD ["node", "/adv/dist/index.js"]



