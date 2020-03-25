import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
<<<<<<< HEAD
=======
import table from './table';
import catalogs from './catalogs';
>>>>>>> Created catalog import page

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// eslint-disable-next-line import/no-mutable-exports
let store = null;

export default function (/* { ssrContext } */) {
  store = new Vuex.Store({
    modules: {
      auth,
<<<<<<< HEAD
=======
      table,
      catalogs,
>>>>>>> Created catalog import page
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return store;
}

export { store };
