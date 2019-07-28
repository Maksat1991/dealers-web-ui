<template>
  <q-layout view="hHh LpR fff">

    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Header
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs>
        <q-route-tab
          icon="map"
          to="/register"
          replace
          label="Register"
        />
        <q-route-tab
          icon="assignment"
          to="/login"
          replace
          label="Login"
        />
      </q-tabs>
    </q-header>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'Main',

  data: () => ({}),
};
</script>
