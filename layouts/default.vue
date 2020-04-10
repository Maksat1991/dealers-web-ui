<template>
  <v-app>
    <v-app-bar app clipped-right>
      <v-tabs color="black" centered>
        <v-tab
          v-for="(link, index) of nav"
          :key="index"
          class="gray--text text--darken-4"
          :to="link.to"
        >
          {{ link.text }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-content>
      <v-container style="height: 100%;" class="d-flex justify-center">
        <nuxt />
      </v-container>
    </v-content>
    <alert :alert="alert" />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '../components/Alert/Alert'

export default {
  components: { Alert },
  data: () => ({
    nav: [
      { text: 'Регистрация', to: '/register' },
      { text: 'Вход', to: '/login' }
    ]
  }),
  computed: mapGetters('alert', ['alert'])
}
</script>
