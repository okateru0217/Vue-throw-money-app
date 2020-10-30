import Vue from 'vue';
import Vuex from 'vuex';
import router from './router'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signUpData: {},
    signInData: {},
    userListName: '',
    wallet: '',
    otherUserData: ''
  },
  mutations: {
    setSignUpData(state, inputSignUpData) {
      state.signUpData = {...state.signUpData, ...inputSignUpData}
    },
    setSignInData(state, inputSignInData) {
      state.signInData = {...state.signInData, ...inputSignInData}
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
          success.docs.forEach((docs) => {
            const userNameWalletData = docs.data();
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
    }
  }
});