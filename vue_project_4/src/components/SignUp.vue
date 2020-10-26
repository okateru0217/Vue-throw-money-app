<template>
  <div class="item_container">
    <img src="../assets/logo.png" alt="vue_logo">
    <div class="item_title">
      <h1>新規登録画面</h1>
    </div><!-- item_title -->
    <div class="item_input">
      <div class="item_name">
        <label for="name">ユーザー名</label>
        <input 
        type="text"
        placeholder="userName"
        v-model="$store.state.signUpData.name">
      </div><!-- item_name -->
      <div class="item_mail">
        <label for="email">メールアドレス</label>
        <input 
        type="text"
        placeholder="E-mail"
        v-model="$store.state.signUpData.email">
      </div><!-- item_mail -->
      <div class="item_password">
        <label for="password">パスワード</label>
        <input type="text"
        placeholder="Password"
        v-model="$store.state.signUpData.password">
      </div><!-- item_password -->
    </div><!-- item_input -->
      <div class="item_btn">
      <div class="item_login-btn">
        <router-link to="/userlist" @click.native="signUp">新規登録</router-link>
      </div><!-- item_btn -->
      <div class="router_signup">
        <router-link to="/">ログインはこちら</router-link>
      </div><!-- router_signup -->
    </div><!-- item_btn -->
    <small>Copyright ©2020 okazawa Inc All right reserved</small>
    <div class="router_userlist">
      <router-link to="/userlist">UserList</router-link>
    </div><!-- router_userlist -->
  </div><!-- item_container -->
</template>

<script>
export default {
  data() {
    return {
      signUpData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    setSignUpData() {
      this.$store.commit('setSignUpData', this.signUpData);
    },
    signUp() {
      this.$store.dispatch('signUp');
    }
  }
}
</script>

<style scoped>
.item_container {
  max-width: 1130px;
  margin: 0 auto;
  text-align: center;
}

.item_input {
  height: 80px;
}

.item_name {
  margin-left: 14px;
}

.item_name label {
  margin-right: 15px;
}

.item_password {
  margin-left: 14px
}

.item_password label {
  margin-right: 15px;
}

.item_btn {
  height: 100px;
}

.item_login-btn {
  margin: 15px 0;
}

.item_login-btn a {
  padding: 10px 10px;
  text-decoration: none;
  font-size: 1.1rem;
  color: #18759E;
  background-color: #ffffff;
  border: 1px solid #18759E;
  transition: all 0.1s ease;
}

.item_login-btn a:hover {
  color: #ffffff;
  background-color: #18759E ;
}

.router_signup a {
  text-decoration: none;
  color: #18759E;
}
</style>