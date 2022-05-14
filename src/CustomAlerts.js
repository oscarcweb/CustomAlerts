/*!
 * CustomAlerts
 * A very simple and lightweight alerts system created with vanilla JavaScript
 *
 * @version v1.0
 * @author oscarcweb <rehr_roste@aleeas.com>
 * @github https://github.com/oscarcweb/CustomAlerts
 * @license MIT
 */
class CustomAlerts {

	constructor( options = {} ) {

		this.delay	= options.delay	|| 100
		this.autoclose	= typeof options.autoclose === 'number' ? options.autoclose : 5000;

		this.load()

	}

	load() {

		if ( !document.querySelector(".sticky-alerts") ) {
			let container = document.createElement("div");
			container.className = 'sticky-alerts';

			document.body.appendChild( container );
		}

		document.querySelector(".sticky-alerts").addEventListener("mouseenter", (el) => {
			el.target.classList.add("userint")
		});

		document.querySelector(".sticky-alerts").addEventListener("mouseleave", (el) => {

			el.target.classList.remove('userint')
			document.querySelectorAll(".sticky-alerts .alert").forEach( el => {
				this.autoClose(el, (el.dataset.autoclose || this.autoclose))
			})

		});


	}


	alert( options = {} ) {

		let title		= options.title		|| 'Alert',
			content		= options.content	|| '',
			id			= options.id		|| '',
			type		= options.type		|| 'primary',
			delay		= options.delay	|| this.delay,
			autoclose	= typeof options.autoclose === 'number' ? options.autoclose : this.autoclose;

		/** Remove no visible alerts */
		if ( document.querySelector(".sticky-alerts").offsetHeight > window.innerHeight ) {
			document.querySelector(".sticky-alerts .alert:last-child").remove();
		}

		setTimeout( () => {

			let alert = document.createElement("div");
			id ? alert.id = id : '';
			alert.className = 'alert show alert-' + type;
			if ( autoclose != this.autoClose ) alert.dataset.autoclose = autoclose;

			let alert_header = document.createElement("div");
			alert_header.className = 'alert-header';

			let alert_title = document.createElement("div");
			alert_title.className = 'title';
			alert_title.textContent = title;

			let alert_close = document.createElement("span");
			alert_close.className = 'close';
			alert_close.textContent = 'x';

			alert_close.addEventListener("click", (e) => {
				e.target.parentElement.parentElement.classList.add("fadeOut");
				setTimeout( () => {
					e.target.parentElement.parentElement.remove();
				}, 500);
			})

			alert_header.appendChild( alert_title );
			alert_header.appendChild( alert_close );
			alert.appendChild( alert_header );

			if ( content ) {
				let alert_content = document.createElement("div");
				alert_content.className = 'content';
				alert_content.innerHTML = content; /* Math.random().toString(36).substring(2, 8)*/

				alert.appendChild( alert_content );
			}

			document.querySelector(".sticky-alerts").prepend( alert )

			setTimeout( () => {
				alert.classList.add("fadeIn");
			}, 1)

			this.autoClose( alert, autoclose )

		}, delay)

	}

	autoClose( alert, autoclose ) {

		if ( autoclose >= 1 ) {

			setTimeout( () => {
				if ( alert.parentElement && !alert.parentElement.classList.contains('userint') ) {

					alert.classList.add("fadeOut");
					setTimeout(() => {
						alert.remove();
					}, 300)

				}
			}, autoclose )

		}

	}



}


