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
  async mounted() {
    const token = localStorage.getItem('token')
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${token}`)

    await fetch('http://185.146.3.147:8082/api/catalog', {
      method: 'GET',
      headers
    })
      .then((response) => response.text())
      .then((catalogs) =>
        this.$store.commit('catalogs/updateCatalogs', JSON.parse(catalogs))
      )
  }
}
</script>
