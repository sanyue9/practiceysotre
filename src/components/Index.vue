<template>
  <div id="index">
      <div class="index-banner">
        梦厅预定系统
        <el-button class="login-btn" v-if="!isLogin" @click="toLoginPage" plain>登陆</el-button>
        <el-button class="login-btn" v-if="isLogin" @click="logout" plain>退出</el-button>
      </div>
      <div class="content-container">
        <div class="step">
          <span class="description">选择日期: </span>
          <el-date-picker
            v-model="selectDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <el-divider></el-divider>
        <div class="step">
          <span class="description">选择梦厅: </span>
          <el-button type="success" @click="selectRoom(1)" plain>梦一厅</el-button>
          <el-button type="success" @click="selectRoom(2)" plain>梦二厅</el-button>
        </div>
        <el-divider></el-divider>
        <div class="step">
          <span class="description">选择场次: </span>
          <div class="slice-container">
            <el-button 
              type="default"
              v-for="item in number" 
              :key="item"
              plain
            >
              18:31-23:30<br>
              剩余:120
            </el-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import isLogin from '@/utils/isLogin.js'
import getCurrentDate from '@/utils/getCurrentDateByDate.js'

import api from '@/config/api.js'
export default {
  name: 'Index',
  components: {
  },
  data: function () {
    return {
      isLogin: isLogin(),
      selectDate: getCurrentDate(new Date()),
      roomId: null,
      number:{}
    }
  },
 
  methods: {
    toLoginPage: function() {
      this.$router.push({path: '/login'});
    },
    logout: function() {
      Cookies.remove('webpy_session_id');
      this.isLogin = false;
      this.toLoginPage();
    },
    getRoomByDate: function() {
      this.$axios.get(api.query,{
        params: {
          dates: this.selectDate,
          room: this.roomId
        }
      }).then(
        (data) => {
          console.log("=========================");
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      )
    },
  
  getSlice: function() {
      this.$axios.get(api.query,{
        params: {
        }
      }).then(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      )
    },

    selectRoom: function(roomId){
      this.roomId = roomId;
      this.getRoomByDate()
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-banner{
    height: 10vh;
    width: 100vw;
    color: white;
    line-height: 10vh;
    font-size: large;
    font-weight: bold;
    text-align: center;
    background-color: #409EFF
  }
  .login-btn{
    float: right;
    margin-top: 2vh;
    margin-right: 2vh;
  }
  .step{
    margin-top: 2vh;
    display: flex;
    align-items: center;
  }
  .description{
    display: inline-block;
    width: 12vh;
    margin-left: 2vh;
    margin-right: 2vh;
  }
  .slice-container{
    margin-left: 2vh;
    width: 50vh;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  button{
    margin: 0 1vh 1vh 0 !important;
  }
</style>
