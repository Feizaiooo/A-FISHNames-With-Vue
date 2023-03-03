const localStorageUtils = {
  set(key,value){
    localStorage.setItem(key, value)
    localStorage.setItem(key + '__fish', value)
  },
  get(key){
    var value = localStorage.getItem(key)
    if (!value) {
      return null
    }
    return value
  },
  remove (key) {
    localStorage.removeItem(key)
    localStorage.removeItem(key + '__fish')
  }
}

export { localStorageUtils }
