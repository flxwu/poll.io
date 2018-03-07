# Poll.io - A Fullstack Realtime Polling Application

## Local Build Instructions
Make sure you have either `yarn` or `npm` installed. (We recommend `yarn`)

#### Installing all dependencies of the server
```
yarn install
```

#### Installing all dependencies of the client
```
cd client/
yarn install
```

#### Start Express server and React frontend
Before doing this step, make sure you have nothing running on both port 3000 and port 3001.

You may change these ports in `package.json` by replacing
```
"scripts": {
    "start": "PORT=3001 node ./bin/www",
    "dev": "PORT=3001 nodemon ./bin/www"
  },
```
with your own port number for Express. Same the React port number. **If you do this, make sure that the proxy port in `client/package.json` is still the same as your Express port number. **

If you have ensured this, run
```
yarn dev
cd client/
yarn start
```