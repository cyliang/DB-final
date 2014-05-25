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

			if(menu.current != null && "destruct" in menu.actions[menu.current]) {
				menu.actions[menu.current].destruct();
			}
			menu.current = target;
			menu.actions[target].construct();
		}
	});
});

var menu = Object();
menu.current = null;
menu.actions = {
	logout: {
		construct: function() {
			$.post('php/user-logout.php', function(data, status) {
				if(status == 'success') {
					location.reload();
				}
			});
		}
	},
	country: {
		construct: function() {
			$("#main").table({
				source: 'php/country-view.php',
				editable: true
			});
			changeTitle("Countrys");
		},
		destruct: function() {
			$("#main").table("destroy");
		}
	},
	city: {
		construct: function() {
			$("#main").table({
				source: 'php/city-view.php'
			});
			changeTitle("Citys");
		},
		destruct: function() {
			$("#main").table("destroy");
		}
	},
	airport: {
		construct: function() {
			$("#main").table_airport({
				source: 'php/airport-view.php'
			});
			changeTitle("Airports");
		},
		destruct: function() {
			$("#main").table_airport("destroy");
		}
	}
};

function changeTitle(title) {
	$("title").text("Flight-managing System - " + title);
	$(".funct").text(title);
}
