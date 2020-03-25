<template>
  <q-page></q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Index',
  computed: mapGetters('auth', ['isAuth']),
  created() {
    const auth = this.isAuth;
    const token = localStorage.getItem('token');
    if (auth && token) this.$router.push('/cabinet');
    else this.$router.push('/login');
  },
};
</script>

<style>
</style>
