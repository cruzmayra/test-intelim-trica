window.onload = () => {
  getRestaurantsData();
  $('.order-alphabe').click(orderAlphabetically)
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

//function that order restaurants alphabetically
const orderAlphabetically = () => {
  let restaurants = JSON.parse(localStorage.getItem('melp-data'))
  .sort(function(a, b){
    return (a.name === b.name) ? 0 : (a.name > b.name) ? 1 : -1;
  })
  paintData(restaurants)
}

