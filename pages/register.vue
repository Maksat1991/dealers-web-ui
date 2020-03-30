<template>
  <div>
    <v-form v-model="valid" @submit.prevent="submitRegister">
      <v-text-field
        v-for="(input, index) of inputs"
        :key="index"
        v-model="input.value"
        :label="input.label"
        :rules="input.rules"
        :type="input.type"
        :append-icon="
          input.label === 'Пароль'
            ? showPassword
              ? 'mdi-eye'
              : 'mdi-eye-off'
            : undefined
        "
        :counter="input.label === 'Пароль' ? 'counter' : undefined"
        @click:append="showPassword = !showPassword"
      />
      <div>
        <v-btn
          :loading="redirecting"
          to="/login"
          color="primary"
          class="q-mr-sm"
          @click="redirecting = true"
        >
          Вход
        </v-btn>
        <v-btn type="submit" :disabled="!valid" color="primary">
          Регистрация
        </v-btn>
      </div>
    </v-form>
    <alert :alert="alert" />
  </div>
</template>

<script>
import Alert from '../components/Alert/Alert'
export default {
  name: 'Register',
  components: { Alert },
  data: () => ({
    inputs: {
      email: {
        value: '',
        label: 'E-mail',
        type: 'email',
        rules: []
      },
      name: {
        value: '',
        label: 'Имя',
        type: 'text',
        rules: []
      },
      password: {
        value: '',
        label: 'Пароль',
        type: '',
        rules: []
      },
      phone: {
        value: '',
        label: 'Телефон',
        type: 'tel',
        rules: []
      }
    },
    alert: { result: '', text: '' },
    showPassword: false,
    redirecting: false,
    valid: false
  }),
  mounted() {
    this.inputs.email.rules = [this.$validate.required, this.$validate.email]
    this.inputs.name.rules = [this.$validate.required, this.$validate.min(2)]
    this.inputs.password.rules = [
      this.$validate.required,
      this.$validate.min(3)
    ]
    this.inputs.password.type = this.showPassword ? 'text' : 'password'
    this.inputs.phone.rules = [this.$validate.required, this.$validate.tel]
  },
  methods: {
    submitRegister() {
      Object.values(this.inputs).map((input) => (input.value = ''))
      this.alert = {
        result: 'error',
        text: 'Произошла неизвестная ошибка'
      }
      setTimeout(() => {
        this.alert = { result: '', text: '' }
      }, 2000)
    }
  }
}
</script>
