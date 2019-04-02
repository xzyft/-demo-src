<template>
    <div style="width: 100%;background: white">
        <div class="headern">
            <div class="headern-body">
                <span class="iconfont icon-cuohao"></span>
                <div class="gengduo">
                    <p class="iconfont icon-weibiaoti2zhuanhuan"></p>
                </div>
            </div>
        </div>
        <div class="headern1">
            <div class="headern1-body">
                <span class="iconfont icon-fanhui" style="color: black">返回</span>
                <p>订单详情</p>
            </div>
        </div>
        <div class="contentn">
            <img src="./static/img/20181211162951.png" alt="">
            <div class="contentn-one">订单已签收</div>
            <div class="contentn-tow"><span>还未收到商品</span><span class="iconfont icon-wenhaoyuanyiwenxianxing"></span></div>
            <div class="san">
                <div class="">申请售后退款</div>
                <div class="hot">去评价</div>
                <div class="hot">再来一单</div>
            </div>
        </div>
        <div class="line"></div>
        <div class="comment1">
            <div class="comment1-des">
                <div class="des-one">
                    <span>配送信息</span>
                    <div>打赏小哥</div>
                </div>
                <div class="des-tow">
                    <span>您的订单已配送成功,如需其他帮助请拨小哥的配送电话,或者你可以联系客服.</span>
                    <p>2018-12-11 15:10:44</p>
                    <div class="iconfont icon-arrow-r"></div>
                </div>
                <div class="des-tow">
                    <span>配送员 张益达</span>
                    <p>为您服务</p>
                    <div class="iconfont icon-dianhualianxi hot">电话联系</div>
                </div>
                <div class="des-tow">
                    <span>樊泽阳 15735181110</span>
                    <p>山西省太原市小店区凯通大厦501</p>
                    <!-- <div class="iconfont icon-dianhualianxi">电话联系</div> -->
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="comment1">
            <div class="comment1-des">
                <div class="des-one">
                    <span>订单信息</span>
                </div>
                <div class="des-one">
                    <span>订单编号:35132231321</span>
                    <div>复制</div>
                </div>
                <div class="des-one">
                    <span>交易流水:ADFSADF5645131sSDFASDf</span>
                </div>
                <div class="des-one">
                    <span>创建时间:2018.12.10</span>
                </div>
                <div class="des-one">
                    <span>付款时间:2018.12.10</span>
                </div>
                <div class="des-one">
                    <span>配送时间:asdfdsafsdf</span>
                </div>
                <div class="des-one">
                    <span>快递单号:asdfdsafsdf</span>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class=comment1>
            <div class="des-one">
                <span>物品详情</span>
            </div>
            <div class="des-tow">
                <ul>
                    <li>
                        <img src="./static/img/1.jpg">
                    </li>
                    <li>
                        <img src="./static/img/2.jpg">
                    </li>
                    <li>
                        <img src="./static/img/1.jpg">
                    </li>
                </ul>
            </div>
        </div>
        <div class="line"></div>
        <div class=comment1>
            <div class="des-one">
                <span><strong>总价</strong></span>
            </div>

            <div class="total_price">
                合计
                <span>￥16.8</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="line">没有更多内容了</div>
    </div>
</template>

<script>
    export default {
        name: "orderlist",
        data:function() {
          return{
              oid:0,
          }
        },
        methods:{
            getorderlist(){
                this.axios.get('/order/orderdetail').then
            }
        },
        created:function() {
            this.oid=this.$router.query.oid
        }
    }
</script>

<style scoped>
    @import url('./static/css/dingdan.css');
    @import url(//at.alicdn.com/t/font_960145_s8m9lm46bfm.css);
    /*html,body{*/
        /*background: white;*/
    /*}*/
</style>