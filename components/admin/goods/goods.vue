<template>
    <el-tabs v-model="activename" >
        <el-tab-pane label="商品查看" name="first">
            <!--搜索-->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="gid">
                    <el-input v-model="formInline.gid" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="一级栏目">
                    <el-input v-model="formInline.pnames" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="二级栏目">
                    <el-input v-model="formInline.cname" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="formInline.gname" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
            <!--内容-->
            <el-table :data="goodarr" v-if="goodarr.length" v-loading.body="loading "
                      style="width: 100%;"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="商品名称">
                                    <span>{{ props.row.gname }}</span>
                                </el-form-item>
                                <el-form-item label="所属一级分类">
                                    <span>{{ props.row.pnames }}</span>
                                </el-form-item>
                                <el-form-item label="所属二级分类">
                                <span>{{ props.row.cname }}</span>
                                 </el-form-item>
                                <el-form-item label="商品 ID">
                                    <span>{{ props.row.gid }}</span>
                                </el-form-item>
                                <el-form-item label="商品标签">
                                    <span>{{ props.row.gtag }}</span>
                                </el-form-item>
                                <el-form-item label="商品原价">
                                    <span>{{ props.row.gdiscount }}</span>
                                </el-form-item>
                                <el-form-item label="店铺现价">
                                    <span>{{ props.row.gprice }}</span>
                                </el-form-item>
                                <el-form-item label="商品描述">
                                    <span>{{ props.row.gdes }}</span>
                                </el-form-item>
                                <el-form-item label="商品配送费">
                                    <span>{{ props.row.gfee }}</span>
                                </el-form-item>
                                <el-form-item label="商品缩略图  ">
                                    <img width="200px" :src=" props.row.gthumb " >
                                </el-form-item>
                                <el-form-item label="商品轮播图">
                                    <el-carousel :interval="4000"  height="200px">
                                        <el-carousel-item v-for="item in props.row.gbanner.split(',')" :key="item">
                                            <img :src=" item " alt="">
                                        </el-carousel-item>
                                    </el-carousel>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="商品 ID"
                            prop="gid">
                    </el-table-column>
                    <el-table-column
                            label="商品名称"
                            prop="gname">
                    </el-table-column>
                    <el-table-column
                            label="描述"
                            prop="gdes">
                    </el-table-column>
                    <el-table-column label="操作">
                    <template slot-scope="scope">
                        <router-link tag="el-button"  class="el-button el-button--danger el-button--mini" :to="{name:'updategood',query:{gid:scope.row.gid}}">修改</router-link>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="delgoods(scope.row)"
                                >删除</el-button>
                    </template>
                     </el-table-column>
            </el-table>
            <!--分页-->
            <el-pagination
                    @current-change="currentchange"
                    background
                    :page-size="2"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="商品添加" name="second">
            <el-form :model="goodsform">
                <el-form-item label="一级分类">
                    <el-select v-model="goodsform.cid1" placeholder="请选择一级分类" @change="getcatelevel2">
                        <el-option v-for="item in catelevel1" :label="item.cname" :value="item.cid" :key="item.cid" >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                <el-select v-model="goodsform.cid2" placeholder="请选择二级分类">
                    <el-option v-for="item in catelevel2" :label="item.cname" :value="item.cid" :key="item.cid" >
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="商品名">
                    <el-input v-model="goodsform.gname"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input v-model="goodsform.gdes"></el-input>
                </el-form-item>
                <el-form-item label="商品标签">
                    <el-input v-model="goodsform.gtag"></el-input>
                </el-form-item>
                <el-form-item label="商品缩略图">
                    <el-input type="hidden" v-model="goodsform.gthumb"></el-input>
                    <el-upload
                            action="/uploadimg"
                            :limit="1"
                            list-type="picture-card"
                            :on-remove="handleRemove"
                            :on-preview="handlePictureCardPreview"
                            :on-success="handlethumbsuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <img width="100px"  :src="goodsform.gthumb">
                </el-form-item>
                <el-form-item label="商品原价">
                    <el-input v-model="goodsform.gdiscount"></el-input>
                </el-form-item>
                <el-form-item label="商品现价">
                    <el-input v-model="goodsform.gprice"></el-input>
                </el-form-item>
                <el-form-item label="商品轮播">
                <!--<el-input v-model="goodsform.gbanner"></el-input>-->
                    <el-upload
                            action="/uploadimg"
                            :limit="5"
                            multiple
                            list-type="picture-card"
                            :on-success="handlebannersuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <div  >
                        <img width="100px" :src="item" :key="index"  v-for="(item,index) in bannerarr"/>
                    </div>
                </el-form-item>
                <el-form-item label="商品配送">
                <el-input v-model="goodsform.gfee"></el-input>
                </el-form-item>
                <el-form-item label="商品内容">
                    <richtexteditor v-model="goodsform.gcontent" @change="setgoodscontent"></richtexteditor>
                </el-form-item>
                <el-form-item>
                    <el-button plain @click="handlesubmit">
                        提交
                    </el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import richtexteditor from '../common/richtexteditor/richtexteditor';
    export default {
        name: "goods",
        data:function() {
            return{
                goodsform:{
                   gname:'',
                   gdes:'',
                   gtag:'',
                   gthumb:'',
                   gdiscount:'',
                   gprice:'',
                   gbanner:'',
                   gfee:'',
                   gcontent:'',
                    cid1:'',
                    cid2:''
                },
                formInline:{
                    pid:'',
                    cname:'',
                    pnames:'',
                    gname:''
                },
                loading:true,
                catelevel1:[],
                catelevel2:[],
                dialogImageUrl:'',
                dialogVisible:false,
                bannerarr:[],
                activename:'first',
                goodarr:[],
                currentPage:1,
                total:0,
            };
        },
        methods:{
            currentchange(page){//页码发生改变
                this.currentPage=page;
                this.query();//重新发请求
            },
            query(){
              this.loading=true;
                let obj=Object.assign({},this.formInline,{currentPage:this.currentPage});
              this.axios.get('/admin/good/querygood',{params:obj}).then(res=>{
                  this.goodarr=res.data.data;
                  this.total=res.data.total;
                  this.loading=false;
              })
            },
            delgoods(row){
              this.axios.get('/admin/good/delgood?gid='+row.gid).then(res=>{
                  if (res.data.code==0){
                      this.$message.success(res.data.msg);
                      this.goodarr=this.goodarr.filter(ele=>ele.gid!=row.gid);
                      --this.total;
                  } else{
                      this.$message.error(res.data.msg)
                  }
              })
            },
            search(){
                this.currentPage=1;
                this.query();
            },
            getcatelevel(){
                this.loading=true;
                this.axios.get('/admin/cate/querycate').then(res=>{
                    this.loading=false;
                    this.catelevel1=res.data
                })
            },
            getcatelevel2(vaule){
                this.loading=true;
                this.goodsform.cid2='';
                this.axios.get('/admin/cate/querycatelevel2?cid='+vaule).then(res=>{
                    this.loading=false;
                    this.catelevel2=res.data
                })

            },
            handlethumbsuccess:function(res){
                this.goodsform.gthumb=res
            },
            handlePictureCardPreview:function(file){
                    this.dialogImageUrl = file.url;
                    this.dialogVisible = true;
            },
            handleRemove(){
                this.axios.get('/removeimg?url='+this.goodsform.gthumb).then(res=>{
                    if (res.data.code==0){
                        this.goodsform.gthumb='';
                        this.$message.success(res.data.msg)
                    }
                })
            },
            handlebannersuccess:function(res) {
                this.bannerarr.push(res)
            },
            handlesubmit(){
                this.axios.post('/admin/good/insertgood',this.goodsform).then(res=>{
                        if (res.data.code==0){
                            this.$message.success(res.data.msg)

                        }
                        else {
                            this.$message.error(res.data.msg)
                        }
                })
                // 组建 ref=myupload
                // this.$refs.myupload.uploadFiles()
            },
            setgoodscontent(value){
                this.goodsform.gcontent=value;
                // console.log(this.goodsform.gcontent)
            }

        },
        watch:{
          bannerarr:function(newv) {
              this.goodsform.gbanner=newv.join()
          },
          activename(newv){
              if(newv=='first'){
                  this.query()
              }
          }
        },
        created:function () {
            this.getcatelevel();
            this.query();
        },
        components:{
            richtexteditor,
        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item{
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .el-carousel__item img {
        color: #475669;
        font-size: 14px;
        /*opacity: 0.75;*/
        width: 500px;
        height: 100%;
        margin: 0;
    }
    .el-carousel{
        width:500px;
    }
</style>