const tip = '我的卡丽熙，欢迎来到河间地\n' +
  '点击 <a href="">一起搞事情吧</a>'


export default async (ctx, next) => {
  const message = ctx.weixin
  let mp = require('../wechat')
  let client = mp.getWechat()

  const tokenData = await client.fetchAccessToken()

  console.log(tokenData)

  console.log(await client.handle('getUserInfo', message.FromUserName, tokenData.access_token))

  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      ctx.body = tip
    } else if (message.Event === 'unsubscribe') {
      console.log('取关了')
    } else if (message.Event === 'LOCATION') {
      ctx.body = message.Latitude + ' : ' + message.Longitude
    } else if (message.Event === 'view') {
      ctx.body = message.EventKey + message.MenuId
    } else if (message.Event === 'pic_sysphoto') {
      ctx.body = message.Count + ' photos sent'
    }
  } else if (message.MsgType === 'text') {
    if (message.Content === '1') {
      
    } else if (message.Content === '2') {
      const menu = require('./menu').default
      await client.handle('delMenu')
      const menuData = await client.handle('createMenu', menu)

      console.log(menuData)
    }else if(message.Content==='开发者'){
       const msg ='我叫了雷博,是上海浦东的一名程序员,爱好Node和C#,下面是程序代码,点击<a href="www.github.com/leibocode">gayhub</a>喜欢给个star哈'
       ctx.body =msg
    }else {
      ctx.body = tip
    }
  } else if (message.MsgType === 'image') {
    ctx.body = {
      type: 'image',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'voice') {
    ctx.body = {
      type: 'voice',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'video') {
    ctx.body = {
      type: 'video',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'location') {
    ctx.body = message.Location_X + ' : ' + message.Location_Y + ' : ' + message.Label
  } else if (message.MsgType === 'link') {
    ctx.body = [{
      title: message.Title,
      description: message.Description,
      picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/xAyPZaQZmH09wYBjskFEQSoM4te0SnXR9YgbJxlDPVPDZtgLCW5FacWUlxFiaZ7d8vgGY6mzmF9aRibn05VvdtTw/0',
      url: message.Url
    }]
  }
}