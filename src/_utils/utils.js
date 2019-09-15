

export function isNullOrEmpty(data) {
    if (data === null || data === undefined || data === '') {
        return true;
    } else {
        return false;
    }
}



export function isValidTcNo(tcNo) {
    if (isNullOrEmpty(tcNo)) {
        return false;
    }

    if (tcNo.substr(0, 1) == 0 || tcNo.length != 11) {
        return false;
    }
    var i = 9, md = '', mc = '', digit, mr = '',c='';
    while (digit = tcNo.charAt(--i)) {
        i % 2 == 0 ? md += digit : mc += digit;
    }
    if (((eval(md.split('').join('+')) * 7) - eval(mc.split('').join('+'))) % 10 != parseInt(tcNo.substr(9, 1), 10)) {
        return false;
    }
    for (c = 0; c <= 9; c++) {
        mr += tcNo.charAt(c);
    }
    if (eval(mr.split('').join('+')) % 10 != parseInt(tcNo.substr(10, 1), 10)) {
        return false;
    }
    return true;
}

