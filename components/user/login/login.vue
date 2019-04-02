<template>
    <div>
        <header>
            <div class="header">
                <a href="" class="iconfont icon-fanhui"></a>
                <span>登录</span>
                <div></div>
            </div>
        </header>

        <div class="login">
            <form id="myform"></form>
            <input type="text" v-model="phone" placeholder="请输入手机号" form="myform">
            <input type="password" v-model="password" placeholder="请输入密码" form="myform">
            <button @click="login" :class="{'hot':flag==true}">登录</button>
            <router-link :to="{name:'registe'}" class="registe">还没账号？请注册</router-link>
            <div class="text">为方便您及时查询订单信息，需要验证您的手机号来登录</div>
        </div>

        <div class="fast">
            <div>其他方式登录</div>
            <div>
                <a href="" class="iconfont icon-weixin"></a>
                <div>微信登录</div>
            </div>
            <div>
                未注册过的用户将直接为您创建优鲜账户
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data:function(){
            return{
                phone:'',
                password:'',
            }
        },
        computed:{
            flag(){
                if (this.phone.trim() && /^[A-z]\w{5,15}/.test(this.password.trim())){
                    return true
                }
                return false
            }
        },
        methods:{
            login(){
                if (!this.flag){
                    return
                }
                this.axios.post("/registe",{phone:this.phone,password:this.password}).then(res=>{
                    if(res.data.code==0){
                        sessionStorage.uid=res.data.uid
                        this.$message.success(res.data.msg)
                        let redirect=this.$route.query.redirect || '/';
                        this.$router.push(redirect)
                    } else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
      }
    }
</script>

<style scoped>
    @import url(//at.alicdn.com/t/font_959450_nzom9m15698.css);
    @import url(./static/css/login.css);
</style>