<template lang="pug">
v-container.pa-10
  v-row.pt-5.pb-5.ma-0
    h1 信件內容設定
    v-btn(absolute='' top='' right='' depressed='' @click='onSaveClickHandler' color='blue')
      v-icon(elevation='1') mdi-plus
      | 儲存
  v-divider
  v-row.pt-5.pb-5.ma-0(align='start')
    h2 註冊完成信
    v-col(cols='12' lg='12')
      v-text-field(label='主旨' v-model='info.sign_title')
    v-col(cols='12' lg='12')
      h2 內容
      ckeditor(v-model='info.sign_contents')
    h2 忘記密碼信
    v-col(cols='12' lg='12')
      v-text-field(label='主旨' v-model='info.forget_password_title')
    v-col(cols='12' lg='12')
      h2 內容
      ckeditor(v-model='info.forget_password_contents')
    h2 訂單成立信
    v-col(cols='12' lg='12')
      v-text-field(label='主旨' v-model='info.order_title')
    v-col(cols='12' lg='12')
      h2 內容
      ckeditor(v-model='info.order_contents')
    h2 貨到通知信
    v-col(cols='12' lg='12')
      v-text-field(label='主旨' v-model='info.delivery_title')
    v-col(cols='12' lg='12')
      h2 內容
      ckeditor(v-model='info.delivery_contents')

</template>

<script>
export default {
  components: {},
  data() {
    return {
      info: {
        sign_title: "",
        sign_contents:"",
        forget_password_title: "",
        forget_password_contents: "",
        order_title: "",
        order_contents: "",
        delivery_title: "",
        delivery_contents: ""
        
      },
    };
  },
  created() {
    this.is_loading_table_data = true;
    this.loadData();
  },
  computed: {},
  methods: {
    loadData() {
      let _self = this;
      _self.is_loading_table_data = false;
    },
    onSaveClickHandler() {},
  },
};
</script>

<style lang="scss" scoped>
</style>
