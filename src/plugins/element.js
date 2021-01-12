import Vue from 'vue'
import {
  Tree,
  Loading,
  Message,
  MessageBox,
  Switch,
  Slider,
  Image,
  Input,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Radio,
  RadioGroup,
  Col,
  Scrollbar,
  Table,
  TableColumn,
  Form,
  FormItem,
  Select,
  Option,
  pagination,
  DatePicker,
  TimeSelect,
  TimePicker,
  Tabs,
  TabPane,
  Carousel,
  CarouselItem,
  Progress,
  Dialog,
  Avatar,
  Rate,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  Tooltip,
  Checkbox,
  CheckboxGroup,
  Popover,
  Cascader,
  Upload,
  InputNumber
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.use(Tree)
Vue.use(Switch)
Vue.use(Slider)
Vue.use(Image)
Vue.use(Loading.directive)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Col)
Vue.use(Scrollbar)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(pagination)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Progress)
Vue.use(Dialog)
Vue.use(Avatar)
Vue.use(Rate)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Tooltip)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Popover)
Vue.use(Cascader)
Vue.use(Upload)
Vue.use(InputNumber)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
