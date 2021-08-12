<template lang="pug">
v-container.pa-10
  v-row.pt-5.pb-5.ma-0
    h1 &#x54C1;&#x724C;&#x7BA1;&#x7406;
    v-btn(absolute='' top='' right='' depressed='' color='green' @click='add_dialog=true')
      v-icon(elevation='1') mdi-plus
      | &#x65B0;&#x589E;
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
      v-btn.ma-2(color='red' @click='onNoBeSoldClickHandler(props.item)')
        v-icon mdi-credit-card-refund
        |           &#x4E0B;&#x67B6;
    template(v-slot:item.img='{ item }')
      v-img(width='100' contain='' :src='item.img')
  v-dialog(v-model='edit_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 &#x7DE8;&#x8F2F;&#x54C1;&#x724C;
      v-card-text
        v-container
          v-row(justify='start')
            v-col(cols='12')
              v-text-field(required='' label='品牌名稱' v-model='edit_dialog_data.name')
            v-col(cols='12')
              v-textarea(required='' label='品牌介紹' :value='edit_dialog_data.description')
            v-col(cols='12')
              v-img(height='200' contain='' :src='edit_dialog_data.img')
            v-col(cols='12')
              v-file-input(required='' accept='image/png, image/jpeg' placeholder='請選擇一張照片' prepend-icon='mdi-camera' label='圖片:(限JPG,JPEG,PNG ,單一檔案最大1MB)' @change='onEditUploadImageHandler')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='edit_dialog = false')
          | &#x53D6;&#x6D88;
        v-btn(color='blue darken-1' text='' @click='edit_dialog = false')
          | &#x5132;&#x5B58;
  v-dialog(v-model='add_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 &#x65B0;&#x589E;&#x54C1;&#x724C;
      v-card-text
        v-container
          v-row(justify='start')
            v-col(cols='12')
              v-text-field(required='' label='品牌名稱' v-model='add_dialog_data.name')
            v-col(cols='12')
              v-textarea(required='' label='品牌介紹' :value='add_dialog_data.description')
            v-col(cols='12')
              v-img(height='200' contain='' :src='add_dialog_data.img')
            v-col(cols='12')
              v-file-input(required='' accept='image/png, image/jpeg' placeholder='請選擇一張照片' prepend-icon='mdi-camera' label='圖片:(限JPG,JPEG,PNG ,單一檔案最大1MB)' @change='onAddUploadImageHandler')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='add_dialog = false')
          | &#x53D6;&#x6D88;
        v-btn(color='blue darken-1' text='' @click='onAddItemClickHandler')
          | &#x5132;&#x5B58;

</template>



<script>
export default {
  components: {},
  data() {
    return {      
      imageData:"",
      is_loading_table_data: false,
      add_dialog: false,
      add_dialog_data: {name:"",description:"",img:""},
      edit_dialog: false,
      edit_dialog_data: {},
      itemsPerPage: 10,
      table_search:"",
      table_headers: [
        {
          text: "編號",
          value: "no",
          width: "80px",
          align: "center",
          divider: true,
        },
        {
          text: "品牌名稱",
          value: "name",
          width: "100px",
          align: "center",
          divider: true,
        },
        {
          text: "品牌介紹",
          value: "description",
          width: "300px",
          align: "start",
          divider: true,
        },
        {
          text: "品牌圖片",
          value: "img",
          width: "60px",
          align: "center",
          divider: true,
        },
        {
          text: "操作",
          value: "controls",
          width: "220px",
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
            name: "淑女廚房",
            description: "淑女廚房的美味辣椒醬",
            img: "https://backetash.s3-ap-northeast-1.amazonaws.com/1627091005802-1624260983028-ladykitchen.jpg",
          });
        }
        _self.is_loading_table_data = false;
      }, 1000);
    },
    onAddItemClickHandler(){      
      this.table_data.push(this.add_dialog_data); 
      this.add_dialog = false;
    },
    onEditeClickHandler(item) {
      this.edit_dialog_data = item;
      this.edit_dialog = true;
    },
    onNoBeSoldClickHandler(item) {
      console.log("onNoBeSoldClickHandler:",item);
    },
    onAddUploadImageHandler(event) {      
      const file = event; 
      if (file) {
        this.add_dialog_data['img'] = URL.createObjectURL(file);        
        URL.revokeObjectURL(file); 
      } else {
        this.add_dialog_data['img'] =  null
      }     
    },
    onEditUploadImageHandler(event) {      
      const file = event; 
      if (file) {
        this.edit_dialog_data['img'] = URL.createObjectURL(file);        
        URL.revokeObjectURL(file); 
      } else {
        this.edit_dialog_data['img'] =  null
      }     
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
