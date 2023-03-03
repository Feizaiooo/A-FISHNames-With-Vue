<template>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="340px" >
        <el-form ref="form" :model="form">
            <el-form-item label="记录日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
            </el-form-item>
            <el-form-item label="内容">
                <el-input  type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                    v-model="form.content">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-col class="mt-12">
                    <el-button type="primary" class="w-full" @click="onSubmit" :loading="loading">提交</el-button>
                </el-col>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import { commonUtils } from '@/utils/common'
import reportApi from '@/api/report'
export default {
    components: {
        quillEditor
    },
    props:{
        editInfo:{
            type:Object,
            default:()=>{
                return null
            }
        },
        mode:{
            type:String,
            default:'add'
        }
    },
    data() {
        return {
            form: {
                date: new Date(),
                content: '',
                id:'',
                week:''
            },
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
                        // ['blockquote', 'code-block'], // 引用  代码块
                        [{ header: 1 }, { header: 2 }], // 1、2 级标题
                        [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
                        // [{ script: 'sub' }, { script: 'super' }], // 上标/下标
                        // [{ indent: '-1' }, { indent: '+1' }], // 缩进
                        // [{ direction: 'rtl' }], // 文本方向
                        [{ size: ['12', '14', '16', '18', '20', '22', '24', '28', '32', '36'] }], // 字体大小
                        [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
                        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                        [{ font: ['songti'] }], // 字体种类
                        // [{ align: [] }], // 对齐方式
                        ['clean'], // 清除文本格式
                        // ['image', 'video'] // 链接、图片、视频
                    ]
                },
                placeholder: '请输入正文'
            },
            dialogVisible: false,
            loading :false
        }
    },

    computed: {

    },
    watch:{
        editInfo:{
            immediate:true,
            handler(val){
                if(val){
                    this.form.date =commonUtils.parseTime(parseInt(val.date),'{y}-{m}-{d}')
                    this.form.content = val.content
                    this.form.id = val.id
                    this.form.week =  val.week
                }else{
                    this.form.date =new Date()
                    this.form.content = ''
                    this.form.id = ''
                    this.form.week = ''
                }
                
            }
        }
       
    },
    mounted() {
    },
    methods: {
        open() {
            this.dialogVisible = true
        },
        onSubmit() {
            this.loading = true
            var weekArr = new Array("日", "一", "二", "三", "四", "五", "六");  
            this.form.week = weekArr[new Date(this.form.date).getDay()]
            reportApi.updateReport(this.form).then(res => {
                this.loading = false
                if (res.data.resultCode === '01') {
                    this.$message({
                        message: '记录成功',
                        type: 'success'
                    });
                    this.$store.dispatch('updateReportList')
                   this.dialogVisible = false
                }else{
                    this.$message.error('记录失败');
                }
            }).catch(err=>{
                this.loading = false
                this.$message.error(err);
              
            })
        }
    },
}
</script>
<style lang='scss'>

</style>