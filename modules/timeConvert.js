let timeConvert = function(n) {
    let num = n
    let hours = (num / 60)
    let rhours = Math.floor(hours)
    let minutes = (hours - rhours) * 60
    let rminutes = Math.round(minutes)

    return rhours + "h  " + rminutes + "min"
}

export default timeConvert