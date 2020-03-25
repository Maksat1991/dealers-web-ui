<template>
  <q-page class="flex" padding>
    <div class="row full-width justify-center self-center">
      <div class="col-4">
        <q-form
          class="q-gutter-md"
          @submit="submit"
        >
          <q-input
            v-model="login"
            label="Логин"
            lazy-rules
            :rules="[
              $valid.required,
            ]"
          ></q-input>
          <q-input
            v-model="password"
            type="password"
            label="Пароль"
            lazy-rules
            :rules="[
              $valid.required
            ]"
          ></q-input>
          <div
            class="row justify-end"
          >
            <q-btn
              to="/register"
              label="Регистрация"
              color="primary"
              flat
              class="q-mr-sm"
            />
            <q-btn
              label="Войти"
              type="submit"
              color="primary"
            ></q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    login: '',
    password: '',
  }),
  methods: {
    async submit() {
      const formData = new FormData();
      formData.append('grant_type', 'password');
      formData.append('username', this.login);
      formData.append('password', this.password);
      this.$store.dispatch('auth/AUTH_REQUEST', formData)
        .then(() => {
          this.$router.push('/cabinet');
        });
    },
  },
};
</script>

<style>
</style>
