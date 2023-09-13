//TMDB
const API_KEY='api_key=5e572a68e611b3afe2a6c82e8b5eadde';
const BASE_URL='https://api.themoviedb.org/3';
const API_URL=BASE_URL+'/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&'+API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500'
const search_URL=BASE_URL+'/search/movie?'+API_KEY;

const main=document.querySelector('main')
const form=document.querySelector('#form')
const search=document.querySelector('#search')

getMovies(API_URL)
function getMovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        showMovies(data.results)
    })
}
function showMovies(data){
    main.innerHTML=''
    data.forEach(movie=>{
        const {title,poster_path,vote_average,overview}=movie;
        const movieEl=document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML=`
        <img src="${IMG_URL+poster_path}" alt="${title}">
            
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}
function getColor(vote){
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm=search.value    
    if(searchTerm){
        getMovies(search_URL+'&query='+searchTerm)
    }
})

// Thanks Bro