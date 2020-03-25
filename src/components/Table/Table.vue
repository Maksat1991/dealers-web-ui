<template>
  <q-markup-table class="Table">
    <table-row
      class="Table-Row"
      v-for="row of data"
      :key="row.number"
      :row="row">
    </table-row>
  </q-markup-table>
</template>

<script>
import TableRow from './-Row/Table-Row';

export default {
  name: 'ImportedTable',
  components: {
    TableRow,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.Table {
  counter-reset: rowNumber columnNumber;
  padding-left: 2em;
  padding-top: 3em;
  border: 1px solid;
}

.Table-Row {
  counter-increment: rowNumber;
}

.Table-Row:first-child {
  position: relative;
}

.Table-Row:first-child .Table-Cell {
  counter-increment: columnNumber;
}

.Table-Row:first-child .Table-Cell::after {
  content: counter(columnNumber);
  position: absolute;
  top: -50%;
  left: 0;
  right: 0;
  width: 100%;
  height: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Table-Cell {
  position: relative;
}

.Table-Cell:first-child::before {
  content: counter(rowNumber);
  position: absolute;
  left: -15%;
  top: 0;
  bottom: 0;
  width: 1em;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
