# How to use
clone the project
`git clone https://github.com/TONYHOKAN/shopping-receipt.git`
and run
`cd shopping-receipt && yarn setup`

# Start Local Development
`yarn dev`
Using create-react-app web pack dev server to run react_client.

`yarn server:dev`
 Using Node.js express server as backend API server. 

# Product Build
`yarn build && yarn server:prod`

# Test
`yarn test`

# Docker
build image
`docker build -t shopping-receipt .`
start image
`docker run -p 80:80 -d shopping-receipt`

# What next?
- use react-route to separate product/ shopping cart/ receipt page
- allow to add new product to product list
- allow add new location config
- use react-redux to create store to centralize current user state
- backend support with MVC model using Node.js Express that fetch product list from server
- CI using docker cloud/ CircleCI
- deploy to AWS ECR
