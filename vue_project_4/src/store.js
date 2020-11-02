import Vue from 'vue';
import Vuex from 'vuex';
import router from './router'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // サインアップ時の登録データ
    signUpData: {},
    // サインイン時の登録データ
    signInData: {},
    // 「UserList」コンポーネントで表示される、ログイン者の名前
    userListName: '',
    // 「UserList」コンポーネントで表示される、ログイン者のWallet残高
    wallet: '',
    // 自分以外の登録ユーザーを一覧表示させるための連想配列
    otherUserData: '',
    // 送信するWallet金額
    sendInputWallet: '',
    // 「送信」ボタン押下時のウォレットを受け取るユーザー
    reseiveWalletUser: '',
    // 「送信」ボタン押下時のウォレットの受け取る金額
    reseiveWallet: ''
  },
  mutations: {
    setSignUpData(state, inputSignUpData) {
      state.signUpData = {...state.signUpData, ...inputSignUpData}
    },
    setSignInData(state, inputSignInData) {
      state.signInData = {...state.signInData, ...inputSignInData}
    },
    // 送信するWallet金額をstateへセット
    setSendInputWallet(state, sendInputWallet) {
      state.sendInputWallet = sendInputWallet
    },
    // 「otherUserData」をコミット
    sendWalletWindow(state, otherUserData) {
      state.reseiveWalletUser = otherUserData.name;
      state.reseiveWallet = otherUserData.wallet;
    }
  },
  actions: {
    // サインアップ処理
    signUp() {
      const userName = this.state.signUpData.name;
      firebase.auth().createUserWithEmailAndPassword(this.state.signUpData.email, this.state.signUpData.password)
      .then(success => {
        success.user.updateProfile({
          displayName: userName
        })
        .then(() => {
          console.log(success);
          this.state.userListName = success.user.displayName;
        })
      })
      .catch(error => {
        console.log(error);
      })
    },
    // サインイン処理
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.state.signInData.email, this.state.signInData.password)
      .then(success => {
        console.log(success)
        router.push('/userlist');
        this.state.userListName = success.user.displayName;
        // UserListコンポーネントにユーザー情報を表示させるための処理
        firebase.firestore().collection('wallet')
        .get()
        .then(success => {
          const userNameWalletArr = [];
          success.docs.forEach((docs, index) => {
            const userNameWalletData = docs.data();
            userNameWalletData.id = index;
            userNameWalletArr.push(userNameWalletData);
          })
          // ログインユーザーに応じて、wallet残高をCloud Firestoreから参照するための処理
          const findWallet = userNameWalletArr.find(item => item.name === this.state.userListName);
          this.state.wallet = findWallet.wallet;
          // 自分以外の登録ユーザーを一覧表示させるための処理
          const otherUser = userNameWalletArr.filter(item => item.name !== this.state.userListName);
          this.state.otherUserData = otherUser;
        })
      })
      .catch(error => {
        console.log(error);
        alert('メールアドレスまたはパスワードが間違っています');
      })
    },
    // ログアウト処理
    logOut() {
      firebase.auth().signOut()
      .then(() => {
        router.push('/');
      })
      .catch(err => {
        console.log(err);
      })
    },
    // 他ユーザーにWalletを送るための処理
    sendWallet() {
      // Wallet送金金額が所持金を超えている場合にアラートを出し、処理を中断
      if (this.state.sendInputWallet > this.state.wallet) {
        alert('Walletが足りません');
        return
      // Wallet送金欄に入力が無いまま「送信」ボタンを押下した場合にアラートを出し、処理を中断
      } else if (this.state.sendInputWallet === '') {
        alert('Walletを入力して下さい');
        return
      // 入力値が1以上の整数値でない場合アラートを出し、処理を中断
      } else if (this.state.sendInputWallet.match(/^([1-9]\d*|0)$/) === null || this.state.sendInputWallet <= 0) {
        alert('1以上の整数値を入力して下さい');
        return
      }
      firebase.firestore().collection('wallet').doc(this.state.userListName)
      .update({
        // ログイン者がログイン者以外に送った金額分を差し引き、即座に反映させる
        wallet: this.state.wallet = this.state.wallet - this.state.sendInputWallet
      })
      // Walletを受け取る人を「otherUserData」から絞り込む
      const reseiveWalletUserExtract = this.state.otherUserData.filter(item => item.name === this.state.reseiveWalletUser);
      firebase.firestore().collection('wallet').doc(this.state.reseiveWalletUser)
      .update({
        // ログイン者以外がログイン者から受け取った金額分を足し、即座に反映させる
        wallet: reseiveWalletUserExtract[0].wallet = parseInt(this.state.reseiveWallet) + parseInt(this.state.sendInputWallet)
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
});