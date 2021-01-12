<template>
  <div class="detail-info-container">
    <el-row class="title-contianer">
      <el-col class="title">
        基本信息
      </el-col>
    </el-row>
    <el-form
      :label-width="labelWidth"
      class="base-info"
    >
      <el-form-item label="事件名称：">
        <el-input
          v-model="baseInfo.eventName"
          readonly
        />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="事件类型：">
            <el-input
              v-model="baseInfo.typeText"
              readonly
            />
          </el-form-item>
          <el-form-item label="事件大类：">
            <el-input
              v-model="baseInfo.subTypeText"
              readonly
            />
          </el-form-item>
          <el-form-item label="事件子类：">
            <el-input
              v-model="baseInfo.zilei"
              readonly
            />
          </el-form-item>
          <el-form-item label="事件来源：">
            <el-input
              v-model="baseInfo.sourceText"
              readonly
            />
          </el-form-item>
          <el-form-item label="上报平台：">
            <el-input
              v-model="baseInfo.reportPlatform"
              readonly
            />
          </el-form-item>
          <el-form-item label="事件等级：">
            <el-input
              v-model="baseInfo.emergencyLevelText"
              readonly
            />
          </el-form-item>
          <el-form-item label="所属网格：">
            <el-input
              v-model="baseInfo.gridName"
              readonly
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发生时间：">
            <el-input
              v-model="baseInfo.happenedTime"
              readonly
            />
          </el-form-item>
          <el-form-item label="发生地址：">
            <el-input
              v-model="baseInfo.location"
              readonly
            />
          </el-form-item>
          <el-form-item label="发生设备：">
            <el-input
              v-model="baseInfo.deviceName"
              readonly
            />
          </el-form-item>
          <el-form-item label="事件状态：">
            <el-input
              v-model="baseInfo.statusText"
              readonly
            />
          </el-form-item>
          <el-form-item label="超时状态：">
            <el-input
              v-model="baseInfo.timeOverStatus"
              readonly
            />
          </el-form-item>
          <el-form-item label="办结时间：">
            <el-input
              v-model="baseInfo.processingTime"
              readonly
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="事件详情："
        class="event-detail"
      >
        <el-input
          v-model="baseInfo.processingDesc"
          readonly
          type="textarea"
          :rows="5"
          resize="none"
        />
      </el-form-item>
    </el-form>
    <el-row class="title-contianer">
      <el-col class="title">
        上报信息
      </el-col>
    </el-row>
    <el-form
      :label-width="labelWidth"
      class="report-info"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="上报人：">
            <el-input
              readonly
              value="监控设备"
            />
          </el-form-item>
          <el-form-item label="性别：">
            <el-input
              readonly
              value="-"
            />
          </el-form-item>
          <el-form-item label="证件号：">
            <el-input
              v-model="reportInfo.idNumber"
              readonly
            />
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input
              readonly
              value="-"
            />
          </el-form-item>
          <el-form-item label="上报地址：">
            <el-input
              v-model="baseInfo.location"
              readonly
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="反映人：">
            <el-input
              v-model="reportInfo.reflectorName"
              readonly
            />
          </el-form-item>
          <el-form-item label="电子邮箱：">
            <el-input
              v-model="reportInfo.email"
              readonly
            />
          </el-form-item>
          <el-form-item label="工作单位：">
            <el-input
              v-model="reportInfo.workUnit"
              readonly
            />
          </el-form-item>
          <el-form-item label="来电电话：">
            <el-input
              readonly
              value="-"
            />
          </el-form-item>
          <el-form-item label="上报时间：">
            <el-input
              v-model="baseInfo.happenedTime"
              readonly
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="title-contianer">
      <el-col class="title">
        权责清单
      </el-col>
    </el-row>
    <el-form
      :label-width="labelWidth"
      class="accrual-info"
    >
      <el-form-item label="立案规范：">
        <el-input
          v-model="accrualInfo.lian"
          readonly
        />
      </el-form-item>
      <el-form-item label="结案规范：">
        <el-input
          v-model="accrualInfo.jiean"
          readonly
        />
      </el-form-item>
      <el-form-item label="责任单位：">
        <el-input
          v-model="accrualInfo.unit"
          readonly
        />
      </el-form-item>
      <el-form-item label="市级时限：">
        <el-input
          v-model="accrualInfo.city"
          readonly
        />
      </el-form-item>
      <el-form-item label="区级时限：">
        <el-input
          v-model="accrualInfo.countryside"
          readonly
        />
      </el-form-item>
    </el-form>
    <el-row class="title-contianer">
      <el-col class="title">
        当前责任人
      </el-col>
    </el-row>
    <el-form
      :label-width="labelWidth"
      class="current-owner-info"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="当前责任人：">
            <el-input
              v-model="currentOwnerInfo.name"
              readonly
            />
          </el-form-item>
          <el-form-item label="处理状态：">
            <el-input
              v-model="currentOwnerInfo.status"
              readonly
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="处理部门：">
            <el-input
              readonly
              value="专职网格员"
            />
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input
              readonly
              :value="currentOwnerInfo.phone | hidePhone"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="title-contianer">
      <el-col class="title">
        事件图片
      </el-col>
    </el-row>
    <el-row class="event-image-info">
      <el-col
        :span="4"
        class="status-section"
      >
        <div>
          <div class="status">
            处理前
          </div>
          <div class="circular" />
          <div class="line" />
        </div>
        <div>
          <div class="status">
            处理中
          </div>
          <div class="circular" />
          <div class="line" />
        </div>
        <div>
          <div class="status">
            处理后
          </div>
          <div class="circular" />
        </div>
      </el-col>
      <el-col :span="20">
        <div
          v-if="baseInfo.snapImageUrl"
          class="image-before-list"
        >
          <el-image
            v-for="(item, index) in baseInfo.snapImageUrl"
            :key="index"
            style="width: 128px; height: 128px;margin-right: 20px;"
            :src="item"
            :preview-src-list="[item]"
            fit="fit"
          />
        </div>
        <div
          v-else
          class="image-before-list"
          style="margin-top: 20px;height:128px;line-height:128px;"
        >
          暂无图片
        </div>
        <div
          class="image-ing-list"
          style="height:128px;line-height:128px;"
        >
          暂无图片
        </div>
        <div
          v-if="baseInfo.processingImageUrl"
          class="image-after-list"
        >
          <el-image
            v-for="(item, index) in baseInfo.processingImageUrl"
            :key="index"
            style="width: 128px; height: 128px;margin-right: 20px;"
            :src="item"
            :preview-src-list="[item]"
            fit="fit"
          />
        </div>
        <div
          v-else
          class="image-after-list"
          style="margin-top: 20px;height:128px;line-height:128px;"
        >
          暂无图片
        </div>
      </el-col>
    </el-row>
    <el-row
      v-if="baseInfo.status === '6'"
      class="title-contianer"
    >
      <el-col class="title">
        评价信息
      </el-col>
    </el-row>
    <el-row
      v-if="baseInfo.status === '6'"
      class="evaluate-info"
    >
      <el-col :span="4">
        <el-avatar
          :size="58"
          :src="require('@/assets/images/common/no-avatar.png')"
        />
      </el-col>

      <el-col :span="12">
        <div>{{ "艾*德" }}</div>
        <div>{{ baseInfo.processingDesc }}</div>
        <div>{{ baseInfo.processingTime }}</div>
      </el-col>

      <el-col :span="8">
        <el-rate
          v-model="rate"
          :texts="texts"
          show-text
        />
      </el-col>
    </el-row>

    <el-row
      v-if="baseInfo.status === '6'"
      class="title-contianer"
    >
      <el-col class="title">
        核查信息
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="8"
        style="color:#fff;padding-left:25px;"
      >
        {{
          baseInfo.verifyDesc
        }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      rate: 5,
      labelWidth: '140px',
      tableData: {},
      baseInfo: {
        name: '下水道淤积',
        type: '公共服务',
        dalei: '设施管理',
        zilei: '突发环境事件',
        origin: '主动发现',
        platform: '区综治APP',
        level: '二级',
        gridName: '阿尔法社区第1网格',
        unit: '江西珉轩智能科技有限公司',
        happenTime: '2020-07-28 10:12:06',
        happenPlace: '京东大道456号高新创业中心加速器',
        happenDevice: '-',
        eventStatus: '已处理',
        timeOverStatus: '未超时',
        finishTime: '2020-07-28 14:00:00',
        detail:
          '九龙湖赣江南大道和龙兴大街交汇红绿灯处，下水道淤积，存在安全隐患，望及时处理。'
      },
      texts: ['（一星）', '（二星）', '（三星）', '（四星）', '（五星）'],
      evaluateList: [
        {
          name: '艾*德',
          avatar: require('@/assets/images/common/no-avatar.png'),
          brief: '事件已经得到完善处理，相关人员辛苦啦！',
          time: '2020-09-13 10:50:28',
          rate: 5
        }
      ],
      reportInfo: {
        reposterName: '李定乾',
        sex: '男',
        idNumber: '-',
        phone: '-',
        address: '-',
        reflectorName: '-',
        email: '-',
        workUnit: '-',
        telephone: '13944852215',
        reportTime: '2020-07-28 11:21:45'
      },
      accrualInfo: {
        lian: '需提供案件地址，案件照片，案件类别和文字描述',
        jiean:
          '案件类别和文字描述 需包括回复内容，处理后照片，处理地址，处理时间等信息',
        unit: '-',
        city: '48小时内',
        countryside: '24小时内'
      },
      currentOwnerInfo: {
        name: '**三',
        status: '已处理',
        unit: '工程部',
        phone: '18769786501'
      }
    }
  },
  watch: {
    data () {
      // console.log('data11',val)
      this.getMes()
    }
  },
  methods: {
    getMes () {
      this.baseInfo = this.data
      this.baseInfo.statusText === '超时'
        ? (this.baseInfo.timeOverStatus = '超时')
        : (this.baseInfo.timeOverStatus = '未超时')

      this.baseInfo.gridName = '丰和社区'
      this.baseInfo.reportPlatform = '区治理App'
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-info-container {
  /deep/ .el-form-item__label {
    text-align: center;
    color: #fff;
    background-color: #283446;
    padding: 5px 0;
  }
  /deep/ .el-input--small .el-input__inner,
  .el-textarea__inner {
    height: 40px;
    line-height: 45px;
    color: #fff;
    border: none;
    border-radius: 0;
  }
  /deep/ .el-textarea__inner {
    height: 80px;
    background: #172638;
    border: none;
    color: #fff;
  }
  /deep/ .el-form-item {
    border-top: 1px solid rgba(220, 220, 220, 0.1);
    border-bottom: 1px solid rgba(220, 220, 220, 0.1);
    margin: 0;
  }
}
.event-detail {
  /deep/ .el-form-item__label {
    height: 120px;
    line-height: 120px;
  }
}
.title-contianer {
  margin-bottom: 20px;
  .title {
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    border-left: 2px solid #2188ed;
    padding-left: 24px;
  }
}
.base-info,
.report-info,
.accrual-info,
.current-owner-info,
.event-image-info {
  margin-bottom: 20px;
}

.evaluate-info {
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(220, 220, 220, 0.1);
  /deep/ .el-rate__text {
    display: block;
    font-size: 28px;
    margin: 20px 20px 0 0;
    color: #fff45c !important;
  }
  .el-col:nth-of-type(1) {
    text-align: center;
  }
  .el-col:nth-of-type(2) {
    line-height: 24px;
    div:nth-of-type(1) {
      font-size: 16px;
      color: #fff;
    }
    div:nth-of-type(2) {
      color: #fff;
    }
    div:nth-of-type(3) {
      color: #999999;
    }
  }
}

.base-info {
  margin-bottom: 20px;
}
.event-image-info {
  .status-section {
    margin-top: 64px;
  }
  .status {
    width: 100px;
    line-height: 32px;
    height: 32px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    background-color: #2188ed;
    float: left;
    position: relative;
    &::before {
      display: block;
      content: "";
      border-width: 8px 8px 8px 8px;
      border-style: solid;
      border-color: transparent transparent transparent #2188ed;

      /* 定位 */
      position: absolute;
      left: 100px;
      top: 8px;
    }
  }
  .circular {
    width: 14px;
    height: 14px;
    border: 1px solid #2188ed;
    border-radius: 50% 50%;
    float: right;
    margin: 8px 16% 8px 0;
  }
  .line {
    float: right;
    width: 80%;
    margin-right: 20%;
    height: 120px;
    border: none;
    border-right: 2px solid #2188ed;
  }
  .image-before-list,
  .image-ing-list,
  .image-after-list {
    width: 100%;
    justify-content: space-between;
  }
  .image-ing-list,
  .image-after-list {
    margin-top: 20px;
  }
}
</style>
