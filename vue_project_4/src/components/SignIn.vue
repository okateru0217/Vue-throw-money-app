<template>
  <div class="item_container">
    <img src="../assets/logo.png" alt="vue_logo">
    <div class="item_title">
      <h1>ログイン画面</h1>
    </div><!-- item_title -->
    <div class="item_input">
      <div class="item_mail">
        <label for="email">メールアドレス</label>
        <input 
        type="text"
        placeholder="E-mail"
        v-model="$store.state.signInData.email">
      </div><!-- item_mail -->
      <div class="item_password">
        <label for="password">パスワード</label>
        <input type="text"
        placeholder="Password"
        v-model="$store.state.signInData.password">
      </div><!-- item_password -->
    </div><!-- item_input -->
      <div class="item_btn">
      <div class="item_login-btn">
        <button @click="signIn">ログイン</button>
      </div><!-- item_btn -->
      <div class="router_signup">
        <router-link to="/signup">新規登録はこちら</router-link>
      </div><!-- router_signup -->
    </div><!-- item_btn -->
    <small>Copyright ©2020 okazawa Inc All right reserved</small>
  </div><!-- item_container -->
</template>

<script>
export default {
  data() {
    return {
      signInData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    setSignInData() {
      this.$store.commit('setSignInData', this.signInData);
    },
    signIn() {
      this.$store.dispatch('signIn');
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

.item_password {
  margin-left: 14px
}

.item_password label {
  margin-right: 15px;
}

.item_btn {
  height: 100px;
}

.item_login-btn button {
  padding: 5px 10px;
  font-size: 1.1rem;
  color: #18759E;
  background-color: #ffffff;
  border: 1px solid #18759E;
  transition: all 0.1s ease;
}

.item_login-btn button:hover {
  color: #ffffff;
  background-color: #18759E ;
}

.router_signup a {
  text-decoration: none;
  color: #18759E;
}
</style>