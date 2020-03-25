<template>
  <tr>
    <table-cell>
      <q-btn flat class="q-mr-lg" size="small" @click="removeRow($vnode.key)">
        <q-icon name="highlight_off" />
      </q-btn>
    </table-cell>
    <table-cell
      v-for="cell of row"
      :key="cell.number"
      :cell="cell.value"
    />
  </tr>
</template>

<script>
import TableCell from '../-Cell/Table-Cell';

export default {
  name: 'Table-Row',
  components: {
    TableCell,
  },
  props: {
    row: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeRow(rowIndex) {
      this.$store.commit('table/removeRow', rowIndex);
    },
  },
};
</script>
