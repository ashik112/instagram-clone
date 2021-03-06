﻿# instagram-clone

Basic Instagram clone using React, Node, Mysql.

| Profile  | Post |
| ------------- | ------------- |
| ![alt text](https://github.com/ashik112/instagram-clone/blob/master/screenshots/profile.png?raw=true)  | ![alt text](https://github.com/ashik112/instagram-clone/blob/master/screenshots/modal.png?raw=true)  |

## Overview

Performing any CRUD operations from client app has not been implemented yet.
Data has to inserted through api calls separately. Use `curl` or `postman`. See `API` section or go to [api documentation](https://documenter.getpostman.com/view/10049988/T1DpDdbV).

## Requirements

1. node (>=12.18.3 recommended)
2. mysql
3. yarn (recommended)

## Usage

1. Clone or download the project.

Client application (`./client`) is fully separated from the backend application (`./api`).
Both applications must be running at the same time for the client app to get access to the server through API calls.

### 1. Backend

1. Configs are in `./api/.env`. Change according to your development environment.

    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=''
    DB_NAME=instagram_clone
    DB_DIALECT=mysql
    JWT_SECRET_KEY=changeThisAndUseUltraLongStringOfAtLeaseThirtyTwoCharactersOrSomeSecureHash
    PORT=9000
    ```

2. Create specified database (e.g. `instagram_clone`) in mysql.
3. From root folder import `instagram_clone.sql` in your database to get demo data. Two users are included already for demo.

   ```javascript
    username: batman
    password: batman

    username: joker
    password: batman
   ```

4. Go to `./api` directory
5. Install dependencies

    ```bash
        npm install
    ```

6. Start the server

   ```bash
        npm start
    ```

7. It will run on `localhost` port `9000` or the host and port specified `.env`.

### 2. Frontend

1. Go to `./client` directory
2. Install dependencies

    ```bash
        npm install

        or

        yarn
    ```

3. Set API URL in `./client/.env` (or .env.local) depending on your backend configuration

    ```javascript
        REACT_APP_API_URL='http://localhost:9000'
    ```

4. Run

   ```bash
        npm start

        or

        yarn start
    ```

5. Go to [http://localhost:3000](http://localhost:3000) in browser.

## API

Very basic APIs for an Instagram clone. It has all the basic CRUD operations to view the frontend application.

### Authentication

Returns `token` on login response but currently, no authorization happening at the backend. Can be used to only detect if a user is logged in or not.

### Error responses

Will return generic error responses with error and message fields.

### Documentation

The documentation is published from postman.
Go [here](https://documenter.getpostman.com/view/10049988/T1DpDdbV) to view it in the browser.

## Future Improvements (Planned)

1. Proper error messages on api response.
2. Global error handling on react app.
3. Infinite scrolling on comments and posts, limiting the number of entries api returns.
4. Home Page with Posts
5. User registration, like, follow, comment and other expected functionalities on frontend app.
6. Unit testing
7. Database migration
8. Compress image before saving it in storage
9. And many more...

## Known Issues

1. `reacstrap` uses an older version of `react-transition-group` in their modals. It will show errors in console but it can be safely used in `react ^16.x`. This will be fixed in the next major update of `reacstrap`.
