// 下拉列表组件
import './styles.css'

/**
 * @param menuOne 必须: 否，接受一个数组，item 为要展示的下拉元素，例子：['截止当前', '按年份', '按季度']
 * @param menuTwo 必须: 否，接受一个数组，item 为要展示的下拉元素，例子：['2021', '2020', '2019', '2018', '2017']
 * @param backValue 必须: 是，传入一个带一个形参的函数，此组件通过传入的函数把组件内选中的数据返回给父组件，例子：back-value="(item) => {console.log(item)}",此为示例，箭头函数处必须放函数名，否则报错
 */

export default {
  props: {
    menuOne: {
      type: Array,
      default: () => ['截止当前', '按年份', '按季度']
    },
    menuTwo: {
      type: Array,
      default: () => ['2021', '2020', '2019', '2018', '2017']
    },
    backValue: {
      type: Function,
      required: true
    }
  },
  render () {
    return (
      <div class={'drop-menu-group-box'}>
        <div class={'drop-menu-btn'}>
          <el-dropdown
            trigger="click"
            placement="bottom"
          >
            <span
              class="el-dropdown-link"
            >
              { this.btnOneValue }
              <i
                class={'el-icon-arrow-down el-icon--right'}
              />
            </span>
            <el-dropdown-menu
              slot="dropdown"
              style="width: 96px;"
            >
              {
                this.menuOne.map((item, index) => (
                  <el-dropdown-item
                    key={index}
                    nativeOnclick={() => this.btnOne(item)}
                  >
                    { item }
                  </el-dropdown-item>
                ))
              }
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        {
          this.showAfter
            ? <div style={{ display: 'flex' }}>
              {/* 选择年份 */}
              <div class={'drop-menu-btn magrin-left-10'}>
                <el-dropdown
                  trigger="click"
                  placement="bottom"
                >
                  <span
                    class="el-dropdown-link"
                  >
                    { this.btnTwoValue }年
                    <i
                      class={'el-icon-arrow-down el-icon--right'}
                    />
                  </span>
                  <el-dropdown-menu
                    slot="dropdown"
                    style="width: 96px;"
                  >
                    {
                      this.menuTwo.map((item, index) => (
                        <el-dropdown-item
                          key={index}
                          nativeOnclick={() => this.btnTwo(item)}
                        >
                          { item }年
                        </el-dropdown-item>
                      ))
                    }
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              {/* 选择月份或季度 */}
              <div class={'drop-menu-btn magrin-left-10'}>
                <el-dropdown
                  trigger="click"
                  placement="bottom"
                >
                  <span
                    class="el-dropdown-link"
                  >
                    { this.btnThreeValue }
                    <i
                      class={'el-icon-arrow-down el-icon--right'}
                    />
                  </span>
                  <el-dropdown-menu
                    slot="dropdown"
                    style="width: 96px;"
                  >
                    {
                      this.btnThreeList.map((item, index) => (
                        <el-dropdown-item
                          key={index}
                          nativeOnclick={() => this.btnThree(item)}
                        >
                          { item }
                        </el-dropdown-item>
                      ))
                    }
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div> : null
        }
      </div>
    )
  },
  data () {
    return {
      showAfter: false,
      btnOneValue: '截止当前',
      btnTwoValue: new Date().getFullYear().toString(),
      btnThreeValue: '全年',
      btnThreeList: []
    }
  },
  methods: {
    btnOne: function (item) {
      this.btnOneValue = item
      this.btnTwoValue = new Date().getFullYear().toString()
      this.showAfter = true
      this.btnThreeList = this.handleList(item)
      this.btnThreeValue = '全年'
      if (item === '截止当前') {
        this.btnOneValue = item
        this.showAfter = false
      }
      this.backValue({ menuOne: this.btnOneValue, menuTwo: this.btnTwoValue, menuThree: this.btnThreeValue })
    },
    btnTwo: function (item) {
      this.btnTwoValue = item
      this.btnThreeList = this.handleList(this.btnOneValue)
      this.btnThreeValue = '全年'
      this.backValue({ menuOne: this.btnOneValue, menuTwo: this.btnTwoValue, menuThree: this.btnThreeValue })
    },
    btnThree: function (item) {
      this.btnThreeValue = item
      this.backValue({ menuOne: this.btnOneValue, menuTwo: this.btnTwoValue, menuThree: this.btnThreeValue })
    },
    handleList: function (str) {
      let mid = []
      if (str === '按年份') {
        if (this.btnTwoValue === new Date().getFullYear().toString()) {
          for (let i = 1; i <= new Date().getMonth() + 1; i++) {
            mid.push(`${i}月`)
          }
        } else {
          mid = Array.apply(null, { length: 12 }).map((_, index) => `${index + 1}月`)
        }
      }

      if (str === '按季度') {
        if (this.btnTwoValue === new Date().getFullYear().toString()) {
          mid = Array.apply(null, { length: Math.ceil((new Date().getMonth() + 1) % 4) }).map((_, index) => `第${index + 1}季度`)
        } else {
          mid = Array.apply(null, { length: 4 }).map((_, index) => `第${index + 1}季度`)
        }
      }

      return mid
    }
  }
}
