var rest = require('restler');
var url = require('url');

var Doctoralia = function(key){
    if(!key)
        throw new Error('You have to provide an API key for this to work.');

    this.api_key = key;
};

Doctoralia.prototype ={
    api_key: '',
    api_url: 'https://api.doctoralia.com/v1/',

    // API Calls
     
    /**
     * Get a list of Countries
     * @return {Object} A list of countries object
     */
    getCountries: function(callback) {
        var url = this.api_url + "countries";
        url += "?apiKey="+this.api_key;

        rest.get(url).on('complete', function(data) {
            Doctoralia.prototype.handleResponse(data,callback);
        });
    },

    /**
     * Get a list of Specialities depending on the country
     * @param {string} countryId The id of the Country
     * @return {Object} A list of Specialities object
     */
    getSpecialitiesByCountryId: function(countryId,callback) {
        var url = this.api_url + countryId +'/'+"specialities";
        url += "?apiKey="+this.api_key;

        rest.get(url).on('complete', function(data) {
            Doctoralia.prototype.handleResponse(data,callback);
        });
    },

    /**
     * Get a list of Provinces depending on the country
     * @param {string} countryId The id of the Country
     * @return {Object} A list of Provinces object
     */
    getProvincesByCountryId: function(countryId,callback) {
        var url = this.api_url + countryId +'/'+"provinces";
        url += "?apiKey="+this.api_key;

        rest.get(url).on('complete', function(data) {
            Doctoralia.prototype.handleResponse(data,callback);
        });
    },

    /**
     * Get a list of Cities depending on the province and the country
     * @param {string} countryId The id of the Country
     * @param {string} provinceId The id of the Province
     * @return {Object} A list of cities object
     */
    getCitiesByProvincesId: function(countryId,provinceId,callback) {
        var url = this.api_url + countryId;
        url += '/'+"provinces"+'/'+provinceId+'/';
        url += 'cities';
        url += "?apiKey="+this.api_key;

        rest.get(url).on('complete', function(data) {
            Doctoralia.prototype.handleResponse(data,callback);
        });
    },


    /**
     * Get a list of Insurances depending on the country
     * @param {string} countryId The id of the Country
     * @return {Object} A list of Insurances object
     */
    getInsurancesByCountryId: function(countryId,callback) {
        var url = this.api_url + countryId +'/'+"insurances";
        url += "?apiKey="+this.api_key;

        rest.get(url).on('complete', function(data) {
            Doctoralia.prototype.handleResponse(data,callback);
        });
    },

     /**
     * Get all Professionals 
     * @param {string} countryId The id the country where the Professional is
     * @param {Object} opts Optional parameters, for example {
            specialityId: 1136,
            provinceId: 10069
        }, or {}.
     * @return {Object} A Professional object
     */
    getProfessionals: function(countryId, opts, callback) {
        var url = this.api_url + countryId+'/professionals';
        url += "?apiKey="+this.api_key;
        url += Doctoralia.prototype.optsToUrlParam(opts);

        rest.get(url).on('complete', function(data) {
            Doctoralia.prototype.handleResponse(data,callback);
        });
    },


    /**
     * Get a Professional by it's id
     * @param {string} proId The id of the Professional
     * @param {string} countryId The id the country where the Professional is
     * @return {Object} A Professional object
     */
    getProfessionalById: function(countryId, proId, opts, callback) {
        var url = this.api_url + countryId+'/professionals/'+proId;
        url += "?apiKey="+this.api_key;
        rest.get(url).on('complete', function(data) {
            Doctoralia.prototype.handleResponse(data,callback);
        });
    },


    /**
     * Get all MedicalCenters in a country
     * @param {string} countryId The id the country where the Professional is
     * @return {Object} A Professional object
     */
    getMedicalCenters: function(countryId, opts, callback) {
        var url = this.api_url + countryId+'/medicalCenters';
        url += "?apiKey="+this.api_key;
        url += Doctoralia.prototype.optsToUrlParam(opts);

        rest.get(url).on('complete', function(data) {
            Doctoralia.prototype.handleResponse(data,callback);
        });
    },


    /**
     * Get a MedicalCenter by it's id
     * @param {string} centerId The id of the MedicalCenter
     * @param {string} countryId The id the country where the Professional is
     * @return {Object} A MedicalCenter object
     */
    getMedicalCenterById: function(countryId, centerId, callback) {
        var url = this.api_url + countryId+'/medicalcenters/'+centerId;
        url += "?apiKey="+this.api_key;

        rest.get(url).on('complete', function(data) {
            Doctoralia.prototype.handleResponse(data,callback);
        });
    },

    /**
     * Search for Professional or MedicalCenter with free text
     * @param {string} countryId The id the country where the Professional is
     * @param {string} query Free text query like "cancerology"
     * @return {Object} A list of MedicalCenter or Profesionnal objects
     */
    freeTextSearch : function(countryId,query,opts, callback){
        var url = this.api_url + countryId+'/search/'+query;
        url += "?apiKey="+this.api_key;
        url += Doctoralia.prototype.optsToUrlParam(opts);
        
        rest.get(url).on('complete', function(data) {
            Doctoralia.prototype.handleResponse(data,callback);
        });
    },

    /**
     * Search for Professional or MedicalCenter nearby a point (lat, long)
     * @param {string} countryId The id the country where the Professional is
     * @return {Object} A list of MedicalCenter or Profesionnal objects
     */
    searchNearby: function(countryId,opts,callback){
        var url = this.api_url + countryId+'/searchNearBy';
        url += "?apiKey="+this.api_key;
        url += Doctoralia.prototype.optsToUrlParam(opts);
        
        rest.get(url).on('complete', function(data) {
            Doctoralia.prototype.handleResponse(data,callback);
        });
    },

    /**
     * HandleResponse to the callback
     */
    handleResponse: function(data,callback) {
        if(data.success==true){
            return callback(null,data.result);
        }else{
            return callback(data.error,null);
        }

    },

    /**
     * Change an hash to url query stringn
     */
    optsToUrlParam : function(opts){
        var url = "";
        if (opts != null && Object.keys(opts).length >0){
            for (var key in opts) {
                    url += "&";
                    url += key;
                    url += "=";
                    url += opts[key];
                }
        }
        return url;
    }
};

module.exports = Doctoralia;