const modifyCityName = (name) => {
    let arr = name.split('');
    let lastLiteral = arr.splice(-1, 1);
    switch(lastLiteral.join('')) {
        case 'й': 
            // arr.splice(-2, 2);
            let secondLiteral = arr.splice(-1, 1);
            (secondLiteral[0] === 'и' || secondLiteral[0] === 'ы') ? arr.push('ом'): arr.push('ее');
            return arr.join('');
        case 'а': 
            arr.push('е');
            return arr.join('');
        case 'о':
            arr.push(lastLiteral);
            return arr.join('');
        case 'и':
            arr.push(lastLiteral);
            return arr.join('');
        case 'я': 
            arr.push('е');
            return arr.join('');
        case 'у': 
            arr.push(lastLiteral);
            return arr.join('');
        default: 
            arr.push(lastLiteral, 'e');
            return arr.join('')
    } 
}
export default modifyCityName;