<template>
    <div class="mine">
        <div class="user">
                <router-link :to="{name:'login'}">
                    <a href="javascript:">用户登录 </a>
                </router-link>
        </div>
        <div class="user-item">
            <ul class="user-list">
                <li>
                    <span>0</span>
                    <span>余额<i><img src="././static/image/price.gif" alt="" /></i></span>
                </li>
                <li>
                    <span>0</span>
                    <span>红包</span>
                </li>
                <li>
                    <span>0</span>
                    <span>商品券</span>
                </li>
                <li>
                    <span></span>
                    <span>积分兑换</span>
                </li>

            </ul>
        </div>
        <div class="user-plus">
            <div class="nav">
                <span class="left">会员权利</span>
                <span class="right">开通会员<i class="iconfont icon-arrow-right-copy" style="font-size: 0.25rem;"></i></span>
            </div>
            <div class="money">
                成为优享会员，预计1年将为你
                <span>节省1121.30元 </span>
            </div>
        </div>
        <div class="plus-item">
            <ul class=plus-list>
                <li>
                    <a href="#">
                        <span class=up><img src="./static/image/fan.png" alt="" /></span>
                        <span class=down>购物返现</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class=up><img src="./static/image/king.png" alt="" /></span>
                        <span class=down>会员专享价</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class=up><img src="./static/image/1.png" alt="" /></span>
                        <span class=down>1小时送达</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class=up><img src="./static/image/client.png" alt="" /></span>
                        <span class=down>专享客服</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class=up><img src="./static/image/lue.png" alt="" /></span>
                        <span class=down>敬请期待</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="active-warp">
            <ul class="warp-list">
                <li>
                    <a href="http://www.baidu.com">
                        <img src="./static/image/5.jpg" alt="" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./static/image/4.png" alt="" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./static/image/2.png" alt="" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./static/image/3.png" alt="" />
                    </a>
                </li>
            </ul>
        </div>
        <div class="list-item">
            <ul class="item-list">
                <li>
                    <a href="#">
                        <span>我的订单</span>
                        <span class="iconfont icon-arrow-right-copy"></span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>我的地址</span>
                        <span class="iconfont icon-arrow-right-copy"></span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>账户与安全</span>
                        <span class="iconfont icon-arrow-right-copy"></span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>客服与帮助</span>
                        <span class="iconfont icon-arrow-right-copy"></span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>意见反馈</span>
                        <span class="iconfont icon-arrow-right-copy"></span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>关于我们</span>
                        <span class="iconfont icon-arrow-right-copy"></span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="footer">
            <router-link :to="{name:'index'}">
                <div><img src="./static/image/shouye.png" alt=""></div>
                <p>首页</p>
            </router-link>
            <router-link :to="{name:'category'}">
                <div><img src="./static/image/fenleihui.png" alt=""></div>
                <p>分类</p>
            </router-link>
            <router-link :to="{name:'car'}">
                <div><img src="./static/image/carhui.png" alt=""></div>
                <p>购物车</p>
            </router-link>
            <router-link :to="{name:'mine'}">
                <div><img src="./static/image/person.png" alt=""></div>
                <p>我的</p>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mine"
    }
</script>

<style scoped>
    @import url(static/css/mine.css);
    @import url(//at.alicdn.com/t/font_782771_mnf5qsne4v.css);

</style>