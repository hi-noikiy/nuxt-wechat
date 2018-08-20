<template lang="pug">
.container
  .product-header
    .
  .product-bottom
</template>

<script>
import cell from '~components/cell.vue'
import { mapState } from 'vuex'
import wechat from '~static/mixins/wechat.js'
function toggleModal (obj, content) {
  clearTimeout(obj.timer)
  obj.visible = true
  obj.content = content
  obj.timer = setTimeout(() => {
    obj.visible = false
  }, 1500)
}
export default {
  head () {
    return {
      title: '购买页面'
    }
  },
   //http://p14yvkd2x.bkt.clouddn.com/products/jqev3f4662k10992fowh83rjoor1azxj
   //http://p14yvkd2x.bkt.clouddn.com/products/jqev3f4662k10992fowh83rjoor1azxj
  data () {
    return {
      swiperConfig: {
        autoplay: 4000,
        direction: 'horizontal',
        loop: true,
        pagination: '.swiper-pagination'
      },
      attentions: [
        '商品和服务的差异',
        '清关服务',
        '物流服务',
        '需要更多帮助，请联系管理员'
      ],
        
      showInfo: false,
      info: {
        name: '',
        phoneNumber: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapState({
      'imageCDN': 'imageCDN',
      'product': 'currentProduct',
      'qiniu':'currentCDN'
    })
  },
  methods: {
    async handPayment () {
      const that = this
      const {
        name,
        address,
        phoneNumber
      } = this.info
      if (!name || !address || !phoneNumber) {
        toggleModal(this.modal, '收货信息忘填了哦~')
        return
      }
      const res = await this.$store.dispatch('createOrder', {
        productId: this.product._id,
        name: name,
        address: address,
        phoneNumber: phoneNumber
      })
      const data = res.data
      if (!data || !data.success) {
        toggleModal(this.modal, '服务器异常，请等待后重新尝试')
        return
      }
      window.wx.chooseWXPay({
        timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.package, // 统一支付接口返回的 prepay_id 参数值，提交格式如：prepay_id=***）
        signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.paySign, // 支付签名
        success: (response) => {
          try {
            window.WeixinJSBridge.log(response.err_msg)
          } catch (e) {
            console.error(e)
          }
          if (response.err_msg === 'get_brand_wcpay_request:ok') {
            // 支付成功
            toggleModal(that.modal, '支付成功')
          }
        }
      })
    },
  },
  mixins: [wechat],
  async beforeMount () {
    const id = this.$route.query.id
    const url = window.location.href
    this.$store.dispatch('showProduct', id)
    await this.wechatInit(url)
  },
  components: {
    cell
  }
}
</script>

<style scoped lang='sass' src='~static/sass/deal.sass'></style>
