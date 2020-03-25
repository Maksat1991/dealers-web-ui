<template>
  <q-layout view="hHh LpR fff">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-btn
          flat
          label="Выйти"
          @click="logout"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <q-list
        bordered
        padding
        class="rounded-borders text-primary"
      >
        <q-item
          v-for="(link, index) of links"
          :key="index"
          clickable
          v-ripple
          :to="'/cabinet' + link.to"
          :active="$route.path === '/cabinet' + link.to"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>{{ link.text }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'Cabinet',
  data() {
    return {
      left: false,
      links: [
        {
          to: '/register',
          text: 'Зарегистрировать',
          icon: 'group_add',
        },
        {
          to: '/catalogs',
          text: 'Каталоги',
          icon: 'view_list',
        },
        {
          to: '/import',
          text: 'Импорт',
          icon: 'publish',
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/AUTH_LOGOUT');
      this.$router.push('/login');
    },
  },
};
</script>
