'use strict';
var WIDTH = 40;
var HEIGHT = 44;
// Функция получения рандомного значения между min и max + 1
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomElement = function(elements) {
  return elements[getRandomInt(0, elements.length)];
};

var randomArray = function(array) {
  var len = getRandomInt(1, array.length);
  var result = [];
  for (var i = 0; i < len; i++) {
    var el = randomElement(array);
    result.push(el);
  };
  return result;
};
// Создание нового элемента DOM из строки HTML с использованием встроенных методов DOM или прототипа
// объявление переменных
var hotelTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Маленький ужасный дворец',
  'Огромный прекрасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var hotelTypes = ['flat', 'house', 'bungalo'];
var hotelCheckins = ['12:00', '13:00', '14:00'];
var hotelCheckouts = ['12:00', '13:00', '14:00'];
var hotelFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Маcсив из 8 js объектов
var hotels = [];

// Цикл возвращает массив объектов
for (var i = 0; i < 8; i++) {
  var loc = {
    x: getRandomInt(300, 900),
    y: getRandomInt(100, 500)
  };
  hotels.push({
    author: {
      avatar: 'img/avatars/user' + '0' + getRandomInt(1, 8) + '.png'
    },
    offer: {
      title: hotelTitles[getRandomInt(0, hotelTitles.length)],
      address: (loc.x - (WIDTH / 2)) + ', ' + (loc.y - HEIGHT),
      price: getRandomInt(1000, 1000000),
      type: hotelTypes[getRandomInt(0, hotelTypes.length)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 3),
      checkin: hotelCheckins[getRandomInt(0, hotelCheckins.length)],
      checkout: hotelCheckouts[getRandomInt(0, hotelCheckouts.length)],
      features: randomArray(hotelFeatures),
      description: '',
      photos: []
    },
    location: loc
  });
};

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var mapTemplate = document.querySelector('template').content;

for (i = 0; i < hotels.length; i++) {
  var button = mapTemplate.querySelector('.map__pin').cloneNode(true);
  button.style.left = hotels[i].location.x + 'px';
  button.style.top = hotels[i].location.y + 'px';
  button.querySelector('img').src = hotels[i].author.avatar;
  fragment.appendChild(button);
};


var mapTemplateCopy = mapTemplate.querySelector('article').cloneNode(true);
mapTemplateCopy.querySelector('h3').textContent = hotels[0].offer.title;
mapTemplateCopy.querySelector('p small').textContent = hotels[0].offer.address;
mapTemplateCopy.querySelector('.popup__price').textContent = hotels[0].offer.price + '₽/ночь';
mapTemplateCopy.querySelector('.rooms-for-guests').textContent = hotels[0].offer.rooms + ' для ' + hotels[0].offer.guests + ' гостей';
mapTemplateCopy.querySelector('.mode').textContent = 'Заезд после ' + hotels[0].offer.checkin + ', выезд до ' + hotels[0].offer.checkout;


var typeBuilding = mapTemplateCopy.querySelector('h4');
if (hotels[0].offer.type === 'flat') {
  typeBuilding.textContent = 'Квартира';
} else if (hotels[0].offer.type === 'bungalo') {
  typeBuilding.textContent = 'Бунгало';
} else {
  typeBuilding.textContent = 'Дом';
};


var popupFeatures = mapTemplateCopy.querySelector('.popup__features');
var filtersContainer = document.querySelector('.map__filters-container');
for (i = 0; i < popupFeatures.children.length; i++) {
  popupFeatures.children[i].style.display = 'none';
  for (var j = 0; j < hotels[0].offer.features.length; j++) {
    var classElement = 'feature--' + hotels[0].offer.features[j];
    if (popupFeatures.children[i].classList.contains(classElement)) {
      popupFeatures.children[i].style.display = 'inline-block';
    };
  };
};

mapTemplateCopy.querySelector('.description-hotels').textContent = hotels[0].offer.description;

mapTemplateCopy.querySelector('.popup__avatar').src = hotels[0].author.avatar;

document.querySelector('.map').insertBefore(mapTemplateCopy, filtersContainer);
var noActivForm = document.querySelector('.notice__form');
noActivForm.classList.add('notice__form--disabled');
var disableForm = document.querySelectorAll('fieldset');
disableForm.disabled = true;
var pinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
pinMain.addEventListener('mouseup', function() {
  map.classList.remove('map--faded');
  noActivForm.classList.remove('notice__form--disabled');
  mapPins.appendChild(fragment);
  disableForm.disabled = false;
});

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var popup = document.querySelector('.popup');
var popupClose = document.querySelector('.popup__close');

popupClose.addEventListener('click', function() {
  closePopup();
});

popupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
popupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
});

var openPopup = function() {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};


var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function() {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
var mapPin = mapPins.querySelectorAll('.map__pin');
for ( i = 0; i < hotels.length; i++) {
  mapPin[i].addEventListener('click', function() {
    openPopup();
    mapPin[i].classList.add('map__pin--active');
    if (mapPin.classList.contains('map__pin--active')) {
      openPopup();
    } else {
      mapPin[i].classList.remove('map__pin--active');
      closePopup();
    }
  });
};
/*for (i = 0; i < hotels.length; i++){
mapPin[i].addEventListener('click', function() {
  mapPin[i].classList.add('map__pin--active');
  openPopup();
});
};*/
