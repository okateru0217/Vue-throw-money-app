import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signUpData: {},
    userListName: ''
  },
  mutations: {
    setSignUpData(state, inputSignUpData) {
      state.signUpData = {...state.signUpData, ...inputSignUpData}
    },
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
    }
  }
});