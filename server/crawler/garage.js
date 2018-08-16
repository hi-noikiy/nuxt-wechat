const cheerio =require('cheerio')
const rp =require('request-promise')
const { writeFileSync } =require('fs')
const { resolve } =require('path')

const sleep =time=>new Promise(resolve=>setTimeout(resolve,time))

async function fetchDetail(item) {
    const options ={
        url:'http://www.4399dmw.com'+item.href,
        transform:body=>cheerio.load(body)
    }
    let $ =await rp(options)
    let summary = $('.pic_play_in .txt').text()

    let count = $('#smallPhoto li').length 
    let img =  $('#bigPhoto').attr('src')
    let imgs =[]
    for(let i=0;i<count;i++){
        let imgurl =img
        let number = `00${i}`
        let newUrl = imgurl.replace(/001/i,number)
        imgs.push(newUrl)
    }
    
    return {
        imgs,
        summary
    }
}

;(async()=>{
    const options = {
        url:'http://www.4399dmw.com/huoying/tupian/',
        transform:body=>cheerio.load(body)
    }
    let product =[]
    
    const $ =await rp(options)

    $('.g_img_list li').each(function(){
        const href = $(this).find('a.avatar').attr('href')
        const image =$(this).find('img').attr('src')
        const title =$(this).find('a.tit').text()
        if(title.indexOf('手办')>0){
            product.push({
                href,
                image,
                title
            })
        }
        
    })

   

    for(let i=0;i<product.length;i++){
        let _product =product[i]
        const data =await fetchDetail(_product)
        _product.imgs =data.imgs
        _product.summary =data.summary
    }

    console.log(product)
    writeFileSync(resolve(__dirname,'../crawler/garage.json'),JSON.stringify(product,null,2),'utf8')
})()