<template>
  <div class="Catalog self-start flex full-width shadow-2 items-center q-pa-md">
    <span class="Catalog-Id q-mr-lg text-h6">{{ catalog.id }}</span>
    <span class="Catalog-Name text-h6">{{ catalog.name}}</span>
    <span class="Catalog-ImportButton q-ml-auto">
      <q-btn @click="updateSelectedCatalog(catalog.id)">Импортировать в каталог</q-btn>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Catalog',
  props: {
    catalog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateSelectedCatalog(id) {
      this.$router.push('/cabinet/import');
      this.$store.commit('catalogs/updateSelectedCatalog', id);
    },
  },
};
</script>
