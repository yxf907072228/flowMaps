//加法
export function add(a, b) {
    return parseFloat(allArithmetic("add", a, b))
}
//减法
export function sub(a, b) {
    return parseFloat(allArithmetic("add", a, -b))
}

//乘法
export function multi(a, b) {
    return parseFloat(allArithmetic("multi", a, b))
}

//除法
export function divi(a, b) {
    return parseFloat(allArithmetic("divi", a, b))
}


const isFloat = function(a) { 
        var reg = /\d.\d+/g
        return reg.test(a)
}
const getFloatDigit = function(a) { 
    var digit, len
    a = a.toString()
    digit = a.split(".")
    len = digit[1] == undefined ? 0 : digit[1].length
    return len
}

const numDiv=function(num1, num2) { 
    var baseNum1 = 0, baseNum2 = 0; 
    var baseNum3, baseNum4; 
    try { 
    baseNum1 = num1.toString().split(".")[1].length; 
    } catch (e) { 
    baseNum1 = 0; 
    } 
    try { 
    baseNum2 = num2.toString().split(".")[1].length; 
    } catch (e) { 
    baseNum2 = 0; 
    } 
     
    baseNum3 = Number(num1.toString().replace(".", "")); 
    baseNum4 = Number(num2.toString().replace(".", "")); 
    return (baseNum3/(baseNum4*Math.pow(10,baseNum1-baseNum2)));
}

const allArithmetic = function(type, a, b) { 
    var c, gfd_a, gfd_b, baseLen, baseMulti
    var a = Number(a),
        b = Number(b)
    if (isFloat(a) || isFloat(b)) {
        
        if (type == "divi") {
            c = numDiv(a,b)
        }else {
            gfd_a = getFloatDigit(a)
            gfd_b = getFloatDigit(b)
            baseLen = gfd_a >= gfd_b ? gfd_a : gfd_b
            baseMulti = Math.pow(10, baseLen)
            a = type != "add" ? Number(a.toString().replace(".", "")) : a
            b = type != "add" ? Number(b.toString().replace(".", "")) : b    
            if (type == "add") {
                c = ((a * baseMulti + b * baseMulti) / baseMulti).toFixed(baseLen)
            } else if (type == "multi") {
                c = (a * b) / Math.pow(10, gfd_a + gfd_b)
            } 
        }
    } else {
        if (type == "add") {
            c = a + b
        } else if (type == "multi") {
            c = a * b
        } else if (type == "divi") {
            c = a / b
        }
    }
    return c
}