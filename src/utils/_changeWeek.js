const _changeWeek = (actualDate, iterator) => {
    const weekDays = {
        0: 'Вс',
        1: 'Пн',
        2: 'Вт',
        3: 'Ср',
        4: 'Чт',
        5: 'Пт',
        6: 'Сб'
    };
    return weekDays[(actualDate.getDay() + iterator) > 6 ? (actualDate.getDay() + iterator) - 7: (actualDate.getDay() + iterator)];
}

export default _changeWeek;