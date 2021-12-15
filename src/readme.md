## Component Contents
---------------------

A general description on component functionality


### App.ts
------

Main backend file that starts express and connects to the database. 
- Middleware is defined
- Profile Picture endpoints for storing and uploading
- Registering main route endpoints
- Initializing Twitter and Express sessions


### Config.ts
------

A Configuration file for the backend typescript components
and important data


### Controller
----

Controllers are main functions for controlling state with the MongoDB Database, Twitter Passport Authentication and Vite Protocol
- Create new Twitter Passport Strategy and recieve profile data
- Add a SuperUser to database Admin to create, update and delete database submissions such as vuilders and fans
- Add and Create Users such as Vuilders and Fans to database
- Vite RPC endpoints for interacting with the contract

### Images
--------

#### If Images folder does not exist within src directory, create a new images folder

- A folder where images are stored for User profile pictures
    (should be changed to cloud storage for production)


### Models
------

Models is the folder where our MongoDB schemas are placed.
- Create User Schema
- Create Admin Schema

### Routes
-------

Routes folder contains API call endpoints for predefined routes in App.ts, some endpoints call the Controllers to update the database and interact with Vite.

- get user and admin data to call create, update and delete methods
- Call Twitter authentication enpoints to login and callback via Twitter
- add SuperUser endpoint to manage Vuilders and Fans
    (currently can only be added by Postman)
- Get Health of the server state
- Endpoints for calling Vite RPC from Controllers to interact with the contract


### Service
-----

Used to Connect to the local MongoDB server


### SmartContract

-------

The folder where the ViteClout Smart Contract written in Solidity++ is locatated.