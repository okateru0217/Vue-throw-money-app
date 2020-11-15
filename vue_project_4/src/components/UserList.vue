<template>
  <div class="item_container">
    <img src="../assets/logo.png" alt="vue_logo">
    <div class="item_user_information">
      <div class="item_user-name">
        <p>{{ userListName }}さんようこそ！！</p>
      </div><!-- item_user-name -->
      <div class="item_user-option">
        <p>残高：{{ wallet }}</p>  
        <button @click="logOut">ログアウト</button>
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
          </tr>
        </thead>
        <tbody>
          <tr
          v-for="otherUserData in $store.state.otherUserData"
          :key="otherUserData.id">
            <td>{{ otherUserData.name }}</td>
            <td><button @click="lookWallet(otherUserData)">Walletを見る</button></td>
            <td><button @click="sendWalletWindow(otherUserData)">送る</button></td>
          </tr>
        </tbody>
      </table>
    </div><!-- item_user-list_table -->
    <small>Copyright ©2020 okazawa Inc All right reserved</small>
    <!-- 他ユーザーの残高表示モーダルウィンドウ -->
    <transition>
      <div class="item_overlay" @click="noneWallet" v-show="showWalletDisplay">
        <div class="item_other_user" v-show="showWalletDisplay">
          <p>{{ otherUserName }}さんの残高</p>
          <p>{{ otherUserWallet }}</p>
          <div class="item_close">
            <button @click="noneWallet">close</button>
          </div><!-- item_close --> 
        </div><!-- item_other_user -->
      </div><!-- item_overlay -->
    </transition>
    <transition>
      <div class="item_overlay" v-show="sendWalletDisplay">
        <div class="item_send_wallet" v-show="sendWalletDisplay">
          <p>あなたの残高：{{ wallet }}</p>
          <p>送る金額</p>
          <input type="text" v-model="$store.state.sendInputWallet">
          <div class="item_send">
            <button @click="noneWallet">close</button>
            <button class="item_send_btn" @click="sendWallet">送信</button>
          </div><!-- item_btn -->
        </div><!-- item_send_wallet -->
      </div><!-- item_overlay -->
    </transition>
  </div><!-- item_container -->
</template>

<script>
export default {
  data() {
    return {
      // 「Walletを見る」ボタン押下時のユーザーネーム
      otherUserName: '',
      // 「Walletを見る」ボタン押下時のWallet残高
      otherUserWallet: '',
      // 「Walletを見る」ボタン押下時のモーダルウィンドウ出現の切り替え 
      showWalletDisplay: false,
      // 「送る」ボタン押下時のモーダルウィンドウ出現の切り替え
      sendWalletDisplay: false,
    }
  },
  methods: {
    // ログアウト処理
    logOut() {
      this.$store.dispatch('logOut');
    },
    // モーダルウィンドウを表示させ、ログイン者以外のデータを表示
    lookWallet(otherUserData) {
      this.otherUserName = otherUserData.name;
      this.otherUserWallet = otherUserData.wallet;
      this.showWalletDisplay = true;
    },
    // 「送る」ボタン押下時、モーダルウィンドウ出現
    // 「otherUserData」をVuexへコミット
    sendWalletWindow(otherUserData) {
      this.sendWalletDisplay = true;
      this.$store.commit('sendWalletWindow', otherUserData);
    },
    // 他ユーザーにWalletを送るための処理
    sendWallet() {
      this.$store.dispatch('sendWallet');
    },
    // モーダルウィンドウを非表示にする
    noneWallet() {
      this.showWalletDisplay = false;
      this.sendWalletDisplay = false;
    }
  },
  computed: {
    userListName() {
      return this.$store.state.userListName;
    },
    wallet() {
      return this.$store.state.wallet;
    },
    sendInputWallet: {
      get() {
        return this.$store.state.sendInputWallet;
      },
      set(value) {
        this.$store.commit('setSendInputWallet', value);
      }
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

.item_user-option button {
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

.item_user-option button:hover {
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

.item_user-list_table td:nth-child(2) button{
  text-decoration: none;
  padding: 0 10px;
  font-size: 1.1rem;
  color: #ffffff;
  background-color: #18759E;
  border: 1px solid #18759E;
}

.item_user-list_table td:nth-child(3) button{
  text-decoration: none;
  padding: 0 10px;
  font-size: 1.1rem;
  color: #ffffff;
  background-color: #18759E;
  border: 1px solid #18759E;
}

.item_other_user {
  z-index: 2;
  position: relative;
  top: 130px;
  width: 130px;
  margin: 0 auto;
  background-color: #ffffff;
}

.item_other_user button {
  text-decoration: none;
}

.item_close {
  text-align: right;
  background-color: #cccccc;
}

.item_close button {
  margin: 10px 0;
  margin-right: 10px;
  padding: 5px 5px;
  text-decoration: none;
  color: #ffffff;
  background-color: #ff0000;
  border: 1px solid #ff0000;
}

.item_send_wallet {
  z-index: 2;
  position: relative;
  top: 130px;
  width: 240px;
  margin: 0 auto;
  background-color: #ffffff;
}

.item_send_wallet input {
  height: 20px;
  margin-bottom: 10px;
}

.item_send {
  display: flex;
  justify-content: space-around;
  background-color: #cccccc;
}

.item_send button {
  margin: 10px 0;
  padding: 5px 10px;
  text-decoration: none;
  color: #ffffff;
  background-color: #ff0000;
  border: 1px solid #ff0000;
}

.item_send_btn {
  padding: 0px 12px;
}

.small {
  display: block;
  margin-top: 50px;
}

.item_overlay {
  z-index:1;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-enter {
  opacity: 0;
  transform: translateY(-5px);
}
.v-enter-active {
  transition: opacity .5s ease-out, transform .5s ease-out;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: opacity .5s ease-out;
}
</style>