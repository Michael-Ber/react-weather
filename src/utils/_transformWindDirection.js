
const _transformWindDirection = (deg) => {
    if(deg<20 || deg>=330) {
        return 'С' 
    }else if(deg>=20 && deg<=75) {
        return 'С-В'
    }else if(deg>75 && deg<105) {
        return 'В'
    }else if(deg>=105 && deg<150) {
        return 'Ю-В' 
    }else if(deg>=150 && deg<210) {
        return 'Ю'
    }else if(deg>=210 && deg<240) {
        return 'Ю-З'
    }else if(deg>=240 && deg<300) {
        return 'З'
    }else if(deg>=300 && deg<330) {
        return 'С-З'
    }else {
        return ''
    }
}

export default _transformWindDirection;