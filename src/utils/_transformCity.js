const _transformCity = (res) => {
    return {
        id: res.city.id,
        city: res.city.name,
        coord: {
            lat: res.city.coord.lat,
            lon: res.city.coord.lon
        },
        list: res.list.map(item => ({dt: item.dt*1000, temp: Math.floor(item.main.temp), timezone: res.city.timezone})).filter(item => new Date(new Date(item.dt).getTime() + item.timezone).getUTCDate() === new Date(new Date().getTime() + item.timezone).getUTCDate()),
        country: res.city.country,
        timezone: res.city.timezone*1000,
        sunrise: (res.city.sunrise*1000 + res.city.timezone*1000),
        sunset: (res.city.sunset*1000 + res.city.timezone*1000)
    }
}

export default _transformCity;