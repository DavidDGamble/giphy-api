import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic ---------------------------------------------------------------------------------

const getGif = (search) => {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=25&offset=0&rating=glang=en`;
  request.addEventListener('loadend', function () {
    const response = JSON.parse(this.responseText); 
    let array = response.data;
    appendGifs(array, "search-gifs"); 
  });
  request.open("GET", url, true); 
  request.send();
}

const trendGif = () => {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&rating=r`;
  request.addEventListener('loadend', function () {
    const response = JSON.parse(this.responseText); 
    let array = response.data;
    appendGifs(array, "trend-gifs"); 
  });
  request.open('GET', url, true);
  request.send();
}

// UI Logic ---------------------------------------------------------------------------------

window.addEventListener('load', function () {
  document.getElementById('form').addEventListener('submit', handleSubmit);
  document.getElementById('trend-btn').addEventListener('click', handleTrend);
});

const handleSubmit = (event) => {
  event.preventDefault();
  document.getElementById("search-gifs").innerHTML = null;
  const search = document.getElementById('search').value;
  getGif(search);
}

const handleTrend = (event) => {
  event.preventDefault();
  document.getElementById("trend-gifs").innerHTML = null;
  trendGif();
}

const appendGifs = (array, id) => {
  array.forEach(function(element) {
    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", element.images.fixed_height_small.url); 
    document.getElementById(id).append(imageElement);
  });
}
