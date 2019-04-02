<template>
    <div v-if="order">
        <ul class="head">
            <li><i class="iconfont icon-zuojiantou"></i></li>
            <li>填写订单</li>
            <li></li>
        </ul>
        <!--地址-->
        <div class="abc">
            <div class="dw">
                <div class="dd">公司</div>
                <div class="df">山西省  太原市  小店区</div>
            </div>
            <div class="dz">
                <div class="dzz">凯通大厦  501</div>
                <span><i class="iconfont icon-you"></i></span>
            </div>
            <div class="dh">
                李行风  18135835750
            </div>
        </div>
        <img class="gg" src="./static/img/QQ图片20181211090052.jpg"/>
        <div class="shangpin">
            <div class="da">
                <div class="gang"></div>
                <div class="dazuo">1小时达</div>
                <div class="dayou">今天1小时内送达[可选]<span><i class="iconfont icon-you"></i></span></div>
            </div>
            <div class="yulan">
                <div class="simg" v-if="goods.length">
                    <img v-for="item in  goods" :key="item .gid" :src="item.gthumb"/>
                </div>
                <div class="jshu" v-if="order">
                    共{{ order.total }}件
                    <span><i class="iconfont icon-you"></i></span>
                </div>
            </div>
        </div>
        <!--支付信息-->
        <div class="price-list-panel">
            <ul>
                <li class="frist">
                    <p class="left">商品总价</p>
                    <p class="right">
                        <span class="price" v-if="order">￥{{ order.discount }}</span>
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
                    <p class="right">￥{{order.discount}}</p>
                </li>
                <li>
                    <p class="left">配送费</p>
                    <p class="right">￥10</p>
                </li>
            </ul>
            <div class="total_price">
                合计
                <span>￥{{ order.discount+10 }}</span>
            </div>
        </div>
        <!--会员-->
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

        <!--底部选择支付方式-->
        <div class="explain">
            <div class="e-word">
                <span>优惠说明</span>
                <i class="iconfont icon-wenhao"></i>
            </div>
        </div>
        <div class="storage">
            <div class="pay">
                <span>储值支付(余额￥<span>0</span>)</span>
                <div class="tips">储值送红包+优享会员</div>
            </div>
            <div class="go">去储值<i class="iconfont icon-you"></i></div>
        </div>
        <div class="anotherpay">
            <div class="pay-money">
                <span>还需支付</span>
                <span>￥{{ order.discount+10 }}</span>
            </div>
            <div class="pay-method">
                <ul class="method-list">
                    <li class="method-list-item">
                        <i class="iconfont icon-weixindenglu"></i>
                        <div class="wechat">
                            <div class="w-title">微信支付</div>
                            <span class="w-des">亿万用户的选择，更快更安全</span>
                        </div>
                        <div class="select">
                            <img src="./static/img/dui.png" alt=""  class="selected">
                            <img src="./static/img/quan.png" alt="" class="unselected">
                        </div>
                    </li>
                    <li class="method-list-item second">
                        <i class="iconfont icon-zhifubao1"></i>
                        <div class="wechat">
                            <div class="w-title">支付宝支付</div>
                        </div>
                        <div class="select">
                            <img src="./static/img/dui.png" alt=""  class="selected">
                            <img src="./static/img/quan.png" alt="" class="unselected">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom"></div>
        <div class="tab">
            <ul class="payInfo">
                <li class="need">付款</li>
                <li class="price">￥{{ order.discount+10 }}</li>
                <li class="vip">(包含会员卡费用6元)</li>
                <li class="toPay">
                    <span @click="jump">去支付&nbsp;&nbsp;<i class="iconfont icon-youjiantou1"></i></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "carsecond",
        data:function() {
            return{
                goods:[],
                order:null,
            }
        },
        methods:{
            getorder(oid){
                let uid=sessionStorage.uid
                this.axios.get('/order/query',{params:{uid,oid:oid}}).then(res=>{
                    if (res.data.code==0){
                        this.order=res.data.order;
                        this.goods=res.data.goods;
                    }
                })
            },
            jump(){
                this.$router.push('/success')
            }
        },
        created:function() {
            let oid = this.$route.query.oid
            this.getorder(oid)
        }
    }
</script>

<style scoped>
@import "./static/css/carsecond.css";
@import "//at.alicdn.com/t/font_897190_8jlg25b81sx.css";
@import "//at.alicdn.com/t/font_959808_a3a00kpvevj.css";
</style>