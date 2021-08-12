<template lang="pug">
v-container.pa-10
  v-row.pt-5.pb-5.ma-0
    h1 Logo設定
  v-divider
  v-row
    v-col(cols='12 ma-0')
      v-img(height='200' contain='' :src='prcture_dialog_data.img')
    v-col(cols='12')
      v-file-input(accept='image/png, image/jpeg' placeholder='請選擇一張照片' prepend-icon='mdi-camera' label='圖片:(限JPG,JPEG,PNG ,單一檔案最大1MB)' @change='onPictureUploadImageHandler')
    v-col
      v-btn(depressed='' color='primary') 上傳  

</template>

<script>
export default {
  components: {},
  data() {
    return {
      prcture_dialog_data: { img: "" },
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
    onPictureUploadImageHandler(event) {
      const file = event;
      if (file) {
        this.prcture_dialog_data["img"] = URL.createObjectURL(file);
        URL.revokeObjectURL(file);
      } else {
        this.prcture_dialog_data["img"] = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
