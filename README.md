# Jobsity calendar

It's an open-source application for managing the agenda.

## Requirements
* Node JS == 12.20.1
* npm

## Scripts

For starting the project in **development mode**, you can use the following scripts:

### `npm run start:watch`
Builds the app for development to the `public/js` folder and stay watching files in bundle and rebuild on changes.

The page must be reloaded if you make edits.

### `npm run server`
Starts a server to serve the application in development mode. 

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.

### `npm run lint`
Runs the linter to check the structure of the code.


## Deploy app
To build the project for production, you must run the following script:

### `npm run build`
Builds the app for production to the `public` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified.

**Note:** After the application has been built for `production`, you could find the output files in the folder `public`