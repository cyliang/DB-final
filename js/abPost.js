function abPost(target, data, successCallback, otherCallbacks) {
	$.post(target, data, function(data, status) {
		if(status != "success") {
			/* TODO */
		} else if(data.status == 'success') {
			successCallback(data.data);
		} else if(otherCallbacks && data.status in otherCallbacks) {
			otherCallbacks[data.status]();
		} else {
			/* TODO */
		}
	}, 'json');
}
