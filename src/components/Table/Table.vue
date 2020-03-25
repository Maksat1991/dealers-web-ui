<template>
  <q-markup-table class="Table">
    <div class="Table-Wrapper">
      <table-row
        class="Table-Row"
        v-for="row of data"
        :row="row.cells"
        :key="row.number"
      />
    </div>
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
  mounted() {
    this.$el.scrollTop = this.$el.getBoundingClientRect().height;
  },
};
</script>

<style>
.Table {
  display: flex;
  align-items: center;
  counter-reset: rowNumber columnNumber;
  padding-bottom: 3em;
  border: 1px solid;
  overflow-x: scroll;
  overflow-y: hidden;
  transform: rotateX(180deg);
}

.Table-Wrapper {
  transform: rotateX(180deg);
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

.Table-Cell::before {
  content: counter(rowNumber);
  position: absolute;
  left: -20px;
  top: 0;
  bottom: 0;
  width: 1em;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Table-Cell ~ .Table-Cell::before {
  content: none;
}
</style>
