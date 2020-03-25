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
<<<<<<< HEAD
            :label="$t('label.login')"
=======
            label="Логин"
>>>>>>> Created catalog import page
            lazy-rules
            :rules="[
              $valid.required,
            ]"
          ></q-input>
          <q-input
            v-model="password"
            type="password"
<<<<<<< HEAD
            :label="$t('label.password')"
=======
            label="Пароль"
>>>>>>> Created catalog import page
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
<<<<<<< HEAD
              :label="$t('button.register')"
=======
              label="Регистрация"
>>>>>>> Created catalog import page
              color="primary"
              flat
              class="q-mr-sm"
            />
            <q-btn
<<<<<<< HEAD
              :label="$t('button.signIn')"
=======
              label="Войти"
>>>>>>> Created catalog import page
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
<<<<<<< HEAD
import {
  QForm,
  QInput,
  QBtn,
} from 'quasar';

export default {
  name: 'Login',
  components: {
    QForm,
    QInput,
    QBtn,
  },
=======
export default {
  name: 'Login',
>>>>>>> Created catalog import page
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
