function City(location, city_code, continent, name) {
    this.lat = 0.0;
  this.lon = 0.0;
    this.cityCode = null;
    this.name = null;
    this.continent = null;
    this.distanceWithOtherCities = null;
 
    jv_Object.call(this);
    this._CityInit();
    this.lat = (location.get("lat"));
    this.lon = (location.get("lon"));
    this.cityCode = city_code;
    this.continent = continent;
    this.name = name;
 }
 
 var City_c = sc_newClass("City", City, jv_Object, null);
 
 City_c.toString = function ()  {
    if (this.hasOwnProperty("$protoName")) {
       return jv_Class_c.toString.apply(this, arguments);
    }
    return "City{" + "lat=" + this.lat + ", lon=" + this.lon + ", city_code='" + this.cityCode + '\'' + ", continent='" + this.continent + '\'' + ", name='" + this.name + '\'' + ", distances ='" + this.distanceWithOtherCities + '\'' + '}';
 };
 City_c.getName = function ()  {
    if (this.hasOwnProperty("$protoName")) {
       return jv_Class_c.getName.apply(this, arguments);
    }
    return this.name;
 };
 City_c.setName = function (name)  {
    this.name = name;
 };
 City_c.getLat = function ()  {
    return this.lat;
 };
 City_c.setLat = function (lat)  {
    this.lat = lat;
 };
 City_c.getLon = function ()  {
    return this.lon;
 };
 City_c.setLon = function (lon)  {
    this.lon = lon;
 };
 City_c.getCityCode = function ()  {
    return this.cityCode;
 };
 City_c.getContinent = function ()  {
    return this.continent;
 };
 City_c.getDistanceWithOtherCities = function ()  {
    return this.distanceWithOtherCities;
 };
 City_c.setDistanceWithOtherCities = function (distanceWithOtherCities)  {
    this.distanceWithOtherCities = distanceWithOtherCities;
 };
 
 City_c._CityInit = function() {
    this.distanceWithOtherCities = new HashMap();
       ;
 };
 
 module.exports = City;