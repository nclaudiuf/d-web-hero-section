import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/theme.css';
import '../css/styles.css';
import 'aos';

init();
StyleModalCard();
Make3ShadowToText();
GetInTouch();
showSubMenu();

function init() {
	window.$ = $; // required by bootstrap & fadeTo animation
	window.jQuery = $;
}

function StyleModalCard() {
	const modal = document.getElementById('cta-modal');
	const trigger = document.getElementById('cta-btn');

	modal.addEventListener('shown.bs.modal', function () {
		trigger.focus();
	});
}

function Make3ShadowToText() {
	const hero = document.querySelectorAll('#hero')[0];
	const walk = 30; // px

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

function GetInTouch() {
	const btn = document.getElementById('cta-btn');
	const overlayImg = document.querySelectorAll('.hero-image-overlay')[0];

	btn.addEventListener('mouseover', () => {
		$(overlayImg).fadeTo(300, 0.65);
	});

	btn.addEventListener('mouseleave', () => {
		$(overlayImg).fadeTo(300, 0.35);
	});
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
