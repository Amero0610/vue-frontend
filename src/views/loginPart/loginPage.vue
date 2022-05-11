<!--
 * @Author: Amero
 * @Date: 2022-02-06 22:49:01
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-11 20:55:05
 * @FilePath: \vue-frontend\src\views\loginPart\loginPage.vue
-->
<template>
  <div>
    <!-- <router-view></router-view> -->

    <div :class="{ container: true, 'sign-up-mode': pageStatus }">
      <div class="forms-container">
        <div class="signin-signup">
          <form action=""
                class="sign-in-form">
            <h2 class="title">Login</h2>
            <el-tooltip class="item"
                        effect="dark"
                        placement="right"
                        transition="el-zoom-in-center"
                        :hide-after="2590">
              <div slot="content">
                <p v-for="item in usernameTipList"
                   :key="item"
                   class="TipText">
                  <i class="myicon-dot mytestclass"></i>
                  {{ item }}
                </p>
              </div>
              <div class="input-field">
                <i class="myicon-user"></i>

                <el-input type="text"
                          placeholder="Username"
                          v-model.trim="loginData.login_username"></el-input>
              </div>
            </el-tooltip>
            <el-tooltip class="item"
                        effect="dark"
                        placement="right"
                        transition="el-zoom-in-center"
                        :hide-after="2590">
              <div slot="content">
                <p v-for="item in passwordTipList"
                   :key="item"
                   class="TipText">
                  <i class="myicon-dot mytestclass"></i> {{ item }}
                </p>
              </div>
              <div class="input-field">
                <i class="myicon-lock"></i>

                <el-input type="password"
                          placeholder="Password"
                          show-password
                          v-model.trim="loginData.login_password"></el-input>
              </div>
            </el-tooltip>
            <el-button type="primary"
                       :round="false"
                       :disabled="isloginBtnDisabled"
                       class="signLoginBtn"
                       @click="login_Btn"
                       v-loading.fullscreen.lock="fullscreenLoading">
              Login
            </el-button>
          </form>
          <form class="sign-up-form">
            <h2 class="title">Sign up</h2>
            <el-tooltip class="item"
                        effect="dark"
                        placement="right"
                        transition="el-zoom-in-center"
                        :hide-after="2590">
              <div slot="content">
                <p v-for="item in usernameTipList"
                   :key="item"
                   class="TipText">
                  <i class="myicon-dot"></i> {{ item }}
                </p>
              </div>
              <div class="input-field">
                <i class="myicon-user"></i>
                <el-input type="text"
                          placeholder="Username"
                          v-model.trim="singUpData.signUp_username"></el-input>
              </div>
            </el-tooltip>
            <div class="input-field">
              <i class="myicon-user"></i>
              <el-input type="text"
                        placeholder="StudentNumber"
                        v-model.trim="singUpData.signUp_stuNumber"></el-input>
            </div>
            <el-tooltip class="item"
                        effect="dark"
                        placement="right"
                        transition="el-zoom-in-center"
                        :hide-after="2590">
              <div slot="content">
                <p v-for="item in passwordTipList"
                   :key="item"
                   class="TipText">
                  <i class="myicon-dot"></i> {{ item }}
                </p>
              </div>
              <div class="input-field">
                <i class="myicon-lock"></i>

                <el-input minlength="6"
                          maxlength="18"
                          show-password
                          type="password"
                          placeholder="Password"
                          v-model.trim="singUpData.signUP_password"></el-input>
              </div>

            </el-tooltip>
            <div class="input-field">
              <i class="myicon-lock"></i>
              <el-input minlength="6"
                        maxlength="18"
                        show-password
                        type="password"
                        placeholder="Confirm Password"
                        v-model.trim="singUpData.signUp_password_confirm"></el-input>
            </div>
            <el-button type="primary"
                       :round="false"
                       class="signLoginBtn"
                       :disabled="isSignUpBtnDisabled"
                       @click="signup_Btn">
              Sign up
            </el-button>
          </form>
        </div>
      </div>

      <el-dialog title="Tip"
                 :visible.sync="dialogVisible"
                 width="30%">
        <span>The account you entered does not exist, do you want to register
          now?</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary"
                     @click="loginPageSignUp()">register</el-button>
        </span>
      </el-dialog>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>Level 4 and Level 6 Mock Exam System</h3>

            <div class="mttestTextarea">
              <p>
                Please enter your username and password to log in.
                <br />
                If you do not have an account, please click the button below
              </p>
            </div>
            <button class="btn transparent"
                    id="sign-up-btn"
                    @click="jump_signUp">
              Sign up
            </button>
          </div>
          <!-- img/log.svg -->
          <img :src="sign_inPic"
               class="image"
               alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>Please register</h3>
            <div class="mttestTextarea">
              <p>
                Please enter your username, password to register an account
                <br />
                If you already have an account, please click the button below.
              </p>
            </div>
            <button class="btn transparent"
                    id="sign-in-btn"
                    @click="jump_signIn">
              Sign in
            </button>
          </div>
          <img :src="sign_upPic"
               class="image"
               alt="" />
        </div>
      </div>
    </div>

    <!-- <el-button type="primary" @click="testani">test</el-button> -->
  </div>
</template>
<script>
//  Start with a letter, allow 5-16 bytes, allow alphanumeric underscore
const USERNAMELAW = /[a-zA-Z][a-zA-Z0-9_]{4,15}/;
const key = 'AmeroL';
// The length is between 6 and 18, and can only contain letters, numbers and underscores
const PASSSWORDLAW = /\w{6,18}/;
//const URL_LOCAL = 'http://127.0.0.1:3000/data/userlogin/user';
const URL_REMOTE = 'http://123.57.7.40:5000/data/userlogin/user';
import axios from 'axios';
export default {
  data () {
    return {
      fullscreenLoading: false,
      dialogVisible: false,
      usernameTipList: [
        'Start with a letter',
        'Allow 4-15 characters',
        'Allow alphanumeric underscore',
      ],
      passwordTipList: [
        'Allow 6-18 characters',
        'Allow alphanumeric underscore',
        "Can't contain special characters",
      ],
      isSignUpBtnDisabled: true,
      isloginBtnDisabled: true,
      singUpData: {
        signUp_username: '',
        signUp_stuNumber: '',
        // signUp_email: "",
        signUP_password: '',
        signUp_password_confirm: '',
      },
      loginData: {
        login_username: '',
        login_password: '',
      },

      sign_upPic: require('../../assets/loginPage/picture/pic1.svg'),
      sign_inPic: require('../../assets/loginPage/picture/pic2.svg'),
      pageStatus: false,
    };
  },
  methods: {
    testani: function () {
      this.$router.push({ path: '/test' });
      // let temparray = document.querySelectorAll(".mytestclass");
      // for (let i = 0; i < temparray.length; i++) {
      //   temparray[i].classList.add("fa-check-square");
      //   temparray[i].classList.remove("fa-circle");
      // }

      // console.log(temparray.length);
    },
    clearData: function (data) {
      let keys = Object.keys(data);

      for (let i = 0; i < keys.length; i++) {
        data[keys[i]] = '';
      }
    },
    jump_signUp: function () {
      this.pageStatus = true;
    },

    jump_signIn: function () {
      this.pageStatus = false;
    },
    verifyReturnData: function (_data, _token) {
      let returnToken = _data.data[0].userToken;
      if (returnToken === _token) {
        this.$message({
          type: 'success',
          message: 'Login successful, jumping to new page',
        });

        setTimeout(() => {
          this.fullscreenLoading = true;
        }, 1000);
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$router.push({ path: '/main' });
          // let username = "login!"
          // this.$store.state.username = username;
          // this.$cookies.set('examflag', 1);
          // window.location.href = 'http://123.57.7.40:5057';
        }, 3000);
        return true;
      } else {
        this.$message({
          type: 'error',
          message: 'Password is wrong!',
        });
        return false;
      }
    },
    api_checkAccountExist: function (_userId, _userToken) {
      //Get data from database
      axios
        .get(URL_REMOTE, {
          headers: {
            getuser: 'yes',
          },
          params: {
            userId: _userId,
          },
        })
        .then((data) => {
          this.verifyReturnData(data, _userToken);
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: 'Account is not exist!',
          });
          this.dialogVisible = true;
        });
    },

    api_createNewUserItem: function (_userId, _userToken) {
      axios
        .post(
          URL_REMOTE,
          {
            userId: _userId,
            userToken: _userToken,
          },
          {
            headers: {
              test: 'dsahjkdsa',
            },
          }
        )
        .then(() => {
          this.$message({
            message: 'Register Successfully!',
            type: 'success',
          });
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message:
              // error.response.data.returnValues[0].message,
              'Register Failed: Username already exists',
          });
        });
    },

    psTk: function (str1, str2) {
      return window.btoa(str1 + key + str2);
    },

    buildToken: function (_password, _userName) {
      // let emailArray = _email.split("");

      let tempToken = this.psTk(_password, _userName);
      return tempToken;
    },

    buildUserId: function (_username) {
      let usernameArray = _username.split('');
      let tempId = 0;
      for (let i = 0; i < usernameArray.length; i++) {
        tempId += usernameArray[i].charCodeAt();
      }
      return tempId + usernameArray.length;
    },

    checkInput: function (_str, _explainStr) {
      return _str.replace(_explainStr, '').length != 0 ? false : true;
    },

    verifyUsername: function (_username) {
      if (this.checkInput(_username, USERNAMELAW)) {
        return true;
      } else {
        this.$message({
          type: 'error',
          message: 'Username format is incorrect',
        });
        return false;
      }
    },

    verifyPassword: function (_password) {
      if (this.checkInput(_password, PASSSWORDLAW)) {
        return true;
      } else {
        this.$message({
          type: 'error',
          message: 'Password format is incorrect',
        });
        return false;
      }
    },
    judgeSame: function (_password, _passwordConfirm) {
      if (_password === _passwordConfirm) {
        return true;
      } else {
        this.$message({
          type: 'error',
          message: 'The password entered twice is not the same',
        });
        return false;
      }
    },

    setSignUpData: function (_username, _password, _passwordConfirm) {
      if (
        this.judgeSame(_password, _passwordConfirm) &&
        this.verifyUsername(_username) &&
        this.verifyPassword(_password)
      ) {
        const USERID = this.buildUserId(_username);
        const TOKEN = this.buildToken(_password, _username);

        this.api_createNewUserItem(USERID, TOKEN);

        this.$notify({
          title: 'Registration success',
          message: 'Please log in to your account',
          type: 'success',
        });
        this.jump_signIn();
        this.loginData.login_username = this.singUpData.signUp_username;
        this.loginData.login_password = this.singUpData.signUP_password;
      }
    },
    // testname
    // 123456
    judgeInputDataEmpty: function (inputData) {
      let dataKeys = Object.keys(inputData);
      let dataValues = Object.values(inputData);
      let index = 0;
      for (let i = 0; i < dataKeys.length; i++) {
        if (dataValues[i] != '') {
          index++;
        }
      }
      return index == dataKeys.length ? true : false;
    },
    loginPageSignUp: function () {
      this.jump_signUp();
      this.dialogVisible = false;
    },
    login_Btn: function () {
      let inputUsername = this.loginData.login_username;
      let inputPassword = this.loginData.login_password;
      const USERID = this.buildUserId(inputUsername);
      const TOKEN = this.buildToken(inputPassword, inputUsername);

      if (
        this.verifyUsername(inputUsername) &&
        this.verifyPassword(inputPassword)
      ) {
        this.clearData(this.loginData);
        this.api_checkAccountExist(USERID, TOKEN);
      }
    },

    signup_Btn: function () {
      let inputUsername = this.singUpData.signUp_username;
      let inputPassword = this.singUpData.signUP_password;
      let inputPassword_confirm = this.singUpData.signUp_password_confirm;
      this.setSignUpData(inputUsername, inputPassword, inputPassword_confirm);
    },
  },
  mounted: function () {
    // document.getElementById("mytestbut").disabled = true
  },

  watch: {
    loginData: {
      handler: function (newVal) {
        this.judgeInputDataEmpty(newVal)
          ? (this.isloginBtnDisabled = false)
          : (this.isloginBtnDisabled = true);
      },
      deep: true,
    },
    singUpData: {
      handler: function (newVal) {
        this.judgeInputDataEmpty(newVal)
          ? (this.isSignUpBtnDisabled = false)
          : (this.isSignUpBtnDisabled = true);
      },
      deep: true,
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
@import url('./../../../public/font-awesome-4.7.0/css/font-awesome.min.css');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap');

.mttestTextarea {
  /* background-color: #04befe; */
  width: 110%;
  text-align: center;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input {
  font-family: 'Poppins', sans-serif;
}

.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}
.sign-up-form .signLoginBtn,
.sign-in-form .signLoginBtn {
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  width: 150px;
  height: 49px;
  border-radius: 49px;
  font-weight: 600;
  background-color: #5995fd;
  transition: 0.5s;
}
.input-field .el-input__inner {
  padding-top: 0px;
  border-right-width: 1px;
  padding-right: 0px;
  padding-left: 0px;
  height: 55px;
}
.sign-up-form .signLoginBtn:hover,
.sign-in-form .signLoginBtn:hover {
  background-color: #4d84e2;
}

.btn:hover {
  background-color: #4d84e2;
}
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: '';
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.3s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;

  text-align: center;
  z-index: 6;
}
.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }
  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  .el-tooltip__popper {
  }
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}
.TipText {
  font-family: 'Poppins', sans-serif;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: rgb(230, 230, 230);
}
</style>
