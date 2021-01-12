<template>
  <div class="container">
    <div class="bg-title">
      安源区域社会治理实战应用平台
    </div>
    <div class="login-form">
      <div class="form-title">
        用户登录
      </div>
      <div class="form">
        <div class="form-bg">
          <el-input
            v-model="form.username"
            type="text"
            placeholder="账号"
          >
            <i
              slot="prefix"
              class="el-input__icon el-icon-user-solid"
            />
          </el-input>
        </div>
        <div class="form-bg">
          <el-input
            v-model="form.password"
            class="password"
            type="password"
            placeholder="密码"
          >
            <i
              slot="prefix"
              class="el-input__icon el-icon-lock"
            />
          </el-input>
        </div>
        <div class="check-box">
          <el-checkbox
            v-model="checked"
          >
            记住密码
          </el-checkbox>
        </div>
        <button @click="handleLogin">
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { enumRegion } from '@/config/common'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      redirect: undefined,
      otherQuery: {},
      checked: false
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created () {
    this.checkCookie()
    // eslint-disable-next-line handle-callback-err
    // window.localforage.getItem('regionVideoObj', (err, value) => {
    //   if (value) {
    //     let flag = false
    //     for (const key in value) {
    //       if (!value[key].length) {
    //         flag = true
    //         break
    //       }
    //     }
    //     if (flag) {
    //       this.startVideoWorker()
    //     }
    //   } else {
    //     // 准备regionVideoObj数据
    //     const regionVideoObj = {}
    //     for (const key in enumRegion) {
    //       regionVideoObj[enumRegion[key]] = []
    //     }
    //     window.localforage.setItem('regionVideoObj', regionVideoObj)
    //     this.startVideoWorker()
    //   }
    // })
  },
  methods: {
    // 进入页面的时候检查cookie
    checkCookie () {
      const cookieStr = document.cookie.split(';').filter(item => item.indexOf('visualizationLogin') > -1)
      if (cookieStr.length !== 0) {
        const cookie = JSON.parse(cookieStr[0].split('=')[1])
        this.form = cookie.form
        this.checked = true
      }
    },
    // 保持cookie的方法
    saveCookie (bool, form) {
      const time = new Date()
      const value = {
        form: form
      }
      if (bool) {
        time.setTime(time.getTime() + 5 * 24 * 60 * 60 * 1000)
        document.cookie = `visualizationLogin=${JSON.stringify(value)};expires=${time.toString()}`
      }
      if (!bool) {
        time.setTime(-1000)
        document.cookie = `visualizationLogin=${JSON.stringify(value)};expires=${time.toString()}`
      }
    },
    // 开始获取天网视频列表worker
    async startVideoWorker () {
      // const worker = new Worker('../../videoWorker.js')
      // let saveNum = 0
      // worker.onmessage = ({ data }) => {
      //   this._saveVideoData(data)
      //   saveNum++
      //   if (saveNum === Object.keys(enumRegion).length) {
      //     worker.terminate()
      //     console.log('天网视频worker完成！')
      //   }
      // }
      //
      // const { data, status } = await countCameraByRegion()
      // if (status === 200) {
      //   for (let i = 0; i < data.length; i++) {
      //     setTimeout(() => {
      //       worker.postMessage({
      //         gridCode: data[i].gridCode,
      //         gridType: enumRegion[data[i].gridName]
      //       })
      //     }, i * 3000)
      //   }
      // }
    },
    // 存储天网视频列表
    _saveVideoData ({ gridType, markers }) {
      // eslint-disable-next-line handle-callback-err
      window.localforage.getItem('regionVideoObj', function (err, value) {
        let regionVideoObj = value
        if (!regionVideoObj) {
          regionVideoObj = {}
        }
        regionVideoObj[gridType] = markers
        window.localforage.setItem('regionVideoObj', regionVideoObj)
      })
    },
    async handleLogin () {
      this.$store.dispatch('user/login', this.form).then(
        () => {
          this.saveCookie(this.checked, this.form)
          this.$router.push({
            path: this.redirect || '/',
            query: this.otherQuery
          })
        },
        (data) => {
          if (data && data.message[0]) {
            this.$message.error(data.message[0].message)
          } else {
            this.$message.error('服务器未知错误')
          }
        }
      )
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  background-image: url('~@/assets/images/login/login-bg-new.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center 0;
  width: 100%;
  height: 100%;
  .bg-title {
    padding-top: 20px;
    width: 100%;
    font-size: 45px;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 45px;

    background-image: linear-gradient(92deg, #008AFF 0%, #00E4FF 48.8525390625%, #008AFF 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
  }
}

.login-form {
  background: url('~@/assets/images/login/form-bg-new.png');
  background-size: 100% 100%;
  width: 450px;
  height: 420px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  padding: 50px;
  .form-title {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
  }
  .form {
    display: flex;
    flex-direction: column;
    height: calc(100% - 42px);
    align-items: center;
    .form-bg {
      width: 350px;
      height: 50px;
      // background: url('~@/assets/images/login/input-bg.png');
      // background-size: 100% 100%;
      margin-top: 31px;

      /deep/.el-input {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 4px;
        outline: none;
        color: #ffffff;

        background: rgba(0, 138, 255, 0.1);
        border: 1px solid #008AFF;
        opacity: 0.9;
        border-radius: 6px;
        font-size: 16px;
        .el-input__inner {
          background: transparent !important;
          height: 100%;
        }
      }
    }

    .check-box {
      align-self: start;
      padding-top: 20px;

      /deep/ .el-checkbox__inner {
        border: 1px solid #008AFF;
      }

      /deep/ .el-checkbox__label {
        color: #ffffff;
      }
    }

    button {
      width: 100%;
      height: 45px;
      outline: none;
      border: none;
      background: linear-gradient(0deg, #008AFF, #00E4FF);
      opacity: 0.9;
      border-radius: 6px;
      font-size: 20px;
      letter-spacing: 1vw;
      color: #ffffff;
      margin-top: 41px;
      cursor: pointer;

      &:active {
        background: #0176a4;
      }
    }
  }
}
</style>
