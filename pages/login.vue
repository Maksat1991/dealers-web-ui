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
        <v-btn
          to="/register"
          class="q-mr-sm"
          color="primary"
          :loading="redirecting"
          @click="redirecting = true"
        >
          Регистрация
        </v-btn>
        <v-btn
          :loading="authenticating"
          :disabled="!valid"
          type="submit"
          color="primary"
        >
          Вход
        </v-btn>
      </div>
    </v-form>
    <alert :alert="alert" />
  </div>
</template>

<script>
import Alert from '../components/Alert/Alert'
export default {
  name: 'Login',
  components: { Alert },
  data: () => ({
    username: '',
    password: '',
    showPassword: false,
    remember: false,
    alert: { result: '', text: '' },
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
            this.alert = {
              result: 'error',
              text: 'Произошла ошибка, неправильный логин и/или пароль'
            }
            this.username = ''
            this.password = ''
            this.remember = false
          }
          setTimeout(() => {
            this.alert = { result: '', text: '' }
          }, 2000)
        })
      this.authenticating = false
    }
  }
}
</script>
