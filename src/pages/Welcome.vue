<template>
  <q-page padding>
    <q-btn @click="send">Click</q-btn>
  </q-page>
</template>

<script>
import api from 'src/helpers/api';

export default {
  name: 'Welcome',
  methods: {
    async send() {
      const res = await api(
        '/api/catalog',
        {},
        (asd) => { console.log(asd); },
        {},
        (err) => { console.log(err); },
        'get',
      );

      console.log(res);
    },
  },
};
</script>

<style>
</style>
