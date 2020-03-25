<template>
  <q-layout view="hHh LpR fff">

    <q-header elevated>
<<<<<<< HEAD
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
=======
      <q-tabs>
        <q-route-tab
          icon="person_add"
          to="/register"
          replace
          label="Регистрация"
>>>>>>> Created catalog import page
        />
        <q-route-tab
          icon="assignment"
          to="/login"
          replace
<<<<<<< HEAD
          label="Login"
=======
          label="Вход"
>>>>>>> Created catalog import page
        />
      </q-tabs>
    </q-header>

<<<<<<< HEAD
    <q-footer>
      <q-toolbar>
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

=======
>>>>>>> Created catalog import page
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
