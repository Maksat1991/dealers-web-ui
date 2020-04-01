<template>
  <v-list>
    <catalog v-for="catalog of catalogs" :key="catalog.id" :catalog="catalog" />
  </v-list>
</template>

<script>
import Catalog from '../../../components/Catalog/Catalog'

export default {
  components: { Catalog },
  computed: {
    catalogs() {
      return this.$store.getters['catalogs/getCatalogs']
    }
  },
  mounted() {
    this.$store.dispatch('catalogs/fetchCatalogs')
  }
}
</script>
