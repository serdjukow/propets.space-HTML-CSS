document.addEventListener('DOMContentLoaded', () => {

	const menuButton = document.querySelector('.menu-button')
	const navigationLeft = document.querySelector('.home-page__sidebar-left')
	const navigationRight = document.querySelector('.home-page__sidebar-right')

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

	const sideBar = document.querySelector('.home-page__sidebar-left')
	fetch('../parts/home-content.html')
		.then(response => {
			return response.text()
		})
		.then(content => {
			document.querySelector(".home-page__content").innerHTML = content
		})

	sideBar.addEventListener('click', (event) => {
		event.preventDefault()
		let el = event.target

		switch (el.dataset.menu) {
			case 'home':
				removeLiActive()
				removeNavActive()
				el.closest('li').classList.add('_active')
				fetch('../parts/home-content.html')
					.then(response => {
						return response.text()
					})
					.then(content => {
						document.querySelector(".home-page__content").innerHTML = content
					})
				break
			case 'lost':
				removeLiActive()
				removeNavActive()
				el.closest('li').classList.add('_active')
				fetch('../parts/lost-content.html')
					.then(response => {
						return response.text()
					})
					.then(content => {
						document.querySelector(".home-page__content").innerHTML = content
					})
				break
			case 'found':
				removeLiActive()
				removeNavActive()
				el.closest('li').classList.add('_active')
				fetch('../parts/found-content.html')
					.then(response => {
						return response.text()
					})
					.then(content => {
						document.querySelector(".home-page__content").innerHTML = content
					})
				break
			case 'hotels':
				removeLiActive()
				removeNavActive()
				el.closest('li').classList.add('_active')
				fetch('../parts/hotels-content.html')
					.then(response => {
						return response.text()
					})
					.then(content => {
						document.querySelector(".home-page__content").innerHTML = content
					})
				break
			case 'walking':
				removeLiActive()
				removeNavActive()
				el.closest('li').classList.add('_active')
				fetch('../parts/walking-content.html')
					.then(response => {
						return response.text()
					})
					.then(content => {
						document.querySelector(".home-page__content").innerHTML = content
					})
				break
			case 'fostering':
				removeLiActive()
				removeNavActive()
				el.closest('li').classList.add('_active')
				fetch('../parts/fostering-content.html')
					.then(response => {
						return response.text()
					})
					.then(content => {
						document.querySelector(".home-page__content").innerHTML = content
					})
				break
			case 'vethelp':
				removeLiActive()
				removeNavActive()
				el.closest('li').classList.add('_active')
				fetch('../parts/vethelp-content.html')
					.then(response => {
						return response.text()
					})
					.then(content => {
						document.querySelector(".home-page__content").innerHTML = content
					})
				break

			default:
				break
		}
	})
})
