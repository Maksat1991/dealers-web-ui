<template>
  <q-layout view="hHh LpR fff">

    <q-header elevated>
      <q-tabs>
        <q-route-tab
          icon="person_add"
          to="/register"
          replace
          label="Регистрация"
        />
        <q-route-tab
          icon="assignment"
          to="/login"
          replace
          label="Вход"
        />
      </q-tabs>
    </q-header>

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
