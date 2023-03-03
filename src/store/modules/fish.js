import baseApi from '@/api/base';

const state = {
    fishList:[]
}
const actions = {
    updateFishList ({ state, commit }) {
        return new Promise((resolve, reject)=>{
            baseApi.getfishList().then(res => {
                if (res.data.resultCode === '01') {
                    const { list } = res.data.resultData
                    let fishList = list || []
                    commit('setFishList', fishList)
                    resolve(fishList)
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
    setFishList: (state, list) => {
        state.fishList = list
      }
}
export default {
    state,
    actions,
    mutations
}
