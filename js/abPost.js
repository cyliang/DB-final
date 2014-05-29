function abPost(target, data, successCallback, otherCallbacks) {
	$.post(target, data, function(data, status) {
		if(status != "success") {
			alert("Connection error! Please contact site manager");
		} else if(data.status == 'success') {
			successCallback(data.data);
		} else if(otherCallbacks && data.status in otherCallbacks) {
			otherCallbacks[data.status]();
		} else if(data.status == 'not_login') {
			alert("Please re-login.");
			location.reload();
		} else {
			alert("It seems that something is not going right.");
		}
	}, 'json');
}
