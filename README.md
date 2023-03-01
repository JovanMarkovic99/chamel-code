<img src="/client/src/images/logo.png" alt="Chamel Code logo" width="100" height="100">

# Chamel Code
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Chamel Code is a scalable and performant forum website designed for programming-related questions and discussions, built with React.js, Node.js, and MongoDB. The project features an intuitive user interface, customizable user profiles, and robust security measures to protect user data. A live demo of the app is available at: https://chamel-code.onrender.com.

## Quick Start

Before launching the app, create a .env file in the `server` directory and fill it out with the necessary environment variables.</br>
To run Chamel Code locally, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/your-username/chamel-code.git
cd chamel-code
``` 

2. Install the dependencies for both the client and server:

```sh
cd client && yarn install && cd ../server && yarn install && cd ..
```

3. Build the client

```sh
cd client && yarn build && cd ..
```

4. Start the server

```sh
cd server && yarn start && cd ..
```

The server should launch on port 5000. You can find the app at http://localhost:5000/.

## Development

To run the app in development mode, first navigate to the `client` directory and run:

```sh
yarn start
```

This will start the development server for the client app on port 3000.</br>
</br>
Next, in a separate terminal window, navigate to the `server` directory and run:

```sh
yarn dev
```

The client should launch on port 3000 and proxy the requests to port 5000 where the server should launch.</br>
</br>
Make sure to access the client on port 3000 and not the server on port 5000.</br>
Otherwise, it will serve the built version in `client/build` rather than the development one.</br>
</br>
Any changes made to the client or server should update the client and server respectively when saved.
