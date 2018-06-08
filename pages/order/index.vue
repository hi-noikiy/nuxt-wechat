<template lang="pug">
.container
 x-header(:left-options="{backText:''}") 我的订单
 tab
  tab-item(@on-item-click="selectItem(1)",selected) 已发货
  tab-item(@on-item-click="selectItem(2)") 未发货
  tab-item(@on-item-click="selectItem(3)") 全部订单
 div
    br
    form-preview(header-label="付款金额",header-value="¥2400.00",:body-items="list",:footer-buttons="buttons")
    br
    form-preview(header-label="付款金额",header-value="¥2400.00",:body-items="list",:footer-buttons="buttons")
</template>

<script>
import {Tab,TabItem,XHeader,FormPreview } from 'vux'
export default {
   data(){
      return {
            orderList:[],
            buttons:[{
                style:'default',
                text:'订单详情'
            },{
                style:'primary',
                text:'再来一单'
            }],
            list: [{
                label: '商品',
                value: '电动打蛋机'
            }, {
                label: '标题标题',
                value: '名字名字名字'
            }, {
                label: '标题标题',
                value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
            }]
      }
   },
   created(){
       this.getOrderList()
   },
   methods:{
       selectItem(index){
           alert(index)
       },

       getOrderList(){

       }
   },
   components:{
       Tab,
       TabItem,
       XHeader,
       FormPreview 
   }
}
</script>


<style lang="scss" scoped>
.orderlist{
    margin-bottom:5px;
}
</style>



