import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: '',
    isLogin: false,
    diaryId: 4,
    diaryList: new Map(
      [
        ['홍길동', [{
          id: 0,
          username: '홍길동',
          writeDate: 'Mon Aug 30 2021 20:59:23 GMT+0900 (한국 표준시)',
          title: '집안일을 했다',
          content: '청소하고 빨래하고 화장실 청소했다.',
          weather: 'sunny',
          feel: '기쁨',
        }, {
          id: 1,
          username: '홍길동',
          writeDate: 'Mon Aug 30 2021 20:59:23 GMT+0900 (한국 표준시)',
          title: '산책을 갔다',
          content: '불광천을 걸었다.',
          weather: 'sunny',
          feel: '기쁨',
        }],
        ],
        ['as', [{
          id: 2,
          username: 'as',
          writeDate: 'Mon Aug 30 2021 20:59:23 GMT+0900 (한국 표준시)',
          title: '일기1as',
          content: '일기2as',
          weather: 'sunny',
          feel: '기쁨',
        }, {
          id: 3,
          username: 'as',
          writeDate: 'Mon Aug 30 2021 20:59:23 GMT+0900 (한국 표준시)',
          title: '일기1as',
          content: '일기2as',
          weather: 'sunny',
          feel: '기쁨',
        }],
        ],
      ],
    ),
  },
  mutations: {
    login(state, username) {
      state.loginUser = username;
      state.isLogin = true;
    },
    logout(state) {
      state.loginUser = '';
      state.isLogin = false;
    },
    removeDiary(state, idx) {
      state.diaryList.get(state.loginUser).splice(idx, 1);
    },
    addDiary(state, newDiary) {
      if (!state.diaryList.has(newDiary.username)) {
        state.diaryList.set(newDiary.username, []);
      }
      state.diaryId += 1;
      state.diaryList.get(state.loginUser).push(newDiary);
    },
    updateDiary(state, updateDiary) {
      const {
        idx, title, content, weather, feel,
      } = updateDiary;
      state.diaryList.get(state.loginUser)[idx].title = title;
      state.diaryList.get(state.loginUser)[idx].content = content;
      state.diaryList.get(state.loginUser)[idx].weather = weather;
      state.diaryList.get(state.loginUser)[idx].feel = feel;
    },
  },
  actions: {
    deleteDiary(store, deleteId) {
      const idx = store.state.diaryList.get(store.state.loginUser)
        .findIndex((item) => item.id === Number(deleteId));
      if (idx > -1) { store.commit('removeDiary', idx); }
    },
  },
  modules: {
  },
});
