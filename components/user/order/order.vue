<template>
    <div class="home-box">
        <div class="header">
            <div><</div>
            <div>我的订单</div>
            <div>开发票</div>
        </div>
        <div class="body">
            <div class="orderbanner1-info" v-if="typelist.length">
                <div class="orderitems" :class="{'hot':type==item.typecode}" v-for="item in typelist" @click="type=item.typecode">
                    <span>{{item.typetext}}</span>
                </div>
                <div class="bar">
                    <span></span>
                </div>
            </div>
            <div class="banner2">
                <div class="dingdanbaoguo" v-if="showlist.length">
                    <div class="dingdingdandan" v-for="item in showlist">
                        <div class="ddddtop">
                            <span>2小时达</span>
                            <span class="ddstatus">已签收</span>
                            <span class="ddctime">{{item.cttime}}</span>
                        </div>
                        <div class="ddddmid">
                            <router-link :to="{path:'/orderlist',query:{oid:item.oid}}" tag="div">
                                <img v-for="goods in item.goods" :src="goods.gthumb" alt="">
                            </router-link>
                            <div>实付：￥{{item.discount}}</div>
                        </div>
                        <div class="ddddbottom">
                            <div>
                                <span class="gengduo">更多</span>
                                <span class="linghongbao">领红包</span>
                                <span class="shenqing">申请退款</span>
                                <span class="zailai">再来一单</span>
                            </div>
                        </div>
                    </div>
                    <div class="jiazai">已经全部加载完毕</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                orderlist:[],
                typelist:[
                    {typetext:'全部',typecode:-1},
                    {typetext:'未付款',typecode:0},
                    {typetext:'已支付',typecode:1},
                    {typetext:'已完成',typecode:2},
                ],
                type:-1
            }
        },
        computed:{
            showlist(){
                if(this.type==-1){
                    return this.orderlist
                }else {
                    let arr= this.orderlist.filter(ele=>ele.status==this.type);
                    return arr;
                }
            }
        },
        methods: {
            getorderlist(){
                let uid=sessionStorage.uid;
                this.axios.get('/order/allorders?uid='+uid).then(res=>{
                    if (res.data.code==0){
                        if (res.data.orders.length){
                            this.orderlist=res.data.orders
                        }
                    }
                })
            }
        },
        created:function () {
            this.getorderlist()
        }
    }
</script>

<style scoped>
    @import url('./static/css/style.css');
    @import url('./static/css/swiper.min.css');
</style>