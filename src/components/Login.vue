<template>
  <div class="wrapper">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
          <h3>vue-diary</h3>
          <el-form-item prop="username">
            <el-input @keypress.native.enter="onClickLoginBtn('loginForm')"
            v-model="loginForm.username" placeholder="사용자 이름"/>
          </el-form-item>
          <el-form-item>
            <el-button @click="onClickLoginBtn('loginForm')" class="login-btn">Sign In</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      const username = value.trim();
      if (username === '') {
        callback(new Error('사용자 이름을 입력하세요'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
      },
    };
  },
  methods: {
    onClickLoginBtn(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.$store.commit('login', this.loginForm.username);
          this.$router.push('/diary/list');
          this.$message(`${this.loginForm.username}님 반갑습니다.`);
        } else {
          return false;
        }
        return true;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  background: linear-gradient( to right, rgb(136, 169, 240), rgb(158, 147, 239) );
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
}
.login-form {
    color: rgb(148, 159, 239);
    background-color: white;
    border-radius: 4px;
    padding: 30px 5% 50px 5%;
    margin: 5px;
    text-align: center;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
  color: white;
  background-color: rgb(148, 159, 239);
}
</style>
