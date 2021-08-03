// Библиотека для модального окна
import MicroModal from 'micromodal';
// / Библиотека для модального окна

// Библиотека для анимации
import { gsap } from "gsap";
// / Библиотека для анимации

// Компонент для настройка повторной анимации при появлении блока в окне браузера
import { ScrollTrigger } from "gsap/scrolltrigger"
gsap.registerPlugin(ScrollTrigger)
// / Компонент для настройка повторной анимации при появлении блока в окне браузера

// Инициализация переменных
let cx, cy, mouseX, mouseY, posX, posY, clientX, clientY, dx, dy, tiltx, tilty, request, radius, degree
// / Инициализация переменных

document.addEventListener('DOMContentLoaded', () => {

	const body = document.querySelector('body')
	cx = window.innerWidth / 2
	cy = window.innerHeight / 2

	const modalContainer = document.querySelector('.modal__container')
	if (modalContainer) {
		body.addEventListener("mousemove", event => {
			clientX = event.pageX;
			clientY = event.pageY;
			request = requestAnimationFrame(updateMe)

		})
		function updateMe() {
			dx = clientX - cx
			dy = clientY - cy
			tiltx = dy / cy
			tilty = dx / cx
			radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2))
			degree = radius * 12
			gsap.to(
				'.modal__container', 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg)` }
			)
		}
	}



	// Инициализация и настройка анимации блоков 
	const welcomeImg = document.querySelector('.welcome__img')
	const buttonLost = document.querySelector('.button-lost')
	const buttonPet = document.querySelector('.button-pet')
	const blockIinfoImg = document.querySelector('.block-info__img')
	const blockInfoList = document.querySelector('.block-info__list')
	const bannerRow = document.querySelector('.banner__row')

	if (welcomeImg) {
		gsap.from(welcomeImg, {
			scrollTrigger: {
				trigger: welcomeImg
			},
			opacity: 0,
			duration: 2,
			scale: 0.7
		})
	}
	if (buttonLost) {
		gsap.from(buttonLost, {
			scrollTrigger: {
				trigger: buttonLost,
				//toggleActions: "restart pause none pause",			
			},
			x: -320,
			duration: 1.5,
		})
	}
	if (buttonPet) {
		gsap.from(buttonPet, {
			scrollTrigger: {
				trigger: buttonPet,
				//toggleActions: "restart pause none pause"
			},
			x: -280,
			duration: 2,
		})
	}

	if (blockIinfoImg) {
		gsap.from(blockIinfoImg, {
			scrollTrigger: {
				trigger: blockIinfoImg,
				toggleActions: "restart pause none pause"
			},
			opacity: 0,
			duration: 2,
			scale: 0.7
		})
	}
	if (blockInfoList) {
		gsap.from(blockInfoList, {
			scrollTrigger: {
				trigger: blockInfoList,
				toggleActions: "restart pause none pause"
			},
			x: 320,
			duration: 1,
		})
	}
	if (bannerRow) {
		gsap.from(bannerRow, {
			scrollTrigger: {
				trigger: bannerRow,
				toggleActions: "restart pause none pause"
			},
			opacity: 0,
			duration: 1.5,
		})
	}
	// / Инициализация и настройка анимации блоков 

	// Анимация заголовка на главной странице
	const text = document.querySelector('.welcome__title')
	if (text) {
		const splitText = (el) => {
			el.innerHTML = el.textContent.replace(/(\S*)/g, m => {
				return `<div class="word">` +
					m.replace(/(-|#|@)?\S(-|#|@)?/g, "<div class='letter'>$&</div>") +
					`</div>`;
			});
			return el;
		}

		const split = splitText(text)
		function random(min, max) {
			return (Math.random() * (max - min)) + min;
		}
		Array.from(split.querySelectorAll('.letter')).forEach((el, idx) => {
			gsap.from(el, 1, {
				opacity: 0,
				scale: .1,
				x: random(-500, 500),
				y: random(-500, 500),
				z: random(-500, 500),
				delay: idx * 0.02,
				repeat: 0,
			})
		})
	}
	//  / Анимация заголовка на главной странице

	// Анимация ввода текста в ворме регистрации
	const buttonSignIn = document.querySelectorAll(`[data-micromodal-open="modal-1"]`)
	if (buttonSignIn) {
		let i = 0;
		let placeholderName = "";
		let placeholder = "";
		const name = "Helen Johnson";
		const email = "example@domain.com";
		const speed = 120;
		buttonSignIn.forEach(button => button.addEventListener('click', function type() {
			placeholderName += name.charAt(i);
			placeholder += email.charAt(i);
			document.querySelector("input[type=text]").setAttribute("placeholder", placeholderName);
			document.querySelector("input[type=email]").setAttribute("placeholder", placeholder);
			i++;
			setTimeout(type, speed);
		}))
	}
	// / Анимация ввода текста в ворме регистрации

	// Modal - инициализация модального окна для формы
	MicroModal.init({
		openTrigger: 'data-micromodal-open'
	})
	// / Modal - инициализация модального окна для формы


	// Навигация по сайту
	const menuButton = document.querySelector('.menu-button')
	const navigationLeft = document.querySelector('.home-page__sidebar-left')
	const navigationRight = document.querySelector('.home-page__sidebar-right')
	const sideBar = document.querySelector('.home-page__sidebar-left')
	const li = document.querySelectorAll('.navigation__li')

	const removeLiActive = () => {
		li.forEach(elem => elem.classList.remove('_active'))
	}

	const removeNavActive = () => {
		navigationLeft.classList.remove('_active')
		navigationRight.classList.remove('_active')
		menuButton.classList.remove('_active')
	}

	const toggleNavActive = () => {
		navigationLeft.classList.toggle('_active')
		navigationRight.classList.toggle('_active')
		menuButton.classList.toggle('_active')
	}

	menuButton.addEventListener('click', () => {
		toggleNavActive()
	})

	window.addEventListener('resize', function () {
		if (window.innerWidth > 768) {
			removeNavActive()
		}
	})


	const activePage = (dataSet) => {
		fetch(`../parts/${dataSet}-content.html`)
			.then(response => {
				return response.text()
			})
			.then(content => {
				document.querySelector(".home-page__content").innerHTML = content
			})
	}

	let activeMenu = JSON.parse(localStorage.getItem('Active-menu'))
	if (activeMenu) {
		removeLiActive()
		removeNavActive()
		activePage(activeMenu[0])
		document.querySelector(`.navigation__link[data-menu=${activeMenu[0]}]`).closest('li').classList.add('_active')
	} else {
		document.querySelector(`.navigation__link[data-menu="home"]`).closest('li').classList.add('_active')
	}

	if (sideBar) {
		sideBar.addEventListener('click', (event) => {
			event.preventDefault()
			let el = event.target
			let elDataset = el.dataset.menu
			if (el.dataset.menu) {
				removeLiActive()
				removeNavActive()
				localStorage.setItem("Active-menu", JSON.stringify([elDataset, el.classList]))
				activePage(elDataset)
				el.closest('li').classList.add('_active')
			}
		})
	}

	const headerButtonLost = document.querySelector('.button.lost')
	headerButtonLost.addEventListener('click', (event) => {
		event.preventDefault()
		let el = event.target
		if (el.closest('button').classList.contains('lost')) {
			removeLiActive()
			removeNavActive()
			fetch(`../parts/lost-page-form.html`)
				.then(response => {
					return response.text()
				})
				.then(content => {
					document.querySelector(".home-page__content").innerHTML = content
					selects_init()
				})
		}
	})

	const headerButtonFound = document.querySelector('.button.found')
	headerButtonFound.addEventListener('click', (event) => {
		event.preventDefault()
		let el = event.target
		if (el.closest('button').classList.contains('found')) {
			removeLiActive()
			removeNavActive()
			fetch(`../parts/found-page-form.html`)
				.then(response => {
					return response.text()
				})
				.then(content => {
					document.querySelector(".home-page__content").innerHTML = content
					selects_init()
				})

		}
	})

	const headerButtonAdd = document.querySelector('.button.add')
	headerButtonAdd.addEventListener('click', (event) => {
		event.preventDefault()
		let el = event.target
		if (el.closest('button').classList.contains('add')) {
			removeLiActive()
			removeNavActive()
			fetch(`../parts/add-post-form.html`)
				.then(response => {
					return response.text()
				})
				.then(content => {
					document.querySelector(".home-page__content").innerHTML = content
					selects_init()
				})

		}
	})

	const userCardInfo = document.querySelector('.user-card__info')
	userCardInfo.addEventListener('click', (event) => {
		event.preventDefault()
		removeLiActive()
		removeNavActive()
		fetch(`../parts/my-profile.html`)
			.then(response => {
				return response.text()
			})
			.then(content => {
				document.querySelector(".home-page__content").innerHTML = content
			})

	})

	const homePageContent = document.querySelector('.home-page__content')
	if (homePageContent) {
		homePageContent.addEventListener('click', (event) => {
			event.preventDefault()
			let el = event.target
			let parent = el.closest('.services-cards')
			if (el.classList.contains('services-cards__details')) {
				parent.classList.toggle('_show-more')
			}
			if (el.classList.contains('card-details__link') && el.closest('.card')) {
				fetch(`../parts/pets-more.html`)
					.then(response => {
						return response.text()
					})
					.then(content => {
						document.querySelector(".home-page__content").innerHTML = content
					})
			}
		})
	}
	// / Навигация по сайту

	// Select - стилизация select
	let selects = document.getElementsByTagName('select');
	if (selects.length > 0) {
		selects_init();
	}
	function selects_init() {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_init(select);
		}
		//select_callback();
		document.addEventListener('click', function (e) {
			selects_close(e);
		});
		document.addEventListener('keydown', function (e) {
			if (e.which == 27) {
				selects_close(e);
			}
		});
	}
	function selects_close(e) {
		const selects = document.querySelectorAll('.select');
		if (!e.target.closest('.select')) {
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_body_options = select.querySelector('.select__options');
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
	}
	function select_init(select) {
		const select_parent = select.parentElement;
		const select_modifikator = select.getAttribute('class');
		const select_selected_option = select.querySelector('option:checked');
		select.setAttribute('data-default', select_selected_option.value);
		select.style.display = 'none';

		select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

		let new_select = select.parentElement.querySelector('.select');
		new_select.appendChild(select);
		select_item(select);
	}
	function select_item(select) {
		const select_parent = select.parentElement;
		const select_items = select_parent.querySelector('.select__item');
		const select_options = select.querySelectorAll('option');
		const select_selected_option = select.querySelector('option:checked');
		const select_selected_text = select_selected_option.text;
		const select_type = select.getAttribute('data-type');
		if (select_items) {
			select_items.remove();
		}

		let select_type_content = '';
		if (select_type == 'input') {
			select_type_content = '<div class="select__value"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
		} else {
			select_type_content = '<div class="select__value"><span>' + select_selected_text + '</span></div>';
		}

		select_parent.insertAdjacentHTML('beforeend',
			'<div class="select__item">' +
			'<div class="select__title">' + select_type_content + '</div>' +
			'<div class="select__options">' + select_get_options(select_options) + '</div>' +
			'</div></div>');

		select_actions(select, select_parent);
	}
	function select_actions(original, select) {
		const select_item = select.querySelector('.select__item');
		const select_body_options = select.querySelector('.select__options');
		const select_options = select.querySelectorAll('.select__option-in');
		const select_type = original.getAttribute('data-type');
		const select_input = select.querySelector('.select__input');

		select_item.addEventListener('click', function () {
			let selects = document.querySelectorAll('.select');
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_body_options = select.querySelector('.select__options');
				if (select != select_item.closest('.select')) {
					select.classList.remove('_active');
					_slideUp(select_body_options, 100);
				}
			}
			_slideToggle(select_body_options, 100);
			select.classList.toggle('_active');
		});

		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.getAttribute('data-value');
			const select_option_text = select_option.innerHTML;

			if (select_type == 'input') {
				select_input.addEventListener('keyup', select_search);
			} else {
				if (select_option.getAttribute('data-value') == original.value) {
					select_option.style.display = 'none';
				}
			}
			select_option.addEventListener('click', function () {
				for (let index = 0; index < select_options.length; index++) {
					const el = select_options[index];
					el.style.display = 'flex';
				}
				if (select_type == 'input') {
					select_input.value = select_option_text;
					original.value = select_option_value;
				} else {
					select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
					original.value = select_option_value;
					select_option.style.display = 'none';
				}
			});
		}
	}
	function select_get_options(select_options) {
		if (select_options) {
			let select_options_content = '';
			for (let index = 0; index < select_options.length; index++) {
				const select_option = select_options[index];
				const select_option_value = select_option.value;
				if (select_option_value != '') {
					const select_option_text = select_option.text;
					select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option-in">' + select_option_text + '</div>';
				}
			}
			return select_options_content;
		}
	}
	function select_search(e) {
		let select_block = e.target.closest('.select ').querySelector('.select__options');
		let select_options = e.target.closest('.select ').querySelectorAll('.select__option-in');
		let select_search_text = e.target.value.toUpperCase();

		for (let i = 0; i < select_options.length; i++) {
			let select_option = select_options[i];
			let select_txt_value = select_option.textContent || select_option.innerText;
			if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
				select_option.style.display = "";
			} else {
				select_option.style.display = "none";
			}
		}
	}
	function selects_update_all() {
		let selects = document.querySelectorAll('select');
		if (selects) {
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				select_item(select);
			}
		}
	}


	let _slideUp = (target, duration = 500) => {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	let _slideDown = (target, duration = 500) => {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
		if (display === 'none')
			display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	let _slideToggle = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (window.getComputedStyle(target).display === 'none') {
				return _slideDown(target, duration);
			} else {
				return _slideUp(target, duration);
			}
		}
	}
	//  / Select - стилизация select
})