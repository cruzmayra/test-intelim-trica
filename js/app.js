window.onload = () => {
  getRestaurantsData();
  document.querySelector('.ordering-az-des').addEventListener('click', chooseOrder);
  document.querySelector('.ordering-az-asc').addEventListener('click', chooseOrder);
  document.querySelector('.ordering-rtg-des').addEventListener('click', chooseOrder);
  document.querySelector('.ordering-rtg-asc').addEventListener('click', chooseOrder);
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
    let templateStar = '';
    if(restaurant.rating === 0){
      templateStar = '0 stars';
    } else {
      for(var i = 0; i < restaurant.rating; i++){  
        templateStar += `<i class="fas fa-star"></i>`
      }
    }
    
    let templateRestaurant = '';
    templateRestaurant += `<li class="list-group-item d-flex flex-row">
       <img class="img-fluid" src="http://lorempixel.com/400/200/food/" alt="img-menu-restaurant">
       <div class="feature-container">  
         <p class="restaurant-name">${restaurant.name}</p>
         <p class="rating-stars">${templateStar}</p>
         <p>${restaurant.address.city}</p>
         <button type="button" class="btn ">More...</button>
       </div>
     </li>`;
    $('#restaurants-container').append(templateRestaurant)
  }) 
}

// fucntion than choose ordering
const chooseOrder = e => {
  e.preventDefault();
  console.log(e.target)
  if(e.target.textContent === 'A-Z'){
    descendingOrder('name')
  } else if (e.target.textContent === 'Z-A') {
    ascendingOrder('name')
  } else if (e.target.textContent === 'Rating ▼') {
    descendingOrder('rating')
  } else if (e.target.textContent === 'Rating ▲') {
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