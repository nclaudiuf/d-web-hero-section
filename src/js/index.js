import 'jquery';
import 'bootstrap';
import lozad from 'lozad';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/theme.css';
import '../css/styles.css';

StyleModalCard();
Make3ShadowToText();
getInTouch_Animation();
showSubMenu();
setButtonAnimation();

const observer = lozad(); // lazy load
observer.observe();

function StyleModalCard() {
	const modal = document.getElementById('cta-modal');
	const trigger = document.getElementById('cta-btn');

	modal.addEventListener('shown.bs.modal', function () {
		trigger.focus();
	});
}

function Make3ShadowToText() {
	const hero = document.querySelectorAll('#hero')[0];
	const walk = 32; // px

	const allText = hero.querySelectorAll('span.shadow-effect');

	if (allText.length > 0 && allText.length !== undefined) {
		allText.forEach(function ApplyShadowEffect(text, index) {
			function shadow(e) {
				const {offsetWidth: width, offsetHeight: height} = hero;
				let {offsetX: x, offsetY: y} = e;

				if (this !== e.target) {
					x = x + e.target.offsetLeft;
					y = y + e.target.offsetTop;
				}

				const xWalk = Math.round((x / width) * walk - walk / 2);
				const yWalk = Math.round((y / height) * walk - walk / 2);

				text.style.textShadow = `${xWalk}px ${yWalk}px 0 rgba(0,0,0,0.25)`;
			}
			hero.addEventListener('mousemove', shadow);
		});
	}
}

const overlayImg = document.querySelector('.hero-image-overlay .content');
const textContent = document.querySelector('.row .content');

function getInTouch_Animation() {
	const btn = document.getElementById('cta-btn');

	if (textContent !== null && overlayImg !== null && btn !== null) {
		btn.addEventListener('mouseenter', () => {
			textContent.classList.add('content--scaleDown');
			overlayImg.classList.add('img--scaleUp');
		});
		btn.addEventListener('mouseleave', () => {
			textContent.classList.add('content--Fallback');
			overlayImg.classList.add('img--Fallback');

			setTimeout(() => {
				textContent.classList.remove('content--Fallback');
				overlayImg.classList.remove('img--Fallback');
				textContent.classList.remove('content--scaleDown');
				overlayImg.classList.remove('img--scaleUp');
			}, 349);
		});
	}
}

function showSubMenu() {
	// make it as accordion for smaller screens
	if (window.innerWidth < 992) {
		// close all inner dropdowns when parent is closed
		document
			.querySelectorAll('.navbar-nav .dropdown')
			.forEach(function (everydropdown) {
				everydropdown.addEventListener('hidden.bs.dropdown', function () {
					// after dropdown is hidden, then find all submenus
					this.querySelectorAll('.submenu').forEach(function (everysubmenu) {
						// hide every submenu as well
						everysubmenu.style.display = 'none';
					});
				});
			});

		document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
			element.addEventListener('click', function (e) {
				let nextEl = this.nextElementSibling;
				if (nextEl && nextEl.classList.contains('submenu')) {
					// prevent opening link if link needs to open dropdown
					e.preventDefault();
					if (nextEl.style.display === 'block') {
						nextEl.style.display = 'none';
					} else {
						nextEl.style.display = 'block';
					}
				}
			});
		});
	}
}

function setButtonAnimation() {
	document
		.querySelectorAll('.labeltext-animated')
		.forEach(
			labelText =>
				(labelText.innerHTML =
					'<div><span>' +
					labelText.textContent.trim().split('').join('</span><span>') +
					'</span></div>')
		);
}
