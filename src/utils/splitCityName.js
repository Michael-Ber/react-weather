import  _modifyCountryToEng  from "./modifyCountryToEng";

const _splitCityName = (str, countriesArr) => {
    let city;
    let country; 
    let res;
    
    if(str.split(',').length > 1) {
        let arr = str.split(',').map(item => item.replace(/\s/g, '').toUpperCase());
        city = (countriesArr.filter(item => Object.keys(item)[0].toUpperCase() === arr[0]).length === 0 &&
               countriesArr.filter(item => Object.values(item)[0].toUpperCase() === arr[0]).length === 0) ? 
               arr[0] : 
               (countriesArr.filter(item => Object.keys(item)[0].toUpperCase() === arr[1]).length === 0 &&
               countriesArr.filter(item => Object.values(item)[0].toUpperCase() === arr[1]).length === 0) ?
               arr[1] : null; 
        country = countriesArr.filter(item => Object.keys(item)[0].toUpperCase() === arr[0]).length !== 0 ?
                arr[0] : 
                countriesArr.filter(item => Object.keys(item)[0].toUpperCase() === arr[1]).length !== 0 ?
                arr[1] :
                countriesArr.filter(item => Object.values(item)[0].toUpperCase() === arr[0]).length !== 0 ?
                _modifyCountryToEng(arr[0], countriesArr) :
                countriesArr.filter(item => Object.values(item)[0].toUpperCase() === arr[1]).length !== 0 ?
                _modifyCountryToEng(arr[1], countriesArr) :
                null;          
        res = `${city}, ${country}`;
    }else if(str.split(' ').length > 1) {
        let arr = str.split(' ').map(item => item.replace(/\s/g, '').toUpperCase());
        city = (countriesArr.filter(item => Object.keys(item)[0].toUpperCase() === arr[0]).length === 0 &&
               countriesArr.filter(item => Object.values(item)[0].toUpperCase() === arr[0]).length === 0) ? 
               arr[0] : 
               (countriesArr.filter(item => Object.keys(item)[0].toUpperCase() === arr[1]).length === 0 &&
               countriesArr.filter(item => Object.values(item)[0].toUpperCase() === arr[1]).length === 0) ?
               arr[1] : null; 
        country = countriesArr.filter(item => Object.keys(item)[0].toUpperCase() === arr[0]).length !== 0 ?
                arr[0] : 
                countriesArr.filter(item => Object.keys(item)[0].toUpperCase() === arr[1]).length !== 0 ?
                arr[1] :
                countriesArr.filter(item => Object.values(item)[0].toUpperCase() === arr[0]).length !== 0 ?
                _modifyCountryToEng(arr[0], countriesArr) :
                countriesArr.filter(item => Object.values(item)[0].toUpperCase() === arr[1]).length !== 0 ?
                _modifyCountryToEng(arr[1], countriesArr) :
                null;          
        res = `${city}, ${country}`;
    }else {
        res = str;
    }
    return res;
}

export default _splitCityName;