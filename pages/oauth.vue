<template lang="pug"></template>
<script>
function getUrlParam (param) {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  const result = window.location.search.substr(1).match(reg)
  console.log(result)
  return result ? decodeURIComponent(result[2]) : null
}

export default {
  head () {
    return {
      title: `loading`
    }
  },
  
  async beforeMount () {
    const url = window.location.href
    const { data } = await this.$store.dispatch('getWechatOAuth', url)
    console.log(data)

    if (data.success) {
      await this.$store.dispatch('setAuthUser', data.data)
      console.log(`getUrl是 ${getUrlParam('state')}`);
      const paramsArr = getUrlParam('state').split('_')
      console.log(`参数是${paramsArr}`)
      const visit = paramsArr.length === 1 ? `/${paramsArr[0]}` : `/${paramsArr[0]}?id=${paramsArr[1]}`
      console.log(`参数是${visit}`);
      this.$router.replace(visit)
    } else {
      throw new Error('用户信息获取失败')
    }
  }
}
</script>
