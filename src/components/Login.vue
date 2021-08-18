<template>
  <div class="login-container">
       <el-avatar
       class="login-banner"
       shape="square"
       :size="80"
       :src="url">
       </el-avatar>
       <div class="login-input">
        <!-- 输入用户名密码 -->
         <el-input
           v-model="stuNumber"
           prefix-icon="el-icon-user"
           placeholder="请输入学号"
           clearable>
         </el-input>
         <el-input placeholder="请输入密码"
         v-model="stuPassword"
         prefix-icon="el-icon-lock"
         show-password>
         </el-input>
       </div>

        <el-button
        type="primary"
        class="login-button"
        @click="login"
        >登陆</el-button>
  </div>
</template>

<script>
import api from '@/config/api.js'
export default {
  name: 'Login',
  data: function () {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      stuNumber: '2019051613018',
      stuPassword: 'wyh201512'
    }
  },
  methods: {
    // 校验用户名密码
    login: function () {
      if (!this.validate()) {
        this.$message.error('用户名或者密码不正确')
        return
      }
      // 请求接口
      this.$axios.get(api.login,{
        params: {
          username: this.stuNumber,
          password: this.stuPassword
        }
      }).then((data) => {
        if(data.data.code == 20000){
          this.$message({
            message: '登陆成功，自动跳转到首页',
            type: 'success'
          });
          this.navigatorToIndex();
        }else{
          this.$message.error('登陆失败，请检查用户名或密码');
        }
      }, (err) => {
        this.$message.error('登陆失败，请检查用户名或密码');
      })
    },

    validate: function () {
      // 校验学号:十三位纯数字组成
      let stuReg = /\d{13}/
      let stuNumberTest = stuReg.test(this.stuNumber)
      // 校验密码:密码不为空
      let stuPasswordTest = this.stuPassword.length > 0
      if (stuNumberTest && stuPasswordTest) {
        return true
      } else {
        return false
      }
    },

    navigatorToIndex: function () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped="scoped">

  .login-title{
    height: 5vh;
    width: 100vw;
    color: #FFFFFF;
    text-align: center;
    background-color: #130c0e;
    line-height: 5vh;
    font-weight: bold;
  }

  .login-container{
    margin: 0 auto;
    text-align: center;
  }

  .login-banner{
    margin-top: 5vh;
    border-radius: 50%;
  }

  .login-input{
    margin-top: 5vh;
    margin-left: 5vw;
    margin-right: 5vw;
  }

  .login-button{
    margin-top: 1vh;
    width: 90vw;
  }
</style>
