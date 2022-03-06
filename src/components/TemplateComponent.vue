<template>
  <div>
    <header-component></header-component>
    <slot></slot>
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue';

export default {
  components: { HeaderComponent },
  name: 'TemplateComponent',
};
</script>

<style scoped lang="scss">
</style>
