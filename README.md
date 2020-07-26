# instagram-clone

Basic Instagram clone using React, Node, Mysql.

| Profile  | Post |
| ------------- | ------------- |
| ![alt text](https://github.com/ashik112/instagram-clone/blob/master/screenshots/profile.png?raw=true)  | ![alt text](https://github.com/ashik112/instagram-clone/blob/master/screenshots/modal.png?raw=true)  |

## Overview

Performing any CRUD operations from client app has not been implemented yet.
Data has to inserted through api calls separately. Use `curl` or `postman`. See `API` section for or go to [api documentation](httpsdocumenter.getpostman.comview10049988T1DpDdbV).

## Requirements

1. node (=12.18.3 recommended)
2. mysql
3. yarn (recommended)

## Usage

1. clone  download it

Client application (`client`) is separate from the backend (`api`).
Both applications must be started together for the client app to get access to server through API calls.

### 1. Backend

1. Configs are in `api.env`. Change according to your development environment.

    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=''
    DB_NAME=instagram_clone
    DB_DIALECT=mysql
    JWT_SECRET_KEY=changeThisAndUseUltraLongStringOfAtLeaseThirtyTwoCharactersOrSomeSecureHash
    POST=9000
    ```

2. Create specified database (e.g. `instagram_clone`) in mysql.
3. From root folder import `instagram_clone.sql` in your database to get demo data. Two users are included already for demo.

   ```javascript
    username batman
    password batman

    username joker
    password batman
   ```

4. Go to `api` directory
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

1. go to `client` directory
2. Install dependencies

    ```bash
        npm install

        or

        yarn
    ```

3. Set api url in `client.env` (or .env.local) depending on your backend configuration

    ```javascript
        REACT_APP_API_URL = 'httplocalhost9000'
    ```

4. Run

   ```bash
        npm start

        or

        yarn start
    ```

4. Go to [httplocalhost3000](httplocalhost3000) in browser.

## API

### Overview

Very basic APIs for an Instagram clone. It has all the basic CRUD operations to view the frontend application.

### Authentication

Returns `token` on login response but currently, no authorization happening at the backend. Can be used to only detect if a user is logged in or not.

### Error responses

Will return generic error responses with error and message fields.

### Documentation

The documentation is published from postman.
Go [here](httpsdocumenter.getpostman.comview10049988T1DpDdbV) to view it in the browser.
