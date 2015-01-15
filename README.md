# Bootstrap 3 modal generator
"bsmodal" allows to dinamically create and generate Bootstrap modals, so you don't have to
add HTML for each modal, instead of that, instantiate the ```bsmodal``` class like this:
```javascript
var myModal = bsmodal({
	title: 'My modal',
	content: 'Hello world!'
})
```
Then, show the modal with ```myModal.show()```

Also, it allows to load content with Ajax, so you can add stuff like searches, with this example code:

```javascript
var myAjaxModal = bsmodal({
	title: 'My search',
	content: 'Loading...',
	ajaxUrl: 'http://localhost/mysite/search.php',
	ajaxData: {search_value: $('#form input').val()},
	ajaxCallback: show_results // not required
})
```
The example code takes the value from a form and displays the results on the modal. Also, you can add a
callback function, that will receive the parameters in this form: ```show_results(ajax_data, modal_id)```

More examples soon!