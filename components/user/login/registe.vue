<template>
    <div>
        <header>
            <div class="header">
                <a href="" class="iconfont icon-fanhui"></a>
                <span>注册</span>
                <div></div>
            </div>
        </header>

        <div class="login">
            <form id="myform"></form>
            <input type="text" placeholder="请输入手机号" class="usertext" form="myform" v-model="phone">
            <input type="password" placeholder="请输入密码" class="usertext" form="myform" v-model="password">
            <div class="form-protocol">
                <input type="checkbox" class="check" v-model="isCheck">
                <span>我已认真阅读、理解并同意</span>
                <span class="importanttext">《每日优鲜用户协议》</span>
                <span>及</span>
                <span class="importanttext">《每日优鲜隐私策略》</span>
            </div>
            <button @click="registe" :class="{'hot':flag==true}">注册</button>
            <router-link :to="{name:'login'}"  class="registe">已注册？请登录</router-link>
            <div class="text">为方便您及时查询订单信息，需要验证您的手机号来登录</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "registe",
        data:function(){
            return{
                phone:'',
                password:'',
                isCheck:false,
            }
        },
        computed:{
            flag(){
                if (this.phone.trim() && this.password.trim() && this.isCheck){
                    return true
                }
                return false
            }
        },
       methods:{
            registe(){
                if (!this.flag){
                    return
                }
                this.axios({
                    methods: 'get',
                    url:'/registe/reg',
                    params:{
                        phone:this.phone,
                        password:this.password,
                    }
                    }).then(res=>{
                        if(res.data.code==0){
                            this.$message.success(res.data.msg)
                            this.$router.push('/login')
                        } else{
                            this.$message.error(res.data.msg)
                        }
                })
            },
           checkregiste(){},
       }
    }
</script>

<style scoped>
    @import url(//at.alicdn.com/t/font_959450_nzom9m15698.css);
    @import url(./static/css/registe.css);
</style>