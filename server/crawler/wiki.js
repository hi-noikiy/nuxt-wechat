const cheerio =require('cheerio')
const { resolve } =require('path')
const rp =require('request-promise')
const { writeFileSync } =require('fs')


async function fetchDetail(item) {
    const options ={
        url:'http://www.4399dmw.com/huoying/',
        transform:body=>cheerio.load(body)
    }

    let $ =await rp(options)
    
    let house ={

    }
    $('#tita1 li').each(function(i,item){
        let name = $(this).find('a').text()
        house.push({})
    })
    
    console.log(house)

}

async function fetchCaar(i){
    const options ={
        url:'http://www.4399dmw.com/huoying/',
        transform:body=>cheerio.load(body)
    }

    let $ =await rp(options)
    let caterList =[]
    $('#listi1 ul').eq(i).find('li').each(function(){
        let img =$(this).find('a').eq(0).find('img').attr('src')
        let href = $(this).find('a').eq(0).attr('href') 
        let name =$(this).find('a').eq(1).text()
        console.log(img)
        console.log(href)
        console.log(name)
        caterList.push({
            img,
            href,
            name
        })
    })
    return caterList
}

async function fetchHouse(item){
    const options ={
        url:'http://www.4399dmw.com/'+item.href,
        transform:body=>cheerio.load(body)
    }

    let houses =[] 

    let $  =await rp(options)

    //
    let name = $('.cont p').eq(0).find('strong').text()
    let info = $('.cont p').eq(1).text()
    let img =$('.cont div').eq(0).find('img').attr('src')

    return {
        name, 
        info,
        img
    }
} 




;(async()=>{
    const options ={
        url:'http://www.4399dmw.com/huoying/',
        transform:body=>cheerio.load(body)
    }
    
    let $ =await rp(options)

    let houses=[]
    $('.dl_list dd').eq(1).find('a').each(function(){
        let href  =$(this).attr('href')
        let name =$(this).text()
        houses.push({
            href,
            name
        })
    })



    
    for(let i=0;i<houses.length;i++){
        let house = houses[i]
        const data =await fetchHouse(house)
        house.title =data.name
        house.info =data.info
        house.img =data.img
    }

    let houseIndex ={
        "火之国":1,
        "水之国":2, 
        "土之国":3,
        "风之国":4,
        "雷之国":5
    }

    for(let i=0;i<houses.length;i++){
        let house = houses[i]
        console.log(house.name)
        let index = houseIndex[house.name]
        if(index==='undefined'){
            
        }else {
            house.cater = await fetchCaar(index)
        }
    }


    console.log(houses)

    writeFileSync(resolve(__dirname,'../crawler/wiki.json'),JSON.stringify(houses,null,2),'utf8')
})()