import Vue from 'vue';
import Router from 'vue-router';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserList from './components/UserList';

Vue.use(Router);

export default new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: SignIn
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/userlist',
      component: UserList
    }
  ]
});