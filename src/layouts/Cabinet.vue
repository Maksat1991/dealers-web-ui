<template>
  <q-layout view="hHh LpR fff">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          Title
        </q-toolbar-title>

        <q-btn
          flat
          :label="$t('button.logout')"
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
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  name: 'Cabinet',
  data() {
    return {
      left: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/AUTH_LOGOUT');
      this.$router.push('/login');
    },
  },
  created() {
    console.log(this.$route);
  },
};
</script>
