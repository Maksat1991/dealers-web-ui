<template><nuxt-child /></template>
<script>
export default {
  layout: 'user',
  middleware: 'auth'
}
</script>
