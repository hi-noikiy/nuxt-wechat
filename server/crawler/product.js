import cheerio from 'cheerio'
import rp from 'request-promise'
import R from 'ramda'
import _ from 'lodash'
import { writeFileSync } from 'fs' 



const huoy = 'http://www.4399dmw.com'

const sleep =time=>new Promise(resolve=>setTimeout(resolve,time))

export const getHouyingData =async () =>{
    const options ={
        url:'http://www.4399dmw.com/huoying/tupian/',
        transform: body => cheerio.load(body)
     }
     let photos =[]
     const $ =await rp(options)

     console.log('开始分析页面')

     $('#g_img_list').find('li').each(function(){
         const url =$(this).find('.tit').attr('href')
         const title =$(this).find('.tit').text()

         photos.push({
             url,
             title
         })

     })

     console.log(`清洗前共有${photos.length}条数据 `)


     let map =[]
     photos.forEach((item,index)=>{
         if(item.title.search('手办') !=-1){
             map.push(item)
         }
     })

    
     console.log(`包含手办的数据有${map.length}`)
    return map
}

export const getAllPhotos = async ()=>{
    const wiki = await getHouyingData()
    let map =[]
    wiki.forEach((item,index)=>{
         const options ={
             url:`${huoy}/${item.url}`,
             transform: body => cheerio.load(body)
         }
         console.log(`${huoy}${item.url}`);
         const $ = await rp(options);
         console.log('开始分析 页面结构');
         
         //先拿到所有图片的长度
        const nums =$('#smallPhoto').find('li').length
        let imgUrl =$('#bigPhoto').attr('src').substr(-4)
        console.log(imgUrl);
        let intro =$$('.txt').text()
        let images =[]
        for (let index = 1; index <=nums.length; index++) {
            
            images.push(`${imgUrl}`)
        }


        map.push({
            "title":item.title,
            images
        })
         
    })

    console.log('爬去结束')

    //writeFileSync.
}


getAllPhotos()



  


