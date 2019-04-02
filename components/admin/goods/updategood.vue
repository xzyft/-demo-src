<template>
    <div>
        <h3>修改商品</h3>
        <el-form :model="goodsform"
                 style="width: 100%">
            <el-form-item label="一级分类">
                <el-select v-model="goodsform.pnames" placeholder="请选择一级分类" >
                    <el-option :label="item.cname" :value="item.cid" :key="item.cid" v-for="item in catelevel1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="goodsform.cname" placeholder="请选择二级分类">
                    <el-option :label="item2.cname" :value="item2.cid" :key="item2.cid" v-for="item2 in catelevel2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称：">
                <el-input v-model="goodsform.gname"></el-input>
            </el-form-item>
            <el-form-item label="商品描述：">
                <el-input v-model="goodsform.gdes"></el-input>
            </el-form-item>
            <el-form-item label="商品标签：">
                <el-input v-model="goodsform.gtag"></el-input>
            </el-form-item>
            <el-form-item label="商品缩略图：">
                <el-input type="hidden" v-model="goodsform.gthumb" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-upload
                        action="/uploadimg"
                        list-type="picture-card"
                        :limit="1"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl">
                </el-dialog>
                <img :src="goodsform.gthumb" width="50px" height="50px" v-if="goodsform.gthumb">
            </el-form-item>
            <el-form-item label="商品现价：">
                <el-input v-model="goodsform.gdiscount"></el-input>
            </el-form-item>
            <el-form-item label="商品原价：">
                <el-input v-model="goodsform.gprice"></el-input>
            </el-form-item>
            <el-form-item label="商品轮播：">
                <el-input type="hidden" v-model="goodsform.gbanner"></el-input>
            </el-form-item>
            <el-form-item>
                <el-upload
                        action="/uploadimg"
                        list-type="picture-card"
                        :limit="5" multiple
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl">
                </el-dialog>
                <div v-if="bannerArr.length">
                    <img :src="item" :key="index" v-for="(item,index) in bannerArr" width="50px" height="50px">
                </div>
            </el-form-item>
            <el-form-item label="商品配送信息：">
                <el-input v-model="goodsform.gfee"></el-input>
            </el-form-item>
            <el-form-item label="商品内容：">
                <richtexteditor v-model="goodsform.gcontent" ></richtexteditor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" round plain >提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import richtexteditor from '../common/richtexteditor/richtexteditor'
    export default {
        name: "updategood",
        data:function () {
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
                    cid2:'',
                    pnames:'',
                    cname: ''
                },
                catelevel1:[],
                catelevel2:[],
                categorys:[],
                loading:true,
                dialogImageUrl: '',
                dialogVisible: false,
                bannerArr:[],
                activename:'first',
                gid:0,
            }
        },
        // methods:{
        //     //修改
        //     updategoods(){
        //         this.loading=true;
        //         let obj=Object.assign({},this.goodsform,{gid:this.gid});
        //         this.axios.post('/admin/goods/updatecurrentgoods',obj).then(res=>{
        //             this.loading=false;
        //             if (res.data.code==0){
        //                 this.$message.success(res.data.msg);
        //                 this.$router.push({name:'goods'})
        //             } else{
        //                 this.$message.error(res.data.msg);
        //             }
        //         })
        //     },
        //     getCategorys(){
        //         this.loading=true;
        //         this.axios.get('/admin/cate/querylevelcate').then(res=>{
        //             this.loading=false;
        //             this.categorys.push({cname:'一级栏目',cid:0},...res.data);
        //         })
        //     },
        //     getcurrentCate(){
        //         //动态路由
        //         this.loading=true;
        //         this.axios.get('/admin/goods/querycurrentgoods/'+this.gid).then(res=>{
        //             this.loading=false;
        //             if (res.data.code==0) {
        //                 this.goodsform=res.data.data;
        //             }else {
        //                 this.$message.error(res.data.msg)
        //             }
        //         })
        //     },
        //     //获取一级栏目
        //     getcatelevel1(){
        //         this.loading=true;
        //         this.axios.get('/admin/cate/querylevelcate').then(res=>{
        //             this.loading=false;
        //             this.catelevel1=res.data;
        //         })
        //     },
        //     //获取二级栏目
        //     getcatelevel2(value){
        //         this.loading=true;
        //         this.goodsform.cid2='';
        //         this.axios.get('/admin/cate/querylevelcate2?cid='+value).then(res=>{
        //             this.loading=false;
        //             this.catelevel2=res.data;
        //         })
        //     },
        //     //缩略图上传成功
        //     handlethumbSuccess:function(res,file,filelist){
        //         this.goodsform.gthumb=res;
        //     },
        //     //缩略图放大
        //     handlePictureCardPreview(file) {
        //         this.dialogImageUrl = file.url;
        //         this.dialogVisible = true;
        //     },
        //     //缩略图删除
        //     handleRemove(file){
        //         this.axios.get('/removeimg?url='+this.goodsform.gthumb).then(res=>{
        //             if(res.data.code==0){
        //                 this.goodsform.gthumb='';
        //             }
        //         })
        //     },
        //     //轮播图上传成功
        //     handlebannerSuccess(res,file,filelist){
        //         this.bannerArr.push(res);
        //     },
        //     //轮播图删除
        //     handlebannerRemove(file,filelist){
        //         this.axios.get('/removeimg?url='+file.response).then(res=>{
        //             if (res.data.code==0){
        //                 this.bannerArr=this.bannerArr.filter(ele=>ele!=file.response);
        //             }
        //         })
        //     },
        //     //设置内容，富文本编辑
        //     setGcontent(value){
        //         this.goodsform.gcontent=value;
        //     },
        // },
        // //监听轮播图上传情况
        // watch:{
        //     bannerArr:function (newv) {
        //         this.goodsform.gbanner=newv.join();
        //     },
        // },
        // //生命周期函数
        // created:function () {
        //     this.gid=this.$route.query.gid;   //需要修改的gid
        //     this.getcatelevel1();
        //     this.getCategorys();
        //     this.getcurrentCate();
        // },
        components:{
            richtexteditor
        }

    }
</script>

<style scoped>

</style>