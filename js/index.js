
const apikey = "e566d191afaba5f363a396fd59c36a61"
const baseURL = "https://api.themoviedb.org/3"
const imgURL = "https://image.tmdb.org/t/p/w500"


function timeConvert(n) {
    let num = n
    let hours = (num / 60)
    let rhours = Math.floor(hours)
    let minutes = (hours - rhours) * 60
    let rminutes = Math.round(minutes)

    return rhours + "h  " + rminutes + "min"
}





