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
            :label="$t('label.login')"
            lazy-rules
            :rules="[
              $valid.required,
            ]"
          ></q-input>
          <q-input
            v-model="password"
            type="password"
            :label="$t('label.password')"
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
              :label="$t('button.register')"
              color="primary"
              flat
              class="q-mr-sm"
            />
            <q-btn
              :label="$t('button.signIn')"
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
      console.log(this.$store);
      this.$store.dispatch('auth/AUTH', formData);
    },
  },
};
</script>

<style>
</style>
