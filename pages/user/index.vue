<template lang="pug">
.container
 .header
  img.avatar()
  .nickname 
 group
  cell(v-for="(item,index) in items",:key="'cell'+index",@click.native="showItems(item)",
  :title="item.text",is-link)
   img()
 group
  cell(title="清楚缓存",is-link)
  cell(title="关于我",is-link)
</template>

<script>
import { mapState  } from 'vuex'
import { Cell } from 'vux'
export default {
  //middleware:'wechat-auth',
  head(){
    return {
       title:'我的'
    }
  },
  data(){
    return {
       items:[
         {
                icon:'../../static/img/iconfont-order.png',
                text:'我的订单',
                path:'/order'
            },
            {
                icon:'../../static/img/iconfont-addr.png',
                text:'收货地址',
                path:''
            },
            {
                icon:'../../static/img/iconfont-kefu.png',
                text:'联系客服',
                path:''
            },
            {
                icon:'../../static/img/iconfont-help.png',
                text:'常见问题',
                path:''
            }
       ],
       
    }
  },
  methods:{
    showItems(item){
       this.$router.push({
          path:item.path
       })
    }
  },
  computed:{
    ...mapState([
        "user"
    ])
  },
  components:{
    "Cell":Cell
  }
}
</script>
<style scoped>
.header {
	background: #42BD56;
  padding: 32%;
}
.div{
  background-color:#666;
  width:100%;
  height:15px;
}
.header .avatar {
	display: block;
	margin: 0 auto;
	width: 160rpx;
	height: 160rpx;
	border-radius: 50%;
}
.header .nickname {
	color: #000;
	font-size: 42px;
	line-height: 2.4;
	text-align: center;
}
</style>

