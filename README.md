# chamel-code

A Reddit/Stackoverflow-like forum website for questions and discussions about programming.
A live version of the app is available on https://chamel-code.herokuapp.com/

## Quick Overview

Firstly build the js bundle inside the client. It will create the `build` folder inside the client folder which the server
will serve when requested.

```sh
cd client
yarn build
```

Afterwards just launch the server normally.

```sh
cd server
yarn start
```

The server should launch on port 5000.\
The app can be seen on http://localhost:5000/

## Development

For launching the client...

```sh
cd client
yarn start
```

..and for the server

```sh
cd server
yarn dev
```

The client should launch on port 3000 and proxy the requests to port 5000 where the server should launch.\
Then open http://localhost:3000/ to see the app.\
Make sure to access the client on port 3000 and not the server on port 5000 otherwise it will just serve the
built version in `client/build` rather than the development one.\
Any changes made to the client or server should update the client and server respectively when saved.
