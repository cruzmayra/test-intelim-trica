window.onload = () => {
  getRestaurantsData();
  document.querySelector('.order-alphabe').addEventListener('click', alphabeticalOrder);
  document.querySelector('.order-rating').addEventListener('click', ratingOrder);
 }

//function that gets all the data
const getRestaurantsData = () => {
  if(!localStorage.getItem('melp-data')){
    const url = "https://s3-us-west-2.amazonaws.com/lgoveabucket/data_melp.json";
    fetch(url)
        .then( response => response.json()).then( json => {          
          localStorage.setItem('melp-data', JSON.stringify(json));
          paintData(JSON.parse(localStorage.getItem('melp-data')))
        });
  } else {
    paintData(JSON.parse(localStorage.getItem('melp-data')));
  }
  
}

//function that paint restaurants
const paintData = (data) => {
  $('#restaurants-container').empty();
  return data.forEach(restaurant => {
    let templateRestaurant = '';
    templateRestaurant += `<li class="list-group-item">
      <p>${restaurant.name}</p>
      <p>Rating <span>${restaurant.rating}</span></p>
      <p>${restaurant.address.city}</p>
      <button type="button" class="btn btn-outline-primary">More...</button>
    </li>`;

    $('#restaurants-container').append(templateRestaurant)
  }) 
}

const alphabeticalOrder = e => {
  e.preventDefault();
  if(e.target.textContent === 'A-Z'){
    e.target.textContent = 'Z-A'
    descendingOrder('name')
  } else {
    e.target.textContent = 'A-Z'
    ascendingOrder('name')
  }
}

const ratingOrder = e => {
  e.preventDefault();
  if(e.target.textContent === 'Rating ▼'){
    e.target.textContent = 'Rating ▲'
    descendingOrder('rating')
  } else {
    e.target.textContent = 'Rating ▼'
    ascendingOrder('rating')
  }
}

//function that orders descending
const descendingOrder = (key) => {
  let restaurants = JSON.parse(localStorage.getItem('melp-data'))
  .sort(function(a, b){
    return (a[key] === b[key]) ? 0 : (a[key] > b[key]) ? 1 : -1;
  })  
  paintData(restaurants)
}

//function that orders ascending
const ascendingOrder = (key) => {
  let restaurants = JSON.parse(localStorage.getItem('melp-data'))
  .sort(function(a, b){
    return (a[key] === b[key]) ? 0 : (a[key] < b[key]) ? 1 : -1;
  })  
  paintData(restaurants)
}