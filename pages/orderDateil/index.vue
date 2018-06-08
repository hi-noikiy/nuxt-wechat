<template lang="pug">
.container
 x-header(title="订单详情")
 br
 form-preview(header-label="付款金额",header-value="¥2400.00",:body-items="list",:footer-buttons="buttons")
 group(title="配送信息")
  cell(title="送达时间")
  cell(title="收货地址")
  cell(title="配送方式")
 group(title="订单信息")
  cell(title="订单号")
  cell(title="支付方式")
</template>

<script>
import {Group,Cell,FormPreview,XHeader,} from 'vux'
export default {
  data(){
      return {
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
  methods:{
      getOrderDateil(){
          
      }
  },
  components:{
      FormPreview,
      XHeader,
      Group,
      Cell
  }
}
</script>
