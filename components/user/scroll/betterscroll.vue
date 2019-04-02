<template>
    <div class="wrapper" ref="myscroll">
        <div>
            <div class="pullingdown" v-if="isLoading" >
                <img src="../index/static/img/load.gif" alt="">
            </div>
            <ul class="shop-list" v-show="data.length" >
                <li v-for="goodsinfo in data" :key="goodsinfo.gid">
                    <router-link :to="{name:'goodsinfo',query:{gid:goodsinfo.gid,cid1:goodsinfo.cid1}}">
                        <img :src="goodsinfo['gthumb']">
                    </router-link>
                    <div class="list-content">
                        <div class="item-title">
                            <p class="sub-title">{{goodsinfo.gname}}</p>
                            <p class="mess-title">{{goodsinfo.gdes}}</p>
                            <p class="item-txt">
                                <span>新人专享</span>
                                <span>100%权威检测</span>
                            </p>
                        </div>
                        <div class="price-info">
                            <div class="price">
                                <span class="now-price">¥{{goodsinfo.gprice}}</span>
                                <del class="bef-price">¥{{goodsinfo.gdiscount}}</del>
                            </div>
                            <jiajiancar :goods="goodsinfo" style="position: relative"></jiajiancar>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import jiajiancar from "../common/jiajiancar"
    import BScroll from 'better-scroll';
    export default {
        name: "betterscroll",
        components:{
            jiajiancar,
        },
        props:{
            data:{
                type:Array,
                require:true,
                default:function () {    //工厂函数
                    return [];
                }
            },
            ispullingdown:{
              type:Boolean,
                default:true,
            },
        },
        data:function(){
            return{
                isLoading:false
            }
        },
        methods:{
            initScroll(){
                if (this.$refs.myscroll) {
                    this.scroll=new BScroll(this.$refs.myscroll,{
                        probeType:3,
                        click:true,
                        pullDownRefresh:{
                            threshold:50,
                            stop:20
                        }
                    });
                    this.scroll.on('scroll',(obj)=>{
                        let y=obj.y;
                        if (y>=50){
                            this.isLoading=true;
                        }
                        if (y<20){
                            this.isLoading=false;
                        }
                    });
                    this.scroll.on('pullingDown',()=>{
                        if (!this.ispullingdown){
                            this.isLoading=false;
                            this.scroll.finishPullDown();
                            return
                        }
                        this.$emit('pullingDown')
                    })
                }
            }
        },
        created:function () {
            this.$nextTick(()=>{
                this.initScroll();
            })
        },
        watch:{
            data:function () {
                setTimeout(()=>{
                    this.scroll.finishPullDown();
                    this.scroll.refresh()
                },20);
            },
            ispullingdown:function() {
                this.scroll.finishPullDown();
                this.scroll.refresh();
                // setTimeout(()=>{
                //     this.scroll.off('scroll');
                //     this.scroll.off('pullingDown')
                // })
            }
        }

    }
</script>

<style scoped>
    .pullingdown{
        height: 1rem;
        width: 1.5rem;
        margin: 0 auto;
        /*text-align: center;*/
    }

    .pullingdown>img{
        width: 100%;
        height: 100%;
    }
</style>