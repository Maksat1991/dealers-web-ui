<template>
  <transition name="alert">
    <div v-if="alert.result" class="alert-wrapper">
      <v-alert class="alert" :type="alert.result">
        {{ alert.text }}
      </v-alert>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    alert: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.alert-enter-active,
.alert-leave-active {
  transition: opacity 0.7s;
}
.alert-enter,
.alert-leave-to {
  opacity: 0;
}

.alert-wrapper {
  width: 100%;
  position: absolute;
  padding: 10px;
  bottom: 0;
  left: 0;
  right: 0;
}

.alert {
  width: 50%;
  margin-left: auto;
}
</style>
