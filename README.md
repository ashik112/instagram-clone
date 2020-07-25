# instagram-clone

## Requirements

1. node
2. mysql
3. yarn (recommended)

## Usage

1. clone / download it

### 1. Backend

1. Go to `api` directory
2. Install dependencies

    ```bash
        npm install
    ```

3. Start the server

   ```bash
        npm start
    ```

4. It will run on `localhost` port `9000`.

### 2. Frontend

1. go to `client` directory
2. Install dependencies

    ```bash
        npm install

        or

        yarn
    ```

3. Run

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
