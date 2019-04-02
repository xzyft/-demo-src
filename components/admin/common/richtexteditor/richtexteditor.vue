<template>
    <div>
        <div class="toolbar" ref="toolbar"></div>
        <div class="editor" ref="editor"></div>
    </div>
</template>

<script>
    import E from 'wangeditor';
    export default {
        name: "richtexteditor",
        data:function() {
            return{
                info:'',
            }
        },
        props:{
          'value':{
              type:String,
              default:''
          }
        },
        methods:{
            _initEditor(){
                this.editor=new E(this.$refs.toolbar,this.$refs.editor);
                this.editor.customConfig.onchange=(html)=>{
                    this.info=html;
                  this.$emit('change',html);
                };
                this.editor.customConfig.uploadImgServer = '/uploadimgcontent';
                this.editor.customConfig.uploadFileName = 'file';
                this.editor.customConfig.uploadImgHooks = {
                    // before: function (xhr, editor, files) {
                    // },
                    // success: function (xhr, editor, result) {
                    // },
                    // fail: function (xhr, editor, result) {
                    // },
                    // error: function (xhr, editor) {
                    // },
                    // timeout: function (xhr, editor) {
                    //
                    // },

                    customInsert: function (insertImg, result) {
                        var url = result.data[0];
                        insertImg(url)
                    }
                };
                this.editor.create();
            }
        },
        mounted:function() {
            this._initEditor()
        }
    }
</script>

<style scoped>
    .editor{
        border:  1px solid #cccccc  ;
        background-color:#FFFFFF;
    }
</style>