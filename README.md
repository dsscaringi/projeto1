# projeto1

This project demonstrates a simple Node.js web server using Express with a login form and session-based authentication. Static files are served from the `public` directory and a protected dashboard page is available after login.

## Installation

Install the project dependencies:

```sh
npm install
```

## Running the server

Start the server with:

```sh
npm start
```

The server will run on port 3000 unless the `PORT` environment variable is set.

The session middleware uses `SESSION_SECRET` to sign cookies. In development
you can rely on the default `change-this-secret` or set your own value.

## Credentials

The sample login uses the following credentials:

- **Username:** `admin`
- **Password:** `1234`

No logout route is provided in this example.
