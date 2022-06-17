const axios = require('axios')

let getWeather = async function(req,res){
    try{
        let city = req.query.q
        let key = req.query.appid
        if(city && key){
        let options = {
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
        }
        let result = await axios(options)
        res.status(200).send({status:true, msg: result.data})
    }else{
        res.status(400).send({status: false, msg: "Please provide valid city or key"})
    }

    }catch (error){
        res.status(500).send({error: error.message})
    }
}

let tempOfLondon = async function(req,res){
    try{
        let city = "London"
        let key = req.query.appid
        if(key){
        let options = {
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
        }
        let result = await axios(options)
        res.status(200).send({status:true, msg: result.data.main.temp})
    }else{
        res.status(400).send({status: false, msg: "Please provide valid  key"})
    }

    }catch (error){
        res.status(500).send({error: error.message})
    }
}


let tempOfCities = async function(req,res){
    try{
        let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let key = req.query.appid
        if(key){

            let temp = []
            let temp1= []
            for(let i=0; i<cities.length; i++){
                
                let options = {
                    method : "GET",
                    url : `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=${key}`
                }
                let result = await axios (options)
                let tempOfCity = result.data.main.temp
                temp.push([cities[i] , tempOfCity] )
                temp1.push(tempOfCity)
                
            }
        
            let sortAccordingToTemp = temp.sort((a,b) => (a[1]- b[1]))
            
            
            let arr=[]
            for(let j=0;j<sortAccordingToTemp.length;j++){
                const element = sortAccordingToTemp[j]
                let obj={}
                obj["city"]=element[0]
                obj["temp"]=element[1]
                arr.push(obj)
            }
               
            res.status(200).send({status: true, msg: arr})
        }else{
            res.status(400).send({status: false, msg: "please provide valid key"})
        }

    }catch(error){
        res.status(500).send({error : error.message})
    }
}

module.exports.getWeather = getWeather
module.exports.tempOfLondon = tempOfLondon
module.exports.tempOfCities = tempOfCities