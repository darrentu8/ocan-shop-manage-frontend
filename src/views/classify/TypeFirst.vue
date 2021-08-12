<template lang="pug">
v-container.pa-10
  v-row.pt-5.pb-5.ma-0
    h1 館別管理
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
      v-btn.ma-2(color='red' @click='onNoBeSoldClickHandler(props.item)')
        v-icon mdi-credit-card-refund
        | 下架
      v-btn.ma-2(color='primary' @click='onEditeClickHandler(props.item)')
        v-icon mdi-pencil
        | 編輯
      v-btn.ma-2(color='yellow' @click='onSecondClickHandler(props.item)')
        v-icon mdi-credit-card-refund
        | 新增第二層分類
    template(v-slot:item.fare='{ item }')
      span {{ item.fare.toLocaleString() }}
  v-dialog(v-model='edit_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 分類名稱
      v-card-text
        v-container
          v-row
            v-col(cols='12')
              v-text-field(label='名稱' v-model='edit_dialog_data.name')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='edit_dialog = false')
          | 取消
        v-btn(color='blue darken-1' text='' @click='edit_dialog = false')
          | 儲存
  v-dialog(v-model='add_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 分類名稱
      v-card-text
        v-container
          v-row
            v-col(cols='12')
              v-text-field(label='名稱' v-model='add_dialog_data.name')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='add_dialog = false')
          | 取消
        v-btn(color='blue darken-1' text='' @click='add_dialog = false')
          | 儲存

</template>



<script>

export default {
  components: {},
  data() {
    return {
      is_loading_table_data: false,
      add_dialog: false,
      add_dialog_data: { name:"" },
      edit_dialog: false,
      edit_dialog_data: { name:"" },
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
          text: "分類名稱",
          value: "first",
          width: "150px",
          align: "center",
          divider: true,
        },        
        {
          text: "操作",
          value: "controls",
          width: "450px",
          sortable: false,
          align: "center",
        },
      ],
      table_data: []      
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
            first: "豆乳醬"
          });
        }
        _self.is_loading_table_data = false;
      }, 1000);
    },
    onAddClickHandler() { 
      this.add_dialog = true;
    },
    onNoBeSoldClickHandler(){
      
    },
    onEditeClickHandler() {      
      
      this.edit_dialog = true;
    },
    onSecondClickHandler(item){
      console.log(item);
      this.$router.push("/classify/second_type/"+item.no);
    }

    
  },
};
</script>

<style lang="scss" scoped>

</style>
