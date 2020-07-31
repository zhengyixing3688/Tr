import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入axios

import axios from "axios"
import VueAxios from "vue-axios"

import {
  Search,
  Toast,
  Tabbar,
  TabbarItem,
  Icon,
  Button,
  Tab,
  Tabs,
  Lazyload,
  NavBar,
  Cell,
  CellGroup,
  Popup,
  List,
  Slider,
  Swipe,
  SwipeItem,
  Divider,
  Empty,
  Field,
  Form,
  Uploader,
  Dialog,
  Row,
  Col,
  SwipeCell
} from "vant"
import 'lib-flexible'
Vue.use(Search).use(Toast).use(Tabbar).use(TabbarItem).use(Icon).use(VueAxios, axios).use(Button).use(Tab).use(Tabs).use(NavBar).use(Cell).use(CellGroup).use(Popup).use(Lazyload, { lazyComponent: true, }).use(List).use(Slider).use(Swipe).use(SwipeItem).use(Divider).use(Empty).use(Field).use(Form).use(Uploader).use(Dialog).use(Row).use(Col).use(SwipeCell)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
