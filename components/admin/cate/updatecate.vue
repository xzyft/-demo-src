<template>
    <div>
        <h3>修改栏目</h3>
                <el-form :model="form" v-loading="loading "
                         style="width: 100%;"
                         element-loading-text="拼命加载中"
                         element-loading-spinner="el-icon-loading"
                         element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-form-item label="父级栏目">
                        <el-select v-model="form.pid" placeholder="请选择父级栏目">
                            <el-option v-for="item in categorys" :label="item.cname" :value="item.cid" >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="栏目名称">
                        <el-input v-model="form.cname">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="updateCate">提交</el-button>
                    </el-form-item>
                </el-form>
    </div>
</template>

<script>
    export default {
        name: "updatecate",
        data:function() {
            return{
                form:{
                    pid:'',
                    cname:''
                },
                categorys:[],
                cid:0,
                loading:true,
            }
        },
        methods:{
            getcurrentCate(){
                this.loading=true
                this.axios.get('/admin/cate/querycurrentcate/'+this.cid).then(res=>{
                    this.loading=false;
                    if(res.data.code==0){
                        this.$message.success(res.data.msg);
                        this.form=res.data.data;
                    } else{
                        this.$message.error(res.data.msg)
                    }
                });
            },
            getCategorys(){
                this.loading=true;
                this.axios.get('/admin/cate/querycate').then(res=>{
                    this.loading=false;
                    this.categorys.push({cname:'一级栏目',cid:0},...res.data)

                });
            },
            updateCate(){
                this.loading=true;
                let obj=Object.assign({},this.form,{cid:this.cid});
                this.axios.post('admin/cate/update',obj).then(res=>{
                    this.loading=false;
                    if(res.data.code==0){
                        this.$message.success(res.data.msg);
                        this.$router.push({name:'cate'})
                    } else{
                        this.$message.error(res.data.msg)
                    }
                })
            }
        },
        created:function () {
            this.cid=this.$route.query.cid;
            this.getcurrentCate();
            this.getCategorys();
        }
    }
</script>

<style scoped>

</style>