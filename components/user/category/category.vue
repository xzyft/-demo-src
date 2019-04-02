<template>
    <div class="category">
        <div class="header">
            <div class="mall-home-head">
                <div class="locate-bar">
                    <div class="head-left">
                        <span>2小时达</span>
                        <span>山西省太原市学府街平阳路口凯通大厦501</span>
                        <span><i class="iconfont">&#xe632;</i></span>
                    </div>
                    <div class="head-right">
                        <div class="search-nav">
                            <span><i class="iconfont">&#xe639;</i></span>
                            <span>车厘子</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="category-main">
            <div>
                <div class="main-left">
                    <div class="main-list" id="wrapper1" ref="wrapper1" v-if="catelevel1.length">
                        <ul id="scroller1">
                            <li v-for="item in catelevel1" :key="item.cid" @click="changelevel1(item.cid)"
                                :class="[item.cid==currentlevel1 ? 'active':'']">{{item.cname}}</li>
                        </ul>
                    </div>
                </div>
                <div class="main-right">
                    <div class="main-content"    >
                        <ul>
                            <li class="content" >
                                <div class="contentMain" v-if="catelevel2.length" ref="level2scroll">
                                    <ul class="content-top" ref="contenttop">
                                        <li v-for="(item,index) in catelevel2" :key="item.cid" @click="jumpfloor(index)" :class="{'hot':index===floorindex}">{{item.cname}}</li>
                                    </ul>
                                </div>
                                <div class="opendown"><i class="iconfont">&#xe632;</i></div>
                                <div class="cut"></div>
                                <div class="contentInfo" id="wrapper2" ref="goodsscroll">
                                    <ul>
                                        <li v-for="item in goodslist" ref="goodslist">
                                            <p style="font-size: 0.3rem;" class="category-listtitle">{{item.cname}}</p>
                                            <ul class="content-footer">
                                                <li v-for="goods in item.goods">
                                                    <div class="content-img">
                                                        <img :src="goods.gthumb" alt="">
                                                    </div>
                                                    <div class="content-info">
                                                        <div class="info-name">{{goods.gname}}</div>
                                                        <div class="info-des">{{goods.gdes}}</div>
                                                        <div class="info-price">
                                                            <span>￥<span>{{goods.gprice}}</span></span>
                                                            <div>
                                                                <span class="cdiscount">￥<span>{{goods.gdiscount}}</span></span>
                                                                <span class="vip">会员{{Math.floor(goods.gdiscount/goods.gprice*100)/10}}折</span>
                                                            </div>
                                                        </div>
                                                        <jiajiancar :goods="goods"></jiajiancar>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="main-up" style="display: none">
                        <div class="up">
                            <ul>
                                <li>优选水果</li>
                                <li>优选蔬菜</li>
                                <li>优选肉蛋</li>
                                <li>优选水产</li>
                                <li>优选乳品</li>
                                <li>优选零食</li>
                                <li>优选酒饮</li>
                                <li>优选熟食</li>
                                <li>优选轻食</li>
                                <li>优选素食</li>
                                <li>优选粮油</li>
                                <li>优选日百</li>
                            </ul>
                            <div class="updown"><i class="iconfont">&#xe630;</i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="category-footer">
            <div class="footer-main">
                <router-link :to="{name:'index'}">
                    <img src="./static/img/01.png" alt="">
                    <div class="listname">首页</div>
                </router-link>
                <router-link :to="{name:'category'}">
                    <img src="./static/img/02.png" alt="">
                    <div class="listname active">分类</div>
                </router-link>
                <router-link :to="{name:'category'}">
                    <img src="./static/img/03.png" alt="">
                    <div class="listname">发现</div>
                </router-link>
                <router-link :to="{name:'car'}">
                    <img src="./static/img/04.png" alt="">
                    <div class="listname">购物车</div>
                </router-link>
                <router-link :to="{name:'mine'}">
                    <img src="./static/img/05.png" alt="">
                    <div class="listname">我的</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    // const CLIENTWIDTH=750;
    // const sada=dad;
    import jiajiancar from '../common/jiajiancar'
    import BScroll from 'better-scroll';
    export default {
        name: "category",
        data(){
            return {
                catelevel1:[],
                currentlevel1:0,
                catelevel2:[],
                goodslist:[],
                goodslistheight:[],
                scrollY: 0
            }
        },
        methods:{
            _initlevel1scroll(){
                if (this.$refs.wrapper1){
                    this.scroll=new BScroll(this.$refs.wrapper1,{
                        click:true,
                        scrollbar: {
                            fade: true,
                            interactive: false
                        },
                        bounce: {
                            top: false,
                        }
                    });
                }
            },
            _initlevel2scroll(){
                if (this.$refs.level2scroll){
                    this.level2scroll=new BScroll(this.$refs.level2scroll,{
                        click:true,
                        scrollX:true,
                        scrollY:false,
                    });

                }
                if (this.$refs.goodsscroll){
                    this.goodsscroll=new BScroll(this.$refs.goodsscroll,{
                        click:true,
                        probeType:3
                    });
                    this.goodsscroll.on('scroll',({y})=>{
                        this.scrollY=y;
                    })
                }
            },
            calcheight(){
                let goodslist=this.$refs.goodslist;
                let height=0;
                this.goodslistheight.push(0);
                for (let i=0;i<goodslist.length;i++){
                    height+=goodslist[i].offsetHeight;
                    this.goodslistheight.push(height);
                }

            },
            jumpfloor(index){
                this.goodsscroll.scrollTo(0,-this.goodslistheight[index],300);
            },
            getcatelevel1(){
                this.axios.get('/admin/cate/querycate').then(res=>{
                    this.catelevel1=res.data;
                    this.currentlevel1=this.catelevel1[0].cid;
                    this.getGoodList();
                    setTimeout(()=>{
                        this._initlevel1scroll();
                    },20)
                })
            },
            changelevel1(cid){
                this.currentlevel1=cid;
                this.getGoodList();
                this. goodslistheight=[];
            },
            setcontentwidth(){
                if (this.$refs.contenttop){
                    this.$refs.contenttop.style.width=120 * window.innerWidth/750 * this.catelevel2.length+'px'
                }
            },
            getGoodList(){
                this.axios.get('/goods/goodslist?cid='+this.currentlevel1).then(res=>{
                    this.goodslist=res.data;
                    this.catelevel2=this.goodslist.map(ele=>({cid:ele.cid,cname:ele.cname}));
                    this.$nextTick(()=> {
                        this._initlevel2scroll();
                        this.setcontentwidth();
                        this.calcheight();

                    });
                })
            },
        },
        computed:{
            floorindex(){
                let scroll=-this.scrollY;
                if (this.scrollY>=0){
                    return 0;
                }
                for (let i=0;i<this.goodslistheight.length;i++){
                    let height1=this.goodslistheight[i];
                    let height2=this.goodslistheight[i+1];
                    if (!height2 || (scroll>=height1 && scroll <height2)){
                        return i;
                    }
                }
                return 0
            },
        },
        created:function () {
            this.getcatelevel1();
        },
        components:{
            jiajiancar,
        },
        watch:{
            floorindex(newv){
                let x=-newv *120 * window.innerWidth/750;
                this.level2scroll.scrollTo(x,0,300)
            }
        }
    }
</script>

<style scoped>
    @import url(./static/css/category.css);
    @import url(./static/css/iconfont.css);
</style>