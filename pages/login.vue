<template>
  <div>
    <v-form v-model="valid" @submit.prevent="submitLogin">
      <v-text-field
        v-model="username"
        :rules="[$validate.required, $validate.email]"
        type="text"
        label="Логин"
      />
      <v-text-field
        v-model="password"
        :rules="[$validate.required, $validate.min(3)]"
        :type="showPassword ? 'text' : 'password'"
        label="Пароль"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        counter
        @click:append="showPassword = !showPassword"
      />
      <div>
        <v-checkbox v-model="remember" label="Запомнить" />
        <div class="d-flex flex-column">
          <v-btn
            :loading="authenticating"
            :disabled="!valid"
            type="submit"
            color="primary"
          >
            Вход
          </v-btn>
          <span class="text-center Login-Link d-flex flex-column mt-3">
            Ещё нет аккаунта?
            <nuxt-link to="/register" color="primary">
              Зарегистрироваться
            </nuxt-link>
          </span>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    showPassword: false,
    remember: false,
    valid: false,
    authenticating: false,
    redirecting: false
  }),
  methods: {
    async submitLogin() {
      this.authenticating = true
      localStorage.setItem('remember', JSON.stringify(this.remember))
      await this.$store
        .dispatch('auth/login', [this.username, this.password])
        .then((succeed) => {
          if (succeed) {
            this.$router.push({ name: 'user' })
          } else {
            this.$store.dispatch('alert/updateAlert', {
              result: 'error',
              text: 'Произошла ошибка, неправильный логин и/или пароль'
            })
            this.username = ''
            this.password = ''
            this.remember = false
          }
        })
      this.authenticating = false
    }
  }
}
</script>

<style>
.Login-Link {
  cursor: default;
  will-change: opacity;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.Login-Link:hover {
  opacity: 0.8;
}
</style>
