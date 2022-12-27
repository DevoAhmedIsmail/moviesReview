// to get the parameter from the query search
const urlParams = new URLSearchParams(window.location.search);
// console.log(urlParams.get('id'))

fetch(`https://api.themoviedb.org/3/movie/${urlParams.get('id')}?api_key=56cecd6a5bfe0b66299f4159a5ea286d`)
  .then(response => response.json())
  .then(data => {
      console.log(data)


    var headerTitle = document.querySelector('.head');
    var movieDiv = document.querySelector('.movie-poster');

    // write the movie name
    headerTitle.innerText = data.original_title;

    // create an image for the poster
    var movieImg = document.createElement('img');
    // add src img 
    if(data.backdrop_path !== null){
      movieImg.src = 'https://image.tmdb.org/t/p/w500/'+ data.backdrop_path;
    // append the img to the div
    movieDiv.appendChild(movieImg);
    }else {
      movieImg.src = 'https://image.tmdb.org/t/p/w500/'+ data.poster_path;
    // append the img to the div
    movieDiv.appendChild(movieImg);
    }

    // div container of the img of the info
    var DivimgPoster = document.querySelector('.img-poster');
    // create an img 
    var imgPoster = document.createElement('img');
    // assign a src to the img
    imgPoster.src = 'https://image.tmdb.org/t/p/w500/'+ data.poster_path;
    // append the img to the div
    DivimgPoster.appendChild(imgPoster);


    // Movie Info
    var movieContent = document.querySelector('.movie-content');
    

    // overview
    var overview = document.createElement('div');
    overview.classList.add('overview')

    var overview_h4 = document.createElement('h4');

    var overview_p = document.createElement('p');
    
    overview_h4.innerText = 'overview';
    overview_p.innerText = data.overview;

    overview.appendChild(overview_h4);
    overview.appendChild(overview_p);
    movieContent.appendChild(overview)
    //lang
    var lang = document.createElement('div');
    lang.classList.add('movie-span')

    var lang_h4 = document.createElement('h4');
    var lang_span = document.createElement('span');

    lang_h4.innerText = 'language';
    lang.appendChild(lang_h4);
    data.spoken_languages.forEach(language =>{
      var lang_span = document.createElement('span');
      lang.appendChild(lang_span);
      lang_span.innerText = language.name;
    })

    
    
    movieContent.appendChild(lang)


    //category
    var category = document.createElement('div');
    category.classList.add('movie-span')

    var movieSpainContent = document.createElement('div');
    movieSpainContent.classList.add('movie-span__content');

    var cate_h4 = document.createElement('h4');
    

    cate_h4.innerText = 'category';
    category.appendChild(cate_h4);
    data.genres.forEach(cate =>{
      var cate_span = document.createElement('span');
      cate_span.innerText = cate.name;
      
      movieSpainContent.appendChild(cate_span);
      category.appendChild(movieSpainContent)
    })

    
    movieContent.appendChild(category)
    // content (votes)
    var Content = document.createElement('div');
    Content.classList.add('movie-info__content');

    var vote = document.createElement('div');
    vote.classList.add('vote')

    var vote_star = document.createElement('p');
    vote_star.classList.add('vote-star')

    var vote_count = document.createElement('p');
    vote_count.classList.add('vote-count')

    vote_star.innerText = data.vote_average;
    vote_count.innerText = `${data.vote_count} person has voted`

    vote.appendChild(vote_star);
    vote.appendChild(vote_count);
    Content.appendChild(vote);

    // release
    var release = document.createElement('div');
    release.classList.add('release')

    var release_h4 = document.createElement('h4');

    var release_date = document.createElement('p');

    release_h4.innerText = 'Release Date';
    release_date.innerText = data.release_date;

    release.appendChild(release_h4);
    release.appendChild(release_date);
    Content.appendChild(release);
    movieContent.appendChild(Content)
    // links
    var movieLink = document.createElement('div');
    movieLink.classList.add('movie-link')

    var movieLink_a = document.createElement('a');
    movieLink_a.href = data.homepage;
    movieLink_a.innerText = 'Visit website'
    movieLink_a.setAttribute('target','_blank')
    movieLink.appendChild(movieLink_a)
    movieContent.appendChild(movieLink)


});
  
    /*
    // Create an a tag
            var urlTag = document.createElement('a');
            // add href to the a element
            urlTag.href = `file:///E:/Work/Web%20trainning/Api/movie.html?id=${data.results[i].id}`;
            // Create an img Element
            var Img = document.createElement('img'); 
            // add src to the img
            Img.src = 'https://image.tmdb.org/t/p/w500/'+ data.results[i].poster_path;
            // add alt to the img
            Img.alt = "This is photo";
            // append the img to the a tag
            urlTag.appendChild(Img);
            // append the a tag to the div
            sliderImgs.appendChild(urlTag)
    
    */