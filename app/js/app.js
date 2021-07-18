import MicroModal from 'micromodal';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/scrolltrigger"
gsap.registerPlugin(ScrollTrigger)
let cx, cy, mouseX, mouseY, posX, posY, clientX, clientY, dx, dy, tiltx, tilty, request, radius, degree

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




	const welcomeImg = document.querySelector('.welcome__img')
	const buttonLost = document.querySelector('.button-lost')
	const buttonPet = document.querySelector('.button-pet')
	const blockIinfoImg = document.querySelector('.block-info__img')
	const blockInfoList = document.querySelector('.block-info__list')
	const bannerRow = document.querySelector('.banner__row')

	if (welcomeImg) {
		gsap.from(welcomeImg, {
			scrollTrigger: {
				trigger: welcomeImg,
				start: "-200px center",
				//end: () => "+=" + document.querySelector(".welcome__img").offsetWidth,
				toggleActions: "restart pause none pause"
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








	const text = document.querySelector('.welcome__title');

	if (text) {
		const splitText = (el) => {
			el.innerHTML = el.textContent.replace(/(\S*)/g, m => {
				return `<div class="word">` +
					m.replace(/(-|#|@)?\S(-|#|@)?/g, "<div class='letter'>$&</div>") +
					`</div>`;
			});
			return el;
		};

		const split = splitText(text);

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
		});
	}





	let i = 0;
	let placeholderName = "";
	let placeholder = "";
	const name = "Helen Johnson";
	const email = "example@domain.com";
	const speed = 120;

	function type() {
		placeholderName += name.charAt(i);
		placeholder += email.charAt(i);
		document.querySelector("input[type=text]").setAttribute("placeholder", placeholderName);
		document.querySelector("input[type=email]").setAttribute("placeholder", placeholder);
		i++;
		setTimeout(type, speed);
	}
	const buttonSignIn = document.querySelectorAll(`[data-micromodal-open="modal-1"]`)
	if (buttonSignIn) {
		buttonSignIn.forEach(button => button.addEventListener('click', () => {
			type()
		}))
	}






	// Modal

	MicroModal.init({
		openTrigger: 'data-micromodal-open'
	})



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

	const headerButton = document.querySelector('.button.red')
	headerButton.addEventListener('click', (event) => {
		event.preventDefault()
		let el = event.target
		if (el.closest('button').classList.contains('red')) {
			removeLiActive()
			removeNavActive()
			fetch(`../parts/lost-page-form.html`)
				.then(response => {
					return response.text()
				})
				.then(content => {
					document.querySelector(".home-page__content").innerHTML = content
				})
		}
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
		})
	}

})