<template>
    <div style="overflow: hidden">
        <header class="bodytop">
            <div class="con">
                <img src="./static/img/local.png" alt="">
                <i class="h_icon_loca"></i>
                <span>凯通大厦</span>
                <i class="h_icon_xia"></i>
                <img src="./static/img/down.png" alt="">
            </div>
        </header>
        <div class="tips">
            <span>小提示</span>
            <p>开通会员卡，本单可省<i>6元</i></p>
        </div>
        <div class="order">
            <div class="group-header-wrap">
                <div class="group-header">
                    <div class="checkbox">
                        <i class="checkbox-c"></i>
                        <p class="time">2小时达</p>
                    </div>
                </div>
            </div>
            <div class="group-content">
                <ul class="group-item-list" v-if="cart">
                    <li class="item-list" v-for="item in cart.goods" :key="item.gid">
                        <div class="item-checkbox">
                            <i class="checkbox-c" :class="{'hot':item.isCheck}" @click="toggleCheck(item.gid)"></i>
                        </div>
                        <div class="item-image">
                            <img :src="item.gthumb" alt="" class="item-img">
                        </div>
                        <div class="item-info">
                            <p class="item-name">{{item.gname}}</p>
                            <div class="item-price">
                                <span class="item-price-unit">￥</span>
                                <span class="item-price-price">{{item.gdiscount}}</span>
                            </div>
                            <div class="item-controller">
                                <jiajiancar :goods="item" :isemit="isemit" @cartchange="getCart"></jiajiancar>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
        <!-- 订单信息 -->
        <div class="price-list-panel">
            <ul>
                <li class="frist">
                    <p class="left">商品总价</p>
                    <p class="right">
                        <span class="price">￥6.8</span>
                        <span class="nopri">其中￥2.9不可使用红包</span>
                    </p>
                </li>
                <li>
                    <p class="left">
                        <img src="./static/img/img_20170106155049081.png" alt="">
                        商品券
                    </p>
                    <p class="right">
                        登录后查看商品券
                    </p>
                </li>
                <li>
                    <p class="left">
                        <img src="./static/img/img_20170106155024750.png" alt="">
                        红包
                    </p>
                    <p class="right more" style="color: rgb(150, 150, 150);">
                        登录后查看红包
                    </p>
                </li>
                <li>
                    <p class="left">商品实付</p>
                    <p class="right">￥6.8</p>
                </li>
                <li>
                    <p class="left">配送费</p>
                    <p class="right">￥10</p>
                </li>
            </ul>
            <div class="total_price">
                合计
                <span>￥16.8</span>
            </div>
        </div>
        <!-- 会员 -->
        <div class="data-v">
            <div class="openvip">
                <img src="https://j-image.missfresh.cn/img_20171028224101960.png?iopcmd=convert&dst=webp">
                <p>开通会员优惠多多</p>
            </div>
            <ul class="list">
                <li>
                    <img src="https://j-image.missfresh.cn/img_20180521204629828.png">
                    <div class="member">
                        <p>
                            优享会员 ￥ <span>8</span>/月
                        </p>
                        <div>
                            <i class="iconfont icon-icon"></i>
                        </div>
                    </div>
                </li>
                <li>
                    <img src="https://j-image.missfresh.cn/img_20180521215123923.png">
                    <div class="member">
                        <p>
                            优享会员 ￥ <span>12.12</span>/3月
                        </p>
                        <div>
                            <i class="iconfont icon-icon"></i>
                        </div>
                    </div>
                </li>
                <li>
                    <img src="https://j-image.missfresh.cn/img_20180521215326042.png">
                    <div class="member">
                        <p>
                            优享会员 ￥ <span>18</span>/6月
                        </p>
                        <div>
                            <i class="iconfont icon-icon"></i>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 推荐商品 -->
        <div>
            <div class="title">推荐商品</div>
            <div class="box" v-if="recommendGoods">
                <div class="box1" v-for="item in recommendGoods" :key="item.gid">
                    <img class="tu" :src="item.gthumb">
                    <div class="depict">{{item.gname}}</div>
                    <div class="depict1">{{item.gdes}}</div>
                    <div class="left">
                        <div class="up">¥{{item.gprice}}</div>
                        <div class="down">
                            <h1>¥{{item.gdiscount}}</h1>
                            <div>会员{{Math.floor(item.gdiscount/item.gprice*100)/10}}折</div>
                        </div>
                    </div>
                    <jiajiancar :goods="item"></jiajiancar>
                </div>
            </div>
            <!-- 底部提示 -->
            <div class="di">没有更多了~</div>
        </div>
        <footer>
            <div class="f_left">
                <div class="all">
                    <span :class="{'hot':isALLcheck}"></span>
                    全选
                </div>
                <div class="priceinfo">
                    <div class="heji">
                        合计：<span>￥{{cart.discount}}</span>
                    </div>
                    <p>配送费￥<span>10</span>,包含会员卡费用6元</p>
                </div>
            </div>
            <div class="f_right" :class="{'hot':ispay==true}" @click="jumppay">去结算</div>
        </footer>
    </div>

</template>
<script>
    import jiajiancar from '../common/jiajiancar'
    export default {
        name:'car',
        data(){
            return {
                cart:null,
                recommendGoods:[],
                isemit:true,
                gid:[]
            }
        },
        components:{
            jiajiancar
        },
        computed:{
            isALLcheck(){
                let flag=this.cart.goods.every(ele=>ele.isCheck);
                return flag;
            },
            ispay(){
                let flag;
                if (this.cart){
                flag=this.cart.goods.some(ele=>ele.isCheck);
                return flag
                }
                return flag
            }
        },
        methods:{
            _calcinfo(){
                let total=0;
                let price=0;
                let discount=0;
                this.cart.goods.filter(ele=>ele.isCheck).forEach(ele=>{
                    total+=ele.numbers;
                    price+=ele.numbers * ele.gdiscount;
                });
                discount= price * 0.8;
                this.cart.total=total;
                this.cart.price=price;
                this.cart.discount= discount.toFixed(2);
            },
            getCart(){
                this.cart=localStorage.cart?JSON.parse(localStorage.cart):null;
            },
            getRecommend(){
                this.gid=this.cart.goods.map(ele=>ele.gid).join();
                this.axios.post('/car',{gid:this.gid}).then(res=>{
                    this.recommendGoods=res.data.recommendgoods;
                })
            },
            toggleCheck(gid){
                let goods=this.cart.goods.filter(ele=>ele.gid==gid)[0];
                goods.isCheck=!goods.isCheck;
            },
            jumppay(){
                if (!this.ispay){
                    return
                }
                let uid=sessionStorage.uid;
                // console.log(uid);
                let { total,price,discount }=this.cart
                let goods=this.cart.goods.filter(ele=>ele.isCheck);
                let data={
                    uid,total,price,discount,goods
                };
                if (!uid){
                    this.$router.push({path:'/login'})
                }else {
                    this.axios.post('/order/insert',data).then(res=>{
                        let oid=res.data.oid;
                        this.$router.push({path:'/carsecond',query:{oid:oid}})
                    })

                }

            }
        },
        created:function () {
            this.getCart();
            this.getRecommend();
        },
        watch:{
            cart:{
                handler:function () {
                    this._calcinfo();
                },
                deep:true
            }
        }
    }
</script>

<style scoped>
    @import url(./static/css/car.css);
</style>