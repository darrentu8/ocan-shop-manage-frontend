import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

import Home from "../views/home/Index.vue";
import Login from "../views/home/Login.vue";

import Order from "../views/order/Index.vue";
import Order_Order from "../views/order/Order.vue";

import Commodity from "../views/commodity/Index.vue";
import Commodity_Brand from "../views/commodity/Brand.vue";
import Commodity_Product from "../views/commodity/Product.vue";

import Classify from "../views/classify/Index.vue";
import Classify_First_Type from "../views/classify/TypeFirst.vue";
import Classify_Second_Type from "../views/classify/TypeSecond.vue";
import Classify_Third_Type from "../views/classify/TypeThird.vue";

import Classify_Color from "../views/classify/Color.vue";
import Classify_Size from "../views/classify/Size.vue";

import Activity from "../views/activity/Index.vue";
import Activity_Landing_Page from "../views/activity/LandingPage.vue";
import Activity_Banner from "../views/activity/Banner.vue";

import Discount from "../views/discount/Index.vue";
import Discount_Discount from "../views/discount/Discount.vue";

import Member from "../views/member/Index.vue";
import Member_Member from "../views/member/Member.vue";

import Logistics from "../views/logistics/Index.vue";
import Logistics_Logistics from "../views/logistics/Logistics.vue";

import Setting from "../views/setting/Index.vue";
import Setting_Info from "../views/setting/Info.vue";
import Setting_Logo from "../views/setting/Logo.vue";
import Setting_Email from "../views/setting/Email.vue";
import Setting_Key from "../views/setting/Key.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      auth: false,
      title: "首頁",
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      auth: false,
      title: "登入",
    },
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
    meta: {
      auth: true,
      title: "訂單管理",
    },
    children: [
      {
        auth: true,
        path: "order",
        component: Order_Order,
        title: "訂單管理",
      },
    ],
  },
  {
    path: "/commodity",
    name: "Commodity",
    component: Commodity,
    meta: {
      auth: true,
      title: "商品管理",
    },
    children: [
      {
        auth: true,
        path: "brand",
        component: Commodity_Brand,
        title: "品牌管理",
      },
      {
        auth: true,
        path: "product",
        component: Commodity_Product,
        title: "商品管理",
      },
    ],
  },
  {
    path: "/classify",
    name: "Classify",
    component: Classify,
    meta: {
      auth: true,
      title: "分類管理",
    },
    children: [
      {
        auth: true,
        path: "first_type",
        component: Classify_First_Type,
        title: "館別管理",
      },
      {
        auth: true,
        path: "second_type/:id",
        component: Classify_Second_Type,
        title: "第二層分類管理",
      },
      {
        auth: true,
        path: "third_type/:id",
        component: Classify_Third_Type,
        title: "第三層分類管理",
      },
      {
        auth: true,
        path: "color",
        component: Classify_Color,
        title: "顏色管理",
      },
      {
        auth: true,
        path: "size",
        component: Classify_Size,
        title: "尺寸管理",
      },
    ],
  },
  {
    path: "/activity",
    name: "Activity",
    component: Activity,
    meta: {
      auth: true,
      title: "活動管理",
    },
    children: [
      {
        auth: true,
        path: "landing_page",
        component: Activity_Landing_Page,
        title: "首頁活動管理",
      },
      {
        auth: true,
        path: "banner",
        component: Activity_Banner,
        title: "Banner管理",
      },
    ],
  },
  {
    path: "/discount",
    name: "Discount",
    component: Discount,
    meta: {
      auth: true,
      title: "折扣碼管理",
    },
    children: [
      {
        auth: true,
        path: "discount",
        component: Discount_Discount,
        title: "折扣碼管理",
      },
    ],
  },
  {
    path: "/member",
    name: "Member",
    component: Member,
    meta: {
      auth: true,
      title: "會員管理",
    },
    children: [
      {
        auth: false,
        path: "member",
        component: Member_Member,
        title: "會員管理",
      },
    ],
  },
  {
    path: "/logistics",
    name: "Logistics",
    component: Logistics,
    meta: {
      auth: true,
      title: "物流管理",
    },
    children: [
      {
        auth: true,
        path: "logistics",
        component: Logistics_Logistics,
        title: "物流管理",
      },
    ],
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
    meta: {
      auth: true,
      title: "網站管理",
    },
    children: [
      {
        auth: true,
        path: "info",
        component: Setting_Info,
        title: "資訊設定",
      },
      {
        auth: true,
        path: "logo",
        component: Setting_Logo,
        title: "Logo設定",
      },
      {
        auth: true,
        path: "email",
        component: Setting_Email,
        title: "信件內容設定",
      },
      {
        auth: true,
        path: "key",
        component: Setting_Key,
        title: "系統介接設定",
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function(to, from, next) {
  // 如果 router 轉跳的頁面需要驗證 auth: true
  //console.log("to=", to.fullPath, "| from=", from.fullPath);
  if (
    to.matched.some((record) => {
      //console.log(record.name, record.meta.auth);
      return record.meta.auth;
    })
  ) {
    // 如果沒有 token
    //console.log("token:", store.state.auth.userdata.token);
    if (!store.state.auth.userdata.token) {
      // 轉跳到 login page
      next({ path: "/login" });
    } else {
      next(); // 往下繼續執行
    }

   
  } else {
    next(); // 往下繼續執行
  }
});

export default router;
