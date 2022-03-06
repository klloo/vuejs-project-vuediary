import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import store from '../store';

Vue.use(VueRouter);

// 로그인 되었는지 확인하는 함수
const checkLogin = () => (from, to, next) => {
  if (store.state.isLogin) next();
  else {
    Vue.$message('로그인 해주세요');
    next('/');
  }
};
const routes = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(from, to, next) {
      if (store.state.isLogin) {
        Vue.$message('이미 로그인 되었습니다.');
        next('/diary/list');
      } else next();
    },
  },
  {
    path: '/diary/list',
    name: 'DiaryList',
    component: () => import('@/components/DiaryList.vue'),
    beforeEnter: checkLogin(),
  },
  {
    path: '/diary/detail',
    name: 'DiaryDetail',
    component: () => import('@/components/Detail.vue'),
    beforeEnter: checkLogin(),
  },
  {
    path: '/diary/write',
    name: 'DiaryWrite',
    component: () => import('@/components/Write.vue'),
    beforeEnter: checkLogin(),
  },
  {
    path: '/diary/update',
    name: 'DiaryUpdate',
    component: () => import('@/components/Write.vue'),
    beforeEnter: checkLogin(),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
