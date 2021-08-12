<template lang="pug">
v-container.pa-10
  v-row.pt-5.pb-5.ma-0
    h1 系統介接設定
  v-divider
  v-row.pb-5.pt-5.ma-0
    p
      | 以下為全站設定。提醒您，為即時取得金流服務，開通綠界金流後請盡速設定！
  v-card.px-5.mb-8.ma-0(elevation='2')
    v-row.pt-5.pb-5(align='center')
      v-col(cols='12' lg='12')
        h2 金流設定
        v-simple-table
          template(v-slot:default='')
            tbody
              tr
                td 商店代號
                td {{ payment.MerchantID }}
        br
        v-simple-table
          template(v-slot:default='')
            thead
              tr
                th.text-left 介接HashKey
                th.text-left 介接HashIV
            tbody
              tr
                td {{ payment.HashKey }}
                td {{ payment.HashIV }}
        v-btn.ma-2(color='primary' @click='onPaymentEditeClickHandler()')
          v-icon mdi-pencil
          | 編輯
  v-card.px-5(elevation='2')
    v-row.pt-5.pb-5(align='center')
      v-col(cols='12' lg='12')
        h2 物流設定
        v-simple-table
          template(v-slot:default='')
            tbody
              tr
                td 商店代號
                td {{ payment.MerchantID }}
        br
        v-simple-table
          template(v-slot:default='')
            thead
              tr
                th.text-left 介接HashKey
                th.text-left 介接HashIV
            tbody
              tr
                td {{ delivery.HashKey }}
                td {{ delivery.HashIV }}
        v-btn.ma-2(color='primary' @click='onCargoEditeClickHandler()')
          v-icon mdi-pencil
          | 編輯
  v-dialog(v-model='edit_payment_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 金流設定
      v-card-text
        v-container
          v-row
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='商店代號' v-model='payment.MerchantID')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='介接 HashKey' v-model='payment.HashKey')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='介接 HashIV' v-model='payment.HashIV')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='edit_payment_dialog = false')
          | 取消
        v-btn(color='blue darken-1' text='' @click='edit_payment_dialog = false')
          | 儲存
  v-dialog(v-model='edit_cargo_dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 物流設定
      v-card-text
        v-container
          v-row
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='商店代號' v-model='delivery.MerchantID')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='介接 HashKey' v-model='delivery.HashKey')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='介接 HashIV' v-model='delivery.HashIV')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='edit_cargo_dialog = false')
          | 取消
        v-btn(color='blue darken-1' text='' @click='edit_cargo_dialog = false')
          | 儲存

</template>



<script>
export default {
  components: {},
  data() {
    return {
      is_loading_table_data: false,
      edit_payment_dialog: false,
      edit_cargo_dialog: false,

      delivery: { HashIV: "3.14", HashKey: "random", MerchantID: "shopcenter" },
      payment: {
        HashIV: "v77hoKGq4kWxNNIS",
        HashKey: "5294y06JbISpM5x9",
        MerchantID: "2000132",
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
    onPaymentEditeClickHandler() {
      this.edit_payment_dialog = true;
    },
    onCargoEditeClickHandler() {
      this.edit_cargo_dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
