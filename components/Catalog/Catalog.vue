<template>
  <v-list-item class="justify-space-between items-center">
    <v-list-item-icon class="headline">
      {{ catalog.id }}
    </v-list-item-icon>
    <v-list-item-content class="display-1">
      {{ catalog.name }}
    </v-list-item-content>
    <v-list-item-action>
      <v-btn @click="updateSelectedCatalog(catalog)">
        Импортировать в каталог
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'Catalog',
  props: {
    catalog: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateSelectedCatalog(catalog) {
      this.$router.push({ name: 'user-catalogs-import' })
      this.$store.commit('catalogs/updateSelectedCatalog', catalog)
    }
  }
}
</script>
