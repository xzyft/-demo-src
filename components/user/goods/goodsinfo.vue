<template>
    <div class="goodsmain">
        <loading v-if="isLoading"></loading>
        <!--头部-->
        <div id="title-list">
            <span></span>
            <div class="font">商品详情</div>
            <span class="share">
            <img src="./static/img/share.png">
        </span>
        </div>
        <!--主要信息-->
        <div class="maininfo" v-if="goodsinfo">
            <div class="wapper" >
                <div class="banner">
                    <swiper :options="bannerOptions" ref="bannerSwiper">
                        <swiper-slide v-for="(item,index) in banner" :key="index">
                            <img :src="item">
                        </swiper-slide>
                    </swiper>
                    <div class="banner-num">
                        <span class="mun"></span>
                    </div>
                </div>
                <div class="desc">
                    <div class="produxt-title">
                        <span>{{goodsinfo.gdes}}</span>
                    </div>
                    <div class="product-num">
                        <p>{{goodsinfo.gtag}}</p>
                    </div>
                    <div class="product-price">
                        <div class="left">￥<span>{{goodsinfo.gdiscount}}</span></div>
                        <div class="right">已售<span>{{goodsinfo.gcount}}</span>份</div>
                    </div>
                    <div class="product-area">
                        <div>产地 <span>湖南</span></div>
                        <div>2小时到达</div>
                        <div>实付满49包邮</div>
                    </div>
                </div>
                <div class="goodsdiscount">
                    <div class="discount-top">
                        <div class="discount-top-font">优惠</div>
                        <div class="discount-top-desc">详情<i class="iconfont icon-youjiantou"></i></div>
                    </div>
                    <div class="discount-bottom">
                        <img src="./static/img/img.png">
                        <span>每单购买不超过1件，享受此优惠</span>
                    </div>
                </div>
                <div class="card">
                    <div class="cardinner">
                        <img src="./static/img/card.png">
                        <span>开通会员优惠多多</span>
                        <div>去开通 <i class="iconfont icon-youjiantou"></i></div>
                    </div>
                </div>
                <div class="packet">
                    <div class="packetinner">
                        <img src="./static/img/back.png">
                        <span>该商品分享可领49减10红包</span>
                        <img src="./static/img/issue.png" id="issue">
                        <div>去分享<i class="iconfont icon-youjiantou"></i></div>
                    </div>
                    <p>已经有9755人分享了该商品</p>
                </div>
                <div class="finger">
                    <div class="fingerinner">
                        <div class="fingerinner-top">
                            <span>安心指纹</span>
                            <span>点击查看<i class="iconfont icon-youjiantou"></i></span>
                        </div>
                        <div class="fingerinner-bottom">
                            <img src="./static/img/note.png">
                            <p>优鲜安心检测</p>
                        </div>
                    </div>
                </div>
                <div class="light">
                    <div class="lightinner">
                        <div class="lightinner-title">亮点</div>
                        <div class="lightinner-content">
                            <div class="message">
                                <div class="messageimg">
                                    <img src="./static/img/douhao.png">
                                </div>
                                <ul>
                                    <li><div>{{goodsinfo.gdes}}</div></li>
                                    <li>皮薄肉嫩，香甜微酸，入口即化</li>
                                    <li>值得推荐，欢迎品尝！</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="recommend">
                    <div class="recommend-title">推荐商品</div>
                    <swiper class="recommend-content" :options="recommendOption">
                        <swiper-slide class="recommend-content-wapper" v-for="item in recommendGoods" :key="item.gid">
                            <div class="goodslist">
                                <div class="goodslist-img">
                                    <img :src="item.gthumb">
                                </div>
                                <div class="goodslist-title">{{item.gtag}}</div>
                                <div class="goodslist-desc">{{item.gdes}}</div>
                                <div class="goodslist-price">
                                    <div class="goodslist-price-old">￥ <span>{{item.gprice}}</span></div>
                                    <div class="goodslist-price-new">
                                        <span>￥{{item.gdiscount}}</span>
                                        <div class="member-card">会员{{Math.floor(item.gdiscount/item.gprice*100)/10}}折</div>
                                    </div>
                                </div>
                                <div class="goodslist-cart">
                                    <img src="./static/img/new-cart.png" alt="">
                                </div>
                                <!--购物车加减-->
                                <div class="numcart" style="display: none">
                                    <div class="goodsjian">
                                        <img src="./static/img/jian.png" alt="">
                                    </div>
                                    <span>1</span>
                                    <div class="goodsjia">
                                        <img src="./static/img/jia.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="goodsinfo">
                    <div class="goodsinfo-top">
                        <div class="goodsinfo-title">商品详情</div>
                    </div>
                    <div class="goodsinfo-bottom" v-html="goodsinfo.gcontent"></div>
                </div>
            </div>
        </div>
        <!--底部-->
        <div id="footerg">
            <div class="footer-left">
                <img src="./static/img/shop-icon.png">
                <div class="goodsnum" style="display: none">
                    <span>1</span>
                </div>
            </div>
            <div class="footer-right">加入购物车</div>
        </div>
    </div>
</template>

<script>
    import loading from '../common/loading'
    export default {
        name: "goodsinfo",
        data:function () {
            return{
                goodsinfo:null,
                recommendGoods:[],
                gid:0,
                cid1:0,
                isLoading:true,
                banner:[],
                bannerOptions:{
                    resistanceRatio:0,
                    pagination: {
                        el: '.mun',
                        type: 'fraction',
                    },
                },
                recommendOption:{
                    resistanceRatio:0,
                    slidesPerView: 2,
                }
            }
        },
        components:{
            loading
        },
        methods:{
            getGoodsInfo(){
                this.isLoading=true;
                this.axios({
                    methods: 'get',
                    url:'/goods/goodsinfo',
                    params:{
                        gid:this.gid,
                        cid1:this.cid1
                    }
                }).then(res=>{
                    this.isLoading=false;
                    if (res.data.code==0){
                        this.goodsinfo=res.data.goodsinfo;
                        this.banner=res.data.goodsinfo.gbanner.split(',');
                        this.recommendGoods=res.data.recommendgoods;
                    }
                })
            }
        },
        created:function () {
            this.gid=this.$route.query.gid;
            this.cid1=this.$route.query.cid1;
            this.getGoodsInfo();
        },
    }
</script>

<style scoped>
    @import url(./static/css/goodsinfo.css);
    @import url(//at.alicdn.com/t/font_959734_zuly3ap9e5h.css);
</style>
