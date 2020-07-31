import Vue from 'vue'
import VueRouter from 'vue-router'
// import {routes} from "router"
Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children:[
      {
        path:'home',
        name:'Home',
        component:() => import('../views/HomeView/Home.vue')
      },
      {
        path:'mybooks',
        name:'MyBooks',
        component:() => import('../views/HomeView/MyBooks.vue')
      },
      {
        path:'rankinglist',
        name:'RankingList',
        component:() => import('../views/HomeView/RankingList.vue')
      },
      {
        path:'search',
        name:'Search',
        component:() => import('../views/HomeView/Search.vue')
      },
    ]
  },
  {
    path:'/booklist',
    name:'BookList',
    component:() => import('../views/BookList.vue')
  },
  {
    path:'/bound',
    name:'Bound',
    component:() => import('../views/Bound.vue')
  },
  {
    path:'/detail',
    name:'Detail',
    component:() => import('../views/Detail.vue')
  },
  {
    path:'/essay',
    name:'Essay',
    component:() => import('../views/Essay.vue')
  },
  {
    path:'/relateto',
    name:'RelateTo',
    component:() => import('../views/RelateTo.vue')
  },
  {
    path:'/comment',
    name:'Comment',
    component:() => import('../views/Comment.vue')
  },
  {
    path:'/more',
    name:'More',
    component:() => import('../views/More.vue')
  },
  
  {
    path:"*",
    redirect:{
        name:"Home"
    }
}

]

const router = new VueRouter({
  routes
})

export default router
