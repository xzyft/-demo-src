<template>
    <el-tabs  v-model="activename">
        <el-tab-pane label="查看栏目" name="first">
            <!--搜索-->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="cid">
                    <el-input v-model="formInline.cid" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="栏目名称">
                    <el-input v-model="formInline.cname" placeholder="栏目名称"></el-input>
                </el-form-item>
                <el-form-item label="Pid">
                    <el-input v-model="formInline.pid" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
            <!--分类-->
            <el-table :data="cateArr" v-if="cateArr.length"  v-loading.body="loading "
                      style="width: 100%;"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column label="cid" prop="cid">
                </el-table-column>
                <el-table-column label="所属栏目" prop="cname">
                </el-table-column>
                <el-table-column label="所属父栏目" prop="pid">
                 </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <router-link tag="el-button" class="el-button el-button--text el-button--small" :to="{name:'updatecate',query:{cid:scope.row.cid}}">修改</router-link>
                        <el-button @click="delcate(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--fenye-->
            <el-pagination
                    @current-change="currentchange"
                    background
                    :page-size="2"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="添加栏目" name="second">
            <el-form :model="form">
                <el-form-item label="父级栏目">
                    <el-select v-model="form.pid" placeholder="请选择父级栏目">
                        <el-option label="一级栏目" value="0"></el-option>
                        <el-option :label="items.cname" :value="items.cid" v-for="items in categorys"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="栏目名称">
                    <el-input v-model="form.cname">
                    </el-input>
                </el-form-item>
                 <el-button @click="insertCate">提交</el-button>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "cate",
        data:function() {
            return{
                categorys:[],
                cateArr:[],
                form:{
                    pid:'',
                    cname:''
                },
                activename:'first',
                loading:true,
                formInline:{
                    cid:'',
                    cname:'',
                    pid:'',

                },
                currentPage:1,
                total:0,
            }
        },
        methods:{
            currentchange(page){//页码发生改变
                this.currentPage=page;
                this.getTables();//重新发请求
            },
            getTables(){
                this.loading=true;
                let obj=Object.assign({},this.formInline,{currentPage:this.currentPage});
                this.axios.get('/admin/cate/table',{params:obj}).then(res=>{
                    this.cateArr=res.data.data;
                    this.total=res.data.total;
                    this.loading=false;
                    // console.log(cateArr);
                })
                // console.log(1);
            },
            search(){
                this.currentPage=1;
                this.getTables();
            },
            getCategorys(){
                this.axios.get('/admin/cate/querycate').then(res=>{
                    this.categorys=res.data
                });
            },
            insertCate(){
                this.axios.post('/admin/cate/insertcate',this.form).then(res=>{
                    if (res.data.code==0){
                        this.$message.success(res.data.msg);
                        this.form.cname=''
                    }else if (res.data.code==1){
                        this.$message.fail(res.data.msg)
                    }
                })
            },
            delcate(row){
                this.loading=true;
                this.axios.get('/admin/cate/delcate?cid='+row.cid).then(res=>{
                    this.loading=false;
                    if (res.data.code==0){
                        this.$message.success(res.data.msg);
                        this.cateArr=this.cateArr.filter(ele=>ele.cid!=row.cid);
                        --this.total;
                    } else {
                        this.$message.fail(res.data.msg);
                    }
                })
            }
        },
        watch:{
            activename(newv){
                if(newv=='first'){
                    this.getTables();
                } else if (newv=='second'){
                    this.getCategorys()
                }
            }
        },
        created:function () {
            this.getTables();
        }
    }
</script>

<style scoped>

</style>