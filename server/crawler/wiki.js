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
    
    let house = []
    $('#tita1 li').each(function(i,item){
        let name = $(this).find('a').text()
        house.push({
            name,
            i
        })
    })
    
    console.log(house)
    house.forEach((i,item)=>{
        if(item.name===item){
            return item.i
        }
    })
    
}

async function fetchCaar(i){
    const options ={
        url:'http://www.4399dmw.com/huoying/',
        transform:body=>cheerio.load(body)
    }

    let $ =await rp(options)

    $('#listi1 ul').eq(i).find('li').each(function(){
        let img =$(this).find('a').eq(0).find('img').attr('img')
        let href = $(this).find('a').eq(0).attr('href') 
        let name =$(this).find('a').eq(1).text()

    }) 
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

    for(let i=0;i<houses.length;i++){
        let house = houses[i]
        console.log(house.name)
        let index = await fetchDetail(house.name)
        console.log(index);
    }



})()