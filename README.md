# Customer records

[![Greenkeeper badge](https://badges.greenkeeper.io/shmuga/intercom-customer-records.svg)](https://greenkeeper.io/)

[Live demo](https://intercom-customer-records.surge.sh)

Simple app  filtering list of customers based on their distance to predefined point.

## Architecture

The app consists of `core` module - computation and business logic layer separated from representation layer.

And representation layer build with `React`. 

To increase computation performance was decided to implement caching solution based on `Map` object. 

## Development

To contribute to this module just fork this repo and follow next instructions:
 
 1. run `npm i` or `yarn` inside the folder;
 2. run `npm start` to start development server;
 3. run `npm test` to start watching tests and track their progress.
 
 To check code style please run `npm run lint`.
 
## Deployment

To make production build just run `npm run build`.

   
 
