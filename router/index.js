import Vue from 'vue'
import VueRouter from 'vue-router'
/*  admin */
/*  login */
import adminlogin from '../components/admin/login/login';
import adminmains from '../components/admin/mainbody/mainbody';
import webinfo from '../components/admin/userinfo/webinfo'
import cate from '../components/admin/cate/cate'
import updatecate from"../components/admin/cate/updatecate"
import goods from "../components/admin/goods/goods"
import updategoods from "../components/admin/goods/updategood"
import index from "../components/user/index/index"
import goodsinfo from "../components/user/goods/goodsinfo"
import category from "../components/user/category/category"
import login from"../components/user/login/login"
import registe from"../components/user/login/registe"
import car from"../components/user/car/car"
import carsecond from"../components/user/carsecond/carsecond"
import success from '../components/user/success/success'
import mine from '../components/user/mine/mine'
import order from '../components/user/order/order'
import orderlist from '../components/user/orderlist/orderlist'
Vue.use(VueRouter);
export  default  new  VueRouter({
    routes:[
        {
            path:'/',component:index,name:'index',
        }, {
            path:'/mine',component:mine,name:'mine',
        }, {
            path:'/order',component:order,name:'order',
        },
        {
            path:'/orderlist',component:orderlist,name:'orderlist',
        },{
            path:'/goodsinfo',component:goodsinfo,name:'goodsinfo',
        }, {
            path:'/category',component:category,name:'category',
        },{
            path:'/login',component:login,name:'login',
        },{
            path:'/registe',component:registe,name:'registe',
        },{
            path:'/car',component:car,name:'car',
        },{
            path:'/carsecond',component:carsecond,name:'carsecond',
            meta:{requiresAuth:true,titles:''}
        },{
            path:'/success',component:success,name:'success'
        },
        {
            path:'/adminlogin',component:adminlogin,name:'adminlogin'
        },{
            path:'/adminmains',component:adminmains,name:'adminmains',
            children:[
                { path:'webinfo',component:webinfo,name:'webinfo' },
                { path:'cate',component:cate,name:'cate'},
                {path:'updatecate',component:updatecate,name:'updatecate'},
                {path:'goods',component:goods,name:'goods'},
                {path:'updategoods',component:updategoods,name:'updategood'}
            ]
        },
    ]
})

