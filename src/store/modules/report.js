import reportApi from '@/api/report';

const state = {
    reportList:[]
}
const actions = {
    updateReportList ({ state, commit },params) {
        return new Promise((resolve, reject)=>{
            reportApi.getReportList(params).then(res => {
                if (res.data.resultCode === '01') {
                    const { list } = res.data.resultData
                    let reportList = list || []
                    commit('setReportList', reportList)
                    resolve(reportList)
                }else{
                    reject()
                }
            }).catch(err=>{
                reject(err)
            })
        })
    }
}
const mutations = {
    setReportList: (state, list) => {
        state.reportList = list
      }
}
export default {
    state,
    actions,
    mutations
}
