
'use strict';
// Функция получения рандомного значения между min и max + 1
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Функция получения рандомного значения из массива
var randomElement = function(arr) {
	var randomNumber = Math.floor(Math.random() * arr.length);
	return arr[randomNumber];
};
var randomArray = function(array) {
  var arr = array.slice();
  var len = getRandomInt(1, arr.length);
  var result = [];
  for (var i = 0; i < len; i++) {
    var el = randomElement(arr);
    result.push(el);
    arr.splice(arr.indexOf(el), 1);
  }
  return result;
};
// Создание нового элемента DOM из строки HTML с использованием встроенных методов DOM или прототипа
// объявление переменных
var hotelTitles = ['Большая уютная квартира", "Маленькая неуютная квартира', 'Маленький ужасный дворец',
'Огромный прекрасный дворец',
'Красивый гостевой домик',
'Некрасивый негостеприимный домик',
'Уютное бунгало далеко от моря',
'Неуютное бунгало по колено в воде'];

var hotelTypes = ['flat', 'house', 'bungalo'];
var hotelCheckins = ['12:00', '13:00', '14:00'];
var hotelCheckouts = ['12:00', '13:00', '14:00'];
var hotelFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Маасив из 8 js объектов
var hotels = [];

// Цикл возвращает объект
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
			address: loc.x + ', ' + loc.y,
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
	})
}

document.querySelector('.map').classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

for  (i = 0; i < hotels.length; i++) {
	var button = document.createElement('button');
	button.classList.add("map__pin");
	button.style.left = hotels[i].location.x + 'px';
	button.style.top = hotels[i].location.y + 'px';
	var img = document.createElement('img');
	img.src = hotels[i].author.avatar;
	img.width = 40;
	img.height = 40;
	img.draggable = false;
	button.appendChild(img);
	fragment.appendChild(button);
}

mapPins.appendChild(fragment);

var mapTemplate = document.querySelector('template').content;

var mapTemplateCopy = mapTemplate.cloneNode(true);
mapTemplateCopy.querySelector('h3').textContent = hotels[1].offer.title;
mapTemplateCopy.querySelector('p').textContent = hotels[1].offer.address;
mapTemplateCopy.querySelector('.popup__price').textContent = hotels[1].offer.price + '₽/ночь';

var typeBuilding = mapTemplateCopy.querySelector('h4');
if (hotels[1].offer.type === 'flat') {
  typeBuilding.textContent = 'Квартира';
} else if (hotels[1].offer.type === 'bungalo') {
  typeBuilding.textContent = 'Бунгало';
} else {
  typeBuilding.textContent = 'Дом';
}

var nextString = typeBuilding.nextElementSibling;
nextString.textContent = hotels[1].offer.rooms + ' для ' + hotels[1].offer.guests + ' гостей';
nextString.nextElementSibling.textContent = 'Заезд после ' + hotels[1].offer.checkin + ', выезд до ' + hotels[1].offer.checkout;

var popupFeatures = mapTemplateCopy.querySelector('.popup__features');

for ( i = 0; i < popupFeatures.children.length; i++) {
  popupFeatures.children[i].style.display = 'none';
  for (var j = 0; j < hotels[1].offer.features.length; j++) {
    var classElement = 'feature--' + hotels[1].offer.features[j];
    if (popupFeatures.children[i].classList.contains(classElement)) {
      popupFeatures.children[i].style.display = 'inline-block';
    }
  }
}

popupFeatures.nextElementSibling.textContent = hotels[1].offer.description;

mapTemplateCopy.querySelector('.popup__avatar').src = hotels[1].author.avatar;

document.querySelector('.map').appendChild(mapTemplateCopy);
