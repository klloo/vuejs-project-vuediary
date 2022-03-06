<template>
  <template-component>
    <div class="diary-detail">
      <el-row :gutter="20">
        <!--  다이어리 제목 작성날짜 -->
        <el-col :span="12" class="diary-detail-title">
        <div class="date-info">
          {{returnDate(diary.writeDate)}}
          {{returnTime(diary.writeDate)}}
        </div>
        <h2 class="diary-title">{{diary.title}}</h2>
        <span class="diary-info">(<i :class="weatherIcon"/> {{diary.feel}})</span>
      </el-col>

      <!-- 버튼들 -->
      <el-col :span="12" class="buttons">
        <el-button icon="el-icon-back" @click="onClickListBtn" circle></el-button>
        <el-button class="edit-btn" icon="el-icon-edit" @click="onClickUpdateBtn" circle>
        </el-button>
        <el-button icon="el-icon-delete" type="info" @click="onClickDeleteBtn" circle></el-button>
      </el-col>
      </el-row>

      <el-divider></el-divider>

      <!-- 내용 -->
      <p class="content">{{diary.content}}</p>
    </div>
  </template-component>
</template>

<script>
import TemplateComponent from './TemplateComponent.vue';

export default {
  components: { TemplateComponent },
  name: 'Detail',
  computed: {
    diary() {
      const { loginUser } = this.$store.state;
      const idx = this.$store.state.diaryList.get(loginUser)
        .findIndex((item) => item.id === Number(this.id));
      return this.$store.state.diaryList.get(loginUser)[idx];
    },
    id() {
      return this.$route.query.id;
    },
    weatherIcon() {
      const { weather } = this.diary;
      if (weather === 'sunny') return 'el-icon-sunny';
      if (weather === 'cloudy') return 'el-icon-cloudy';
      if (weather === 'rain') return 'el-icon-heavy-rain';
      if (weather === 'snow') return 'el-icon-light-rain';
      return '';
    },
  },
  methods: {
    onClickListBtn() {
      this.$router.push('/diary/list');
    },
    onClickDeleteBtn() {
      this.$store.dispatch('deleteDiary', this.id);
      this.$router.push('/diary/list');
      this.$message('삭제하였습니다.');
    },
    onClickUpdateBtn() {
      this.$router.push({ name: 'DiaryUpdate', query: { id: this.id } });
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
    returnDate(writeDate) {
      const date = new Date(writeDate);
      const year = date.getFullYear();
      const month = (`0${date.getMonth() + 1}`).slice(-2);
      const day = (`0${date.getDate()}`).slice(-2);
      const dateString = `${year}년 ${month}월 ${day}일`;
      return dateString;
    },
    returnTime(writeDate) {
      const date = new Date(writeDate);
      const hours = (`0${date.getHours()}`).slice(-2);
      const minutes = (`0${date.getMinutes()}`).slice(-2);
      return `${hours}시 ${minutes}분`;
    },
  },
  created() {
    this.checkExist();
  },
  updated() {
    this.checkExist();
  },
};
</script>

<style scoped lang="scss">
.diary-detail {
  margin: 50px;
  width: 80%;
}
.diary-info {
  color: grey;
  margin-left: 10px;
}
.date-info {
  color: grey;
  margin-bottom: 10px;
}
.content {
  white-space:pre;
}
.edit-btn {
  background-color: rgb(148, 159, 239);
  color: white;
  border: none;
}
.diary-title {
  font-weight: 100;
}
.buttons {
  text-align: right;
}
h2 {
  display: inline;
}
</style>
