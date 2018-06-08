const path =require('path')
const vuxLoader=require('vux-loader')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name:"viewport",content:"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js'
      },
      {
        src: 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    // {
    //   src:'vux/src/style/reset.less'
    // },
    // {
    //   src:'vux/src/style/1px.less'
    // },
    {
      src: 'static/sass/base.sass',
      lang: 'sass?indentedSyntax=true'
    },
    {
      src: 'swiper/dist/css/swiper.css'
    }
  ],
  plugins: [
    {
      src: '~plugins/swiper.js', ssr: false
    },
    {
      src: '~/plugins/vux-plugins',
      ssr: false
    },
    {
      src: '~/plugins/vux-components',
      ssr: true
    }
  ],
  build:{
    extend(config,{isDev,isClient}){
      const configs = vuxLoader.merge(config, {
        options: {
          ssr: true
        },
        plugins: ['vux-ui', {
          name: 'less-theme',
          path: path.join(__dirname, './styles/theme.less')
        }]
      })
      return configs
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
