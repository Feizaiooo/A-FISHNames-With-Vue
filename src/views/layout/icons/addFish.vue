<template>
    <div>
        <el-button class="border-0 text-2xl px-2 py-1" icon="el-icon-plus" circle @click="dialogForm = true">
        </el-button>
        <el-dialog title="新增" :visible.sync="dialogForm" width="90%" @close="closeDialog()" :show-close="!loading" :close-on-click-modal="false" :close-on-press-escape="false"	>
            <el-form :fullscreen="false" :disabled="loading">
                <el-form-item label="中文">
                    <el-input v-model="form.cnName"></el-input>
                </el-form-item>
                <el-form-item label="日文">
                    <el-input v-model="form.jpName"></el-input>
                </el-form-item>
                <el-form-item label="假名">
                    <el-input v-model="form.kana"></el-input>
                </el-form-item>
                <el-upload :action="uploadUrl" name="file" :before-remove="beforeRemove"
                    :on-success="handleUploadSuccess" ref="fileUploadControl">
                    <el-button size="small" type="primary" class="inline-block">上传图片</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                </el-upload>
                <el-form-item label="B站链接">
                    <el-input v-model="form.bilibiliUrl"></el-input>
                </el-form-item>
                <el-form-item label="油管链接">
                    <el-input v-model="form.utuberUrl"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.note"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addFish"  :loading="loading">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>

<script>
import baseApi from '../../../api/base';

export default {
    components: {},
    data() {
        return {
            dialogForm: false,
            form: {
                cnName: '',
                jpName: '',
                kana: '',
                bilibiliUrl: '',
                utuberUrl: '',
                note: '',
            },
            fileList: [],
            loading:false,
            uploadUrl:'http://localhost:3000/file/upload'
        }
    },
    computed: {},
    mounted() {
    },
    methods: {
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        handleUploadSuccess(response, file) {
            if (response.resultCode == "0") {
                this.fileList.push(response.resultData.file.fileId);
            }
        },
        addFish() {
            const data = this.form
            data.imageIds = this.fileList
            baseApi.addFish(data).then(res => {
                if (res.data.resultCode === '0') {
                    this.dialogForm = false
                    this.$store.dispatch('updateFishList')
                }
            })
        },
        closeDialog(){
            Object.keys(this.form).forEach(key => {
                this.form[key] = ''
            })
            this.$refs.fileUploadControl.clearFiles()
        }
      
    },
}
</script>
<style lang='scss'>

</style>