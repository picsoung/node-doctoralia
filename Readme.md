# Doctoralia Node.js wrapper

This is a simple wrapper for the Doctoralia API.

[Doctoralia.com](http://doctoralia.com) is the global platform for Doctors' appointments. Their API let you search for doctors and medical centers in 11 different countries in the world.

## Installing

`npm install doctoralia`

## Developer Portal

On the portal you will find API keys and documention.[https://developer.doctoralia.com/](https://developer.doctoralia.com/)

The official Doctoralia API documentation can be found at [https://developer.doctoralia.com/docs](https://developer.doctoralia.com/docs).

## Usage

```js
var Doctoralia = require('doctoralia');

var doc = new Doctoralia('YOUR_API_KEY');

// Get the countries where Doctoralia is available
doc.getCountries(function(err,result){
    console.log(result);
});

// Get all the medical specialities available in France 
doc.getSpecialitiesByCountryId('fr',function(err,result){
	console.log(result);
});

// Returns a list of professionals in France 
// specialityId: 1136 is cancerolgy
// provinceId: 10069 is Charente Maritime
doc.getProfessionals('fr',{
            specialityId: 1136,
            provinceId: 10069
        },function(err,result){
	console.log(result);
});
```

## Credits

+ Inspired by the great [tutorial](http://anders.janmyr.com/2012/04/writing-node-module.html) from [@andersjanmyr](https://github.com/andersjanmyr) to write NPM module
+ Simple Slideshare NPM package [node-slideshare](https://github.com/adityab/node-slideshare) by [@adityab](https://github.com/adityab)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/picsoung/node-doctoralia/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
