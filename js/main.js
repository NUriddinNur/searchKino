
let searchInput = document.querySelector("#search")
let upcoming = document.querySelector("#upcoming")
let appendFilm = document.querySelector('.append')
let topKino = document.querySelector("#top-kino")
let scoreInput = document.querySelector("#score")
let popular = document.querySelector("#popular")
let titlePgn = document.querySelector('.title')
let pgnNext = document.querySelector('.next')
let pgnPrev = document.querySelector('.prev')
let minInput = document.querySelector("#min")
let maxInput = document.querySelector("#max")
let btn = document.querySelector('.btn')


btn.onclick = async() => {
    let activCategory = window.localStorage.getItem("activCategory") || "top_rated" 
    let films = await getData(activCategory, titlePgn.textContent)

    if (+minInput.value > 2022){
        minInput.value = ''
        return alert("invalid Input")
    }
    if (+maxInput.value > 2022){
        maxInput.value = ''
        return alert("invalid Input")
    }
    filter(films.results, searchInput.value, minInput.value, maxInput.value, scoreInput.value)
}


topKino.onclick = async(event) => {
    writeLocalStorage(event.target.value)
    let films = await getData(event.target.value)
    renderFilms(films)
}

popular.onclick = async(event) => {
    writeLocalStorage(event.target.value)
    let films = await getData(event.target.value)
    renderFilms(films)
}

upcoming.onclick = async(event) => {
    writeLocalStorage(event.target.value)
    let films = await getData(event.target.value)
    renderFilms(films)
}



pgnNext.onclick = async() => {
    let activCategory = window.localStorage.getItem("activCategory") || "top_rated"
    writeLocalStorage(activCategory)

    let films = await getData(activCategory, +titlePgn.textContent+1)
    renderFilms(films)
    searchInput.value = null
    minInput.value = null
    maxInput.value = null
    scoreInput.value = null
}


pgnPrev.onclick = async() => {
    let activCategory = window.localStorage.getItem("activCategory") || "top_rated"
    writeLocalStorage(activCategory)
    if(+titlePgn.textContent === 1) {
        return
    }

    let films = await getData(activCategory, +titlePgn.textContent-1)
    renderFilms(films)

    searchInput.value = null
    minInput.value = null
    maxInput.value = null
    scoreInput.value = null
}


function renderFilms(films) {

    appendFilm.innerHTML = null 

    for(let i of films.results){ 
        let element = getHtml(i) 
        appendFilm.innerHTML += element 
    } 

    titlePgn.textContent = films.page
}


function filter(films, ism, min, max, score){ 

    films = films.filter((el, i) => { 
        let name = ism ? el.title.toLowerCase().includes(ism.toLowerCase()) : true 
        let minDate = min ? el.release_date.slice(0,4) >= min : true 
        let maxDate = max ? el.release_date.slice(0,4) <= max : true 
        let scor = score ? el.vote_average >= score : true 

        return name && minDate && maxDate && scor 
    }) 

    appendFilm.innerHTML = null 
    if(films.length){ 
        for(let i of films){ 
            let element = getHtml(i) 
            appendFilm.innerHTML += element 
        } 
         
    }else{ 
        let h1 = document.createElement('h1') 
        h1.textContent = 'Kinolar Topilmadi !!!' 
        h1.style.color = "orange" 
        appendFilm.append(h1) 
    }
}


async function start() {
    let activCategory = window.localStorage.getItem("activCategory") || "top_rated" 
    let films = await getData(activCategory)
    renderFilms(films)
}


start()