document.addEventListener('DOMContentLoaded', () => {

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

	window.addEventListener('resize', function (event) {
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