FROM node:9.2.0

ENV yarn_CONFIG_LOGLEVEL warn
# set the NODE_ENV correctly so that yarn install will not install non-production dependencies
ENV NODE_ENV production
# Set an environment variable where the product is installed to inside of Docker image:
ENV PRODUCT_ROOT /shopping-receipt

ENV PORT 80

RUN mkdir -p $PRODUCT_ROOT/react_client

WORKDIR $PRODUCT_ROOT

COPY package.json package.json

COPY /react_client/package.json /react_client/package.json

RUN yarn install && cd $PRODUCT_ROOT/react_client && yarn install

COPY . .

RUN yarn run build

CMD yarn server:prod

EXPOSE 80
