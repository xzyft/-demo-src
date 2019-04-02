<template>
    <div class="logins">
        <el-container>
            <el-header class="el-header">每日优鲜后台登录</el-header>
            <el-main class="el-main">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="用户名" prop="username">
                        <el-input placeholder="Username" v-model="form.username">  </el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input placeholder="Password" v-model="form.password">  </el-input>
                    </el-form-item>
                    <el-button @click="handleSubmit" plain>登录</el-button>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "login",
        data:function() {
            return{
                form:{
                    username:'',
                    password:''
                },
                rules:{
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 5, max: 9, message: '长度在 5 到 9 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            handleSubmit(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.axios.post('/admin/login',this.form).then(res=>{
                            if (res.data.code==0){
                                this.$message({
                                    message:res.data.msg,
                                    type:'success'
                                });
                                this.$router.push('/adminmains');
                                sessionStorage.username=this.form.username
                            }
                        else{
                                this.$message({
                                    message:res.data.msg,
                                    type:'error'
                                });
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .logins{
        width: 500px;
        height: 300px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;

    }
    .el-header{
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
        width: 100%;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        width: 100%;
    }
</style>