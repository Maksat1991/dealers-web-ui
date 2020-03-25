<template>
  <td
    @dblclick="changing = true"
    :class="{'Table-Cell': typeof cell === 'string'}"
  >
    <label
      style="width: 100%; height: 100%;"
      v-if="typeof cell === 'string'"
    >
      <input
        v-if="changing"
        style="width: 100%"
        type="text"
        :value="inputValue"
        @keyup.enter.esc="keyUpHandler"
      >
      <span v-else>{{ inputValue }}</span>
    </label>
    <slot v-else></slot>
  </td>
</template>

<script>
export default {
  name: 'Table-Cell',
  props: {
    cell: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      changing: false,
      inputValue: '',
    };
  },
  methods: {
    keyUpHandler({ target }) {
      this.inputValue = target.value;
      this.changing = false;
    },
  },
  watch: {
    inputValue(e) {
      if (this.$parent.$vnode.key !== undefined && this.$vnode.key !== undefined) {
        this.$store.commit('table/updateCell', [e, this.$parent.$vnode.key, this.$vnode.key]);
      }
    },
  },
  mounted() {
    this.inputValue = this.cell;
  },
};
</script>
