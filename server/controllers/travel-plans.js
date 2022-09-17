var fs = require('fs');
var kdTree = require("static-kdtree");
var filePath = './cities.json';
var allCitiesData;
var continentCoordinates = new Array();
exports.getCityNames = (req, res, next) => {
  res.status(200).json({
    cities: getCityArray(req.params.id)
  });
};

exports.createPlans = (req, res, next) => {
  const body = req.body;
  this.allCitiesData = JSON.parse(fs.readFileSync(filePath));
  //starting city which is visited removed the continent not needed for computation
  let sourceCity = body;
  
  let finalpath = `${sourceCity.id} (${sourceCity.name}, ${sourceCity.contId})`;
  
  let continentPath = findShortestPathContinents(body, this.allCitiesData);
  let removedCity = removeContinentFromCityId(this.allCitiesData,body.id);


  let totalDistanceTravelled = 0;
		let prevLatX = sourceCity.lat;
		let prevLatY = sourceCity.lon;

    finalpath += `${shortestDistanceCity.id} (${shortestDistanceCity.name}, ${shortestDistanceCity.contId})`;
    
    for (const [key, value] of continentPath) {
      console.log('continentPath',continentPath)
      finalPath += " --> ";
      let shortestDistanceCity = findShortestCityInContinentFromCoordinate(sourceCity,value.contId);
      finalpath = `${shortestDistanceCity.id} (${shortestDistanceCity.name}, ${shortestDistanceCity.contId})`;

      let coordinatesValue = shortestDistanceCity.x;
      totalDistanceTravelled +=getDistanceFromLatLonInKm(prevLatX,prevLatY,coordinatesValue[0],coordinatesValue[y]);
      prevLatX = coordinatesValue[0];
      prevLatY = coordinatesValue[1];

      finalpath = ` --> Back To ${sourceCity.id} (${sourceCity.name}, ${sourceCity.contId})`;
      totalDistanceTravelled += getDistanceFromLatLonInKm(prevLatX,prevLatY,sourceCity.location.id,sourceCity.location.lon);
      break;
    }
    

  res.status(201).json({
    message: 'Post created successfully!',
    data: { distanceTravelled: totalDistanceTravelled, path: finalpath }
  });
};

function getCityArray(search) {
    this.allCitiesData = JSON.parse(fs.readFileSync(filePath));
    let cityNameArray = Object.entries(this.allCitiesData);
    let cityList = []; 
    for (const [key, value] of cityNameArray) {
      let cityObj = {}
      cityObj['id'] = key;
      cityObj['name'] = value.name;
      cityObj['contId'] = value.contId;
      cityObj['lat'] = value.location.lat;
      cityObj['lon'] = value.location.lon;
      cityList.push(cityObj);
    }
    var condition = new RegExp(search);
    let result = cityList.filter(function (el) {
      return condition.test(el.name);
    });
    
    return result;
}

function getCityNames() {
  this.allCitiesData = JSON.parse(fs.readFileSync(filePath));
  return groupCityByContinent(this.allCitiesData);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function groupCityByContinent(allCitiesData) {
  // let allCityCode = Object.keys(allCitiesData);
    let continentList = new Array();
    let continentGroupedCity = new Object();
    continentList.push('south-america');
    continentList.push('europe');
    continentList.push('asia');
    continentList.push('north-america');
    continentList.push('africa');
    continentList.push('oceania');
    for (const continentName of continentList) {
      continentGroupedCity[continentName] = readByContinentId(allCitiesData, continentName)
    }
    return continentGroupedCity;
}

function readByContinentId(allCitiesData, continentId) {
  let allCityCode = Object.keys(allCitiesData);
  let continentCity = new Array();
  let continentCoordinates = new Array();
  let continentAverageX = 0;
  let continentAverageY = 0;
  let cityCount = 0;
  for (const cityCode of allCityCode) {
    let city = allCitiesData[cityCode];
    if (city['contId'] == continentId) {
      let customCityData = new Object();
      customCityData['id'] = city['id'];
      customCityData['name'] = city['name'];
      customCityData['location'] = city['location'];
      customCityData['countryName'] = city['countryName'];
      customCityData['contId'] = city['contId'];
      continentCity.push(customCityData);
      continentAverageX += city['location']['lat'];
      continentAverageY += city['location']['lon'];
      cityCount++;
    }
  }
  let obj = {
    continentId,
    lat: continentAverageX / cityCount,
    lon: continentAverageY / cityCount
  }
  continentCoordinates.push(obj);
  return continentCity;
}

function removeContinentFromCityId(allCitiesData, cityId) {
  let allContinentCode = Object.keys(allCitiesData);
  for (const contCode of allContinentCode) {
    let continentStartingPoint = false;
    let continentCity = Object.entries(allCitiesData);
    for (const [key, value] of continentCity) {
      
      if (value['id'] == cityId) {
        this.startingCity = continentCity[key];
        continentStartingPoint = true;
        break;
      }
      if (continentStartingPoint) {
        allCitiesData.pop(contCode);
        break;
      }
    }
    
  }
  return allCitiesData;
}

function findShortestCityInContinentFromCoordinate(sourceCity,citiesList) {
    let cityList = Object.entries(citiesList);
		let numPoint = cityList.length;
    var tree = new kdTree(numPoint);
     for (let i = 0; i < numPoint ; i++) {
      let city = cityList[i];
      let coordinates = [];
      coordinates[0] = city.location.lat;
      coordinates[1] = city.location.lon;
      tree.add(coordinates,city.contId,city.id,city.name);
      let kdn = tree.nn(coordinates);
      return kdn;
    }
}


function  findShortestPathContinents(sourceContId ,readData) {
  let tempContinentCoord = Object.entries(readData);
  // console.log('called ---->',tempContinentCoord)
  let contiShortestPath = new Array();
  let shortestDistance = Number.MAX_VALUE;
  let prevLat = sourceContId.lat;
  let prevLon = sourceContId.lon;

  let index = tempContinentCoord.findIndex((val)=> val.id == sourceContId);
  if(index > -1) {
    tempContinentCoord.slice(index,1);
  }
  let nearbyContId = sourceContId.id;

  
  while(tempContinentCoord.length > 0) {
    for(const [key, value] of tempContinentCoord) {
     let contId = value.id;
     let location = value.location;
    let distanceFromSource = getDistanceFromLatLonInKm(prevLat,prevLon,location.lat,location.lon);
      if (distanceFromSource < shortestDistance) {
        shortestDistance = distanceFromSource;
        nearbyContId = sourceContId;
      }
    }
    
    contiShortestPath.push(nearbyContId);
    prevLat = nearbyContId['lat'];
    prevLon = nearbyContId['lon'];

    const contIndex = tempContinentCoord.findIndex((val)=> val.id === nearbyContId);
    if (contIndex > -1 ) {
      tempContinentCoord.slice(contIndex,1);
    }
    shortestDistance = Number.MAX_VALUE;
  }
  return contiShortestPath;
}

