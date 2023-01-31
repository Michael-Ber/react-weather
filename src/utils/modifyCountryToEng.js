const _modifyCountryToEng = (str, countriesArr) => {
    return countriesArr.filter(item => 
            Object.keys(item)[0].toUpperCase() === str.toUpperCase()).length !== 0 ?
            str : 
            countriesArr.filter(item => Object.values(item)[0].toUpperCase() === str.toUpperCase()).length !== 0 ?
            Object.keys(countriesArr.filter(item => Object.values(item)[0].toUpperCase() === str.toUpperCase())[0])[0] : null
}

export default _modifyCountryToEng;