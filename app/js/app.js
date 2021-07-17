import MicroModal from 'micromodal';
import gsap from "gsap";
let cx, cy, mouseX, mouseY, posX, posY, clientX, clientY, dx, dy, tiltx, tilty, request, radius, degree
import ScrollTrigger from "scrolltrigger"
document.addEventListener('DOMContentLoaded', () => {



	const body = document.querySelector('body')
	cx = window.innerWidth / 2
	cy = window.innerHeight / 2


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



	gsap.registerPlugin(ScrollTrigger);

	gsap.from(".welcome__img", {
		scrollTrigger: {
			trigger: ".welcome__img",
			//end: () => "+=" + document.querySelector(".welcome__img").offsetWidth,
			//toggleActions: "restart none none none"
		},
		opacity: 0,
		duration: 2,
		scale: 0.7
	});

	gsap.from(".button-lost", {
		scrollTrigger: {
			trigger: ".button-lost",
			//toggleActions: "restart pause none pause",			
		},
		x: -320,
		duration: 1.5,
	});



	gsap.from(".button-pet", {
		scrollTrigger: {
			trigger: ".button-pet",
			//toggleActions: "restart pause none pause"
		},
		x: -280,
		duration: 2,
	})

	gsap.from(".block-info__img", {
		scrollTrigger: {
			trigger: ".block-info__img",
			toggleActions: "restart pause none pause"
		},
		opacity: 0,
		duration: 2,
		scale: 0.7
	});

	gsap.from(".block-info__list", {
		scrollTrigger: {
			trigger: ".block-info__img",
			toggleActions: "restart pause reverse pause"
		},
		x: 320,
		duration: 1,
	});







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
	homePageContent.addEventListener('click', (event) => {
		event.preventDefault()
		let el = event.target
		let parent = el.closest('.services-cards')
		if (el.classList.contains('services-cards__details')) {
			parent.classList.toggle('_show-more')
		}
	})


})