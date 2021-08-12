<template lang="pug">
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

export default {
  components: {},
  data() {
    return {
      props: ["dialog"],
      dialog: false,
      dialog_data: { receiver_county: "", receiver_district: "" },
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
      address_county_data: [{ text: "", value: "" }],
      address_district_data: [{ text: "", value: "" }],
      select_address_district: "",
    };
  },
  created() {
    this.address_county_data = Object.keys(zipCodeData).map((key) => ({
      text: key,
      value: key,
      district: zipCodeData[key],
    }));
  },
  methods: {
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
</style>