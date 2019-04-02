<template>
    <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">每日优鲜后台管理系统</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple">-</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light">{{username}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple"><el-button @click="exit">退出</el-button></div></el-col>
    </el-row>
</template>

<script>
    export default {
        name: "myhead",
        data:function() {
            return{
                username:''
            }
        },
        methods:{
          exit(){
              sessionStorage.clear();
              this.$router.push('./adminlogin')
          }
        },
        created:function () {
            this.username = sessionStorage.username
        }
    }
</script>

<style scoped>
    div{
        font-size: 20px;
    }
</style>