import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap';
import {jarallax, jarallaxElement} from 'jarallax'; //Wiki & Credits: https://github.com/nk-o/jarallax
import 'aos';
//import imagesLoaded from 'imagesloaded';

init();
StyleModalCard();
Make3ShadowToText();
GetInTouch();
// Add Element Extension.
jarallaxElement();
// Add Jarallax on DOM Node.
jarallax(document.querySelectorAll('[data-jarallax-element]'));

//ShowMediaOnHover();

function init() {
	window.$ = $;
	window.jQuery = $;
	// window.Popper = Popper;
	// window.imagesloaded = imagesloaded;
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
	const walk = 32; // px

	const allText = hero.querySelectorAll('span.shadow-effect');

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

function GetInTouch() {
	const btn = document.getElementById('cta-btn');
	const overlayImg = document.querySelectorAll('.hero-image-overlay')[0];

	btn.addEventListener('mouseenter', () => {
		overlayImg.style = 'opacity: 0.55';
	});

	btn.addEventListener('mouseleave', () => {
		overlayImg.style = 'opacity: 0.35';
	});
}

// TODO Source https://codepen.io/AlainBarrios/pen/XWWEPzR
function ShowMediaOnHover() {
	const tigers = document.querySelectorAll('.navbar-nav li a');
	const imageCard = document.querySelectorAll('#follow')[0];

	tigers.forEach(function (triger, index) {
		triger.addEventListener('mouseenter', e => {
			imageCard.style.display = 'block';
			imageCard.style.left = e.pageX;
			imageCard.style.top = e.pageY;
		});
		triger.addEventListener('mouseleave', e => {
			imageCard.style.display = 'none';
		});
	});
}
