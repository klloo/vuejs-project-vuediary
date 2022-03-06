<template>
  <el-row :gutter="20" class="header">
    <el-col :span="6">
      <h3 class="logo" @click="onClickLogo">vue-diary</h3>
    </el-col>
    <el-col :span="18" class="login-info">
      <p>{{username}}</p>
      <el-button class="logout-btn" @click="onClickLogoutBtn">Sign out</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HeaderComponent',
  computed: {
    username() {
      return this.$store.state.loginUser;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    onClickLogoutBtn() {
      this.$store.commit('logout');
      this.$router.push('/login');
    },
    onClickLogo() {
      if (this.$route.path !== '/diary/list') this.$router.push('/diary/list');
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  background: linear-gradient( to right, rgb(136, 169, 240), rgb(158, 147, 239) );
  padding: 0 20px 0 20px;
  color: white;
}
.login-info {
  text-align: right;
}
.logout-btn {
  margin-top: 10px;
  color: rgb(148, 159, 239);
}
.logo {
  font-weight: 100;
}
p {
  display: inline-block;
  margin-right: 10px;
}
</style>
