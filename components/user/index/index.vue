<template>
    <div class="home-box">
        <loading v-if="isshowloading"></loading>
        <div class="header">
            <span>
                <img src="./static/img/hour.png">
            </span>
            <div style="font-size: 0.3rem">平阳路学府街</div>
            <input type="text" class="form-control" placeholder="搜索">
        </div>
        <div class="body">
            <div class="banner1-info" v-if="catelevel1.length">
                <swiper :options="navSwiperOption" ref="navswiper">
                    <!-- slides -->
                    <swiper-slide v-model="catelevel1" v-for="item in catelevel1" :key="item.cid">
                        <span>{{item.cname}}</span>
                    </swiper-slide>
                    <div class="bar">
                        <span></span>
                    </div>
                </swiper>
            </div>
            <div class="banner2" v-if="catelevel1.length">
                <swiper :options="listSwiperOption" ref="listswiper">
                    <swiper-slide v-for="item in catelevel1" :key="item.cid">
                        <div v-if="goods[item.cid].length" style="height: 100%;overflow:hidden;">
                            <myscroll :data="goods[item.cid]" :ispullingdown="ispullingdown[item.cid]" @pullingDown="getgoods"></myscroll>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="index-footer">
            <a href="">
                <div><img src="./static/img/shouye.png" alt=""></div>
                <p>首页</p>
            </a>
            <router-link :to="{name:'category'}">
                <div><img src="./static/img/fenleihui.png" alt=""></div>
                <p>分类</p>
            </router-link>

            <router-link :to="{name:'car'}">
                <div><img src="./static/img/carhui.png" alt=""></div>
                <p>购物车</p>
            </router-link>
            <router-link :to="{name:'mine'}">
                <div><img src="./static/img/wodehui.png" alt=""></div>
                <p>我的</p>
            </router-link>
        </div>
    </div>
</template>

<script>
    let slideWidth=0;
    let tSpeed=300;
    let navwidth=0;
    // import BScroll from 'better-scroll';
    import loading from '../common/loading'
    import myscroll from "../scroll/betterscroll"
    import Vue from 'vue'
    export default {
        name: "index",
        data(){
            return{
                navSwiperOption:{
                    slidesPerView:6,
                    freeMode:true,
                    on:{
                        init:function () {
                            slideWidth = Number.parseInt(this.slides.eq(0).css('width'));
                            this.$wrapperEl.find('.bar').css('width',slideWidth+'px');
                            for(let i=0;i<this.slides.length;i++){
                              navwidth+=Number.parseInt(this.slides.eq(i).css('width'));
                            }
                        }
                    }
                },
                listSwiperOption:{
                    resistanceRatio:0
                },
                type:1,
                isshowloading:false,
                ispullingdown:{
                    1:true
                },
                catelevel1:[
                ],
                goods:{
                    1:[{},{},{}],
                    2:[{},{},{}],
                    3:[{},{},{}],
                },
                pages:{
                    1:{
                        current:0,
                        total:5
                    },
                    2:{
                        current:0,
                        total:5
                    }
                },
            }
        },
        components:{
            myscroll,
            loading,
        },
        computed:{
            navSwiper(){
                return this.$refs.navswiper.swiper;
            },
            listSwiper(){
                return this.$refs.listswiper.swiper;
            }
        },
        methods:{
            _tapNavswiper(){
                let that=this;
                this.navSwiper.on('tap',function () {
                    let clickedindex=this.clickedIndex;
                    that.listSwiper.slideTo(clickedindex);
                    this.slides.find('span').css('color','#333');
                    this.slides.eq(clickedindex).find('span').css('color','#ff4891');
                });
                this.listSwiper.transitionStart=()=> {
                    let activeindex = this.listSwiper.activeIndex;
                    let navSwiper = this.navSwiper;
                    let bar = navSwiper.$el.find('.bar');
                    bar.transition(tSpeed);
                    this.type=this.catelevel1[activeindex].cid;
                    bar.transform(`translateX(${activeindex * slideWidth}px)`);
                    navSwiper.slides.eq(activeindex).find('span').transition(tSpeed);
                    navSwiper.slides.eq(activeindex).find('span').css('color', '#ff4891');
                    if (activeindex > 0) {
                        navSwiper.slides.eq(activeindex - 1).find('span').transition(tSpeed);
                        navSwiper.slides.eq(activeindex - 1).find('span').css('color', '#333');
                    }
                    if (activeindex < navSwiper.slides.length) {
                        navSwiper.slides.eq(activeindex + 1).find('span').transition(tSpeed);
                        navSwiper.slides.eq(activeindex + 1).find('span').css('color', '#333');
                    }
                    let barposition=activeindex * slideWidth;
                    let clientwidth=window.innerWidth;
                     this.navSwiper.setTransition(tSpeed);
                     if (barposition<(clientwidth - slideWidth)/2){
                         this.navSwiper.setTranslate(0)
                     } else if (barposition >= navwidth -clientwidth){
                         this.navSwiper.setTranslate(clientwidth - navwidth);
                     } else{
                         this.navSwiper.setTranslate((clientwidth - slideWidth)/2-barposition)
                     }
                }
            },
            // _initBSscroll(){
            //     this.bscroll=new BScroll('.wrapper',{
            //         probeType:3,
            //         pullDownRefresh: {
            //             threshold: 50,
            //             stop: 20
            //         },
            //     });
            //     this.bscroll.on('pullingDown',()=>{
            //         setTimeout(()=>{
            //             this.bscroll.finishPullDown();
            //             this.bscroll.refresh()
            //         },3000)
            //     })
            //
            // },
            //...res 扩展运算符防止变为二维数组；
            getcatelevel1(){
                this.axios.get('./admin/cate/querycate').then(res=>{
                    this.catelevel1=res.data;
                    this.type=this.catelevel1[0].cid;
                    this.catelevel1.forEach((obj)=>{
                        this.goods[obj.cid]=[];
                        Vue.set(this.ispullingdown,obj.cid,true)
                        this.pages[obj.cid]={
                            current:0,
                            total:0
                        }
                    });
                    this.$nextTick(()=>{    //文档更新
                        this._tapNavswiper();
                        this.getgoods();
                    });
                })
            },
            getgoods(){
                let pages=this.pages[this.type].current;
                let total=this.pages[this.type].total;
                if (pages>total){
                        return ;
                } else {
                    let currentpage= ++this.pages[this.type].current;
                    //传参，查询字符串或动态路由
                    this.isshowloading=true;
                    this.axios.get(`/goods/cate/${this.type}/${currentpage}`).then(res=>{
                            this.isshowloading=false
                        if (res.data.code==0){
                            if (res.data.data.length){
                                this.goods[this.type].unshift(...res.data.data);
                                this.pages[this.type].total=res.data.total;
                            }else{
                                this.ispullingdown[this.type]=false;
                            }
                        }

                    })
                }
            }
        },
        created:function(){
            this.getcatelevel1();
        },
        watch:{
            type:function () {
                if(!this.pages[this.type].current){
                    this.isshowloading=true;
                    this.getgoods();
                }
            }
        },
        // mounted:function () {
        //
        // }

    }
</script>

<style scoped>
    @import url(./static/css/index.css);
    @import url(//at.alicdn.com/t/font_959737_kgzbpgzr60l.css);
</style>
<style>
    *{
        box-sizing: border-box;
    }
</style>
