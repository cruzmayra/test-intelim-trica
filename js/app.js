window.onload = () => {
  getRestaurantsData();
  //$('.details').click(paint)
 }

//function that gets all the data
const getRestaurantsData = () => {
  const url = "https://s3-us-west-2.amazonaws.com/lgoveabucket/data_melp.json";
    fetch(url)
        .then( response => response.json()).then( json => paintData(json));
}

const paintData = (json) => {
  json.forEach(restaurant => {
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



//$(document).ready(loadPage);

