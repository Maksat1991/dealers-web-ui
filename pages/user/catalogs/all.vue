<template>
  <div>
    <v-navigation-drawer style="width: 240px" absolute clipped permanent>
      <catalog-preview
        v-for="catalog of catalogs"
        :key="catalog.id"
        :catalog="catalog"
      />
    </v-navigation-drawer>
    <div style="margin-left: 260px" class="d-flex">
      <catalog />
    </div>
  </div>
</template>

<script>
import CatalogPreview from '../../../components/CatalogPreview/CatalogPreview'
import Catalog from '../../../components/Catalog/Catalog'

export default {
  components: { CatalogPreview, Catalog },
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
