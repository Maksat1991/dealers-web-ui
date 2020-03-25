<template>
  <td class="Table-Cell"> {{ cell.value }}</td>
</template>

<script>
export default {
  name: 'Table-Cell',
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
};
</script>
