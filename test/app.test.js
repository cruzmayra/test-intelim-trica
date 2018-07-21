// desribe indica que va a ser una suite, la cadena de texto indica el nombre de la suit. La suit es un conjunto de pruebas
// puede haber una suit dentro de otra suit
// lo que se ejecute dentro de la función es lo que va a decir si la prueba paso o no.
// el it es un spec (una especificación)
// toBe es un matcher (hay varios matcher, e incluso podemos definirlos)
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
    // var cero = 1 / 0;
  });
});

describe('Rendereando restaurante', () => {
  it('pintame este... restaurante', () => {
    let esperado = `<li class="list-group-item d-flex flex-row">
    <img class="img-fluid" src="assets/images/elli-o-65548-unsplash-compressor.jpg" alt="img-menu-restaurant">
    <div class="feature-container">  
      <p class="restaurant-name">Olivo, Santana and Elizondo</p>
      <p class="rating-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i></p>
      <p>Elizabethtown</p>
      <button type="button" class="btn" data-toggle="modal" data-target="#restaurant-modal" data-id="596081be-67c8-4c47-8c56-e2611cd4fa32">More...</button>
    </div>
  </li>`
    let entrada = {
      address:{city:"Mérida Alfredotown", location:{lat: 19.440057053713137, lng: -99.12704709742486},state:"Durango", street:"82247 Mariano Entrada"},
      contact:{site: "https://federico.com", email: "Anita_Mata71@hotmail.com", phone: "534 814 204"},
      id:"851f799f-0852-439e-b9b2-df92c43e7672",
      name:"Barajas, Bahena and Kano",
      rating:1
    }
    //any es para comprobar el "tipo" de la expectativa
    expect(entrada).toEqual(jasmine.any(Object))
  })
})

describe('Validar cadena', () => {
  it('Genera string HTML', () => {
    let esperado = `<li class="list-group-item d-flex flex-row"><img class="img-fluid" src="assets/images/elli-o-65548-unsplash-compressor.jpg" alt="img-menu-restaurant"><div class="feature-container"><p class="restaurant-name">Barajas, Bahena and Kano</p><p class="rating-stars">1</p><p>Mérida Alfredotown</p><button type="button" class="btn" data-toggle="modal" data-target="#restaurant-modal" data-id="851f799f-0852-439e-b9b2-df92c43e7672">More...</button></div></li>`
    let entrada = [
      {
        address:{city:"Mérida Alfredotown", location:{lat: 19.440057053713137, lng: -99.12704709742486},state:"Durango", street:"82247 Mariano Entrada"},
        contact:{site: "https://federico.com", email: "Anita_Mata71@hotmail.com", phone: "534 814 204"},
        id:"851f799f-0852-439e-b9b2-df92c43e7672",
        name:"Barajas, Bahena and Kano",
        rating:1
      }
    ]
    let actual = paintRestaurant(entrada)
    expect(actual).toEqual(esperado)
    expect(esperado.length).toEqual(actual.length)
  })
})

