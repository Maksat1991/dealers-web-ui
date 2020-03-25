<template>
  <q-layout view="hHh LpR fff">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
<<<<<<< HEAD

        <q-toolbar-title>
          Title
        </q-toolbar-title>

        <q-btn
          flat
          :label="$t('button.logout')"
          @click="logout"
        ></q-btn>
      </q-toolbar>


=======
        <q-btn
          flat
          label="Выйти"
          @click="logout"
        ></q-btn>
      </q-toolbar>
>>>>>>> Created catalog import page
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <q-list
        bordered
        padding
        class="rounded-borders text-primary"
      >
        <q-item
<<<<<<< HEAD
          clickable
          v-ripple
          to="/manager-add"
          :active="$route.path === '/cabinet/manager-add'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>
          <q-item-section>Inbox</q-item-section>
=======
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
>>>>>>> Created catalog import page
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

<<<<<<< HEAD
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

=======
>>>>>>> Created catalog import page
  </q-layout>
</template>

<script>
export default {
  name: 'Cabinet',
  data() {
    return {
      left: false,
<<<<<<< HEAD
=======
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
>>>>>>> Created catalog import page
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/AUTH_LOGOUT');
      this.$router.push('/login');
    },
  },
<<<<<<< HEAD
  created() {
    console.log(this.$route);
  },
=======
>>>>>>> Created catalog import page
};
</script>
