<template lang="pug">
v-container.pa-10
  v-row.pt-5.pb-5.ma-0
    h1 &#x5546;&#x54C1;&#x7BA1;&#x7406;
    v-btn(absolute='' top='' right='' depressed='' color='green')
      v-icon(elevation='1' @click='onAddClickHandler') mdi-plus
      | &#x65B0;&#x589E;
  v-divider
  v-row.ma-0.mt-3.d-flex.pt-3.pb-5(align='center')
    v-col.col-12.col-lg-6.ma-0
      v-btn.ma-1(elevation='1') &#x5EAB;&#x5B58;&#x5831;&#x8868;&#x532F;&#x51FA;
    v-col.col-12.col-lg-4.ma-0
      v-file-input(accept='image/*' label='File input')
    v-col.col-2.col-lg-2.ma-0
      v-btn.ma-1(elevation='1') &#x532F;&#x5165;
  v-divider
  v-row.pt-5.pb-5.ma-0(align='start')
    v-btn.ma-1(elevation='1') CSV
    v-btn.ma-1(elevation='1') Excel
    v-btn.ma-1(elevation='1') Print
  v-data-table.elevation-1.pt-1(:search='table_search' :loading='is_loading_table_data' :headers='table_headers' :items='table_data' :items-per-page='itemsPerPage' divider='true')
    template(v-slot:top='')
      v-text-field.ma-4(v-model='table_search' label='查詢')
    template(v-slot:item.controls='props')
      v-btn.ma-2(color='green' @click='onStockClickHandler(props.item)')
        | &#x5EAB;&#x5B58;
      v-btn.ma-2(color='primary' @click='onEditeClickHandler(props.item)')
        | &#x7DE8;&#x8F2F;&#x5167;&#x6587;
      v-btn.ma-2(color='primary' @click='onPictureClickHandler(props.item)')
        | &#x7DE8;&#x8F2F;&#x5716;&#x7247;
      v-btn.ma-2(color='yellow' @click='onGroupProductClickHandler(props.item)')
        | &#x7FA4;&#x7D44;&#x5546;&#x54C1;
      v-btn.ma-2(color='red' @click='onNoBeSoldClickHandler(props.item)')
        | &#x4E0B;&#x67B6;
    template(v-slot:item.product_img='{ item }')
      v-img(width='100' contain='' :src='item.product_img')
  // 新增----------------------------------------------------------------------
  v-dialog(v-model='add_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 &#x65B0;&#x589E;
      v-card-text
        v-container
          v-row
            v-col(cols='12')
              v-stepper(v-model='e1')
                v-stepper-header
                  v-stepper-step(:complete='e1 > 1' step='1')
                    | &#x5546;&#x54C1;&#x8CC7;&#x6599;
                  v-divider
                  v-stepper-step(:complete='e1 > 2' step='2')
                    | &#x8A73;&#x7D30;&#x8CC7;&#x6599;
                  v-stepper-step(:complete='e1 > 3' step='3')
                    | &#x5546;&#x54C1;&#x5716;&#x7247;&#x4E0A;&#x50B3;
                  v-divider
                v-stepper-items
                  v-stepper-content(step='1')
                    v-card.mb-12
                      v-col(cols='12' lg='12')
                        v-select(v-model='add_dialog_data.brand' :items='group_product_data.item' label='品牌')
                      v-col(cols='12' lg='12')
                        v-select(v-model='add_dialog_data.first' :items='group_product_data.item' label='館別')
                      v-col(cols='12' lg='12')
                        v-select(v-model='add_dialog_data.second' :items='group_product_data.item' label='第二層分類')
                      v-col(cols='12' lg='12')
                        v-select(v-model='add_dialog_data.third' :items='group_product_data.item' label='第三層分類')
                      v-col(cols='12' lg='12')
                        v-text-field(label='商品型號' readonly='' v-model='add_dialog_data.product_no')
                      v-col(cols='12' lg='12')
                        v-text-field(label='原始商品編號' readonly='' v-model='add_dialog_data.no')
                      v-col(cols='12' lg='12')
                        v-text-field(label='原始售價' readonly='' v-model='add_dialog_data.price')
                      v-col(cols='12' lg='12')
                        v-text-field(label='零售價' readonly='' v-model='add_dialog_data.retail_price')
                      v-col(cols='12' lg='12')
                        v-text-field(label='商品名稱' readonly='' v-model='add_dialog_data.product_name')
                      v-col(cols='12' lg='12')
                        v-text-field(label='標籤' readonly='' v-model='add_dialog_data.label')
                    v-btn(color='primary' @click='e1 = 2')  &#x4E0B;&#x4E00;&#x6B65; 
                    v-btn(text='' @click='add_dialog = false')  &#x53D6;&#x6D88; 
                  v-stepper-content(step='2')
                    v-card.mb-12
                      ckeditor(v-model='add_dialog_data.product_detail')
                      ckeditor(v-model='add_dialog_data.size_fit')
                      ckeditor(v-model='add_dialog_data.look_after_me')
                      ckeditor(v-model='add_dialog_data.about_me')
                    v-btn.mr-1(color='primary' @click='e1 = 2')
                      | &#x4E0A;&#x4E00;&#x6B65;
                    v-btn(color='primary' @click='e1 = 3')  &#x4E0B;&#x4E00;&#x6B65; 
                    v-btn(text='' @click='add_dialog = false')  &#x53D6;&#x6D88; 
                  v-stepper-content(step='3')
                    v-card.mb-12
                      v-col(cols='12')
                        v-img(height='200' contain='' :src='add_dialog_data.img')
                      v-col(cols='12')
                        v-file-input(accept='image/png, image/jpeg' placeholder='請選擇一張照片' prepend-icon='mdi-camera' label='圖片:(限JPG,JPEG,PNG ,單一檔案最大1MB)' @change='onPictureUploadImageHandler')
                    v-btn.mr-1(color='primary' @click='e1 = 2')
                      | &#x4E0A;&#x4E00;&#x6B65;
                    v-btn(color='primary' @click='add_dialog = false')
                      | &#x5132;&#x5B58;
                    v-btn(text='' @click='add_dialog = false')  &#x53D6;&#x6D88; 
  // 庫存----------------------------------------------------------------------
  v-dialog(v-model='stock_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 &#x7DE8;&#x8F2F;&#x5EAB;&#x5B58;
      v-card-text
        v-container
          v-row
            v-col(cols='12')
              v-simple-table
                template(v-slot:default='')
                  thead
                    tr
                      th.text-left &#x984F;&#x8272;
                      th.text-left &#x5C3A;&#x5BF8;
                      th.text-left &#x6578;&#x91CF;
                  tbody
                    tr
                      td {{ stock_dialog_data.color }}
                      td {{ stock_dialog_data.size }}
                      td
                        v-text-field(v-model='stock_dialog_data.quantity')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='stock_dialog = false')
          | &#x53D6;&#x6D88;
        v-btn(color='blue darken-1' text='' @click='stock_dialog = false')
          | &#x5132;&#x5B58;
  // 編輯內文----------------------------------------------------------------------
  v-dialog(v-model='edit_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 &#x7DE8;&#x8F2F;&#x5167;&#x6587;
      v-card-text
        v-container
          v-row
            v-col(cols='12')
              v-stepper(v-model='e1')
                v-stepper-header
                  v-stepper-step(:complete='e1 > 1' step='1')
                    | &#x5546;&#x54C1;&#x8CC7;&#x6599;
                  v-divider
                  v-stepper-step(:complete='e1 > 2' step='2')
                    | &#x8A73;&#x7D30;&#x8CC7;&#x6599;
                  v-divider
                v-stepper-items
                  v-stepper-content(step='1')
                    v-card.mb-12
                      v-col(cols='12' lg='12')
                        v-select(v-model='edit_dialog_data.brand' :items='group_product_data.item' label='品牌')
                      v-col(cols='12' lg='12')
                        v-select(v-model='edit_dialog_data.first' :items='group_product_data.item' label='館別')
                      v-col(cols='12' lg='12')
                        v-select(v-model='edit_dialog_data.second' :items='group_product_data.item' label='第二層分類')
                      v-col(cols='12' lg='12')
                        v-select(v-model='edit_dialog_data.third' :items='group_product_data.item' label='第三層分類')
                      v-col(cols='12' lg='12')
                        v-text-field(label='商品型號' readonly='' v-model='edit_dialog_data.product_no')
                      v-col(cols='12' lg='12')
                        v-text-field(label='原始商品編號' readonly='' v-model='edit_dialog_data.no')
                      v-col(cols='12' lg='12')
                        v-text-field(label='原始售價' readonly='' v-model='edit_dialog_data.price')
                      v-col(cols='12' lg='12')
                        v-text-field(label='零售價' readonly='' v-model='edit_dialog_data.retail_price')
                      v-col(cols='12' lg='12')
                        v-text-field(label='商品名稱' readonly='' v-model='edit_dialog_data.product_name')
                      v-col(cols='12' lg='12')
                        v-text-field(label='標籤' readonly='' v-model='edit_dialog_data.label')
                    v-btn(color='primary' @click='e1 = 2')  &#x4E0B;&#x4E00;&#x6B65; 
                    v-btn(text='' @click='edit_dialog = false')  &#x53D6;&#x6D88; 
                  v-stepper-content(step='2')
                    v-card.mb-12
                      ckeditor(v-model='edit_dialog_data.product_detail')
                      ckeditor(v-model='edit_dialog_data.size_fit')
                      ckeditor(v-model='edit_dialog_data.look_after_me')
                      ckeditor(v-model='edit_dialog_data.about_me')
                    v-btn.mr-1(color='primary' @click='e1 = 1')
                      | &#x4E0A;&#x4E00;&#x6B65;
                    v-btn(color='primary' @click='edit_dialog = false')
                      | &#x5132;&#x5B58;
                    v-btn(text='' @click='edit_dialog = false')  &#x53D6;&#x6D88; 
  // 圖片----------------------------------------------------------------------
  v-dialog(v-model='picture_dialog2' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5  &#x7DE8;&#x8F2F;&#x5716;&#x7247; 
      v-card-text
        v-container
          v-row
            v-col(cols='12')
              v-img(height='200' contain='' :src='prcture_dialog_data.img')
            v-col(cols='12')
              v-file-input(accept='image/png, image/jpeg' placeholder='請選擇一張照片' prepend-icon='mdi-camera' label='圖片:(限JPG,JPEG,PNG ,單一檔案最大1MB)' @change='onPictureUploadImageHandler')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='picture_dialog2 = false')
          | &#x53D6;&#x6D88;
        v-btn(color='blue darken-1' text='' @click='picture_dialog2 = false')
          | &#x5132;&#x5B58;
  // 群組商品----------------------------------------------------------------------
  v-dialog(v-model='group_product_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5  &#x7FA4;&#x7D44;&#x5546;&#x54C1; 
      v-card-text
        v-container
          v-row
            v-col(cols='12')
              v-text-field(label='商品名稱' readonly='' v-model='group_product_data.name')
            v-col(cols='12')
              v-select(v-model='group_product_data.group' :items='group_product_data.item' label='群組商品')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='group_product_dialog = false')
          | &#x53D6;&#x6D88;
        v-btn(color='blue darken-1' text='' @click='group_product_dialog = false')
          | &#x5132;&#x5B58;

</template>



<script>


export default {
  components: {
    
  },
  data() {
    return {
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      e1: 1,
      is_loading_table_data: false,
      stock_dialog: false,
      stock_dialog_data: {},
      stock_data: [{ no: "", color: "", size: "", quantity: "" }],
      group_product_dialog: false,
      group_product_data: {
        name: "",
        item: [
          {
            text: "A0004/【淑女廚房 香蒜辣醬】兩罐組399（無辣不歡朝天椒大辣）",
          },
        ],
      },
      picture_dialog2: false,
      prcture_dialog_data: { img: "" },
      edit_dialog: false,
      edit_dialog_data: {
        brand: "",
        first: "",
        second: "",
        third: "",
        product_no: "",
        no: "",
        price: "",
        retail_price: "",
        product_name: "",
        label: "",
        product_detail: "",
        size_fit: "",
        look_after_me: "",
        about_me: "",
      },
      add_dialog:false,
      add_dialog_data:{
        brand: "",
        first: "",
        second: "",
        third: "",
        product_no: "",
        no: "",
        price: "",
        retail_price: "",
        product_name: "",
        label: "",
        product_detail: "",
        size_fit: "",
        look_after_me: "",
        about_me: "",
        img:""
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
          text: "商品編號",
          value: "product_no",
          width: "110px",
          align: "center",
          divider: true,
        },
        {
          text: "館別",
          value: "typ1",
          width: "110px",
          align: "center",
          divider: true,
        },
        {
          text: "第二層分類",
          value: "typ2",
          width: "120px",
          align: "center",
          divider: true,
        },
        {
          text: "第三層分類",
          value: "typ3",
          width: "120px",
          align: "center",
          divider: true,
        },
        {
          text: "商品圖",
          value: "product_img",
          width: "100px",
          align: "center",
          divider: true,
        },
        {
          text: "商品名稱",
          value: "product_name",
          width: "300px",
          align: "left",
          divider: true,
        },
        {
          text: "售價",
          value: "product_price",
          width: "80px",
          align: "center",
          divider: true,
        },
        {
          text: "特價",
          value: "product_bargain_price",
          width: "80px",
          align: "center",
          divider: true,
        },
        {
          text: "操作",
          value: "controls",
          width: "550px",
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
            product_no: "A0004",
            typ1: "辣椒系列",
            typ2: "辣椒醬",
            typ3: "招牌醬",
            product_img:
              "https://backetash.s3-ap-northeast-1.amazonaws.com/1621997179822-1-02.jpg",
            product_name:
              "【淑女廚房 香蒜辣醬】兩罐組399（經典口味剛剛好小辣）",
            product_price: "399",
            product_bargain_price: "399",
            stock_data: { no: "1", color: "無", size: "F", quantity: "99" },
            group_product: [
              {
                text: "A0004/【淑女廚房 香蒜辣醬】兩罐組399（無辣不歡朝天椒大辣）",
              },
              {
                text: "A0003/【淑女廚房 香蒜辣醬】兩罐組399（經典口味剛剛好小辣）",
              },
              {
                text: "A0002/【淑女廚房 香蒜辣醬】香蒜辣醬無辣不歡朝天椒大辣",
              },
              {
                text: "A0001/【淑女廚房 香蒜辣醬】超開胃辣椒 大蒜 紅油香辣 義式 美式 法式 韓式 中式 香酥炸物 拌飯醬 萬式ok",
              },
            ],
          });
        }
        _self.is_loading_table_data = false;
      }, 1000);
    },
    onStockClickHandler(item) {
      this.stock_dialog_data = item.stock_data;
      this.stock_dialog = true;
    },
     onAddClickHandler() {  
      this.add_dialog = true;
    },
    onEditeClickHandler(item) {
      console.log(item);
      // this.dialog_data = item;
      this.edit_dialog = true;
    },
    onPictureClickHandler(item) {
      this.prcture_dialog_data.img = item.product_img;
      this.picture_dialog2 = true;
    },
    onGroupProductClickHandler(item) {
      this.group_product_data.name = item.product_name;
      this.group_product_data.item = item.group_product;
      this.group_product_dialog = true;
    },
    onRefundClickHandler(item) {
      console.log(item);
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
