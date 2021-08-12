<template lang="pug">
 v-container.pa-10
  v-row.pt-5.pb-5.ma-0
    h1 訂單管理
    v-btn(absolute='' top='' right='' depressed='' color='green')
      v-icon(elevation='1') mdi-export
      | 匯出檢貨單
  v-divider
  v-row.pt-5.pb-5.ma-0(align='center')
    v-col(cols='12' lg='3')
      v-menu(:close-on-content-click='false' transition='scale-transition' offset-y='' max-width='290px' min-width='auto')
        template(v-slot:activator='{ on, attrs }')
          v-text-field(v-model='dateRangeText' hint='YYYY/MM/DD ~ YYYY/MM/DD' persistent-hint='' prepend-icon='mdi-calendar' v-bind='attrs' label='訂單成立時間' v-on='on')
        v-date-picker(v-model='search_range_date' no-title='' range='')
    v-col(cols='12' lg='2')
      v-select(v-model='cargo_status' :items='cargo_status_itmes' label='貨品狀況')
    v-col(cols='12' lg='2')
      v-select(v-model='order_status' :items='order_status_itmes' label='訂單狀態')
    v-col(cols='12' lg='2')
      v-select(v-model='payment_status' :items='payment_status_items' label='貨款狀態:')
    v-col(cols='12' lg='3')
      v-btn(elevation='1')
        v-icon mdi-magnify
  v-row.pt-5.pb-5.ma-0(align='start')
    v-btn.ma-1(elevation='1') CSV
    v-btn.ma-1(elevation='1') Excel
    v-btn.ma-1(elevation='1') Print
    a.inline-block(href='http://eforceshopv2backend-env.ap-northeast-1.elasticbeanstalk.com/order/hints_order' target='_blank') 訂單管理表單欄位說明
  v-data-table.elevation-1.pt-1(:search='table_search' :loading='is_loading_table_data' :headers='table_headers' :items='table_data' :items-per-page='itemsPerPage' divider='true')
    template(v-slot:top='')
      v-text-field.ma-4(v-model='table_search' label='查詢')
    template(v-slot:item.controls='props')
      v-btn.ma-2(color='primary' @click='onEditeClickHandler(props.item)')
        v-icon mdi-pencil
        // 編輯
      v-btn.ma-2(color='yellow' @click='onRefundClickHandler(props.item)')
        v-icon mdi-credit-card-refund
        // 退款
      v-btn.ma-2(color='green' @click='onExportClickHandler(props.item)')
        v-icon mdi-export
        // 匯出詳細資料
    template(v-slot:item.fare='{ item }')
      span {{ item.fare.toLocaleString() }}
  orderedit(dialog='dialog')
    v-dialog(v-model='dialog' persistent='' max-width='800px')
      v-card
        v-card-title
          span.text-h5 編輯訂單
        v-card-text
          v-container
            v-row
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='訂單編號' readonly='' disabled='' v-model='dialog_data.order_no')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='訂單成立時間' readonly='' disabled='' v-model='dialog_data.order_date')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='會員編號' readonly='' disabled='' v-model='dialog_data.member_no')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='付款方式' readonly='' disabled='' v-model='dialog_data.payment')
              v-col(cols='12' sm='6' md='4')
                v-select(v-model='dialog_data.order_status' :items='order_status_itmes' label='訂單狀態')
              v-col(cols='12' sm='6' md='4')
                v-select(v-model='dialog_data.payment_status' :items='payment_status_items' label='付款狀態')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='購買日期' readonly='' disabled='' v-model='dialog_data.buy_date')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='訂單金額' readonly='' disabled='' v-model='dialog_data.order_amount')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='運費' readonly='' disabled='' v-model='dialog_data.fare')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='折扣碼' readonly='' disabled='' v-model='dialog_data.discount_code')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='折扣' readonly='' disabled='' v-model='dialog_data.discount')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='折扣後金額' readonly='' disabled='' v-model='dialog_data.discount_amount')
              v-col(cols='12')
                v-textarea(label='備註' :value='dialog_data.remark')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='物流方式' readonly='' disabled='' v-model='dialog_data.shipping_methods')
              v-col(cols='12' sm='6' md='4')
                v-select(v-model='dialog_data.shipping_company' :items='shipping_company_items' label='物流廠商')
              v-col(cols='12' sm='6' md='4')
                v-select(v-model='dialog_data.cargo_status' :items='cargo_status_itmes' label='貨品狀態')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='物流編號' v-model='dialog_data.shopping_no')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='預計出貨日期' readonly='' disabled='' v-model='dialog_data.estimated_shipping_date')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='出貨日期' readonly='' disabled='' v-model='dialog_data.shipping_date')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='收貨人 姓名' v-model='dialog_data.receiver_name')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='收貨人 聯絡電話' v-model='dialog_data.receiver_tel')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='收貨人 郵遞區號' readonly='' disabled='' v-model='dialog_data.receiver_address_code')
              v-col(cols='12' sm='6' md='4')
                v-select(v-model='dialog_data.receiver_county' :items='address_county_data' @change='countyChange' label='收貨人 縣市')
              v-col(cols='12' sm='6' md='4')
                v-select(v-model='dialog_data.receiver_district' :items='address_district_data' @change='districtChange' label='收貨人 區/鄉')
              v-col(cols='12' sm='6' md='4')
                v-text-field(label='收貨人 地址' v-model='dialog_data.receiver_address')
              v-col(cols='12')
                v-simple-table
                  template(v-slot:default='')
                    thead
                      tr
                        th.text-left 商品編號
                        th.text-left 商品名稱
                        th.text-left 顏色
                        th.text-left 尺寸
                        th.text-left 數量
                        th.text-left 零售價
                    tbody
                      tr(v-for='products in dialog_data.products' :key='products.no')
                        td {{ products.no }}
                        td {{ products.name }}
                        td {{ products.color }}
                        td {{ products.size }}
                        td {{ products.quantity }}
                        td {{ products.price }}
        v-card-actions
          v-spacer
          v-btn(color='blue darken-1' text='' @click='dialog = false')  取消 
          v-btn(color='blue darken-1' text='' @click='dialog = false')  儲存

</template>



<script>
import { zipCodeData } from "@/utils/twzipcode_data.js";
import OrderEdit from "@/components/order/OrderEdit.vue";

export default {
  components: {
    OrderEdit,
  },
  data() {
    return {
      is_loading_table_data: false,
      dialog: false,
      dialog_data: { receiver_county: "", receiver_district: "" },
      search_range_date: [],
      cargo_status_itmes: [
        { value: "not_shipped", text: "未出貨" },
        { value: "ready_shipped", text: "待出貨" },
        { value: "shopped", text: "已出貨" },
        { value: "receiving", text: "收貨中" },
        { value: "returning", text: "退貨中" },
        { value: "2030", text: "商品已送至物流中心" },
        { value: "2063", text: "商品已送達門市" },
        { value: "2067", text: "買家成功取件" },
        { value: "2074", text: "買家七天未取件" },
      ],
      order_status_itmes: [
        { value: "establish", text: "訂單成立" },
        { value: "canceling", text: "訂單取消中" },
        { value: "cancelled", text: "訂單已取消" },
        { value: "done", text: "訂單已完成" },
        { value: "returning", text: "訂單退貨中" },
        { value: "returned", text: "訂單已退貨" },
      ],
      payment_status_items: [
        { value: "unpaid", text: "未付款" },
        { value: "already_paid", text: "已付款" },
        { value: "ready_return_paid", text: "待退款" },
        { value: "return_paiding", text: "退款中" },
        { value: "paided", text: "已退款" },
      ],
      shipping_company_items: [
        { value: "cat", text: "黑貓宅急便" },
        { value: "bird", text: "大嘴鳥宅配通" },
      ],
      cargo_status: "",
      order_status: "",
      payment_status: "",
      itemsPerPage: 10,
      table_headers: [
        {
          text: "編號",
          value: "no",
          width: "80px",
          align: "center",
          divider: true,
        },
        {
          text: "訂單編號",
          value: "order_no",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "會員編號",
          value: "member_no",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "付款方式",
          value: "payment",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "物流方式",
          value: "shipping_methods",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "物流廠商",
          value: "shipping_company",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "貨品狀態",
          value: "cargo_status",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "訂單狀態",
          value: "order_status",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "付款狀態",
          value: "payment_status",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "訂單成立時間",
          value: "order_date",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "購買日期",
          value: "buy_date",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "預計出貨日期",
          value: "estimated_shipping_date",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "出貨日期",
          value: "shipping_date",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "訂單金額",
          value: "order_amount",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "運費",
          value: "fare",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "折扣碼",
          value: "discount_code",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "折扣",
          value: "discount",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "折扣後金額",
          value: "discount_amount",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "備註",
          value: "remark",
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
      table_search:"",
      table_data: [],
      address_county_data: [{ text: "", value: "" }],
      address_district_data: [{ text: "", value: "" }],
      select_address_district: "",
    };
  },
  created() {
    this.is_loading_table_data = true;
    this.loadData();
    this.address_county_data = Object.keys(zipCodeData).map((key) => ({
      text: key,
      value: key,
      district: zipCodeData[key],
    }));

    
  },
  computed: {
    dateRangeText() {
      return this.search_range_date.join(" ~ ");
    },
  },
  methods: {
    loadData() {
      let _self = this;
      setTimeout(function () {
        for (let index = 0; index < 1000; index++) {
          _self.table_data.push({
            no: index + 1,
            order_no: "8287062860533760",
            member_no: "20210723000003",
            payment: "-",
            shipping_methods: "宅配",
            shipping_company: "cat",
            cargo_status: "not_shipped",
            order_status: "establish",
            payment_status: "already_paid",
            order_date: "2021-07-23",
            buy_date: "-",
            estimated_shipping_date: "-",
            shipping_date: "-",
            order_amount: "399",
            fare: "9999999",
            discount_code: "8287062860533760",
            discount: "0",
            discount_amount: "499",
            remark: "一二三四五六七八九十",
            controls: "",
            shopping_no: "物流編號123465",
            receiver_name: "george",
            receiver_tel: "09xxx-246-700",
            receiver_address_code: "0",
            receiver_county: "新北市",
            receiver_district: "淡水區",
            receiver_address: "水源里北新路二段21號",
            products: [
              {
                no: "A0001",
                name: "【淑女廚房 香蒜辣醬】兩罐組399（經典口味剛剛好小辣）",
                color: "無",
                size: "F",
                quantity: "1",
                price: "399",
              },
              {
                no: "A0002",
                name: "【淑女廚房 香蒜辣醬】兩罐組399（經典口味剛剛好小辣）",
                color: "無",
                size: "F",
                quantity: "1",
                price: "399",
              },
              {
                no: "A0003",
                name: "【淑女廚房 香蒜辣醬】兩罐組399（經典口味剛剛好小辣）",
                color: "無",
                size: "F",
                quantity: "1",
                price: "399",
              },
            ],
          });
        }
        _self.is_loading_table_data = false;
      }, 1000);
    },
    onEditeClickHandler(item) {
      this.countyChange(item.receiver_county);
      this.districtChange(item.receiver_district);
      this.dialog_data = item;
      this.dialog = true;
    },
    onRefundClickHandler(item) {
      console.log(item);
    },
    onExportClickHandler(item) {
      console.log(item);
    },
    countyChange(item) {
      let _self = this;

      _self.address_district_data = [];
      for (let index = 0; index < _self.address_county_data.length; index++) {
        let district_object = _self.address_county_data[index];

        if (district_object["value"] === item) {

          _self.address_district_data ==
            Object.keys(district_object["district"]).map(function (key) {
              _self.address_district_data.push({
                text: key,
                value: key,
                zipCode: district_object["district"][key],
              });
            });
        }
      }

      
    },
    districtChange(item) {
      let _self = this;

      for (let index = 0; index < _self.address_district_data.length; index++) {
        if (_self.address_district_data[index]["value"] === item) {
          this.dialog_data.receiver_address_code =
            _self.address_district_data[index]["zipCode"];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  line-height: 48px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
