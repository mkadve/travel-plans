var fs = require('fs');
var filePath = './cities.json';
var allCitiesData;
var continentCoordinates = new Array();
exports.getCityNames = (req, res, next) => {
  res.status(200).json({
    cities: getCityArray(req.params.id)
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
      cityObj['location'] = value.location;
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
      // continentGroupedCity.push(continentName, readByContinentId(allCitiesData, continentName));
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
    // let city = allCitiesData.getJSONObject(cityCode.toString());
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
  // continentCoordinates.push(continentId, new Object().push('lat', continentAverageX / cityCount).push('lon', continentAverageY / cityCount));
  continentCoordinates.push(obj);
  return continentCity;
}

function removeContinentFromCityId(allCitiesData, cityId) {
  let allContinentCode = Object.keys(allCitiesData);
  for (const contCode of allContinentCode) {
    let continentStartingPoint = false;
    let continentCity = Object.entries(allCitiesData).contCode;
    for (let i = 0; i < continentCity.length(); i++) {
      if (continentCity[i]['id'] == cityId) {
        this.startingCity = continentCity[i];
        continentStartingPoint = true;
        break;
      }
    }
    if (continentStartingPoint) {
      allCitiesData.pop(contCode);
      break;
    }
  }
  return allCitiesData;
}
exports.createPost = (req, res, next) => {
  const body = req.body;
  // Create post in db
  res.status(201).json({
    message: 'Post created successfully!',
    post: { id: new Date().toISOString(), body }
  });
};
