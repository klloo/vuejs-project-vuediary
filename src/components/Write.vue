<template>
  <template-component>
    <el-page-header class="page-header" @back="onClickCancelBtn" title="일기 작성">
      </el-page-header>
    <el-divider></el-divider>
    <div class="write-form">
      <el-form ref="writeForm" :model="writeForm" :rules="rules" label-width="120px">
        <el-form-item label="제목" prop="title">
            <el-input v-model="writeForm.title"/>
        </el-form-item>

        <el-form-item label="날씨">
          <el-radio-group v-model="writeForm.weather">
            <el-radio-button label="sunny">
              <i class="el-icon-sunny"/></el-radio-button>
            <el-radio-button class="menu-radio-btn" label="cloudy">
              <i class="el-icon-cloudy"/></el-radio-button>
            <el-radio-button class="menu-radio-btn" label="rain">
              <i class="el-icon-heavy-rain"/></el-radio-button>
            <el-radio-button class="menu-radio-btn" label="snow">
              <i class="el-icon-light-rain"/></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="기분">
          <el-select v-model="writeForm.feel">
            <el-option value="기쁨"></el-option>
            <el-option value="우울"></el-option>
            <el-option value="화남"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="내용" prop="content">
            <el-input :autosize="{ minRows: 20, maxRows: 20}"
            type="textarea" v-model="writeForm.content"/>
        </el-form-item>

        <el-form-item class="button-group">
          <el-button class="save-btn" @click="onClickSaveBtn('writeForm')">저장</el-button>
        <el-button @click="onClickCancelBtn">취소</el-button>
        </el-form-item>

      </el-form>
    </div>
  </template-component>
</template>

<script>
import TemplateComponent from './TemplateComponent.vue';

export default {
  components: { TemplateComponent },
  name: 'Write',
  data() {
    const validateInput = (rule, value, callback) => {
      const input = value.trim();
      if (input === '') {
        callback(new Error('내용을 입력하세요'));
      } else {
        callback();
      }
    };
    return {
      writeForm: {
        title: '',
        weather: 'sunny',
        feel: '기쁨',
        content: '',
      },
      rules: {
        title: [{ validator: validateInput, trigger: 'blur' }],
        content: [{ validator: validateInput, trigger: 'blur' }],
      },
    };
  },
  computed: {
    diary() {
      return this.$store.state.diaryList.get(this.loginUser)[this.idx];
    },
    loginUser() {
      return this.$store.state.loginUser;
    },
    idx() {
      return this.$store.state.diaryList.get(this.loginUser)
        .findIndex((item) => item.id === Number(this.id));
    },
    id() {
      return this.$route.query.id;
    },
  },
  methods: {
    onClickCancelBtn() {
      this.$router.push('/diary/list');
    },
    onClickSaveBtn(writeForm) {
      this.$refs[writeForm].validate((valid) => {
        if (valid) {
          // 저장하는 경우
          if (this.id === undefined) {
            const { loginUser } = this.$store.state;
            const today = new Date();
            const newDiary = {
              id: this.$store.state.diaryId,
              username: loginUser,
              writeDate: today,
              title: this.writeForm.title,
              content: this.writeForm.content,
              weather: this.writeForm.weather,
              feel: this.writeForm.feel,
            };
            this.$store.commit('addDiary', newDiary);
            this.$router.push('/diary/list');
            this.$message({
              message: '일기를 작성하였습니다.',
              type: 'success',
            });
          } else {
            // 수정하는 경우
            const updateDiary = {
              idx: this.idx,
              title: this.writeForm.title,
              content: this.writeForm.content,
              weather: this.writeForm.weather,
              feel: this.writeForm.feel,
            };
            this.$store.commit('updateDiary', updateDiary);
            this.$router.push({ name: 'DiaryDetail', query: { id: this.id } });
            this.$message('일기를 수정하였습니다.');
          }
        } else {
          return false;
        }
        return true;
      });
    },
    checkExist() {
      if (this.diary === undefined) {
        this.$message('존재하지 않는 게시물입니다.');
        this.$router.push('/diary/list');
      }
      const { loginUser } = this.$store.state;
      const writeUser = this.diary.username;
      if (loginUser !== writeUser) {
        this.$message('존재하지 않는 게시물입니다.');
        this.$router.push('/diary/list');
      }
    },
  },
  created() {
    if (this.id !== undefined) {
      this.writeForm.title = this.diary.title;
      this.writeForm.content = this.diary.content;
      this.writeForm.weather = this.diary.weather;
      this.writeForm.feel = this.diary.feel;
      this.checkExist();
    }
  },
  updated() {
    if (this.id !== undefined) {
      this.checkExist();
    }
  },
};
</script>

<style scoped lang="scss">
.write-form {
  margin-top: 50px;
  width: 80%;
}
.button-group {
  text-align: center;
}
.save-btn {
  background-color: rgb(148, 159, 239);
  color: white;
  border: none;
}
.page-header {
  margin-top: 20px;
}
</style>
