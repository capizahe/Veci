// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // eslint-disable-next-line @typescript-eslint/naming-convention

  webClientId: '221788106045-trn14ssklpbg0hsnov8mu2hfnduurqel.apps.googleusercontent.com',

  userServiceURL: 'http://localhost:3000/user',
  productServiceURL: 'http://localhost:5556/product',
  storeServiceURL: 'http://localhost:1234/store',
  storeCategoryServiceURL: 'http://localhost:1234/category',
  productOptionsURL: 'http://localhost:5556/product_options',

  firebaseConfig: {
    apiKey: 'AIzaSyBw8X0VPSyros8mEyitmZAG2NWmcIvlc1s',
    authDomain: 'veci-dev-1efaf.firebaseapp.com',
    projectId: 'veci-dev-1efaf',
    storageBucket: 'veci-dev-1efaf.appspot.com',
    messagingSenderId: '221788106045',
    appId: '1:221788106045:web:2282d81ff19579a10e2954',
    measurementId: 'G-31EWWFG425'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
