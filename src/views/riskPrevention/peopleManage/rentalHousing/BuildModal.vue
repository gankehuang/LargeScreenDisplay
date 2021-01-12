<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="modal-container"
    >
      <el-row class="page-box">
        <el-col
          :span="6"
          class="tree-container"
        >
          <div class="tree-border rect">
            <Tree
              class="left-aside left-tree"
              type="unit"
              style="height: 700px;"
            />
          </div>
        </el-col>
        <el-col :span="18">
          <!-- <div class="modal-title">房屋信息</div> -->
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
          >
            <el-tab-pane
              label="房屋信息"
              name="first"
            />
            <el-tab-pane
              label="单元信息"
              name="second"
            />
            <el-tab-pane
              label="重点关注人员房"
              name="third"
            />
            <el-tab-pane
              label="房屋核查"
              name="fourth"
            />
          </el-tabs>
          <img
            class="modal-close"
            src="@/assets/images/common/close-btn.png"
            @click="closeModal"
          >
          <div
            v-if="activeName === 'first'"
            class="first-build-title"
          >
            1栋1单元
          </div>
          <div
            v-if="activeName === 'first'"
            class="modal-first-content"
          >
            <div
              v-for="(item,index) in buildInfoList"
              :key="index"
              class="info-item"
            >
              <div class="item-bg">
                <span>{{ item.label }}</span>
                <span>
                  <font>{{ item.number }}</font>
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="activeName === 'second'"
            class="build-title"
          >
            柳园花园
          </div>
          <div
            v-if="activeName === 'second'"
            class="modal-second-content"
          >
            <div
              class="left-box"
              style="height:95%;width:90%"
            >
              <!-- <div class="title">1栋1单元</div> -->
              <el-scrollbar style="height: 550px;">
                <div
                  v-for="(item, index) in computedBuildLayerList"
                  :key="index + 'buildLayerList'"
                  class="build-item"
                >
                  <div class="item-name">
                    {{ item.layerName }}
                  </div>
                  <div
                    v-for="(item1, index1) in item.roomList"
                    :key="index1 + 'roomList'"
                    class="item-term"
                    :style="{
                      'background-color': item1.isSelected
                        ? selectorList[item1.type].color
                        : '#efefef'
                    }"
                  >
                    <div>{{ item1.roomNum }}房（{{ item1.personNum }}人）</div>
                    <div>业主：{{ item1.owner }}</div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
            <div class="select-box">
              <div
                v-for="(value, key, index) in selectorList"
                :key="index"
                class="item"
                @click="toggleSelect(key)"
              >
                <span
                  class="select-block"
                  :style="{
                    'background-color': value.isSelected ? value.color : '#eee'
                  }"
                />
                <span class="type-text">{{ key }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="activeName === 'third'"
            class="build-title"
          >
            柳园花园
          </div>
          <div
            v-if="activeName === 'third'"
            class="modal-third-content"
          >
            <div
              class="left-box"
              style="height:95%;width:90%"
            >
              <!-- <div class="title">重点关注人员房(54房)</div> -->
              <el-scrollbar style="height: 550px;">
                <div
                  v-for="(item, index) in computedBuildLayerListThird"
                  :key="index + 'buildLayerThirdList'"
                  class="build-item"
                >
                  <!-- <div class="item-name">{{ item.layerName }}</div> -->
                  <div
                    v-for="(item1, index1) in item.roomList"
                    :key="index1 + 'roomList'"
                    class="item-term"
                    :style="{
                      'background-color': item1.isSelected
                        ? selectorThirdList[item1.type].color
                        : '#efefef'
                    }"
                  >
                    <div>{{ item1.roomNum }}房（{{ item1.personNum }}人）</div>
                    <div>业主：{{ item1.owner }}</div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
            <div class="select-box">
              <div
                v-for="(value, key, index) in selectorThirdList"
                :key="index"
                class="item"
                @click="toggleThirdSelect(key)"
              >
                <span
                  class="select-block"
                  :style="{
                    'background-color': value.isSelected ? value.color : '#eee'
                  }"
                />
                <span class="type-text">{{ key }}</span>
              </div>
            </div>
          </div>
          <div v-if="activeName === 'fourth'">
            <el-form inline>
              <el-form-item label="检查类型">
                <el-select placeholder="检查类型" />
              </el-form-item>
              <el-form-item label="关键词">
                <el-input placeholder="请输入关键词" v-model="keyword" />
              </el-form-item>
              <el-button type="primary">
                查询
              </el-button>
            </el-form>
          </div>
          <div v-if="activeName === 'fourth'">
            <el-table
              :data="list"
              style="width:98%;background-color:transparent"
              height="100%"
            >
              <el-table-column
                label="楼栋名称"
                prop="name"
              />
              <el-table-column
                label="房屋编号"
                prop="buildNumber"
              />
              <el-table-column
                label="业主姓名"
                prop="ownerName"
              >
                <template slot-scope="scope">
                  {{ scope.row.ownerName | hideName }}
                </template>
              </el-table-column>
              <el-table-column
                label="联系方式"
                prop="phone"
              >
                <template slot-scope="scope">
                  {{ scope.row.phone | hidePhone }}
                </template>
              </el-table-column>
              <el-table-column
                label="核查类型"
                prop="type"
              />
              <el-table-column
                label="房屋入住人数"
                prop="number"
              />
              <el-table-column
                label="核查员"
                prop="checker"
              />
              <el-table-column
                label="核查时间"
                prop="time"
                width="200px"
              />
              <el-table-column
                label="是否正常"
                prop="status"
              />
              <el-table-column label="操作" />
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<script>
import Tree from '@/components/Tree'
export default {
  components: {
    Tree
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      activeName: 'second',
      keyword: '',
      list: [
        {
          name: '1栋1单元',
          buildNumber: '101室',
          ownerName: '张枫',
          phone: '18681524800',
          type: '重点人员核查',
          number: 4,
          checker: '王磊',
          time: '2020-11-16 19:48:00',
          status: '正常',
          edit: ''
        }
      ],
      buildInfoList: [
        {
          label: '房屋总数',
          number: '2036套'
        },
        {
          label: '房屋总人数',
          number: '6813人'
        },
        {
          label: '业主自住房',
          number: '1396套'
        },
        {
          label: '业主自住人数',
          number: '6813人'
        },
        {
          label: '出租房数',
          number: '626套'
        },
        {
          label: '出租房人数',
          number: '2149人'
        },
        {
          label: '7人以上房间数',
          number: '98套'
        },
        {
          label: '重点人员数量',
          number: '50人'
        }
      ],
      selectorList: {
        全部: {
          color: '#A4A4CA',
          isSelected: true
        },
        业主自住: {
          color: '#38BAC9',
          isSelected: true
        },
        '诈骗-前科': {
          color: '#0290B5',
          isSelected: true
        },
        出租房: {
          color: '#F9D711',
          isSelected: true
        },
        空置房: {
          color: '#F9D711',
          isSelected: true
        },
        '7人以上入住房': {
          color: '#D4DC1A',
          isSelected: true
        },
        党员房: {
          color: '#638DFE',
          isSelected: true
        },

        志愿者房: {
          color: '#6CFE28',
          isSelected: true
        },
        独居老人房: {
          color: '#FE8B61',
          isSelected: true
        },
        留守儿童房: {
          color: '#3AFEF4',
          isSelected: true
        },
        残障人员房: {
          color: '#E6CFFE',
          isSelected: true
        },
        '60岁以上老人房': {
          color: '#FE3B56',
          isSelected: true
        },
        重点关注人员: {
          color: '#FE7A17',
          isSelected: true
        }
      },
      buildLayerList: [
        {
          layerName: '一层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '独居老人房',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '残障人员房',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '志愿者房',
              isSelected: true
            }
          ]
        },
        {
          layerName: '二层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '残障人员房',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '重点关注人员',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            }
          ]
        },
        {
          layerName: '三层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '党员房',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '独居老人房',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            }
          ]
        },
        {
          layerName: '四层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '7人以上入住房',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            }
          ]
        },
        {
          layerName: '五层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            }
          ]
        },
        {
          layerName: '六层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '残障人员房',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '党员房',
              isSelected: true
            }
          ]
        },
        {
          layerName: '七层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '残障人员房',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '党员房',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '诈骗-前科',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '党员房',
              isSelected: true
            }
          ]
        },
        {
          layerName: '八层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '残障人员房',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '7人以上入住房',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '留守儿童房',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '重点关注人员',
              isSelected: true
            }
          ]
        },
        {
          layerName: '九层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '残障人员房',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '出租房',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '空置房',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '业主自住',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '志愿者房',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '党员房',
              isSelected: true
            }
          ]
        }
      ],
      selectorThirdList: {
        全部: {
          color: '#BCD1FF',
          isSelected: true
        },
        '吸毒-前科': {
          color: '#3ED204',
          isSelected: true
        },
        '诈骗-前科': {
          color: '#FF6496',
          isSelected: true
        },
        '盗窃-前科': {
          color: '#E5FE00',
          isSelected: true
        },
        '寻衅滋事-前科': {
          color: '#5AB0FF',
          isSelected: true
        },
        '挪用公款-前科': {
          color: '#F648FF',
          isSelected: true
        },
        '敲诈勒索-前科': {
          color: '#36F7FF',
          isSelected: true
        },
        '设赌博机-前科': {
          color: '#FFB7FF',
          isSelected: true
        },

        '贪污贿赂-前科': {
          color: '#D7F419',
          isSelected: true
        },
        '邪教组织-前科': {
          color: '#C6EDBA',
          isSelected: true
        },
        '破坏市场经济秩序-前科': {
          color: '#D11D52',
          isSelected: true
        },
        上访: {
          color: '#889867',
          isSelected: true
        },
        在逃: {
          color: '#DDE4D3',
          isSelected: true
        },
        涉毒: {
          color: '#C7F1C0',
          isSelected: true
        }
      },
      buildLayerThirdList: [
        {
          layerName: '一层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '挪用公款-前科',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '上访',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '在逃',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '涉毒',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '涉毒',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '涉毒',
              isSelected: true
            }
          ]
        },
        {
          layerName: '二层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '吸毒-前科',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '涉毒',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '贪污贿赂-前科',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '邪教组织-前科',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '破坏市场经济秩序-前科',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '上访',
              isSelected: true
            }
          ]
        },
        {
          layerName: '三层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '挪用公款-前科',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '上访',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '在逃',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '诈骗-前科',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '设赌博机-前科',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '邪教组织-前科',
              isSelected: true
            }
          ]
        },
        {
          layerName: '四层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '吸毒-前科',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '涉毒',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '贪污贿赂-前科',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '邪教组织-前科',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '破坏市场经济秩序-前科',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '上访',
              isSelected: true
            }
          ]
        },
        {
          layerName: '五层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '挪用公款-前科',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '上访',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '在逃',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '盗窃-前科',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '寻衅滋事-前科',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '敲诈勒索-前科',
              isSelected: true
            }
          ]
        },
        {
          layerName: '六层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '吸毒-前科',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '寻衅滋事-前科',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '寻衅滋事-前科',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '邪教组织-前科',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '破坏市场经济秩序-前科',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '上访',
              isSelected: true
            }
          ]
        },
        {
          layerName: '七层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '挪用公款-前科',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '上访',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '在逃',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '在逃',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '涉毒',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '涉毒',
              isSelected: true
            }
          ]
        },
        {
          layerName: '八层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '吸毒-前科',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '涉毒',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '贪污贿赂-前科',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '邪教组织-前科',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '破坏市场经济秩序-前科',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '上访',
              isSelected: true
            }
          ]
        },
        {
          layerName: '九层',
          roomList: [
            {
              roomNum: '101',
              personNum: 4,
              owner: '周祖文',
              type: '挪用公款-前科',
              isSelected: true
            },
            {
              roomNum: '102',
              personNum: 4,
              owner: '周祖文',
              type: '上访',
              isSelected: true
            },
            {
              roomNum: '103',
              personNum: 4,
              owner: '周祖文',
              type: '在逃',
              isSelected: true
            },
            {
              roomNum: '104',
              personNum: 4,
              owner: '周祖文',
              type: '设赌博机-前科',
              isSelected: true
            },
            {
              roomNum: '105',
              personNum: 4,
              owner: '周祖文',
              type: '设赌博机-前科',
              isSelected: true
            },
            {
              roomNum: '106',
              personNum: 4,
              owner: '周祖文',
              type: '寻衅滋事-前科',
              isSelected: true
            }
          ]
        }
      ]
    }
  },
  computed: {
    computedBuildLayerList () {
      const list = [...this.buildLayerList]
      return list.reverse()
    },
    computedBuildLayerListThird () {
      const list = [...this.buildLayerThirdList]
      return list.reverse()
    }
  },
  methods: {
    closeModal () {
      this.$emit('update:visible', false)
    },
    toggleSelect (key) {
      this.selectorList[key].isSelected = !this.selectorList[key].isSelected
      if (key === '全部') {
        for (const i in this.selectorList) {
          this.selectorList[i].isSelected = this.selectorList[key].isSelected
        }
      } else {
        let flag = false
        for (const i in this.selectorList) {
          if (i !== '全部' && !this.selectorList[i].isSelected) {
            flag = true
            break
          }
        }
        if (flag) {
          this.selectorList['全部'].isSelected = false
        } else {
          this.selectorList['全部'].isSelected = true
        }
      }
      this.buildLayerList.forEach((item) => {
        item.roomList.forEach((item1) => {
          if (key === '全部') {
            item1.isSelected = this.selectorList[key].isSelected
          } else {
            if (item1.type === key) {
              item1.isSelected = this.selectorList[key].isSelected
            }
          }
        })
      })
    },
    toggleThirdSelect (key) {
      console.log(this.selectorThirdList[key])
      this.selectorThirdList[key].isSelected = !this.selectorThirdList[key]
        .isSelected
      if (key === '全部') {
        for (const i in this.selectorThirdList) {
          this.selectorThirdList[i].isSelected = this.selectorThirdList[
            key
          ].isSelected
        }
      } else {
        let flag = false
        for (const i in this.selectorThirdList) {
          if (i !== '全部' && !this.selectorThirdList[i].isSelected) {
            flag = true
            break
          }
        }
        if (flag) {
          this.selectorThirdList['全部'].isSelected = false
        } else {
          this.selectorThirdList['全部'].isSelected = true
        }
      }
      this.buildLayerThirdList.forEach((item) => {
        item.roomList.forEach((item1) => {
          if (key === '全部') {
            item1.isSelected = this.selectorThirdList[key].isSelected
          } else {
            if (item1.type === key) {
              item1.isSelected = this.selectorThirdList[key].isSelected
            }
          }
        })
      })
    },
    handleClick ({ name }) {
      this.activeName = name
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/deep/ .el-input__inner {
  background-color: transparent !important;
}

/deep/ .el-scrollbar__wrap {
  overflow: auto;
}

/deep/ .el-tabs__item {
  margin-top: 40px;
  color: #fff;
}

/deep/ .el-tabs__nav-wrap::after {
  background-color: #024081;
}

/deep/ .el-tabs__item:hover {
  color: #409eff;
}

/deep/ .el-tabs__item.is-active {
  color: #409eff;
  &::after {
    display: block;
    content: '';
    border-width: 8px 8px 8px 8px;
    border-style: solid;
    border-color: #2188ed transparent transparent transparent;

    /* 定位 */
    position: absolute;
    left: 25%;
    top: 40px;
    z-index: 2;
  }
}

.modal-container {
  width: 1500px;
  height: 800px;
  background: url('~@/assets/images/rentalHousing/groupRentingBg.png') no-repeat center center;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1000;

  .modal-title {
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    color: #00ffff;
  }
  .build-title {
    img {
      height: 24px;
    }
    position: absolute;
    top: 90px;
    left: 55%;
    transform: translateX(-50%);
    color: #199ccb;
    font-size: 24px;
  }

  .first-build-title {
    position: absolute;
    transform: translateX(-50%);
    img {
      height: 24px;
    }
    top: 90px;
    left: 62%;
    color: #199ccb;
    font-size: 24px;
  }

  .modal-close {
    position: absolute;
    top: 18px;
    right: 20px;
    cursor: pointer;
  }

  .tree-container {
    overflow: hidden;
    padding: 50px;
    .tree-border {
      border: 1px solid #0b61a0 !important;
      overflow: hidden;
      height: 107%;
    }
    .left-tree {
      margin: 5% auto;
      background-color: transparent;
    }
  }

  .modal-first-content {
    width: 100%;
    display: flex;
    padding: 50px 0;
    flex-wrap: wrap;
    .info-item {
      flex: 0.5;
      display: flex;
      margin: 0 0 3% 0;
      justify-content: center;
      align-items: center;
      .item-bg {
        width: 380px;
        height: 122px;
        display: flex;
        justify-content: center;
        align-items: center;
        span:nth-of-type(1) {
          display: inline-block;
          padding-left: 35%;
          text-align: left;
        }
        span {
          flex: 1;
          color: white;
          font-size: 16px;
          text-align: center;
        }
      }
    }

    .info-item:nth-child(odd) {
      .item-bg {
        background: url('~@/assets/images/rentalHousing/buildInfoItem.png');
      }
    }
    .info-item:nth-child(even) {
      .item-bg {
        background: url('~@/assets/images/rentalHousing/peopleInfoItem.png');
      }
    }
  }

  .modal-second-content {
    display: flex;
    height: 100%;
    margin-top: -60px;
    padding: 110px 25px 0 25px;
    .left-box {
      position: relative;
      padding-top: 80px;
      background: url('~@/assets/images/rentalHousing/buildHouseBg.png') no-repeat center
        center;
      background-size: contain;
      .title {
        position: absolute;
        left: 47%;
        top: 35px;
        color: #fff;
        font-size: 16px;
      }
    }
    .build-item {
      width: 87%;
      display: flex;
      color: #fff;
      margin: 0 auto;
      // border-bottom: 1px solid #0290b5;
      & > div {
        border-right: 1px solid #0290b5;
      }
      .item-name {
        white-space: nowrap;
        padding: 0 18px;
        height: 72px;
        line-height: 40px;
        //   background: #a4a4ca;
        border: none;
      }
      .item-term {
        padding: 1px 12px;
        /*background-color: #38bac9;*/
        & > div {
          white-space: nowrap;
        }
        border-bottom: 1px solid #0290b5;
      }
    }
  }

  .modal-third-content {
    display: flex;
    height: 100%;
    margin-top: -60px;
    padding: 110px 25px 0 25px;
    .left-box {
      position: relative;
      padding-top: 80px;
      background: url('~@/assets/images/rentalHousing/buildHouseThirdBg.png') no-repeat
        center center;
      background-size: contain;
      .title {
        position: absolute;
        left: 40%;
        top: 10px;
        color: #fff;
        font-size: 16px;
      }
    }
    .build-item {
      width: 65%;
      display: flex;
      color: #fff;
      margin: 0 auto;
      // border-bottom: 1px solid #0290b5;
      & > div {
        border-right: 1px solid #0290b5;
      }
      .item-name {
        white-space: nowrap;
        padding: 0 18px;
        height: 72px;
        line-height: 40px;
        //   background: #a4a4ca;
        border: none;
      }
      .item-term {
        height: 72px;
        padding: 1px 8px;
        /*background-color: #38bac9;*/
        & > div {
          white-space: nowrap;
        }
        border-bottom: 1px solid #0290b5;
      }
    }
  }

  .select-box {
    flex: 0 0 20%;
    padding-left: 40px;
    align-self: center;
    color: #fff;
    .item {
      cursor: pointer;
      padding-bottom: 20px;
      .select-block {
        vertical-align: middle;
        display: inline-block;
        margin-right: 10px;
        width: 12px;
        height: 12px;
        border-radius: 2px;
        background-color: #ccc;
      }
    }
  }
  // 四角边框
  .rect {
    background: linear-gradient(to left, #025dc6, #025dc6) left top no-repeat,
      linear-gradient(to bottom, #025dc6, #025dc6) left top no-repeat,
      linear-gradient(to left, #025dc6, #025dc6) right top no-repeat,
      linear-gradient(to bottom, #025dc6, #025dc6) right top no-repeat,
      linear-gradient(to left, #025dc6, #025dc6) left bottom no-repeat,
      linear-gradient(to bottom, #025dc6, #025dc6) left bottom no-repeat,
      linear-gradient(to left, #025dc6, #025dc6) right bottom no-repeat,
      linear-gradient(to left, #025dc6, #025dc6) right bottom no-repeat;
    background-size: 1px 15px, 15px 1px, 1px 15px, 15px 1px;
  }

  /deep/ .el-table {
    background-color: transparent !important;
  }

  /deep/ .el-table tr {
    background-color: transparent !important;
  }

  /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #024074 !important;
  }
}
</style>
