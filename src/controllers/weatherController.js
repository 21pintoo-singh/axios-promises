const axios = require('axios')

let getWeather = async function(req,res){
    try{
        let loc = req.query.location
        let apiId = req.query.apiId
       
            console.log(loc)
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiId}`
        }
        let result = await axios(options);
        let data = result.data
        res.status(200).send({msg: data, status: true})
    }
  
    catch (err){
        res.status(500).send({msg: err.message})
    }
}


let tempOfLondon = async function(req,res){
    try{
        let loc = req.query.location
        let apiId = req.query.apiId
        console.log(loc)
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiId}`
        }
        let result = await axios(options);
        let data = result.data
        let londonTemp = data.main.temp
        res.status(200).send({location: loc,
        temparature: londonTemp})
    }
        
    
    catch (err){
        res.status(500).send({msg: err.message})
    }
}


let tempOfCities = async function(req,res){
    try{
        let loc = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let apiId = req.query.apiId
        if(apiId){

            let temp = []
            let temp1= []
            for(let i=0; i<loc.length; i++){
                
                let options = {
                    method : "get",
                    url : `http://api.openweathermap.org/data/2.5/weather?q=${loc[i]}&appid=${apiId}`
                }
                let result = await axios (options)
                let tempOfCity = result.data.main.temp
                temp.push([loc[i] , tempOfCity] )
                temp1.push(tempOfCity)
                
            }
        
            let sortAccordingToTemp = temp.sort((a,b) => (a[1]- b[1]))
            
            
            let arr=[]
            for(let j=0;j<sortAccordingToTemp.length;j++){
                const element = sortAccordingToTemp[j]
                let obj={}
                obj["loc"]=element[0]
                obj["temp"]=element[1]
                arr.push(obj)
            }
               console.log(arr)
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