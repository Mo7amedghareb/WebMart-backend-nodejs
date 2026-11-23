# WebMart Backend

The Node.js API for WebMart, a clothing e-commerce project with an Angular frontend. It supports authentication, products, user profiles, shopping carts, checkout and admin operations.

## Tech stack

Node.js, Express, MongoDB, Mongoose, JWT and bcryptjs.

## Local development

Install the dependencies with `npm install`, then start the server with `npm run dev`.

The server reads `PORT`, `MONGO_URI`, `JWT_SECRET` and `JWT_EXPIRES_IN` from a local `.env` file. The Angular frontend expects the API on port 5000. Database credentials and signing secrets belong in local configuration, not in Git.

## API areas

`/auth` · `/products` · `/user` · `/cart` · `/checkout` · `/admin`

## Related project

[WebMart Angular frontend and team credits](https://github.com/Mo7amedghareb/WebMart-Angular)

Developed by Mohamed Ghareb as part of the WebMart team project.
