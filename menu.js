$(window).on('load', function() {
	$(".loader").fadeOut("1000");
});

$(document).ready(function(){

	loadInstanceVariables(CONTENT_PATH, CONFIG_PATH, customizeMenu)

	function customizeMenu() {
		loadMenu()
		$('#link')[0].href = WEBSITE_LINK
		$('#link')[0].innerText = RETAIL_NAME
		document.getElementById('button2').addEventListener('click', function() {
			openGame();
		});
		customizeMenuBasedonLocation()
	}

	function loadMenu() {
		d3.csv(MENU_PATH).then(function(data) {
			createMenuHTML(data)
		})
	}

	function createMenuHTML(data) {
		ulAccordion = document.createElement('ul')
		ulAccordion.id = 'accordion'
		ulAccordion.className = 'accordion'

		// console.log(data)

		categoryValueArray = data.map(obj => obj.Category)
		setOfValue = new Set(categoryValueArray)
		uniqueCategory = [...setOfValue]

		uniqueCategory.forEach(element => {
			liCategory = document.createElement('li')
			liCategory.innerHTML = '<div class="link">' + element + ' <span>Price</span><i class="fa fa-chevron-down"></i></div>'
			
			subMenu = data.filter(function(item) {
				return item.Category == element
			})

			ulSubMenu = document.createElement('ul')
			ulSubMenu.className = 'submenu'

			subMenu.forEach(element => {
				li = document.createElement('li')
				li.innerHTML = '<a href="#">' + subMenu.Item + '</a><span>' + subMenu.Price + '</span>'
				ulSubMenu.appendChild(li)
			});

			liCategory.appendChild(ulSubMenu)
			ulAccordion.appendChild(liCategory)
		});

		button = document.getElementById('button2')
		document.body.insertBefore(ulAccordion, button)
	}

	function createButton2() {
		button = document.createElement('button')
		button.id = 'button2'
		button.className = 'btn-hover color-10'
		button.innerHTML = '<span>Play games</span>'
		button.addEventListener('click', function() {
			openGame();
		});
		return button
	}

	function customizeMenuBasedonLocation() {
		if(isLocationNostroCafe()) {
			document.getElementById('menu-head').innerHTML = 'Menu'
		}
	}

	$(function() {
		var Accordion = function(el, multiple) {
			this.el = el || {};
			this.multiple = multiple || false;

			// Variables privadas
			var links = this.el.find('.link');
			// Evento
			links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
		}

		Accordion.prototype.dropdown = function(e) {
			var $el = e.data.el;
				$this = $(this),
				$next = $this.next();

			$next.slideToggle();
			$this.parent().toggleClass('open');

			if (!e.data.multiple) {
				$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
			};
		}	

		var accordion = new Accordion($('#accordion'), false);
	});

	gaSetUserId();
	gaSetUserProperties();	

});