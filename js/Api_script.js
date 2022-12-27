/* search */
var searchInput = document.querySelector('.search-input');
var searchIcon = document.querySelector('.search-icon');
var searchCross = document.querySelector('.search-cross');

// when select input search
searchInput.addEventListener('focus',()=>{
  searchInput.placeholder = '';
  searchInput.style.borderBottom = '2px solid tomato';
})
// when diselect input search
searchInput.addEventListener('blur',()=>{
  searchInput.placeholder = 'Search For A Movie';
  searchInput.style.borderBottom = 'none';
})

// when type any word in search input 
searchInput.addEventListener('keyup',()=>{
  if(searchInput.value){
    searchIcon.classList.add('search-value');
    searchCross.classList.add('search-value');
  }else{
    searchIcon.classList.remove('search-value');
    searchCross.classList.remove('search-value');
  }
})

// when click on x
searchCross.addEventListener('click',()=>{
  searchInput.value = '';
  searchIcon.classList.remove('search-value');
    searchCross.classList.remove('search-value');
})


/*
* main APi => https://api.themoviedb.org/3/movie/550?api_key=56cecd6a5bfe0b66299f4159a5ea286d
* for search => https://api.themoviedb.org/3/search/movie?api_key=56cecd6a5bfe0b66299f4159a5ea286d&query=Jack+Reache
* for search with id => https://api.themoviedb.org/3/movie/343611?api_key=56cecd6a5bfe0b66299f4159a5ea286d
* https://api.themoviedb.org/3/movie/343611?api_key=56cecd6a5bfe0b66299f4159a5ea286d&append_to_response=videos
*/


// add movie for the slider
fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1B06TsSXIV7Ur7o1ycbu5yx4HzsxbQs6Hh0-LKKuObQHaTV0Tz4aAsZ8U')
  .then(response => response.json())
  .then(data => {
    
    
      var sliderImgs = document.querySelector('.slider-top-rated .slider-img-top-rated');
      var sliderImgsContainer = document.querySelector('.img-top-rated-container');
      var imgTest = document.querySelector('.imgTest');

      // to take all data from api and handel it
      for(var i = 0; i < data.results.length - 1 ; i++) {
        
        // if there is no photo shown w
        if(data.results[i].poster_path == null || data.results[i].backdrop_path == null) {
            console.log('not found')
        }else { // if there is a photo show
          var newDivImg = document.createElement('div');
          var newLinkImg = document.createElement('a');
          var newImg = document.createElement('img');

          newDivImg.classList.add('swiper-slide');
          newDivImg.classList.add('slider-img-top-rated');
          // to make the photo has a link when click it , it will show the details in the next page
          newLinkImg.href = `movie.html?id=${data.results[i].id}`;
          // to add img
          newImg.src = `https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}`;
          newLinkImg.appendChild(newImg);
          newDivImg.appendChild(newLinkImg);
          sliderImgsContainer.appendChild(newDivImg)
        }
      }
    

      /* Swiper plugin */
      var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: false,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 60,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
    },
    loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      });
    }); // End of fetch of the slider



// To search for movie
searchIcon.addEventListener('click',(e)=>{
  
  

  
  if(searchInput.value !== ' ') {
    var movieName = searchInput.value;
  }
  var movieItems = document.querySelectorAll('.movie-item');
  var errorSearch = document.querySelector('.errorMSG');
  //if there is any error massage before it will deleted
  if(errorSearch){
    errorSearch.parentNode.removeChild(errorSearch)
  }
  // to remove the old search from the page
  if(movieItems.length !== 0) {
    movieItems.forEach(item=>{
      item.parentNode.removeChild(item)
    })
  }

// to get the movies which wrote at the search bar and display it
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=56cecd6a5bfe0b66299f4159a5ea286d&query=${movieName}`)
  .then(response => response.json())
  .then(data => {
    var pageContent = document.querySelector('.page-content')
    var movieDisplay = document.querySelector('.movie-display-content');
    var errorSearch = document.createElement('div')
    errorSearch.classList.add('errorMSG')
  
    // if there is any movie show when search 
    if(data.results.length == 0) {
      errorSearch.innerText = `There is no result about "${searchInput.value}"`;
      pageContent.appendChild(errorSearch)
    }else {
      for(var i = 0; i < data.results.length; i++) {
        var movieItem = document.createElement('div');
        var movieItemImg = document.createElement('div');
        var imgURL = document.createElement('a');
        var movieImg = document.createElement('img');
  
        movieItem.classList.add('movie-item');
        movieItemImg.classList.add('movie-display__img');

        // check if the movie has a photo (if not it will not display)
        if(data.results[i].poster_path != null){
          imgURL.href = `movie.html?id=${data.results[i].id}`
          movieImg.src = `https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}`;
          imgURL.appendChild(movieImg)
          movieItemImg.appendChild(imgURL)
          movieItem.appendChild(movieItemImg)

          // add the star rate
          if(data.results[i].vote_average){
            var starIcon = document.createElement('i');
            starIcon.classList.add('fas');
            starIcon.classList.add('fa-star');

            var starSpan = document.createElement('span');
            starSpan.innerText = data.results[i].vote_average;

            movieItem.appendChild(starIcon);
            movieItem.appendChild(starSpan);
          }

          // append the movieItem to the movie display
          movieDisplay.appendChild(movieItem)

          
        }
        
      }
    }
     // to clear the search bar
     searchInput.value = '';
    // to scroll to the search results
    window.scrollTo(0, 680);

    searchIcon.classList.remove('search-value');
    searchCross.classList.remove('search-value');
  })
})






/********************************************************************************** */

/* Page movies display */
/*fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1B06TsSXIV7Ur7o1ycbu5yx4HzsxbQs6Hh0-LKKuObQHaTV0Tz4aAsZ8U&page=2')
  .then(response => response.json())
  .then(data => {
      console.log(data)

    
      var sliderImgs = document.querySelector('.slider-top-rated .slider-img-top-rated');
      var sliderImgsContainer = document.querySelector('.img-top-rated-container');
      var imgTest = document.querySelector('.imgTest');

      for(var i = 0; i < data.results.length - 1 ; i++) {
        
        if(data.results[i].backdrop_path == null) {
            console.log('not found')
        }else {
          var newDivImg = document.createElement('div');
          var newLinkImg = document.createElement('a');
          var newImg = document.createElement('img');

          newDivImg.classList.add('swiper-slide');
          newDivImg.classList.add('slider-img-top-rated');
          newLinkImg.href = `file:///E:/Work/Web%20trainning/Api/movie.html?id=${data.results[i].id}`;
          newImg.src = `https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}`;
          newLinkImg.appendChild(newImg);
          newDivImg.appendChild(newLinkImg);
          sliderImgsContainer.appendChild(newDivImg)
        }

    
      }
  
    });*/
    