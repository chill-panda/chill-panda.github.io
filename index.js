// TO DO: Need to add bottle flip game - it is using npm
// TO DO: Need to add controls to tetris and add this game
const ALL_GAME_MAP = {
	1: 'games/DuckHunt-JS/dist/index.html',
	2: 'games/align-four/index.html',
	3: 'games/flappy-bird/index.html',
	4: 'games/color-match-game-broken/index.html',
	5: 'games/JoyRunner/runner.html',
	6: 'games/snake/index.html',
	7: 'games/sweet-memory-game/index.html',
	8: 'games/tower-blocks/index.html',
	9: 'games/candycrush/index.html',
	10: 'games/Maze2/maze.html',
	11: 'games/bubble-shooter/bubble-shooter.html',
	12: 'games/got-death-quiz/index.html',
	13: 'games/Friendly_Quiz_Game/index.html',
	14: 'games/pacman/index.html',
	15: 'games/Smash_game/index.html',
	16: 'games/ZigZag/index.html'
};
// const GAME_MAP = {
// 	1: 'games/DuckHunt-JS/dist/index.html',
// 	2: 'games/align-four/index.html',
// 	3: 'games/flappy-bird/index.html',
// 	4: 'games/color-match-game-broken/index.html',
// 	5: 'games/JoyRunner/runner.html',
// 	6: 'games/snake/index.html',
// 	7: 'games/sweet-memory-game/index.html',
// 	8: 'games/tower-blocks/index.html',
// 	9: 'games/candycrush/index.html',
// 	10: 'games/Maze2/maze.html'
// };
var GAME_MAP = {}

const TAG_FOR_PARTHA_DENTAL = 'parthadental'
const TAG_FOR_NOSTRO_CAFE = 'nostrocafe'
const TAG_FOR_COFFEECRUSH = 'coffeecrush'
const TAG_FOR_BLR_BIRYANI_BHAWAN = 'bbb'

const CONTENT_PATH = 'resources/content.json'
const CONFIG_PATH = 'resources/config.json'
const DEFAULT_HOME_PAGE_PATH = 'assets/background-2.jpeg'
const CLOSE_BUTTON_PATH = 'assets/button.png'
const LOCAL_STORAGE_KEY_FOR_RETAIL_LOCATION = 'retailLocation'
const LOCAL_STORAGE_KEY_FOR_LAST_GAME = 'lastGame'
const RETAIL_LOCATION_TAG_NAME = 'where'
const JSON_KEY_FOR_RETAIL_LOCATION = 'urlTag'
const JSON_KEY_FOR_IN_GAME_ASSETS = 'ingamePath'
const JSON_KEY_FOR_AD_ASSETS = 'adPath'
const JSON_KEY_FOR_TOTAL_ADS = 'totalAds'
const JSON_KEY_FOR_AD_FORMAT = 'adFormat'
const JSON_KEY_FOR_WEBSITE = 'website'
const JSON_KEY_FOR_LOGO = 'logo'
const JSON_KEY_FOR_GIF = 'gif'
const JSON_KEY_FOR_RETAIL_NAME = 'name'
const JSON_KEY_FOR_GAMES_LIST = 'games'
const JSON_KEY_FOR_HOME_PAGE = 'homePage'
const JSON_KEY_FOR_CSS = 'cssPath'
const JSON_KEY_FOR_MENU = 'menuPath'
const MENU_URL = 'menu.html'
const CLIENT_URL = 'client/index.html'
const IS_INSTANCE_HANDLED_BY_TAG = true
var IN_GAME_ASSETS_PATH
var AD_ASSETS_PATH
var TOTAL_ADS
var AD_FORMAT
var WEBSITE_LINK
var LOGO_PATH
var GIF_PATH
var RETAIL_NAME
var HOME_PAGE_PATH
var CSS_PATH
var MENU_PATH
var ALL_CONTENT_INSTANCE_JSON
var INSTANCE_JSON
var CONFIG_JSON
var URL_SEARCH_PARAM_FOR_RETAIL_LOCATION

function getRandomNumber() {
	var total = Object.keys(GAME_MAP).length;
	if(!total) {
		loadGameMap()
		total = Object.keys(GAME_MAP).length
	}
	var number = 1 + Math.floor(Math.random() * total);
	if (!localStorage[LOCAL_STORAGE_KEY_FOR_LAST_GAME]) {
		return number;
	}
	while (number == localStorage[LOCAL_STORAGE_KEY_FOR_LAST_GAME]) {
		number = 1 + Math.floor(Math.random() * total);
	}
	return number;
}

function setRetailLocation(retailLocation) {
	if (retailLocation) {
		localStorage.setItem(LOCAL_STORAGE_KEY_FOR_RETAIL_LOCATION, retailLocation)
	} else {
		localStorage.setItem(LOCAL_STORAGE_KEY_FOR_RETAIL_LOCATION, '')
	}
}

function getJsonByKeyValue(data, tagName, tagValue) {
    var matches = $.map(data, function(entry) {
            var match = entry[tagName] == (tagValue ? tagValue : '')
            return match ? entry : null
        });
    return matches.length ? matches[0] : null
}

function setInGameVariables() {
	IN_GAME_ASSETS_PATH = INSTANCE_JSON[JSON_KEY_FOR_IN_GAME_ASSETS]
}

function loadGameMap() {
	if (INSTANCE_JSON[JSON_KEY_FOR_GAMES_LIST]) {
		var games = INSTANCE_JSON[JSON_KEY_FOR_GAMES_LIST]
		for(var i in games) {
			GAME_MAP[games[i]] = ALL_GAME_MAP[games[i]]
		}
	} else {
		GAME_MAP = ALL_GAME_MAP
	}
}

function setLocationVariables() {
	HOME_PAGE_PATH = INSTANCE_JSON[JSON_KEY_FOR_HOME_PAGE]
	AD_ASSETS_PATH = INSTANCE_JSON[JSON_KEY_FOR_AD_ASSETS]
	TOTAL_ADS = INSTANCE_JSON[JSON_KEY_FOR_TOTAL_ADS]
	WEBSITE_LINK = INSTANCE_JSON[JSON_KEY_FOR_WEBSITE]
	LOGO_PATH = INSTANCE_JSON[JSON_KEY_FOR_LOGO]
	GIF_PATH = INSTANCE_JSON[JSON_KEY_FOR_GIF]
	AD_FORMAT = INSTANCE_JSON[JSON_KEY_FOR_AD_FORMAT] ? INSTANCE_JSON[JSON_KEY_FOR_AD_FORMAT] : '.png'
	RETAIL_NAME = INSTANCE_JSON[JSON_KEY_FOR_RETAIL_NAME]
	CSS_PATH = INSTANCE_JSON[JSON_KEY_FOR_CSS]
	MENU_PATH = INSTANCE_JSON[JSON_KEY_FOR_MENU]
	URL_SEARCH_PARAM_FOR_RETAIL_LOCATION = (localStorage[LOCAL_STORAGE_KEY_FOR_RETAIL_LOCATION] ? ('?' + RETAIL_LOCATION_TAG_NAME + '=' + localStorage[LOCAL_STORAGE_KEY_FOR_RETAIL_LOCATION]) : '')
	loadGameMap()
}

function setInstanceVariables() {
	INSTANCE_JSON = getJsonByKeyValue(ALL_CONTENT_INSTANCE_JSON, JSON_KEY_FOR_RETAIL_LOCATION, localStorage[LOCAL_STORAGE_KEY_FOR_RETAIL_LOCATION])
	if (!INSTANCE_JSON) {
		INSTANCE_JSON = ALL_CONTENT_INSTANCE_JSON[0]
	}
	setInGameVariables()
	setLocationVariables()
}

function loadInstanceVariables(content_path, config_path, callback) {
	$.getJSON(content_path, function(content) {
		$.getJSON(config_path, function(data) {
			ALL_CONTENT_INSTANCE_JSON = content
			CONFIG_JSON = data
			setInstanceVariables()
			if (callback) {
				callback()
			}
		})
	})
}

function setVariablesInLocalStorage() {
	if (IS_INSTANCE_HANDLED_BY_TAG) {
		var params = new URLSearchParams(location.search)
		setRetailLocation(params.get(RETAIL_LOCATION_TAG_NAME)) // add retail location to local storage
	} else {
		var parts = location.hostname.split('.');
		var subdomain = parts.shift();
		if (subdomain == 'chillpanda') {
			setRetailLocation('')
		} else {
			setRetailLocation(subdomain) // add retail location to local storage
		}
	}
}

function createLandingPage() {
	var h1Greeting = document.createElement('h1')
	h1Greeting.id = 'greeting'
	var h1Retailname = document.createElement('h1')
	h1Retailname.id = 'retailname'
	var buttonGroup = document.createElement('div')
	buttonGroup.className = 'button-group'
	var button1 = document.createElement('button')
	button1.id = 'button1'
	button1.className = 'btn-hover color-10'
	button1.innerHTML = '<span>Services</span>'
	var button2 = document.createElement('button')
	button2.id = 'button2'
	button2.className = 'btn-hover color-10'
	button2.innerHTML = '<span>Play games</span>'
	
	document.body.appendChild(h1Greeting)
	document.body.appendChild(h1Retailname)
	buttonGroup.appendChild(button1)
	buttonGroup.appendChild(button2)
	document.body.appendChild(buttonGroup)
}

function loadCSS() {
	var head = document.getElementsByTagName('HEAD')[0]
	var link = document.createElement('link')
	link.rel = 'stylesheet'
	link.type = 'text/css'
	link.href = CSS_PATH
	head.appendChild(link)
}

function loadHomePage() {
	var body = document.getElementsByTagName('body')[0]
	if(HOME_PAGE_PATH) {
		body.style.backgroundImage = 'url(' + HOME_PAGE_PATH + ')'
	} else {
		body.style.backgroundImage = 'url(' + DEFAULT_HOME_PAGE_PATH + ')'
	}
	document.title = RETAIL_NAME
	document.getElementById('greeting').innerText = "Welcome   to "
	document.getElementById('retailname').innerText = RETAIL_NAME + '!'
	// document.getElementById('button1').innerHTML = '<span>Menu</span>'
}

function loadEventListeners() {
	document.getElementById('button2').addEventListener('click', function() {
		openGame();
	});
	document.getElementById('button1').addEventListener('click', function() {
		openMenu();
	});
}

function isLocationNostroCafe() {
	return localStorage.getItem(LOCAL_STORAGE_KEY_FOR_RETAIL_LOCATION) == TAG_FOR_NOSTRO_CAFE
}

function customizeBasedOnRetailLocation() {
	if(isLocationNostroCafe()) {
		document.getElementById('button1').innerHTML = '<span>Menu</span>'
		document.getElementById('retailname').innerText = ''
		document.getElementById('greeting').style.marginBottom = '3em'
		document.getElementById('greeting').style.fontSize = '3em'
	}
}

function checkIfRetailLocation() {
	return localStorage.getItem(LOCAL_STORAGE_KEY_FOR_RETAIL_LOCATION) !== ''
}

function customizeLandingPage() {
	if(checkIfRetailLocation()) {
		createLandingPage()
		loadCSS()
		loadHomePage()
		loadEventListeners()
		customizeBasedOnRetailLocation()
	} else {
		openClientPage()
	}
}

function openClientPage() {
	window.location.href = window.location.origin + '/' + CLIENT_URL
}

function openMenu() {
	window.location.href = window.location.origin + '/' + MENU_URL +
	// Temporary fix to always capture the location in GA from where the URL was first reached. Every change in href needs to add this for consistency.
	// TODO: move to location based subdomains for permanent fix
	(URL_SEARCH_PARAM_FOR_RETAIL_LOCATION ? URL_SEARCH_PARAM_FOR_RETAIL_LOCATION : '')
}

function openGame() {
	if(!INSTANCE_JSON) {
		loadInstanceVariables(CONTENT_PATH, CONFIG_PATH)
	}
	var number = getRandomNumber().toString();
	window.location.href = window.location.origin + '/' + GAME_MAP[number] + (URL_SEARCH_PARAM_FOR_RETAIL_LOCATION ? URL_SEARCH_PARAM_FOR_RETAIL_LOCATION : '')
}

function loadGame() {
	setVariablesInLocalStorage()
	var number = getRandomNumber().toString();
	$('#myiframe').attr('src', GAME_MAP[number])
}

function loadLandingPage() {
	setVariablesInLocalStorage()
	loadInstanceVariables(CONTENT_PATH, CONFIG_PATH, customizeLandingPage)
}

let s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

//generates random id;
let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function gaSetUserId() {
	if (!localStorage['guid']) {
		var id = guid();
		localStorage.setItem('guid', id);
	}
	gtag('set', 'user_id', localStorage['guid']);
}

function gaSetUserProperties() {
	gtag('set', 'user_properties', {
		'appCodeName': navigator["appCodeName"],
		"appName": navigator["appName"],
		"appMinorVersion": navigator["appMinorVersion"],
		"cpuClass": navigator["cpuClass"],
		"platform": navigator["platform"],
		"plugins": navigator["plugins"],
		"opsProfile": navigator["opsProfile"],
		"userProfile": navigator["userProfile"],
		"systemLanguage": navigator["systemLanguage"],
		"userLanguage": navigator["userLanguage"],
		"appVersion": navigator["appVersion"],
		"userAgent": navigator["userAgent"],
		"onLine": navigator["onLine"],
		"cookieEnabled": navigator["cookieEnabled"],
		"mimeTypes": navigator["mimeTypes"]
	});
}

gaSetUserId();
gaSetUserProperties();

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBJQO8HWWCV6a-K33knwHYnIcZwm5-4G9w",
//   authDomain: "chill-panda-c1184.firebaseapp.com",
//   projectId: "chill-panda-c1184",
//   storageBucket: "chill-panda-c1184.appspot.com",
//   messagingSenderId: "97999123599",
//   appId: "1:97999123599:web:c214990d78ab04860b6cfa",
//   measurementId: "G-QNEMSD28TV"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);