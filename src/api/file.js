import request from '@/utils/request'
const fileApi = {
  uploadFile: (file, path) => {
    const fd = new FormData()
    fd.append('file', file)
    // fd.append('path', path)
    return request({
      url: '/file/upload',
      method: 'post',
      data: fd
    })
  },
  uploadFilePublic: (file, path) => {
    const fd = new FormData()
    fd.append('file', file)
    // fd.append('path', path)
    return request({
      url: '/public/file/upload',
      method: 'post',
      data: fd
    })
  }
}

export default fileApi
