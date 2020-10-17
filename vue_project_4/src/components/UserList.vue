<template>
  <div class="item_container">
    <img src="../assets/logo.png" alt="vue_logo">
    <div class="item_user_information">
      <div class="item_user-name">
        <p>{{ userListName }}さんようこそ！！</p>
      </div><!-- item_user-name -->
      <div class="item_user-option">
        <p>残高：</p>  
        <router-link to="/">ログアウト</router-link>
      </div><!-- item_user-option -->
    </div><!-- item_user_information -->
    <div class="item_user-list_ttl">
      <h1>ユーザー一覧</h1>
    </div><!-- item_user-list_ttl -->
    <div class="item_user-list_table">
      <table>
        <thead>
          <tr>
            <th>ユーザー名</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div><!-- item_user-list_table -->
    <small>Copyright ©2020 okazawa Inc All right reserved</small>
    <div class="routerlink">
      <router-link to="/">SignIn</router-link>
      <router-link to="/signup">SignUp</router-link>
    </div><!-- routerlink -->
  </div><!-- item_container -->
</template>

<script>
export default {
  computed: {
    userListName() {
      return this.$store.state.userListName;
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

.item_user_information {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.item_user-option {
  display: flex;
}

.item_user-option p {
  margin-right: 20px;
}

.item_user-option a {
  height: 35px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 10px;
  font-size: 1.1rem;
  color: #18759E;
  background-color: #ffffff;
  border: 1px solid #18759E;
  transition: all 0.1s ease;
}

.item_user-option a:hover {
  color: #ffffff;
  background-color: #18759E ;
}

.item_user-list_table {
  width: 50%;
  margin: 0 auto;
}

.item_user-list_table th:nth-child(1) {
  width: 350px;
  text-align: left;
}

.item_user-list_table td:nth-child(1) {
  text-align: left;
}

.small {
  display: block;
  margin-top: 50px;
}

.routerlink {
  margin-top: 100px;
}
</style>