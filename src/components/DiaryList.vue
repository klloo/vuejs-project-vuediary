<template>
  <template-component>
    <!-- 상단 버튼, 검색 창-->
    <el-row class="header">
      <el-col :span="12" :offset="0">
        <!-- 메뉴 선택 라디오 그룹-->
        <el-radio-group v-model="menu">
          <el-radio-button label="list">
            <i class="el-icon-tickets"/></el-radio-button>
          <el-radio-button class="menu-radio-btn" label="grid">
            <i class="el-icon-menu"/></el-radio-button>
        </el-radio-group>
         <!-- 글 작성 버튼-->
        <el-button class="write-btn" type="primary" icon="el-icon-edit"
        circle @click="onClickWriteBtn"></el-button>
      </el-col>

      <!-- 검색 영역 -->
      <el-col :span="6" :offset="12" class="search">
        <el-input
          placeholder="검색"
          v-model="inputKeyword" @keypress.native.enter="onClickFindDiary" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>

    <!-- 다이어리 목록 -->
    <div class="list">
      <!-- 안내 문구 -->
      <div class="info" v-show="keyword !== ''">
          {{searchList.length}} 개의 검색 결과
      </div>
      <div class="info" v-show="diaryList.length === 0" @click="onClickWriteBtn">
          첫 글을 작성해보세요
      </div>

      <!-- 타임라인 형태 -->
       <el-timeline v-show="menu==='list'">
        <el-timeline-item
          v-for="diary in showDiaryList" :key="diary.id"
          :timestamp="returnDate(diary.writeDate)" placement="top">
          <div class="diary-item" @mouseover="setCurMouse(diary.id)" @mouseleave="setCurMouse(-1)"
          @click="onClickItem">
            <el-card :class="{ selected: curMouse==diary.id }">
              <!-- 삭제 버튼 -->
              <el-button class="del-btn" type="info" icon="el-icon-error"
                v-show="curMouse==diary.id"
                @click="onClickDeleteBtn"></el-button>
              <!-- 일기 정보 -->
              <div>
                <h3>{{diary.title}}</h3>
                <p class="date-info">
                  {{returnDate(diary.writeDate)}} {{returnTime(diary.writeDate)}} 작성
                </p>
              </div>

            </el-card>
          </div>
        </el-timeline-item>
       </el-timeline>

      <!-- grid 형태 -->
      <div v-show="menu==='grid'">
        <el-row>
        <el-col :span="8"  v-for="diary in showDiaryList" :key="diary.id">
          <div class="diary-grid-item" @mouseover="setCurMouse(diary.id)"
          @mouseleave="setCurMouse(-1)">
            <el-card :class="{ selected: curMouse==diary.id }" :body-style="{ padding: '20px' }">
                <!-- 삭제 버튼 -->
                <el-button class="del-btn" type="info" icon="el-icon-error"
                    v-show="curMouse==diary.id"
                    @click="onClickDeleteBtn"></el-button>
                <!-- 일기 정보 -->
                <div class="diary-item" @click="onClickItem">
                  <p class="date-info">
                    {{returnDate(diary.writeDate)}}
                  </p>
                  <h3>{{diary.title}}</h3>
                  <p>{{diary.content}}</p>
                </div>

              </el-card>
          </div>
        </el-col>
      </el-row>
      </div>
    </div>

  </template-component>
</template>

<script>
import TemplateComponent from './TemplateComponent.vue';

export default {
  components: { TemplateComponent },
  name: 'DiaryList',
  data() {
    return {
      menu: 'list',
      // input에 입력중인 키워드
      inputKeyword: '',
      // 검색중인 키워드
      keyword: '',
      searchList: [],
      curMouse: -1,
    };
  },
  computed: {
    diaryList() {
      const { loginUser } = this.$store.state;
      if (this.$store.state.diaryList.has(loginUser)) {
        return this.$store.state.diaryList.get(loginUser);
      }
      return [];
    },
    showDiaryList() {
      if (this.keyword === '') {
        return this.diaryList;
      }
      // 검색중이면 검색목록 보여주기
      return this.searchList;
    },
  },
  watch: {
    inputKeyword() {
      if (this.inputKeyword === '') this.onClickResetBtn();
    },
  },
  methods: {
    onClickFindDiary() {
      this.inputKeyword = this.inputKeyword.trim();
      if (this.inputKeyword === '') {
        this.$message('검색할 단어를 입력하세요');
        return;
      }
      this.keyword = this.inputKeyword;
      this.findDiary();
    },
    findDiary() {
      this.searchList = this.diaryList.filter((diary) => diary.title.includes(this.keyword));
      if (this.searchList.length === 0) {
        this.$message('검색 결과가 없습니다.');
        this.onClickResetBtn();
      }
    },
    onClickResetBtn() {
      this.inputKeyword = '';
      this.keyword = '';
      this.searchList = [];
    },
    onClickItem() {
      this.$router.push({ name: 'DiaryDetail', query: { id: this.curMouse } });
    },
    onClickDeleteBtn(e) {
      console.log(e);
      e.stopPropagation();
      this.$store.dispatch('deleteDiary', this.curMouse);
      // 검색 결과에서 삭제했을 경우 검색목록 갱신
      if (this.searchList.length !== 0) this.findDiary();
      else this.searchList = [];
      this.$message('삭제하였습니다.');
    },
    onClickWriteBtn() {
      this.$router.push('/diary/write');
    },
    setCurMouse(diaryId) {
      this.curMouse = diaryId;
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
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  margin: 10px;
}
.write-btn {
  background-color: rgb(148, 159, 239);
  border: none;
  margin-left: 10px;
}
.search{
  text-align: right;
}
.list {
   padding-top: 30px;
   padding-right: 30px;
   height: 700px;
   overflow: auto;
}
  .list::-webkit-scrollbar {
    width: 10px;
  }
  .list::-webkit-scrollbar-thumb {
    background-color: rgb(180, 180, 180);
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  .list::-webkit-scrollbar-track {
    background-color: rgb(218, 218, 218);
    border-radius: 10px;
  }
.info {
  margin-left: 30px;
  margin-bottom: 40px;
  margin-top: 10px;
  cursor: pointer;
}
.del-btn {
  float: right;
  color: grey;
  background: none;
  border: none;
}
.diary-item {
  cursor: pointer;
}
.selected {
  background-color: rgb(245, 246, 252);
}
.date-info {
  color: rgb(148, 159, 239);
}
.diary-grid-item {
  margin: 10px;
  cursor: pointer;
}
</style>
