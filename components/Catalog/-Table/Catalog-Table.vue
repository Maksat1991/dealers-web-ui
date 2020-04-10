<template>
  <hot-table ref="table" :settings="settings"></hot-table>
</template>

<script>
import { HotTable } from '@handsontable/vue'

export default {
  name: 'CatalogTable',
  components: { HotTable },
  props: {
    settings: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
@import url('../../../node_modules/handsontable/dist/handsontable.full.css');
.ht_clone_top,
.ht_clone_left,
.ht_clone_top_left_corner,
.handsontable .wtBorder.current,
.ht_clone_master {
  z-index: 1;
}
</style>
