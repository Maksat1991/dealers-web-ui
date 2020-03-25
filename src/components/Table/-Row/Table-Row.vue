<template>
  <tr>
    <table-cell v-for="cell of row.cells" :key="cell.number" :cell="cell"></table-cell>
  </tr>
</template>

<script>
import TableCell from '../-Cell/Table-Cell';

export default {
  name: 'Table-Row.vue',
  components: {
    TableCell,
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
};
</script>
