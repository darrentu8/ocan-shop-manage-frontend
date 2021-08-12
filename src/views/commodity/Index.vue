<template lang="pug">
v-app
  v-app-bar(app)
    Header
  v-main.d-flex
    Nav
    router-view
  v-footer(padless)
    Footer
</template>



<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    Nav,
    Footer
  },
  data() {
    return {
      };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss">
</style>
