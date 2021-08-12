<template lang="pug">
v-app-bar(app dark right absolute)
  v-app-bar-nav-icon.hidden-md-and-up(@click="toggleNavDrawer")
  img.float-left(style='width: 30px;margin: 0  10px;' src='@/assets/images/logo.svg')
  v-toolbar-title 活力e商城管理平台
  v-spacer
  v-menu(offset-y='' width="400px")
    template(v-slot:activator='{ on, attrs }')
      v-btn.float-right(fab='' v-bind='attrs' v-on='on' x-small='')
        v-icon mdi-account
    v-list
      v-list-item
        v-list-item-title
          v-icon mdi-store
          | 前往商城
      v-list-item
        v-list-item-title
          v-icon mdi-logout
          | 登出

</template>



<script>
export default {
  name: "Header",
  components: {},
  data() {
    return {
    };
  },
  created() {},
  methods: {
    toggleNavDrawer() {
        this.$store.commit('toggleNavDrawer');
    }
  },
};
</script>

<style lang="scss">
.header_wrapper {
  display: block;
  width: 100%;
}
</style>




