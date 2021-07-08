document.addEventListener('DOMContentLoaded', () => {

	const menuButton = document.querySelector('.menu-button')
	const navigationLeft = document.querySelector('.home-page__sidebar-left')
	const navigationRight = document.querySelector('.home-page__sidebar-right')

	menuButton.addEventListener('click', () => {
		navigationLeft.classList.toggle('_active')
		navigationRight.classList.toggle('_active')
		menuButton.classList.toggle('_active')
	})

	window.addEventListener('resize', function (event) {
		if (window.innerWidth > 768) {
			navigationLeft.classList.remove('_active')
			navigationRight.classList.remove('_active')
			menuButton.classList.remove('_active')
		}
	})

})
