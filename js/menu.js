$(document).ready(function() {
	$("").sidr({
		displace: false
	});
	$.sidr("open");

	$('#sidr a[href="#"]').click(function() {
		var target = $(this).attr("data-target");
		if(target in menu.actions) {
			$('#sidr li').removeClass('active');
			$(this).parent().addClass('active');
			menu.actions[target]();
		}
	});
});

var menu = Object();
menu.actions = {
	logout: function() {
		$.post('php/user-logout.php', function(data, status) {
			if(status == 'success') {
				location.reload();
			}
		});
	},
	country: function() {
		$("#main").empty().table({
			source: 'php/country-view.php'
		});
	}
};
