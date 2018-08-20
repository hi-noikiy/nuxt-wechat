<template lang="pug">
.container
  .shopping
    .title 手办商城
    .list
      .items(v-for='(item, index) in products' :key='index' @click='showProduct(item)')
        img(:src='item.post')
        .body
          .body-title {{item.title}}
          .body-content {{item.intro}}
    divider 哇,我的底线被你发现了!
</template>

<script>
import { mapState } from 'vuex'

export default {
  head () {
    return {
      title: '手办商城'
    }
  },

  computed: {
    ...mapState([
      'products',
      'imageCDN'
    ])
  },

  methods: {
    showProduct (item) {
      this.$router.push({
        path: '/deal',
        query: {
          id: item._id
        }
      })
    }
  },

  beforeCreate () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style scoped lang='sass' src='~static/sass/shopping.sass'></style>
<style lang="scss" scoped>
.list{
  display:flex;
  flex-direction:column;
  .items{
    width:100%;
    height:120px;
    flex:1;
    border-bottom:1px solid #EEEEEE;
    display:flex;
    flex-direction:row;
    img{
      border-radius:5%;
      border:1px solid #EEEEEE;
      width:44%;
    }
    .body{
      display:flex;
      padding:5px 5px;
      flex-direction:column;
      .body-title{
        font-size:16px;
        margin-top:10px;
        text-align:center;
        margin-bottom:10px;
      }
      
    }
  }
}
</style>





