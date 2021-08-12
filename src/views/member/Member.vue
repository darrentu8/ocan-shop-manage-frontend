<template lang="pug">
v-container.pa-10
  v-row.pt-5.pb-5.ma-0
    h1 會員管理
  v-divider
  v-row.pt-5.pb-5.ma-0(align='center')
    v-col(cols='12' lg='3')
      v-menu(:close-on-content-click='false' transition='scale-transition' offset-y='' max-width='290px' min-width='auto')
        template(v-slot:activator='{ on, attrs }')
          v-text-field(v-model='dateRangeText' hint='YYYY/MM/DD ~ YYYY/MM/DD' persistent-hint='' prepend-icon='mdi-calendar' v-bind='attrs' label='會員成立時間' v-on='on')
        v-date-picker(v-model='search_range_date' no-title='' range='')
    v-col(cols='12' lg='3')
      v-btn(elevation='1')
        v-icon mdi-magnify
  v-row.pt-5.pb-5(align='start')
    v-btn.ma-1(elevation='1') CSV
    v-btn.ma-1(elevation='1') Excel
    v-btn.ma-1(elevation='1') Print
  v-data-table.elevation-1.pt-1(:search='table_search' :loading='is_loading_table_data' :headers='table_headers' :items='table_data' :items-per-page='itemsPerPage' divider='true')
    template(v-slot:top='')
      v-text-field.ma-4(v-model='table_search' label='查詢')
    template(v-slot:item.controls='props')
      v-btn.ma-2(color='yellow' @click='onRefundClickHandler(props.item)')
        | 加入黑名單
      v-btn.ma-2(color='primary' @click='onEditeClickHandler(props.item)')
        v-icon mdi-pencil
        | 編輯
    template(v-slot:item.fare='{ item }')
      span {{ item.fare.toLocaleString() }}
  v-dialog(v-model='dialog' persistent='' max-width='800px')
    v-card
      v-card-title
        span.text-h5 會員管理
      v-card-text
        v-container
          v-row
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='帳號' readonly='' disabled='' v-model='dialog_data.account')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='會員名稱' readonly='' disabled='' v-model='getName')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='姓' v-model='dialog_data.last_name')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='名' v-model='dialog_data.last_name')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='收件人-姓' v-model='dialog_data.last_name')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='收件人-名' v-model='dialog_data.first_name')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='收件人-聯絡電話' v-model='dialog_data.recipient_phone_no')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='收件人' v-model='dialog_data.recipient')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='收件人-地址1' readonly='' disabled='' v-model='dialog_data.address1')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='收件人-地址2' readonly='' disabled='' v-model='dialog_data.address2')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='收件人-城市' v-model='dialog_data.address')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='收件人-縣' readonly='' disabled='' v-model='dialog_data.address')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='收件人-郵遞區號' readonly='' disabled='' v-model='dialog_data.zipcode')
            v-col(cols='12' sm='6' md='4')
              v-text-field(label='收件人-生日' readonly='' disabled='' v-model='dialog_data.birthday')
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='dialog = false')
          | 取消
        v-btn(color='blue darken-1' text='' @click='dialog = false')
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
      search_range_date: [],
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
          text: "會員編號",
          value: "member_no",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "登入帳號",
          value: "account",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "姓氏",
          value: "last_name",
          width: "80px",
          align: "center",
          divider: true,
        },
        {
          text: "名字",
          value: "first_name",
          width: "80px",
          align: "center",
          divider: true,
        },
        {
          text: "生日",
          value: "birthday",
          width: "130px",
          align: "center",
          divider: true,
        },
        {
          text: "手機",
          value: "phone_no",
          width: "130px",
          align: "center",
          divider: true,
        },
        {
          text: "收件人",
          value: "recipient",
          width: "130px",
          align: "center",
          divider: true,
        },
        {
          text: "收件人地址",
          value: "recipient_address",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "興趣偏好",
          value: "interest",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "歷史訂單",
          value: "order_history",
          width: "200px",
          align: "center",
          divider: true,
        },
        {
          text: "前一次登入時間",
          value: "login_time",
          width: "130px",
          align: "center",
          divider: true,
        },
        {
          text: "加入日期",
          value: "joint_date",
          width: "130px",
          align: "center",
          divider: true,
        },
        {
          text: "操作",
          value: "controls",
          width: "400px",
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
    dateRangeText() {
      return this.search_range_date.join(" ~ ");
    },
    getName() {
      return this.dialog_data.last_name + this.dialog_data.last_name;
    },
  },
  methods: {
    loadData() {
      let _self = this;
      setTimeout(function () {
        for (let index = 0; index < 1000; index++) {
          _self.table_data.push({
            no: index + 1,
            member_no: "20210726000008",
            account: "eeit10203@gmail.com",
            last_name: "杜",
            first_name: "宇",
            birthday: "1900-01-01",
            phone_no: "09XX-XXX-XXX",
            recipient: "-",
            recipient_address: "-",
            interest: "-",
            order_history: [
              "8267018998681600",
              "8267183320240128",
              "8267232100519936",
            ],
            login_time: "2021-07-26",
            joint_date: "2021-07-26",
          });
        }
        _self.is_loading_table_data = false;
      }, 1000);
    },
    onEditeClickHandler(item) {
      this.dialog_data = item;
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
