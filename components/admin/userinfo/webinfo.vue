<template>
    <el-tabs >
        <el-tab-pane label="查看信息" name="first">
            <el-table :data="info">
                <el-table-column label="网站名称"  prop="names">
                </el-table-column>
                <el-table-column label="关键字"  prop="keywords">
                </el-table-column>
                <el-table-column label="网站描述"  prop="des">
                 </el-table-column>
                <el-table-column label="联系方式"  prop="phone">
                </el-table-column><el-table-column label="公司地址"  prop="address">
            </el-table-column>
                <el-table-column label="法人代表"  prop="leader">
                </el-table-column>

            </el-table>
        </el-tab-pane>
        <el-tab-pane label="管理信息" name="second">
            <el-form :model="info[0]">
                <el-form-item label="网站名称" >
                    <el-input v-model="info[0].names"></el-input>
                </el-form-item>
                <el-form-item label="关键字" >
                    <el-input v-model="info[0].keywords"></el-input>
                </el-form-item>
                <el-form-item label="网站描述" >
                    <el-input v-model="info[0].des"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" >
                    <el-input v-model="info[0].phone"></el-input>
                </el-form-item>
                <el-form-item label="公司地址" >
                    <el-input v-model="info[0].address"></el-input>
                </el-form-item>
                <el-form-item label="法人代表" >
                    <el-input v-model="info[0].leader"></el-input>
                </el-form-item>
                <el-button @click="updateInfo">提交</el-button>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "webinfo",
        data:function() {
            return{
                info:[
                    {names:'优鲜',keywords:'新鲜'}
                ]
            };
        },
        methods:{
            getInfo(){
                this.axios.get('./admin/webinfo').then(res=>{
                        this.info=res.data
                })
            },
            updateInfo(){
                this.axios.post('/admin/webinfo',this.info[0]).then(res=>{
                        if (res.data.code==0){
                            this.$message.success(res.data.msg)
                        } else{
                            this.$message.error(res.data.msg)
                        }
                })
            }
        },
        created:function() {
            this.getInfo()
        }
    }
</script>

<style scoped>

</style>