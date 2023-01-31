const _changeDayMonth = (actualDate, iterator, returningValue) => {
    const actualDayNumber = actualDate.getDate() + iterator;
    const actualMonth = actualDate.getMonth();
    const months = {
        0: 'Января',
        1: 'Февраля',
        2: 'Марта',
        3: 'Апреля',
        4: 'Мая',
        5: 'Июня',
        6: 'Июля',
        7: 'Августа',
        8: 'Сентября',
        9: 'Октября',
        10: 'Ноября',
        11: 'Декабря',
    };
    if(
        actualMonth === 0 || 
        actualMonth === 2 || 
        actualMonth === 4 || 
        actualMonth === 6 || 
        actualMonth === 7 || 
        actualMonth === 9 || 
        actualMonth === 11
    ) {
        if(actualDayNumber > 31) {
            return returningValue === 'day' ? actualDayNumber - 31 : months[actualMonth + 1];
        }
        return returningValue === 'day' ? actualDayNumber : months[actualMonth];
    }else if(
        actualMonth === 3 ||
        actualMonth === 5 ||
        actualMonth === 8 ||
        actualMonth === 10
    ) {
        if(actualDayNumber > 30) {
            return returningValue === 'day' ? actualDayNumber - 30 : months[actualMonth + 1]
        }
        return returningValue === 'day' ? actualDayNumber : months[actualMonth];
    } else if (
        actualMonth === 1
    ) {
        if(actualDayNumber > 28 && actualDate.getFullYear%4!==0) {
            return returningValue === 'day' ? actualDayNumber - 28 : months[actualMonth + 1];
        }else if(actualDayNumber > 29 && actualDate.getFullYear%4===0) {
            return returningValue === 'day' ? actualDayNumber - 29 : months[actualMonth + 1]
        }
        return returningValue === 'day' ? actualDayNumber : months[actualMonth];
    } 
    return returningValue === 'day' ? actualDayNumber : months[actualMonth];
}

export default _changeDayMonth;

