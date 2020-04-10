<template>
  <div>
    <v-form v-model="valid" @submit.prevent="submitRegister">
      <v-text-field
        v-for="(input, index) of inputs"
        :key="index"
        v-model="input.value"
        :label="input.label"
        :rules="input.rules"
        :type="
          input.type !== 'password'
            ? input.type
            : showPassword
            ? 'text'
            : 'password'
        "
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
      <div class="d-flex flex-column">
        <v-btn
          type="submit"
          :disabled="!valid"
          color="primary"
          :loading="registering"
        >
          Регистрация
        </v-btn>
        <span class="text-center Register-Link d-flex flex-column mt-3">
          Уже есть аккаунт?
          <nuxt-link to="/login" color="primary">
            Вход
          </nuxt-link>
        </span>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
        type: 'password',
        rules: []
      },
      phone: {
        value: '',
        label: 'Телефон',
        type: 'tel',
        rules: []
      }
    },
    showPassword: false,
    valid: false,
    registering: false
  }),
  // set up rules for inputs
  mounted() {
    this.inputs.email.rules = [this.$validate.required, this.$validate.email]
    this.inputs.name.rules = [
      this.$validate.required,
      this.$validate.min(2),
      this.$validate.name
    ]
    this.inputs.password.rules = [
      this.$validate.required,
      this.$validate.min(3)
    ]
    this.inputs.password.type = this.showPassword ? 'text' : 'password'
    this.inputs.phone.rules = [this.$validate.required, this.$validate.tel]
  },
  methods: {
    submitRegister() {
      this.registering = true
      setTimeout(() => {
        this.$store.dispatch('alert/updateAlert', {
          result: 'error',
          text: 'Произошла неизвестная ошибка'
        })
        this.registering = false
      }, 700)
    }
  }
}
</script>

<style>
.Register-Link {
  cursor: default;
  will-change: opacity;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.Register-Link:hover {
  opacity: 0.8;
}
</style>
