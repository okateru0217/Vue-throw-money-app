import Vue from 'vue';
import Vuex from 'vuex';
import router from './router'
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signUpData: {},
    signInData: {},
    userListName: ''
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
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.state.signInData.email, this.state.signInData.password)
      .then(success => {
        console.log(success)
        router.push('/userlist');
        this.state.userListName = success.user.displayName;
      })
      .catch(error => {
        console.log(error);
        alert('メールアドレスまたはパスワードが間違っています');
      })
    }
  }
});