<template lang="pug">
.container
 x-header(title="我的地址")
 cell()
</template>
<script>
import {XHeader , Cell,CellFormPreview  } from 'vux'
export default {
  data(){
      return {
          addressList:[]
      }
  },
  methods:{
      getAddressList(){

      },
      noilzem(){

      }
  },
  components:{
      CellFormPreview,
      Cell,
      XHeader
  }
}
</script>

