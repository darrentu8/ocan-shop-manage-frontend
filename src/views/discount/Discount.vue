<template>
  <v-container class="pa-10">
    <v-row class="pt-5 pb-5 ma-0">
      <h1>折扣碼管理</h1>
      <v-btn absolute top right depressed @click="onAddClickHandler" color="green">
        <v-icon elevation="1">mdi-plus</v-icon>新增
      </v-btn>
    </v-row>

    <v-divider></v-divider>

    <v-row class="pt-5 pb-5 ma-0" align="start">
      <v-btn elevation="1" class="ma-1">CSV</v-btn>

      <v-btn elevation="1" class="ma-1">Excel</v-btn>
      <v-btn elevation="1" class="ma-1">Print</v-btn>
    </v-row>

    <v-data-table
      :search="table_search"
      :loading="is_loading_table_data"
      :headers="table_headers"
      :items="table_data"
      :items-per-page="itemsPerPage"
      divider="true"
      class="elevation-1 pt-1"
    >
      <template v-slot:top>
        <v-text-field
          v-model="table_search"
          label="查詢"
          class="ma-4"
        ></v-text-field>
      </template>

      <template v-slot:item.controls="props">
        <v-btn
          class="ma-2"
          color="primary"
          @click="onEditeClickHandler(props.item)"
        >
          <v-icon>mdi-pencil</v-icon>
          <!-- 編輯 -->
        </v-btn>

        <v-btn
          class="ma-2"
          color="red"
          @click="onDeleteClickHandler(props.item)"
        >
          <v-icon>mdi-delete</v-icon>
          <!-- 退款 -->
        </v-btn>
      </template>

      <template v-slot:item.img="{ item }">
        <v-img width="100" contain :src="item.img"></v-img>
      </template>

      <template v-slot:item.fare="{ item }">
        <span>{{ item.fare.toLocaleString() }}</span>
      </template>
    </v-data-table>

    <v-dialog v-model="add_dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">首頁活動管理</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" lg="6">
                <v-text-field
                  label="折扣碼名稱"
                  v-model="add_dialog_data.name"
                ></v-text-field>
              </v-col>

              <v-col cols="12" lg="6">
                <v-text-field
                  label="折扣碼名稱序號"
                  v-model="add_dialog_data.serial_number"
                ></v-text-field>
              </v-col>

              <v-col cols="12" lg=6>
                <v-menu
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="add_dialog_data.range_date"
                      hint="YYYY/MM/DD ~ YYYY/MM/DD"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      label="訂單成立時間"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="search_range_date"
                    no-title
                    range
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" lg=6>
                <v-text-field
                  label="折扣金額"
                  v-model="add_dialog_data.amount"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  readonly
                  label="管理者"
                  v-model="add_dialog_data.manager"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="add_dialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="add_dialog = false">
            儲存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="edit_dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">編輯折扣碼</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" lg="6">
                <v-text-field
                  label="折扣碼名稱"
                  v-model="edit_dialog_data.name"
                ></v-text-field>
              </v-col>

              <v-col cols="12" lg="6">
                <v-text-field
                  label="折扣碼名稱序號"
                  v-model="edit_dialog_data.serial_number"
                ></v-text-field>
              </v-col>

              <v-col cols="12" lg=6>
                <v-menu
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="edit_dialog_data.range_date"
                      hint="YYYY/MM/DD ~ YYYY/MM/DD"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      label="訂單成立時間"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="search_range_date"
                    no-title
                    range
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" lg=6>
                <v-text-field
                  label="折扣金額"
                  v-model="edit_dialog_data.amount"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  readonly
                  label="管理者"
                  v-model="edit_dialog_data.manager"
                ></v-text-field>
              </v-col>

              
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="edit_dialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="edit_dialog = false">
            儲存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
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
        serial_number: "182483504",
        name: "夏日冰品第二件八折",                  
        type_item:[],
        range_date:["2021-08-01","2021-08-01"],
        date_start: "2021-07-26",
        date_end: "2021-08-01",
        amount: "30",
        manager: "Cathy/Dan",
        
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
          text: "折扣碼序號",
          value: "serial_number",
          width: "100px",
          align: "center",
          divider: true,
        },
        {
          text: "折扣碼名稱",
          value: "name",
          width: "250px",
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
          text: "折扣金額",
          value: "amount",
          width: "100px",
          align: "center",
          divider: true,
        },
        {
          text: "管理者",
          value: "manager",
          width: "60px",
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
            serial_number: "182483504",
            name: "夏日冰品第二件八折",            
            range_date:["2021-08-01","2021-08-01"],
            date_start: "2021-07-26",
            date_end: "2021-08-01",            
            amount: "30",
            manager: "Cathy/Dan",
            
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
