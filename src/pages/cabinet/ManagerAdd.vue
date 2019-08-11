<template>
  <q-page padding>
    <q-form
      @submit="submitReg"
    >
      <q-input
        v-model="fields.email"
        :label="$t('label.email')"
      ></q-input>
      <q-input
        v-model="fields.name"
        :label="$t('label.name')"
      ></q-input>
      <q-input
        v-model="fields.password"
        :label="$t('label.password')"
      ></q-input>
      <q-input
        v-model="fields.phone"
        :label="$t('label.phone')"
      ></q-input>
      <q-btn
        type="submit"
      ></q-btn>
    </q-form>
  </q-page>
</template>

<script>
import api from 'src/helpers/api';

export default {
  name: 'ManagerAdd',
  data: () => ({
    fields: {
      email: '',
      name: '',
      password: '',
      phone: '',
    },
  }),
  methods: {
    async submitReg() {
      await api(
        'http://185.146.3.147:8081/api/dealer/register',
        this.fields,
        (res) => {
          console.log(res);
        },
      );
    },
  },
};
</script>

<style>
</style>
