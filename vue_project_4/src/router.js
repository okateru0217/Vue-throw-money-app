import Vue from 'vue';
import Router from 'vue-router';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserList from './components/UserList';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Router);

const router = new Router ({
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
      component: UserList,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next()
      } else {
        next({ path: '/' })
      }
    })
  } else {
    next()
  }
});

export default router