<template><div></div></template>
<script>
export default {
  name: 'User',
  mounted() {
    const isAuth = !!localStorage.getItem('token')
    const remember = !!JSON.parse(localStorage.getItem('remember'))
    if (!isAuth || !remember) return this.$router.push({ name: 'login' })
    this.$store
      .dispatch('auth/submitHandler', [
        localStorage.getItem('username'),
        localStorage.getItem('password')
      ])
      .then((succeed) =>
        succeed
          ? this.$router.push({ name: 'user' })
          : this.$router.push({ name: 'login' })
      )
  }
}
</script>
