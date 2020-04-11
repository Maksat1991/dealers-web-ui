<template>
  <v-app id="inspire">
    <v-app-bar dark app color="#5f6368" clipped-right>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Личный Кабинет</v-toolbar-title>
      <v-text-field
        class="mx-8"
        hide-details
        prepend-inner-icon="mdi-magnify"
        single-line
        label="Поиск"
        style="max-width: 280px"
      ></v-text-field>
      <v-spacer />
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(button, index) in menuList"
            :key="index"
            @click="button.action"
          >
            <v-list-item-icon>
              <v-icon>{{ button.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="pr-5">
              {{ button.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app :mini-variant="miniVariant">
      <v-list height="100%" dense style="position: relative;">
        <v-list-item
          v-for="(link, index) of nav"
          :key="index"
          @click.stop="
            () => {
              subNav = link.sub
              left = !left
            }
          "
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          style="position: absolute; bottom: 0; width: 100%;"
          @click.stop="miniVariant = !miniVariant"
        >
          <v-list-item-icon>
            <v-icon>
              mdi{{ `-chevron-${miniVariant ? 'right' : 'left'}` }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Свернуть навигацию</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="left" temporary fixed>
      <v-list dense>
        <v-list-item
          v-for="(link, index) of subNav"
          :key="index"
          :to="link.to"
          @click="categoryClickHandler"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid style="height: 100%">
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
    drawer: false,
    left: false,
    miniVariant: false,
    title: 'Личный кабинет',
    nav: [
      {
        text: 'Каталоги',
        icon: 'mdi-format-list-text',
        sub: [
          { text: 'Список', icon: 'mdi-view-list', to: '/user/catalogs/all' },
          {
            text: 'Импортировать в каталог',
            icon: 'mdi-file-import-outline',
            to: '/user/catalogs/import'
          }
        ]
      },
      {
        text: 'Менеджеры',
        icon: 'mdi-account-tie',
        sub: [
          {
            text: 'Список',
            icon: 'mdi-account-group',
            to: '/user/managers/all'
          },
          {
            text: 'Зарегистрировать',
            icon: 'mdi-account-plus',
            to: '/user/managers/register'
          }
        ]
      }
    ],
    subNav: []
  }),
  computed: {
    menuList() {
      return [
        {
          text: 'Настройки',
          icon: 'mdi-account-cog',
          action: this.redirectToSettings
        },
        {
          text: 'Выйти',
          icon: 'mdi-logout-variant',
          action: this.logout
        }
      ]
    },
    ...mapGetters('alert', ['alert'])
  },
  watch: {
    miniVariant(miniVariant) {
      localStorage.setItem('miniVariant', JSON.stringify(miniVariant))
    }
  },
  mounted() {
    this.miniVariant = JSON.parse(localStorage.getItem('miniVariant'))
  },
  methods: {
    categoryClickHandler(link) {
      this.subNav = link.sub
      this.drawer = false
      this.left = false
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('remember')
      this.$store.commit('auth/updateToken', '')
      this.$router.push({ name: 'login' })
    },
    redirectToSettings() {
      this.$router.push({ name: 'user-settings' })
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>
