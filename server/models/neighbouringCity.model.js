function NeighbouringCity(name, continent, city_code, distance) {
    this.name = null;
    this.cityCode = null;
    this.distance = 0.0;
    this.continent = null;
 
    jv_Object.call(this);
    this._NeighbouringCityInit();
    this.name = name;
    this.cityCode = city_code;
    this.distance = distance;
    this.continent = continent;
 }
 
 var NeighbouringCity_c = sc_newClass("NeighbouringCity", NeighbouringCity, jv_Object, null);
 
 NeighbouringCity_c.toString = function ()  {
    if (this.hasOwnProperty("$protoName")) {
       return jv_Class_c.toString.apply(this, arguments);
    }
    return "DestinationCity{" + "name='" + this.name + '\'' + ", city_code='" + this.cityCode + '\'' + ", continent='" + this.continent + '\'' + ", distance=" + this.distance + '}';
 };
 NeighbouringCity_c.getName = function ()  {
    if (this.hasOwnProperty("$protoName")) {
       return jv_Class_c.getName.apply(this, arguments);
    }
    return this.name;
 };
 NeighbouringCity_c.setName = function (name)  {
    this.name = name;
 };
 NeighbouringCity_c.getCityCode = function ()  {
    return this.cityCode;
 };
 NeighbouringCity_c.getDistance = function ()  {
    return this.distance;
 };
 NeighbouringCity_c.setDistance = function (distance)  {
    this.distance = distance;
 };
 NeighbouringCity_c.getContinent = function ()  {
    return this.continent;
 };
 
 NeighbouringCity_c._NeighbouringCityInit = function() {
 };

 module.exports = NeighbouringCity