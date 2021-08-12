<template lang="pug">
v-navigation-drawer(absolute :value="this.$store.state.showNavDrawer" left :permanent="$vuetify.breakpoint.mdAndUp")
  v-list(nav)
    v-list-group(v-for='item in items' :key='item.title' v-model='item.active' :prepend-icon='item.icon' no-action='')
      template(v-slot:activator='')
        v-list-item-content
          v-list-item-title(v-text='item.title')
      v-list-item(v-for='child in item.items' :key='child.title' :to="child.path" link)
        v-list-item-content
          v-list-item-title(v-text='child.title')

</template>



<script>
export default {
  name: "Nav",
  components: {},
  data() {
    return {
      items: [
        {
          title: "訂單管理",
          //active: true,
          icon: "mdi-file-document-edit-outline",
          items: [{ title: "訂單管理", path: "/order/order" }],
        },
        {
          title: "商品管理",
          icon: "mdi-cube",          
          items: [
            { title: "品牌管理", path: "/commodity/brand"},
            { title: "商品管理", path: "/commodity/product" },
          ],
        },
        {
          title: "分類管理",
          icon: "mdi-filter",
          items: [
            { title: "館別管理", path: "/classify/first_type" },
            { title: "顏色管理", path: "/classify/color" },
            { title: "尺寸管理", path: "/classify/size" },
          ],
        },
        {
          title: "活動管理",
          icon: "mdi-chart-bar",
          items: [
            { title: "首頁活動管理", path: "/activity/landing_page" },
            { title: "Banner管理", path: "/activity/banner" },
          ],
        },
        {
          title: "折扣碼管理",
          icon: "mdi-tag-multiple",
          items: [{ title: "折扣碼管理", path: "/discount/discount" }],
        },
        {
          title: "會員管理",
          icon: "mdi-account-group",
          items: [{ title: "會員管理", path: "/member/member" }],
        },
        {
          title: "物流管理",
          icon: "mdi-truck",
          items: [{ title: "物流管理", path: "/logistics/logistics" }],
        },
        {
          title: "網站管理",
          icon: "mdi-cog",
          items: [
            { title: "資訊設定", path: "/setting/info" },
            { title: "Logo設定", path: "/setting/logo" },
            { title: "信件內容設定", path: "/setting/email" },
            { title: "系統介接設定", path: "/setting/key" },
          ],
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="sass" scoped>
// a 
//   text-decoration: none
//   display: block
//   width: 100

</style>
