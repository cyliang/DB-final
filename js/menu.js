$(document).ready(function() {
	$("").sidr({
		displace: false
	});
	$.sidr("open");
	$("#sql_button").hide();

	$('#sidr a[href="#"]').click(function() {
		var target = $(this).attr("data-target");
		if(target in menu.actions) {
			$('#sidr li').removeClass('active');
			$(this).parent().addClass('active');
			$("#sql_button").hide();

			if(menu.current != null) {
				if("destruct" in menu.actions[menu.current]) {
					menu.actions[menu.current].destruct();
				}
				if("sql" in menu.actions[menu.current]) {
					menu.actions[menu.current].sql.hide();
				}
			}
			menu.current = target;
			menu.actions[target].construct();
			if("sql" in menu.actions[target]) {
				menu.actions[target].sql.show();
				$("#sql_button").show();
			}
		}
	});

	SyntaxHighlighter.all();
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
				removeTarget: 'php/country-delete.php',
				addTarget: 'php/country-add.php',
				editable: user.power == 1 ? {
					Name: $('<input type="text" pattern="^.*\\S.*$" title="Cannot contain only spaces.">'),
					Abbreviation: $('<input type="text" pattern="^\\S{1,3}$" title="An Abbreviation with no more than three characters.">')
				} : false,
				add: {
					Name: "edit",
					Abbreviation: "edit"
				}
			});
			changeTitle("Countrys");
		},
		destruct: function() {
			$("#main").table("destroy");
		},
		sql: $('<div>').appendTo("#sql").append(
			$('<pre class="brush: sql">').text("SELECT `Name`, `Abbreviation` FROM `Country`")
		).hide()
	},
	city: {
		construct: function() {
			$("#main").table({
				source: 'php/city-view.php',
				editTarget: 'php/city-edit.php',
				removeTarget: 'php/city-delete.php',
				addTarget: 'php/city-add.php',
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
				} : false,
				add: {
					Name: "edit",
					Country: "edit"
				}
			});
			changeTitle("Citys");
		},
		destruct: function() {
			$("#main").table("destroy");
		},
		sql: $('<div>').appendTo("#sql").append(
			$('<pre class="brush: sql">').text("SELECT `Name`, `Country` FROM `City`")
		).hide()
	},
	airport: {
		construct: function() {
			$("#main").table_airport({
				source: 'php/airport-view.php',
				editTarget: 'php/airport-edit.php',
				removeTarget: 'php/airport-delete.php',
				addTarget: 'php/airport-add.php',
				editable: user.power == 1 ? {
					IATA: $('<input type="text" pattern="^[A-Z]{3}$" title="Please reference the rule of IATA">'),
					Name: $('<input type="text" pattern="^.*\\S.*$" title="Canoot contain only spaces.">'),
					longitude: $('<input type="number" min="-180" max="180" step="0.000001">'),
					latitude: $('<input type="number" min="-90" max="90" step="0.000001">'),
					Timezone: $('<input type="text" pattern="^(\\+|-)[0-9]{2}:[0-9]{2}$" title="Ex. +08:00">'),
					City: $('<select>').html(function(index, old) {
						var citys;
						$.ajax({
							dataType: 'json',
							url: 'php/city-all.php',
							async: false,
							success: function(data) {
								citys = data;
							}
						});

						var countryGrp = "";
						var optionStr = "";
						for(var c in citys) {
							if(citys[c].Country != countryGrp) {
								if(countryGrp != "") {
									optionStr += '</optgroup>';
								}
								countryGrp = citys[c].Country;
								optionStr += '<optgroup label="' + countryGrp + '">';
							}
							optionStr += '<option value="' + citys[c].Name + '">' + citys[c].Name + '</option>';
						}

						return '<option value=""></option>' + optionStr;
					}),
					Country: null
				} : false,
				add: {
					IATA: "edit",
					Name: "edit",
					longitude: "edit",
					latitude: "edit",
					Timezone: "edit",
					City: "edit"
				}
			});
			changeTitle("Airports");
		},
		destruct: function() {
			$("#main").table_airport("destroy");
		},
		sql: $('<div>').appendTo("#sql").append($('<pre class="brush: sql">').text(
			'SELECT\n' +
				'\t`Airport`.`IATA` AS `IATA`,\n' +
				'\t`Airport`.`Name` AS `Name`,\n' +
				'\t`Airport`.`longitude` AS `longitude`,\n' +
				'\t`Airport`.`latitude` AS `latitude`,\n' +
				'\t`Airport`.`City` AS `City`,\n' +
				'\t`Airport`.`Timezone` AS `Timezone`,\n' +
				'\t`City`.`Country` AS `Country`\n' +
			'FROM `Airport`\n' +
				'\tLEFT JOIN `City`\n' +
					'\t\tON `Airport`.`City` = `City`.`Name`'
		)).hide()
	},
	flight: {
		construct: function() {
			$("#main").table_flight({
				source: 'php/flight-view.php',
				editTarget: 'php/flight-edit.php',
				removeTarget: 'php/flight-delete.php',
				addTarget: 'php/flight-add.php',
				editable: user.power == 1 ? {
					"Flight number": $('<input type="text" pattern="^\\S+$" title="Cannot contain space.">'),
					Departure: $('<select>').html(function(index, old) {
						var airports;
						$.ajax({
							dataType: 'json',
							url: 'php/airport-all.php',
							async: false,
							success: function(data) {
								airports = data;
							}
						});

						var countryGrp = "";
						var optionStr = "";
						for(var ap in airports) {
							if(airports[ap].Country != countryGrp) {
								if(countryGrp != "") {
									optionStr += '</optgroup>';
								}
								countryGrp = airports[ap].Country;
								optionStr += '<optgroup label="' + countryGrp + '">';
							}
							optionStr += '<option value="' + airports[ap].IATA + '">' + airports[ap].IATA + ' (' + airports[ap].Name + ')</option>';
						}

						return '<option value=""></option>' + optionStr;
					}),
					"Departure name": null,
					"Departure country": null,
					"Departure city": null,
					"Departure timezone": null,
					"Departure longitude": null,
					"Departure latitude": null,
					"Departure time": $('<input type="datetime-local">'),
					Destination: $('<select>').html(function(index, old) {
						var airports;
						$.ajax({
							dataType: 'json',
							url: 'php/airport-all.php',
							async: false,
							success: function(data) {
								airports = data;
							}
						});

						var countryGrp = "";
						var optionStr = "";
						for(var ap in airports) {
							if(airports[ap].Country != countryGrp) {
								if(countryGrp != "") {
									optionStr += '</optgroup>';
								}
								countryGrp = airports[ap].Country;
								optionStr += '<optgroup label="' + countryGrp + '">';
							}
							optionStr += '<option value="' + airports[ap].IATA + '">' + airports[ap].IATA + ' (' + airports[ap].Name + ')</option>';
						}

						return '<option value=""></option>' + optionStr;
					}),
					"Destination name": null,
					"Destination country": null,
					"Destination city": null,
					"Destination timezone": null,
					"Destination longitude": null,
					"Destination latitude": null,
					"Arrival time": $('<input type="datetime-local">'),
					"Flight time": null,
					Price: $('<input type="number" max="999999.99" min="0" step="0.01">')
				} : false,
				add: {
					"Flight number": "edit",
					Departure: "edit",
					"Departure time": "edit",
					Destination: "edit",
					"Arrival time": "edit",
					Price: "edit"
				}
			});
			changeTitle("Flights");
		},
		destruct: function() {
			$("#main").table_flight("destroy");
		},
		sql: $('<div>').appendTo("#sql").append($('<pre class="brush: sql">').text(
			"SELECT\n" +
			"\t`id`,\n" +
			"\t`Flight_number` AS `Flight number`,\n" +
			"\t`Departure`,\n" +
			"\tdep.`Name` AS `Departure name`,\n" +
			"\tdep.`Country` AS `Departure country`,\n" +
			"\tdep.`City` AS `Departure city`,\n" +
			"\tdep.`Timezone` AS `Departure timezone`,\n" +
			"\tdep.`longitude` AS `Departure longitude`,\n" +
			"\tdep.`latitude` AS `Departure latitude`,\n" +
			"\t`Departure_time` AS `Departure time`,\n" +
			"\t`Destination`,\n" +
			"\tdes.`Name` AS `Destination name`,\n" +
			"\tdes.`Country` AS `Destination country`,\n" +
			"\tdes.`City` AS `Destination city`,\n" +
			"\tdes.`Timezone` AS `Destination timezone`,\n" +
			"\tdes.`longitude` AS `Destination longitude`,\n" +
			"\tdes.`latitude` AS `Destination latitude`,\n" +
			"\t`Arrival_time` AS `Arrival time`,\n" +
			"\tTIMEDIFF(\n" +
			"\t\tCONVERT_TZ(`Arrival_time`, des.`Timezone`, dep.`Timezone`),\n" +
			"\t\t`Departure_time`\n" +
			"\t) AS `Flight time`,\n" +
			"\t`Price`\n" +
			"FROM `Flight`\n" +
			"\tLEFT JOIN `airport_view` AS dep\n" +
			"\t\tON `Flight`.`Departure` = dep.`IATA`\n" +
			"\tLEFT JOIN `airport_view` AS des\n" +
			"\t\tON `Flight`.`Destination` = des.`IATA`"
		)).hide()
	},
	profile: {
		construct: function() {
			changeTitle("User profile");
			var panel = $('<div class="panel panel-info">').appendTo("#main")
				.html('<div class="panel-heading">Leave blank for not changing</div>');

			abPost('php/user-viewself.php', {}, function(data) {
				$('<form class="form-horizontal">').appendTo(
					$('<div class="panel-body">').appendTo(panel)
				).append(
					$('<div class="form-group">').append(
						$('<div class="col-md-3 control-label">').html('<label>id:</label>')
					).append(
						$('<div class="col-md-9">').append(
							$('<input class="form-control" disabled>')
							.attr("placeholder", data.id)
						)
					)
				).append(
					$('<div class="form-group">').append(
						$('<div class="col-md-3 control-label">').html('<label>Name:</label>')
					).append(
						$('<div class="col-md-9">').append(
							$('<input type="text" name="Name" class="form-control">')
							.attr("placeholder", data.Name)
						)
					)
				).append(
					$('<div class="form-group">').append(
						$('<div class="col-md-3 control-label">').html('<label>email:</label>')
					).append(
						$('<div class="col-md-9">').append(
							$('<input class="form-control" disabled>')
							.attr("placeholder", data.email)
						)
					)
				).append(
					$('<div class="form-group">').append(
						$('<div class="col-md-3 control-label">').html('<label>Identity:</label>')
					).append(
						$('<div class="col-md-9">').append(
							$('<input class="form-control" disabled>')
							.attr("placeholder", data.power == 1 ? "Administrator" : "User")
						)
					)
				).append(
					$('<div class="form-group">').append(
						$('<div class="col-md-3 control-label">').html('<label>New password:</label>')
					).append(
						$('<div class="col-md-9">').append(
							$('<input type="password" name="password" class="form-control">')
							.attr("placeholder", "Enter new password to change.")
						)
					)
				).append(
					$('<div class="form-group">').append(
						$('<div class="col-md-3 control-label">').html('<label>Verifying password:</label>')
					).append(
						$('<div class="col-md-9">').append(
							$('<input type="password" name="vpassword" class="form-control">')
							.attr("placeholder", "Enter the password same as the new one.")
						)
					)
				).append(
					'<div class="text-right"><button type="submit" class="btn btn-warning">Update profile</button></div>'
				).submit(function() {
					event.preventDefault();

					if($(this).find('[name="vpassword"]').val() == $(this).find('[name="password"]').val()) {
						abPost('php/user-editself.php', $(this).serialize(), function(data) {
							alert("Profile has been updated. Reloading...");
							location.reload();
						});
					} else {
						$(this).find('[name="vpassword"]').popover("show");
					}
				}).find('[name="vpassword"]').popover({
					trigger: "manual",
					content: "The password is different with the verifying password",
					placement: "bottom"
				});
			});
		},
		destruct: function() {
			$("#main").empty();
		}
	},
	user: {
		construct: function() {
			$("#main").table_user({
				source: "php/user-view.php",
				editable: {"id": null},
				editTarget: "php/user-upgrade.php",
				removeTarget: "php/user-delete.php",
				addTarget: "php/user-add.php",
				add: {
					email: $('<input type="email">').change(function() {
						var _this = this;

						$.post("php/user-check_exist.php", {
							email: $(this).val()
						}, function(data, status) {
							if(status == "success") {
								if(data.status == 'exist') {
									$(_this).popover({
										trigger: "manual",
										html: true,
										content: '<span class="text-danger">This&nbsp;email&nbsp;has&nbsp;been&nbsp;used!</span>',
										container: $(_this).parent().parent()
									}).popover("show");
								} else {
									$(_this).popover("destroy");
								}
							}
						}, 'json');
					}),
					Name: $('<input type="text">'),
					password: $('<input type="text">'),
					power: $('<select><option value="0">User</option><option value="1">Administrator</option></select>')
				}
			});
		},
		destruct: function() {
			$("#main").table_user("destroy");
		}
	},
	ticket: {
		construct: function() {
			changeTitle("Ticket searching");
			$("#main").ticket({
				track: true
			});
		},
		destruct: function() {
			$("#main").ticket("destroy");
		},
		sql: $('<div>').appendTo("#sql").append($('<pre class="brush: sql">').text(
			"SELECT\n" +
				"\t0 AS `Transfer time`,\n" +
				"\n" +
				"\t`id` AS `f1_id`,\n" +
				"\tnull AS `f2_id`,\n" +
				"\tnull AS `f3_id`,\n" +
				"\t\n" +
				"\t`Flight number` AS `f1_number`,\n" +
				"\tnull AS `f2_number`,\n" +
				"\tnull AS `f3_number`,\n" +
				"\n" +
				"\t`Departure`,\n" +
				"\t`Departure name`,\n" +
				"\t`Departure country`,\n" +
				"\t`Departure city`,\n" +
				"\t`Departure timezone`,\n" +
				"\t`Departure longitude`,\n" +
				"\t`Departure latitude`,\n" +
				"\n" +
				"\t`Destination`,\n" +
				"\t`Destination name`,\n" +
				"\t`Destination country`, \n" +
				"\t`Destination city`, \n" +
				"\t`Destination timezone`, \n" +
				"\t`Destination longitude`, \n" +
				"\t`Destination latitude`,\n" +
				"\n" +
				"\t`Departure time`,\n" +
				"\t`Arrival time`,\n" +
				"\t`Flight time` AS `Total flying time`,\n" +
				"\tCAST('00:00:00' AS TIME) AS `Total transferring time`,\n" +
				"\t`Flight time` AS `Total time`,\n" +
				"\t0 AS `Overnight`,\n" +
				"\t`Price`,\n" +
				"\n" +
				"\tnull AS `t1`,\n" +
				"\tnull AS `t1_name`,\n" +
				"\tnull AS `t1_country`,\n" +
				"\tnull AS `t1_city`,\n" +
				"\tnull AS `t1_timezone`,\n" +
				"\tnull AS `t1_longitude`,\n" +
				"\tnull AS `t1_latitude`,\n" +
				"\n" +
				"\tnull AS `t2`,\n" +
				"\tnull AS `t2_name`,\n" +
				"\tnull AS `t2_country`,\n" +
				"\tnull AS `t2_city`,\n" +
				"\tnull AS `t2_timezone`,\n" +
				"\tnull AS `t2_longitude`,\n" +
				"\tnull AS `t2_latitude`,\n" +
				"\n" +
				"\tnull AS `f1_arrival_time`,\n" +
				"\tnull AS `f2_departure_time`,\n" +
				"\tnull AS `f2_arrival_time`,\n" +
				"\tnull AS `f3_departure_time`,\n" +
				"\n" +
				"\t`Flight time` AS `f1_flight_time`,\n" +
				"\tnull AS `f2_flight_time`,\n" +
				"\tnull AS `f3_flight_time`\n" +
			"FROM `flight_view`\n" +
			"UNION\n" +
			"(\n" +
			"SELECT\n" +
				"\t1,\n" +
				"\n" +
				"\t`f1`.`id`,\n" +
				"\t`f2`.`id`,\n" +
				"\tnull,\n" +
				"\n" +
				"\t`f1`.`Flight number`,\n" +
				"\t`f2`.`Flight number`,\n" +
				"\tnull,\n" +
				"\n" +
				"\t`f1`.`Departure`,\n" +
				"\t`f1`.`Departure name`,\n" +
				"\t`f1`.`Departure country`,\n" +
				"\t`f1`.`Departure city`,\n" +
				"\t`f1`.`Departure timezone`,\n" +
				"\t`f1`.`Departure longitude`,\n" +
				"\t`f1`.`Departure latitude`,\n" +
				"\n" +
				"\t`f2`.`Destination`,\n" +
				"\t`f2`.`Destination name`,\n" +
				"\t`f2`.`Destination country`, \n" +
				"\t`f2`.`Destination city`, \n" +
				"\t`f2`.`Destination timezone`, \n" +
				"\t`f2`.`Destination longitude`, \n" +
				"\t`f2`.`Destination latitude`,\n" +
				"\n" +
				"\t`f1`.`Departure time`,\n" +
				"\t`f2`.`Arrival time`,\n" +
				"\tADDTIME(`f1`.`Flight time`, `f2`.`Flight time`),\n" +
				"\tTIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`),\n" +
				"\tTIMEDIFF(\n" +
					"\t\tCONVERT_TZ(`f2`.`Arrival time`, `f2`.`Destination timezone`, `f1`.`Departure timezone`),\n" +
					"\t\t`f1`.`Departure time`\n" +
				"\t),\n" +
				"\tTIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) > CAST('12:00:00' AS TIME),\n" +
				"\t(`f1`.`Price` + `f2`.`Price`) * 0.9,\n" +
				"\n" +
				"\t`f1`.`Destination`,\n" +
				"\t`f1`.`Destination name`,\n" +
				"\t`f1`.`Destination country`, \n" +
				"\t`f1`.`Destination city`, \n" +
				"\t`f1`.`Destination timezone`, \n" +
				"\t`f1`.`Destination longitude`, \n" +
				"\t`f1`.`Destination latitude`,\n" +
				"\n" +
				"\tnull,\n" +
				"\tnull,\n" +
				"\tnull,\n" +
				"\tnull,\n" +
				"\tnull,\n" +
				"\tnull,\n" +
				"\tnull,\n" +
				"\n" +
				"\t`f1`.`Arrival time`,\n" +
				"\t`f2`.`Departure time`,\n" +
				"\tnull,\n" +
				"\tnull,\n" +
				"\n" +
				"\t`f1`.`Flight time`,\n" +
				"\t`f2`.`Flight time`,\n" +
				"\tnull\n" +
			"FROM `flight_view` AS `f1`\n" +
				"\tINNER JOIN `flight_view` AS `f2`\n" +
					"\t\tON `f1`.`Destination` = `f2`.`Departure`\n" +
					"\t\tAND TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) >= CAST('02:00:00' AS TIME)\n" +
			")\n" +
			"UNION\n" +
			"(\n" +
			"SELECT\n" +
				"\t2,\n" +
				"\n" +
				"\t`f1`.`id`,\n" +
				"\t`f2`.`id`,\n" +
				"\t`f3`.`id`,\n" +
				"\n" +
				"\t`f1`.`Flight number`,\n" +
				"\t`f2`.`Flight number`,\n" +
				"\t`f3`.`Flight number`,\n" +
				"\n" +
				"\t`f1`.`Departure`,\n" +
				"\t`f1`.`Departure name`,\n" +
				"\t`f1`.`Departure country`,\n" +
				"\t`f1`.`Departure city`,\n" +
				"\t`f1`.`Departure timezone`,\n" +
				"\t`f1`.`Departure longitude`,\n" +
				"\t`f1`.`Departure latitude`,\n" +
				"\n" +
				"\t`f3`.`Destination`,\n" +
				"\t`f3`.`Destination name`,\n" +
				"\t`f3`.`Destination country`, \n" +
				"\t`f3`.`Destination city`, \n" +
				"\t`f3`.`Destination timezone`, \n" +
				"\t`f3`.`Destination longitude`, \n" +
				"\t`f3`.`Destination latitude`,\n" +
				"\n" +
				"\t`f1`.`Departure time`,\n" +
				"\t`f3`.`Arrival time`,\n" +
				"\tADDTIME(`f1`.`Flight time`, ADDTIME(`f2`.`Flight time`, `f3`.`Flight time`)),\n" +
				"\tADDTIME(\n" +
					"\t\tTIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`),\n" +
					"\t\tTIMEDIFF(`f3`.`Departure time`, `f2`.`Arrival time`)\n" +
				"\t),\n" +
				"\tTIMEDIFF(\n" +
					"\t\tCONVERT_TZ(`f3`.`Arrival time`, `f3`.`Destination timezone`, `f1`.`Departure timezone`),\n" +
					"\t\t`f1`.`Departure time`\n" +
				"\t),\n" +
				"\tTIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) > CAST('12:00:00' AS TIME) OR \n" +
				"\tTIMEDIFF(`f3`.`Departure time`, `f2`.`Arrival time`) > CAST('12:00:00' AS TIME),\n" +
				"\t(`f1`.`Price` + `f2`.`Price` + `f3`.`Price`) * 0.8,\n" +
				"\n" +
				"\t`f2`.`Departure`,\n" +
				"\t`f2`.`Departure name`,\n" +
				"\t`f2`.`Departure country`,\n" +
				"\t`f2`.`Departure city`,\n" +
				"\t`f2`.`Departure timezone`,\n" +
				"\t`f2`.`Departure longitude`,\n" +
				"\t`f2`.`Departure latitude`,\n" +
				"\n" +
				"\t`f3`.`Departure`,\n" +
				"\t`f3`.`Departure name`,\n" +
				"\t`f3`.`Departure country`,\n" +
				"\t`f3`.`Departure city`,\n" +
				"\t`f3`.`Departure timezone`,\n" +
				"\t`f3`.`Departure longitude`,\n" +
				"\t`f3`.`Departure latitude`,\n" +
				"\n" +
				"\t`f1`.`Arrival time`,\n" +
				"\t`f2`.`Departure time`,\n" +
				"\t`f2`.`Arrival time`,\n" +
				"\t`f3`.`Departure time`,\n" +
				"\n" +
				"\t`f1`.`Flight time`,\n" +
				"\t`f2`.`Flight time`,\n" +
				"\t`f3`.`Flight time`\n" +
			"FROM `flight_view` AS `f1`\n" +
				"\tINNER JOIN `flight_view` AS `f2`\n" +
					"\t\tON `f1`.`Destination` = `f2`.`Departure`\n" +
					"\t\tAND TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) >= CAST('02:00:00' AS TIME)\n" +
				"\tINNER JOIN `flight_view` AS `f3`\n" +
					"\t\tON `f2`.`Destination` = `f3`.`Departure`\n" +
					"\t\tAND TIMEDIFF(`f3`.`Departure time`, `f2`.`Arrival time`) >= CAST('02:00:00' AS TIME)\n" +
					"\t\tAND `f1`.`Departure` != `f3`.`Departure`\n" +
					"\t\tAND `f1`.`Destination` != `f3`.`Destination`\n" +
			")\n"
		)).hide()
	},
	track: {
		construct: function() {
			changeTitle("Tracked tickets");
			$("#main").table_ticket({
				source: 'php/favorite-view.php',
				removeTarget: 'php/favorite-delete.php',
				tracked_list: true
			});
		},
		destruct: function() {
			$("#main").table_ticket("destroy");
		},
		sql: $('<div>').appendTo("#sql").append($('<pre class="brush: sql">').text(
			"SELECT\n" +
				"\t`Favorite`.`id`, `Favorite`.`user_id`,\n" +
				"\t`ticket_view`.*\n" +
			"FROM `ticket_view`\n" +
				"\tINNER JOIN `Favorite`\n" +
				"\tON `ticket_view`.`f1_id` = `Favorite`.`flight_id1`\n" +
				"\tAND `ticket_view`.`f2_id` <=> `Favorite`.`flight_id2`\n" +
				"\tAND `ticket_view`.`f3_id` <=> `Favorite`.`flight_id3`\n"
		)).hide()
	}
};

function changeTitle(title) {
	$("title").text("Flight-managing System - " + title);
	$(".funct").text(title);
}
