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

//función que solo genera el string con el que se va a pintar en el DOM
const paintRestaurant = (data) => {
  // console.log(data[0])
  let template = ''
  template += `<li class="list-group-item d-flex flex-row"><img class="img-fluid" src="assets/images/elli-o-65548-unsplash-compressor.jpg" alt="img-menu-restaurant"><div class="feature-container"><p class="restaurant-name">${data[0].name}</p><p class="rating-stars">${data[0].rating}</p><p>${data[0].address.city}</p><button type="button" class="btn" data-toggle="modal" data-target="#restaurant-modal" data-id="${data[0].id}">More...</button></div></li>`
return template
}

//llamando a la función que solo crea un string
paintRestaurant(JSON.parse(localStorage.getItem('melp-data')));


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
       <img class="img-fluid" src="assets/images/elli-o-65548-unsplash-compressor.jpg" alt="img-menu-restaurant">
       <div class="feature-container">  
         <p class="restaurant-name">${restaurant.name}</p>
         <p class="rating-stars">${templateStar}</p>
         <p>${restaurant.address.city}</p>
         <button type="button" class="btn" data-toggle="modal" data-target="#restaurant-modal" data-id="${restaurant.id}">More...</button>
       </div>
     </li>`;
    $('#restaurants-container').append(templateRestaurant)
  }) 
}

// fucntion than choose ordering
const chooseOrder = e => {
  e.preventDefault();
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

$('#restaurant-modal').on('show.bs.modal', event => {
  let button = $(event.relatedTarget);  
  let restaurant = JSON.parse(localStorage.getItem('melp-data')).find(restaurant => {
    return restaurant.id === button.data('id');
  })

  let templateStar = '';
  if(restaurant.rating === 0){
    templateStar = '0 stars';
  } else {
    for(var i = 0; i < restaurant.rating; i++){  
      templateStar += `<i class="fas fa-star"></i>`
    };
  }

  let modal = event.target;
  modal.querySelector('#restaurant').innerText = restaurant.name;
  modal.querySelector('.stars').innerHTML = templateStar;
  modal.querySelector('.address').innerText = `${restaurant.address.street}, ${restaurant.address.city}, ${restaurant.address.state}` ;
  modal.querySelector('.site').innerText = restaurant.contact.site;
  modal.querySelector('.email').innerText = restaurant.contact.email;  
  modal.querySelector('.phone').innerText = restaurant.contact.phone;

  initMap(restaurant.address.location);
  
})

function initMap(location) {
  console.log(location)
  var restaurantLocation = location;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: restaurantLocation
  });
  var marker = new google.maps.Marker({
    position: restaurantLocation,
    map: map
  });
}  