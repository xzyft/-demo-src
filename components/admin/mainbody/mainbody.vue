<template>
    <div class="full">
        <el-container class="container">
            <el-header style="z-index:999"  class="el-header">
               <myhead></myhead>
            </el-header>
            <el-container>
                <el-aside   class="el-aside " width="200px" >
                    <myaside></myaside>
                </el-aside>
                <el-main class="el-main">
                    <router-view> </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import myaside from '../common/myaside/myaside'
    import myhead from '../common/myhead/myhead'
    export default {

        name: "mainbody",
        components:{
            myaside,
            myhead
        },
    }
</script>
<style>
    *{
        margin: 0;
        padding: 0;
    }
    a{
        color: #333333;
        text-decoration: none;
    }
</style>
<style scoped>
    .full{
        width:100% ;
        height: 100%;
    }
    .container{
        width: 100%;
        height: 100%;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        /*text-align: center;*/
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        /*text-align: center;*/
    }
</style>