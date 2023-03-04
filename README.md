<img src="/client/src/images/logo.png" alt="Chamel Code logo" width="100" height="100">

# Chamel Code
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Chamel Code is a scalable and performant forum website designed for programming-related questions and discussions, built with React.js, Node.js, and MongoDB. Its design is inspired by popular platforms like Stack Overflow and Reddit, making it an intuitive and user-friendly interface for tech enthusiasts.</br>
</br>
A live demo of the app is available at: https://chamel-code.onrender.com.

## Features

* **Posting and commenting**: Users can create new posts and comments on existing posts. Primitive markdown is supported for formatting.
* **Voting/Reputation system**: Users can upvote or downvote posts and comments to express their opinions.
* **Search functionality**: Users can search for posts by title, content, likes, and more.
* **Customizable user profiles**: Users can upload profile pictures, update their usernames and email addresses, and add a short bio to their profile pages.
* **Forum moderation**: Administrators can delete posts and ban users as needed to maintain a safe and respectful community.
* **Responsive design**: The site is optimized for various screen sizes and devices, making it accessible to a wide range of users.
* **User authentication**: Users can sign up, log in, and reset their passwords. Authentication is handled with JSON Web Tokens (JWT) for enhanced security.
* **Caching**: The website uses local and Redis server caching to optimize load times and reduce server requests.

## Getting Started

### Prerequisites

Before running this project, make sure you have the following software installed:

* [Node.js](https://nodejs.org/en/) v14.0.0 or higher
* [Yarn](https://yarnpkg.com/) v1.0.0 or higher

You can verify that Node.js and Yarn are installed by running the following commands in your terminal:

```sh
node --version
yarn --version
```

If you don't have Node.js or Yarn installed, you can download and install them from the official websites linked above.

### Installation

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

### Development

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
