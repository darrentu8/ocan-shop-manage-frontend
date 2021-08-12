<template lang="pug">
v-container.pa-10
  v-row.pt-5.pb-5.ma-0
    h1 尺寸管理
    v-btn(absolute='' top='' right='' depressed='' color='green')
      v-icon(elevation='1' @click='onAddClickHandler') mdi-plus
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
        | 編輯
      v-btn.ma-2(color='red' @click='onNoBeSoldClickHandler(props.item)')
        v-icon mdi-credit-card-refund
        | 下架
    template(v-slot:item.fare='{ item }')
      span {{ item.fare.toLocaleString() }}
  v-dialog(v-model='add_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 訂單管理
      v-card-text
        v-container
          v-row
            v-col(cols='12' sm='6' md='4')
              v-select(v-model='add_dialog_data.order_status' :items='add_dialog_item' label='品牌')
            v-col(cols='12' sm='6' md='4')
              v-select(v-model='add_dialog_data.order_status' :items='add_dialog_item' label='分類1')
            v-col(cols='12' sm='6' md='4')
              v-select(v-model='add_dialog_data.order_status' :items='add_dialog_item' label='分類2')
            v-col(cols='12' sm='6' md='4')
              v-select(v-model='add_dialog_data.order_status' :items='add_dialog_item' label='分類3')
            v-col(cols='12' sm='6' md='4')
              v-select(v-model='add_dialog_data.order_status' :items='add_dialog_item' label='顏色')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='尺寸' v-model='add_dialog_data.receiver_address')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='add_dialog = false')
          | 取消
        v-btn(color='blue darken-1' text='' @click='add_dialog = false')
          | 儲存
  v-dialog(v-model='edit_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 訂單管理
      v-card-text
        v-container
          v-row
            v-col(cols='12' sm='6' md='4')
              v-select(v-model='edit_dialog_data.order_status' :items='edit_dialog_item' label='品牌')
            v-col(cols='12' sm='6' md='4')
              v-select(v-model='edit_dialog_data.order_status' :items='edit_dialog_item' label='分類1')
            v-col(cols='12' sm='6' md='4')
              v-select(v-model='edit_dialog_data.order_status' :items='edit_dialog_item' label='分類2')
            v-col(cols='12' sm='6' md='4')
              v-select(v-model='edit_dialog_data.order_status' :items='edit_dialog_item' label='分類3')
            v-col(cols='12' sm='6' md='4')
              v-select(v-model='edit_dialog_data.order_status' :items='edit_dialog_item' label='顏色')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='尺寸' v-model='edit_dialog_data.receiver_address')
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
      add_dialog: false,
      add_dialog_data: { },
      add_dialog_item:[{type:"aaa",value:"aaa"}],
      edit_dialog: false,
      edit_dialog_data: {  },
      edit_dialog_item:[{type:"aaa",value:"aaa"}],
      search_range_date: [],      
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
          value: "brand_name",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "館別",
          value: "first",
          width: "200px",
          align: "center",
          divider: true,
        },      
        {
          text: "第二層分類",
          value: "second",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "第三層分",
          value: "third",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "顏色",
          value: "color",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "尺寸",
          value: "size",
          width: "200px",
          align: "center",
          divider: true,
        },        
        {
          text: "操作",
          value: "controls",
          width: "350px",
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
  computed: {    
  },
  methods: {
    loadData() {
      let _self = this;
      setTimeout(function () {
        for (let index = 0; index < 1000; index++) {
          _self.table_data.push({
            no: index + 1,
            brand_name: "淑女廚房",
            first: "辣椒系列",
            second: "辣椒醬",
            third: "招牌醬",
            color: "無",
            size: "F"
          });
        }
        _self.is_loading_table_data = false;
      }, 1000);
    },
    onAddClickHandler() {            
      this.add_dialog = true;
    },  
    onEditeClickHandler() {      
      //this.dialog_data = item;
      this.edit_dialog = true;
    },    
    onNoBeSoldClickHandler(item) {
      console.log(item);
    }    
  },
};
</script>

<style lang="scss" scoped>

</style>
