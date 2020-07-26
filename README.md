﻿# instagram-clone

Basic Instagram clone using React, Node, Mysql.

| Profile  | Post |
| ------------- | ------------- |
| ![alt text](https://github.com/ashik112/instagram-clone/blob/master/screenshots/profile.png?raw=true)  | ![alt text](https://github.com/ashik112/instagram-clone/blob/master/screenshots/modal.png?raw=true)  |

## Overview

Performing any CRUD operations from client app has not been implemented yet.\
Data has to be inserted through api calls separately. Use `curl` or `postman`. See `API` section or go to [api documentation](https://documenter.getpostman.com/view/10049988/T1DpDdbV).

## Requirements

1. node (>=12.18.3 recommended)
2. mysql
3. yarn (recommended)

## Usage

1. clone / download it

Client application (`/client`) is fully separated from the backend (`/api`).
Both applications must be run together for the client app to get access to server through API calls.

### 1. Backend

1. Go to `api` directory
2. Install dependencies

    ```bash
        npm install
    ```

3. Change configs if required, from `api/config/db.config.js` (database) and `api/config/auth.config.js` (secret key for jwt)

    ```bash
    {
        HOST: 'localhost',
        USER: 'root',
        PASSWORD: '',
        DB: 'instagram_clone',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
    ```

    ```bash
    {
        secret: 'iDontFeelSafeHerePleaseMoveMeToEnvAndGiveMeSomeHash',
    }
    ```

4. Change port if required from `api/bin/www`

    ```javascript
        var port = normalizePort(process.env.PORT || '9000');
    ```

5. Create specified database (`instagram_clone`) in mysql.
6. From root folder import `instagram_clone.sql` in your database to get demo data. Two users are included already for demo.

   ```javascript
    username: batman
    password: batman

    username: joker
    password: batman
   ```

7. Start the server

   ```bash
        npm start
    ```

8. It will run on `localhost` port `9000` or the given port.

### 2. Frontend

1. go to `client` directory
2. Install dependencies

    ```bash
        npm install

        or

        yarn
    ```

3. Set api url in `client/.env` (or .env.local) depending on your backend configuration

    ```javascript
        REACT_APP_API_URL = 'http://localhost:9000'
    ```

4. Run

   ```bash
        npm start

        or

        yarn start
    ```

4. Go to [http://localhost:3000](http://localhost:3000) in browser.

## API

### Overview

Very basic APIs for an Instagram clone. It has all the basic CRUD operations to view the frontend application.

### Authentication

Returns `token` on login response but currently, no authorization happening at the backend. Can be used to only detect if a user is logged in or not.

### Error responses

Will return generic error responses with error and message fields.

### Documentation

The documentation is published from postman.
Go [here](https://documenter.getpostman.com/view/10049988/T1DpDdbV) to view it in the browser.

## Future Improvements (Planned)

1. Proper type checking with react `prop-types`.
2. Proper error messages on api response.
3. Global error handling on react app.
4. Infinite scrolling on comments and posts.
5. Home Page
6. User registration and other expected functionalities on frontend app.
7. Unit testing
8. And many more...

## Known Issues

1. `reacstrap` uses an older version of `react-transition-group` in their modals. It will show errors in console but it can be safely used in react ^16.x. Hopefully, this will be fixed in the next major update of `reacstrap`.
