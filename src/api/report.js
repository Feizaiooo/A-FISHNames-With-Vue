import request from '@/utils/request'
const reportApi = {
    getReportList: (params) => {
        return request({
          url: '/report/list',
          method: 'get',
          params
        })
      },
      updateReport: (data) => {
        return request({
          url: '/report/update',
          method: 'post',
          data
        })
      },
      deleteReport : (data) => {
        return request({
          url: '/report/delete',
          method: 'post',
          data
        })
      },
  }
export default reportApi