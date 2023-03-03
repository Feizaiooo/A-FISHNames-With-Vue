<template>
    <div>
        <el-form ref="form" :model="reportForm" size="medium">
            <el-form-item>
                <el-date-picker class="w-full sm:w-auto mb-2" v-model="reportForm.date" type="daterange" align="right"
                    unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
                <div class="sm:inline-block">
                    <el-button @click="getReportList" icon="iconfont icon-search" class="w-1/2 sm:w-auto sm:mx-8"
                        type="primary">查询</el-button>
                    <el-button @click="addReport" icon="iconfont icon-add" class="w-1/2 sm:w-auto"
                        type="primary">添加</el-button>
                </div>
            </el-form-item>
        </el-form>
        <el-table :data="reportList" class="w-table">
            <el-table-column label="记录时间" width="160" prop="date">
                <template slot-scope="scope">{{ parseInt(scope.row.date) | parseTime("{y}-{m}-{d}") }}</template>
            </el-table-column>
            <el-table-column label="内容" prop="content">
            </el-table-column>
            <el-table-column label="操作" prop="active" >
                <template slot-scope="scope">
                    <el-button type="primary" class="iconfont icon-edit  mr-2" @click="editReport(scope.row)">编辑
                    </el-button>
                    <el-button type="danger" class="iconfont icon-ashbin" @click="deleteReport(scope.row.id)">删除
                    </el-button>
                
                </template>
            </el-table-column>
        </el-table>

        <addReportDialog ref="addReportDialog" :editInfo="editInfo" :mode="mode"></addReportDialog>
    </div>
</template>

<script>
import addReportDialog from './components/dialog-add-report.vue'
import reportApi from '@/api/report'
import { mapState } from 'vuex'
export default {
    components: {
        addReportDialog,
    },
    data() {
        return {
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }],
            },
            reportForm: {
                date: ['', ''],
            },
            editInfo:null,
            mode:'add' // edit;add
        }
    },
    computed: {
        ...mapState({
            reportList: state => state.report.reportList,
        })
    },
    mounted() {
        this.getReportList()
    },
    methods: {
        getReportList() {
            const parmas = {
                startDate: this.reportForm.date[0],
                endDate: this.reportForm.date[1],
            }
            this.$store.dispatch('updateReportList', parmas)
        },
        deleteReport(reportId) {
            if (!reportId) return
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                reportApi.deleteReport({ reportId }).then(res => {
                    if (res.data.resultCode === '01') {
                        this.getReportList()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }else{
                        this.$message.error('删除失败');
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        editReport(report){
            this.mode = 'edit'
            console.log(report)
            this.editInfo = report
            this.$refs.addReportDialog.open()
        },
        addReport(){
            this.mode = 'add'
            this.editInfo = null
            this.$refs.addReportDialog.open()
        }
    },
}
</script>
<style lang='scss' scoped>
.w-table {
    width: 100%;
    white-space: pre-line;
    background-color: $base-grey2;

    @media (min-width: 640px) {
        // width: 45rem;
    }
}
</style>