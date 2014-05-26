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
				editTarget: 'php/country-edit.php',
				editable: user.power == 1 ? {
					Name: $('<input type="text" pattern="^.*\\S.*$" title="Cannot contain only spaces.">'),
					Abbreviation: $('<input type="text" pattern="^\\S{1,3}$" title="An Abbreviation with no more than three characters.">')
				} : false
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
				source: 'php/city-view.php',
				editTarget: 'php/city-edit.php',
				editable: user.power == 1 ? {
					Name: $('<input type="text" pattern="^.*\\S.*$" title="Cannot contain only spaces.">'),
					Country: $('<select>').html(function(index, old) {
						var countrys;
						$.ajax({
							dataType: 'json',
							url: 'php/country-all.php',
							async: false,
							success: function(data) {
								countrys = data;
							}
						});

						return '<option value=""></option><option>' + countrys.join('</option><option>') + '</option>';
					}).each(function() {
						$(this).find("option").each(function() {
							$(this).attr("value", $(this).text());
						})
					})
				} : false
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
