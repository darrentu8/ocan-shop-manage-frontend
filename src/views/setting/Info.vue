<template lang="pug">
v-container.pa-10
  v-row.pt-5.pb-5.ma-0
    h1 資訊設定
    v-btn(absolute='' top='' right='' depressed='' @click='onSaveClickHandler' color='blue')
      v-icon(elevation='1') mdi-plus
      | 儲存
  v-divider
  v-row.pt-5.pb-5.ma-0(align='start')
    v-col(cols='12' lg='12')
      v-text-field(label='網站名稱' v-model='info.website_name')
    v-col(cols='12' lg='12')
      v-text-field(label='Facebook連結' v-model='info.facebook_url')
    v-col(cols='12' lg='12')
      v-text-field(label='Instagram連結' v-model='info.instagram_url')
    v-col(cols='12' lg='12')
      v-text-field(label='Youtube連結' v-model='info.youtube_url')
    v-col(cols='12' lg='12')
      h2 運送資訊
      ckeditor(v-model='info.shopping_info')
    v-col(cols='12' lg='12')
      h2 退貨資訊
      ckeditor(v-model='info.return_info')
    v-col(cols='12' lg='12')
      h2 付款資訊
      ckeditor(v-model='info.payment_info')
    v-col(cols='12' lg='12')
      h2 網站條款
      ckeditor(v-model='info.aa')
    v-col(cols='12' lg='12')
      h2 隱私權政策
      ckeditor(v-model='info.pp')

</template>

<script>
export default {
  components: {},
  data() {
    return {
      info: {
        website_name: "",
        facebook_url: "",
        instagram_url: "",
        youtube_url: "",
        shopping_info: "",
        return_info: "",
        payment_info: "",
        aa: "",
        bb: "",
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
