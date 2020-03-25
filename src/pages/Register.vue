<template>
  <q-page padding>
    <q-form
      @submit="submitReg"
    >
      <q-input
        v-model="fields.email"
        label="E-mail"
      ></q-input>
      <q-input
        v-model="fields.name"
        label="Имя"
      ></q-input>
      <q-input
        v-model="fields.password"
        label="Пароль"
      ></q-input>
      <q-input
        v-model="fields.phone"
        label="Телефон"
      ></q-input>
      <q-btn
        class="q-my-lg"
        label="Отправить"
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
