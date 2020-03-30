<template>
  <v-app>
    <span>{{ error.statusCode === 404 ? 'Не найдено' : error.message }}</span>
    <span>{{ `Код ошибки: ${error.statusCode}` }}</span>
  </v-app>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: this.error.statusCode
    }
  }
}
</script>
