/**
 * Bootstrap Modal Generator v1.0
 * By Jonathan Gutiérrez <me@makzk.com>
 * Under the MIT license, check the LICENSE file included, or here:
 * https://github.com/makzk/bsmodal/blob/master/LICENSE
 *
 * Requires the Bootstrap 3 javascript and the jQuery library needed for this.
 */
(function(d,w){
	var bsmodal = function(options) {
		this.options = options || {};

		// Default options
		this.defaults = {
			id: 'modal-id', // The ID applied to the ID
			title: false, // Modal title
			content: '', // Modal initial content
			closeCross: true, // Show the close cross
			ajaxUrl: false, // Ajax url to load on show
			ajaxPost: false, // If the Ajax is a POST request
			ajaxData: {}, // The Ajax data to send
			ajaxCallback: false, // The callback function to execute on data loading
			ajaxAsync: true, //  Execute the Ajax asynchronously
			footerButtons: [ // Buttons to put on the modal footer
				{ // The default button that closes the modal
					className: 'btn btn-primary',
					text: 'Close',
					onclick: function(){ $(this).parents('.modal').modal('hide'); },
					link: false
				}
			]
		};

		// Apply default options if they are not defined
		for (var prop in this.defaults) {
			if(this.defaults.hasOwnProperty(prop)) {
				if(typeof this.options[prop] == 'undefined') {
					this.options[prop] = this.defaults[prop];
				}
			}
		}

		// If the ID already exists, add an "-n" suffix, like "modal-id-1"
		// A new suffix is searched until it does not exists
		if(d.getElementById(this.options.id) != null) {
			var up = 1;
			while (d.getElementById(this.options.id + '-' + up) != null) {
				up++;
			}

			this.options.id += '-' + up;
		}

		// Generate the html content for the modal
		var content = '<div class="modal-dialog"><div class="modal-content">';
		if(this.options.title) {
			content += '<div class="modal-header">';
			if(this.options.closeCross) {
				content += '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>';
			}
			content += '<h4 class="modal-title">' + this.options.title + '</h4></div>';
		}
		content += '<div class="modal-body">' + this.options.content +'</div>';
		if(this.options.footerButtons.length > 0) {
			content += '<div class="modal-footer"></div>';
		}
		content += '</div></div>';

		this.element = d.createElement('div');
		this.element.id = this.options.id;
		this.element.className = 'modal fade bsmodal';
		this.element.innerHTML = content;

		// Buttons are processed and added to the footer
		for (var i = 0; i < this.options.footerButtons.length; i++) {
			var fbutton = this.options.footerButtons[i];
			var el = d.createElement('a');
			el.className = fbutton.className + ' modal-footer-button';
			el.innerHTML = fbutton.text;
			el.onclick = fbutton.onclick;
			el.href = fbutton.link || 'javascript:;';

			this.element.getElementsByClassName('modal-footer')[0].appendChild(el);
		};

		d.body.appendChild(this.element);

		// If no callback was added, this default will put the Ajax data on the modal body
		this.defaultAjaxCallback = function(data, id) {
			$('#' + id + ' .modal-body').html(data);
		}

		// Shows the modal and sends the Ajax request if needed
		this.show = function() {
			// Store the id on a public variable
			_id = this.options.id;

			// Show the modal
			$('#' + _id).modal('show');

			// The Ajax is processed only if an ajaxUrl was set
			if(this.options.ajaxUrl) {
				var callback = this.options.ajaxCallback || this.defaultAjaxCallback;
				var ajaxreq = $.ajax({
					type: this.options.ajaxPost ? "POST" : "GET",
					url: this.options.ajaxUrl,
					data: this.options.ajaxData,
					ajax: this.options.ajaxAsync
				})
				ajaxreq.success(function(data){
					callback(data, _id);
				});

				// If an error ocurred (like 404), show an error alert, and hide the modal
				ajaxreq.fail(function(_, __, errorStatus) {
					alert('Error: ' + errorStatus);
					$('#' + _id).modal('hide');
				})
			}
		};
	}

	w.bsmodal = bsmodal;
})(document, window);