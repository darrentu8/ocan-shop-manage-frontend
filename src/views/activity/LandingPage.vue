<template lang="pug">
v-container.pa-10
  v-row.pt-5.pb-5.ma-0
    h1 首頁活動管理
    v-btn(absolute='' top='' right='' depressed='' @click='onAddClickHandler' color='green')
      v-icon(elevation='1') mdi-plus
      | 新增
  v-divider
  v-row.pt-5.pb-5.ma-0(align='start')
    v-btn.ma-1(elevation='1') CSV
    v-btn.ma-1(elevation='1') Excel
    v-btn.ma-1(elevation='1') Print
  v-data-table.elevation-1.pt-1(:search='table_search' :loading='is_loading_table_data' :headers='table_headers' :items='table_data' :items-per-page='itemsPerPage' divider='true')
    template(v-slot:top='')
      v-text-field.ma-4(v-model='table_search' label='查詢')
    template(v-slot:item.controls='props')
      v-btn.ma-2(color='primary' @click='onEditeClickHandler(props.item)')
        v-icon mdi-pencil
        // 編輯
      v-btn.ma-2(color='red' @click='onDeleteClickHandler(props.item)')
        v-icon mdi-delete
        // 退款
    template(v-slot:item.img='{ item }')
      v-img(width='100' contain='' :src='item.img')
    template(v-slot:item.fare='{ item }')
      span {{ item.fare.toLocaleString() }}
  v-dialog(v-model='add_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 首頁活動管理
      v-card-text
        v-container
          v-row
            v-col(cols='12' lg='6')
              v-select(v-model='add_dialog_data.type' :items='add_dialog_data.type_item' label='分類')
            v-col(cols='12' lg='6')
              v-menu(:close-on-content-click='false' transition='scale-transition' offset-y='' max-width='290px' min-width='auto')
                template(v-slot:activator='{ on, attrs }')
                  v-text-field(v-model='add_dialog_data.range_date' hint='YYYY/MM/DD ~ YYYY/MM/DD' persistent-hint='' prepend-icon='mdi-calendar' v-bind='attrs' label='訂單成立時間' v-on='on')
                v-date-picker(v-model='search_range_date' no-title='' range='')
            v-col(cols='12' lg='12')
              v-radio-group(v-model='add_dialog_data.slot' row='')
                v-radio(label='左側設定' value='左側')
                v-radio(label='右側設定' value='右側')
                v-radio(label='下方設定' value='下方')
            v-col(cols='12' lg='6')
              v-text-field(label='抬頭' v-model='add_dialog_data.title')
            v-col(cols='12' lg='6')
              v-text-field(label='副標' v-model='add_dialog_data.sub_title')
            v-col(cols='12')
              v-text-field(label='頁面連結' v-model='add_dialog_data.url')
            v-col(cols='12')
              v-img(height='200' contain='' :src='add_dialog_data.img')
            v-col(cols='12')
              v-file-input(accept='image/png, image/jpeg' placeholder='請選擇一張照片' prepend-icon='mdi-camera' label='圖片:(限JPG,JPEG,PNG ,單一檔案最大1MB)' @change='onPictureUploadImageHandler')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='add_dialog = false')
          | 取消
        v-btn(color='blue darken-1' text='' @click='add_dialog = false')
          | 儲存
  v-dialog(v-model='edit_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 首頁活動管理
      v-card-text
        v-container
          v-row
            v-col(cols='12' lg='6')
              v-select(v-model='edit_dialog_data.type' :items='edit_dialog_data.type_item' label='分類')
            v-col(cols='12' lg='6')
              v-menu(:close-on-content-click='false' transition='scale-transition' offset-y='' max-width='290px' min-width='auto')
                template(v-slot:activator='{ on, attrs }')
                  v-text-field(v-model='edit_dialog_data.range_date' hint='YYYY/MM/DD ~ YYYY/MM/DD' persistent-hint='' prepend-icon='mdi-calendar' v-bind='attrs' label='訂單成立時間' v-on='on')
                v-date-picker(v-model='search_range_date' no-title='' range='')
            v-col(cols='12' lg='12')
              v-radio-group(v-model='edit_dialog_data.slot' row='')
                v-radio(label='左側設定' value='左側')
                v-radio(label='右側設定' value='右側')
                v-radio(label='下方設定' value='下方')
            v-col(cols='12' lg='6')
              v-text-field(label='抬頭' v-model='edit_dialog_data.title')
            v-col(cols='12' lg='6')
              v-text-field(label='副標' v-model='edit_dialog_data.sub_title')
            v-col(cols='12')
              v-text-field(label='頁面連結' v-model='edit_dialog_data.url')
            v-col(cols='12')
              v-img(height='200' contain='' :src='edit_dialog_data.img')
            v-col(cols='12')
              v-file-input(accept='image/png, image/jpeg' placeholder='請選擇一張照片' prepend-icon='mdi-camera' label='圖片:(限JPG,JPEG,PNG ,單一檔案最大1MB)' @change='onPictureUploadImageHandler')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='edit_dialog = false')
          | 取消
        v-btn(color='blue darken-1' text='' @click='edit_dialog = false')
          | 儲存

</template>



<script>
export default {
  components: {},
  data() {
    return {
      is_loading_table_data: false,
      dialog: false,
      dialog_data: { receiver_county: "", receiver_district: "" }, 
      search_range_date:[],     
      picture_previw:"",
      edit_dialog: false,
      edit_dialog_data: {  },
      add_dialog: false,
      add_dialog_data: {
        type: "辣椒系列",
        type_item:[],
        range_date:["2021-08-01","2021-08-01"],
        date_start: "2021-07-26",
        date_end: "2021-08-01",
        title: "抬頭測試",
        sub_title: "副標測試",
        url: "http://www.google.com",
        img: "https://backetash.s3-ap-northeast-1.amazonaws.com/1627283550541-2017-06-09-tokyo2020-thumbnail-1.jpg",
        slot: "左側",
      },
      itemsPerPage: 10,
      table_search: "",
      table_headers: [
        {
          text: "編號",
          value: "no",
          width: "80px",
          align: "center",
          divider: true,
        },
        {
          text: "分類",
          value: "type",
          width: "100px",
          align: "center",
          divider: true,
        },
        {
          text: "開始時間",
          value: "date_start",
          width: "130px",
          align: "center",
          divider: true,
        },
        {
          text: "結束時間",
          value: "date_end",
          width: "130px",
          align: "center",
          divider: true,
        },
        {
          text: "標題",
          value: "title",
          width: "100px",
          align: "center",
          divider: true,
        },
        {
          text: "副標",
          value: "sub_title",
          width: "100px",
          align: "center",
          divider: true,
        },
        {
          text: "頁面連結",
          value: "url",
          width: "100px",
          align: "center",
          divider: true,
        },
        {
          text: "圖檔預覽",
          value: "img",
          width: "60px",
          align: "center",
          divider: true,
        },
        {
          text: "位置",
          value: "slot",
          width: "100px",
          align: "center",
          divider: true,
        },
        {
          text: "操作",
          value: "controls",
          width: "250px",
          sortable: false,
          align: "center",
        },
      ],
      table_data: [],
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
      setTimeout(function () {
        for (let index = 0; index < 1000; index++) {
          _self.table_data.push({
            no: index + 1,
            type: "辣椒系列",
            type_item:[],
            range_date:["2021-08-01","2021-08-01"],
            date_start: "2021-07-26",
            date_end: "2021-08-01",
            title: "抬頭測試",
            sub_title: "副標測試",
            url: "http://www.google.com",
            img: "https://backetash.s3-ap-northeast-1.amazonaws.com/1627283550541-2017-06-09-tokyo2020-thumbnail-1.jpg",
            slot: "左側",
          });
        }
        _self.is_loading_table_data = false;
      }, 1000);
    },
    onEditeClickHandler(item) {
      console.log("ok")
      this.edit_dialog_data = item;
      this.picture_previw=this.edit_dialog_data.img;
      this.edit_dialog = true;
    },
    onDeleteClickHandler(item) {
      console.log(item);
    },
    onAddClickHandler(item) {
      console.log(item);
      this.picture_previw=this.add_dialog_data.img;
      this.add_dialog = true;  
    },
    onPictureUploadImageHandler(event) {
      const file = event;
      if (file) {
        this.picture_previw = URL.createObjectURL(file);
        URL.revokeObjectURL(file);
      } else {
        this.picture_previw["img"] = null;
      }
    },

  },
};
</script>

<style lang="scss" scoped>
</style>
