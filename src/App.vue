<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  created() {
    axios.interceptors.response.use(undefined, err => new Promise(() => {
      console.log('err::: ', err.response);
      console.log('err::: ', err.config);
      if (err.response && err.response.status === 401) {
        this.$store.dispatch('auth/AUTH_LOGOUT');
        this.$route.push('/login');
      }
      throw err;
    }));
  },
};
</script>

<style>
</style>
