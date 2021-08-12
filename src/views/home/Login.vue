<template lang="pug">
  v-container.d-flex.justify-center.align-center(fluid='' style='height: 100vh')
    #particles-js
    v-card.pa-5(elevation='2' cols='3')
      h2 活力e商城管理平台
      v-text-field(ref='email' required='' label='電子信箱' v-model='email' :rules='[rules.required, rules.email]')
      v-text-field(required='' label='密碼' v-model='password' append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules='[rules.required]' :type="show1 ? 'text' : 'password'" v-on:keyup.enter='onEnter')
      br
      v-btn.mt-10(block='' color='blue' @click='login')  Sign in 
      p.text-center.copy_rights
        strong.text-caption.pa-10
          | Copyright {{ new Date().getFullYear() }} &copy; eforce Taiwan All rights
          | reserved.
</template>



<script>
export default {
  components: {},
  data() {
    return {
      email: "",
      password: "",
      show1: false,
      rules: {
        required(value) {
          return !!value || "必填.";
        },
        email(value) {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mial無效";
        },
      },
    };
  },
  created() {},
  mounted() {
    let _self = this;
    _self.$refs.email.focus();

    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "http://eforceshopv2backend-env.ap-northeast-1.elasticbeanstalk.com/js/login-bg.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  },
  methods: {
    onEnter: function () {
      this.login();
    },
    login() {
      let _self = this;
      this.$store
        .dispatch("auth/authenticate", {
          email: this.email,
          password: this.password,
        })
        .then(function () {
          _self.$router.push("/order/order").catch(() => {});
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  #particles-js {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
    .particles-js-canvas-el {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0px;
      left: 0px;
    }
  }
  .v-card {
    padding: 25px;
    text-align: center;
    width: 330px;
    .v-btn {
      background-color: #007bff !important;
      color: #fff;
    }
    .text-caption {
      font-size: 12px;
    }
    .copy_rights {
      margin-top: 15px;
    }
  }
}
</style>
