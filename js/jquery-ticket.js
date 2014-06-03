$.widget("custom.ticket", {
	options: {
		track: false,
	},
	_create: function() {
		var _this = this;
		this.searchForm = $('<form class="form-horizontal">')
		.append(
			$('<div class="form-group">').append(
				'<div class="col-md-3 control-label"><label>From:</label></div>'
			).append(
				$('<div class="col-md-3">').append(
					$('<select class="form-control" name="dep_type">' + 
						'<option value="all">Anywhere</option>' +
						'<option value="country">Country</option>' +
						'<option value="city">City</option>' + 
						'<option value="airport">Airport</option>' +
					'</select>').change(function() {
						var sel = $(this).parent().next().find("select");

						if($(this).val() == "all") {
							sel.attr("disabled", "").removeAttr("required");
						} else {
							sel.html(_this.selectHTML[$(this).val()])
							.removeAttr("disabled").attr("required", "");
						}
					})
				)
			).append(
				'<div class="col-md-6">' +
					'<select class="form-control" name="dep" disabled>' +
					'</select>' +
				'</div>'
			)
		).append(
			$('<div class="form-group">').append(
				'<div class="col-md-3 control-label"><label>To:</label></div>'
			).append(
				$('<div class="col-md-3">').append(
					$('<select class="form-control" name="des_type">' + 
						'<option value="all">Anywhere</option>' +
						'<option value="country">Country</option>' +
						'<option value="city">City</option>' + 
						'<option value="airport">Airport</option>' +
					'</select>').change(function() {
						var sel = $(this).parent().next().find("select");
						
						if($(this).val() == "all") {
							sel.attr("disabled", "").removeAttr("required");
						} else {
							sel.html(_this.selectHTML[$(this).val()])
							.removeAttr("disabled").attr("required", "");
						}
					})
				)
			).append(
				'<div class="col-md-6">' +
					'<select class="form-control" name="des" disabled>' +
					'</select>' +
				'</div>'
			)
		).append(
			$('<div class="form-group">').append(
				'<div class="col-md-3 control-label"><label>Date:</label></div>'
			).append(
				$('<div class="col-md-3">').append(
					$('<select class="form-control" name="date_type">' + 
						'<option value="all">Anytime</option>' +
						'<option value="dep">Departure after</option>' +
						'<option value="ari">Arrival before</option>' + 
					'</select>').change(function() {
						var sel = $(this).parent().next().find('input[type="date"]');

						if($(this).val() == "all") {
							sel.attr("disabled", "").removeAttr("required");
						} else {
							sel.removeAttr("disabled").attr("required", "");
						}
					})
				)
			).append(
				'<div class="col-md-6">' +
					'<input type="date" class="form-control" name="date" disabled>' +
				'</div>'
			)
		).append(
			$('<div class="form-group">').append(
				'<div class="col-md-3 control-label"><label>Transfer time:</label></div>'
			).append(
				'<div class="col-md-3"><p class="form-control-static">No more than</p></div>'
			).append(
				'<div class="col-md-6">' +
					'<label class="radio-inline">' +
						'<input type="radio" name="trans" value="2" checked> 2' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input type="radio" name="trans" value="1"> 1' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input type="radio" name="trans" value="0"> 0' +
					'</label>' +
				'</div>'
			)
		).append(
			$('<div class="form-group">').append(
				'<div class="col-md-3 control-label"><label>Overnight:</label></div>'
			).append(
				'<div class="col-md-3"><p class="form-control-static">No more than</p></div>'
			).append(
				'<div class="col-md-6">' +
					'<label class="radio-inline">' +
						'<input type="radio" name="overnight" value="yes" checked> Allow' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input type="radio" name="overnight" value="no"> Avoid' +
					'</label>' +
				'</div>'
			)
		).append(
			'<div class="form-group"><div class="col-md-2 col-md-offset-5">' +
				'<button class="btn btn-warning btn-block" type="submit">Search</button>' + 
			'</div></div>'
		).submit(function() {
			event.preventDefault();

			if(_this.inTbl) {
				_this.tbl.table_ticket("destroy");
				sModal.close();
			} else {
				_this.inTbl = true;
				_this.searchModal.append(_this.searchForm)
						.appendTo(_this.element)
						.remodal();
				sModal = $.remodal.lookup[_this.searchModal.data('remodal')];
				_this.searchPanel.remove();

				$('<button type="button" class="btn btn-warning">Search for another tickets</button>').appendTo(
					$('<div class="col-md-12 text-right">').appendTo(
						$('<div class="row">').prependTo(_this.element)
					)
				).click(function() {
					sModal.open();
				});
			}
			_this.tbl.table_ticket({
				source: 'php/ticket-view.php?' + $(this).serialize(),
				track: _this.options.track
			});
		});

		var sModal;
		this.tbl = $('<div>').appendTo(this.element);
		this.inTbl = false;

		this.searchModal = $('<div>').html(
			'<h1>Search for tickets...</h1>' +
			'<p>Where and when do you want to go this time?</p>'
		);

		this.searchPanel = $('<div class="panel panel-warning">').appendTo(this.element)
			.append('<div class="panel-heading">Where and when do you want to go?</div>')
			.append(
				$('<div class="panel-body">').append(this.searchForm)
			);
	},
	_destroy: function() {
		this.element.empty();
	},
	selectHTML: {
		country: function() {
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
		},
		city: function() {
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
		},
		airport: function() {
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
		}
	}
});

$.widget("custom.table_ticket", $.custom.table, {
	options: {
		track: false,
		tracked_list: false
	}, 
	_create: function() {
		this.removeTh = false;
		this._super();
	},
	_refresh: function() {
		if(!this.removeTh) {
			this.ctrlSearch.row
			.add(this.column['f1_id'])
			.add(this.column['f2_id'])
			.add(this.column['f3_id'])
			.add(this.column['f1_number'])
			.add(this.column['f2_number'])
			.add(this.column['f3_number'])

			.add(this.column['Departure name'])
			.add(this.column['Departure country'])
			.add(this.column['Departure city'])
			.add(this.column['Departure timezone'])
			.add(this.column['Departure longitude'])
			.add(this.column['Departure latitude'])

			.add(this.column['Destination name'])
			.add(this.column['Destination country'])
			.add(this.column['Destination city'])
			.add(this.column['Destination timezone'])
			.add(this.column['Destination longitude'])
			.add(this.column['Destination latitude'])

			.add(this.column['t1'])
			.add(this.column['t1_name'])
			.add(this.column['t1_country'])
			.add(this.column['t1_city'])
			.add(this.column['t1_timezone'])
			.add(this.column['t1_longitude'])
			.add(this.column['t1_latitude'])

			.add(this.column['t2'])
			.add(this.column['t2_name'])
			.add(this.column['t2_country'])
			.add(this.column['t2_city'])
			.add(this.column['t2_timezone'])
			.add(this.column['t2_longitude'])
			.add(this.column['t2_latitude'])

			.add(this.column['f1_arrival_time'])
			.add(this.column['f2_departure_time'])
			.add(this.column['f2_arrival_time'])
			.add(this.column['f3_departure_time'])

			.add(this.column['f1_flight_time'])
			.add(this.column['f2_flight_time'])
			.add(this.column['f3_flight_time'])
			.remove();
			if(this.options.tracked_list) {
				this.column['id'].remove();
				this.column['remove'] = $("<th>").prependTo(this.table.find("thead tr"));
			}

			this.column.Detail = $("<th>Detail</th>").appendTo(this.table.find("thead tr"));
			if(this.options.track) {
				this.column.Track = $("<th>Track</th>").insertAfter(this.column.Detail);
			}
			this.table.removeClass("table-striped table-hover");

			this.removeTh = true;
		}
		this._super();
		var tbody = this.table.find("tbody").empty();
		var _this = this;

		for(var row in this.data.data) {
			var tr = $("<tr>").appendTo(tbody);
			var data = this.data.data[row];

			/* Departure */
			$("<td>").text(data['Departure']).appendTo(tr).airport({
				name: data['Departure name'],
				country: data['Departure country'],
				city: data['Departure city'],
				timezone: data['Departure timezone'],
				longitude: data['Departure longitude'],
				latitude: data['Departure latitude']
			});

			/* Departure */
			$("<td>").text(data['Destination']).appendTo(tr).airport({
				name: data['Destination name'],
				country: data['Destination country'],
				city: data['Destination city'],
				timezone: data['Destination timezone'],
				longitude: data['Destination longitude'],
				latitude: data['Destination latitude']
			});

			/* Others */
			$("<td>").text(data['Departure time']).appendTo(tr);
			$("<td>").text(data['Arrival time']).appendTo(tr);
			$("<td>").text(data['Transfer time']).appendTo(tr);
			$("<td>").text(data['Total flying time']).appendTo(tr);
			$("<td>").text(data['Total transferring time']).appendTo(tr);
			$("<td>").text(data['Total time']).appendTo(tr);
			$("<td>").text(data['Overnight']).appendTo(tr);
			$("<td>").text(data['Price']).appendTo(tr);

			/* Detail */
			$('<a href="#">Detail</a>').appendTo(
				$("<td>").appendTo(tr)
			).click(function() {
				$(this).parent().parent().next().slideToggle()
								.find("div").slideToggle();
			});

			/* Track */
			if(this.options.track) {
				$('<form>').appendTo(
					$("<td>").appendTo(tr)
				).append(
					$('<input type="hidden" name="flight_id1">').val(data['f1_id'])
				).append(
					$('<input type="hidden" name="flight_id2">').val(data['f2_id'])
				).append(
					$('<input type="hidden" name="flight_id3">').val(data['f3_id'])
				).append(
					$('<button type="submit" class="btn btn-success btn-xs">Track this ticket</button>')
				).submit(function() {
					event.preventDefault();
					$(this).find("button").attr("disabled", "").removeClass("btn-success").addClass("btn-warning");

					abPost('php/favorite-add.php', $(this).serialize(), function(data) {
						alert("Ticket has been added to your track list.\nPlease do no track again.");
					});
				});
			}

			/* Remove */
			if(this.options.tracked_list) {
				$('<a href="#"></a>').appendTo(
					$("<td>").prependTo(tr)
				).append('<span class="glyphicon glyphicon-trash text-danger"></span>')
				.attr("data-target", data['id'])
				.click(function() {
					abPost(_this.options.removeTarget, {
						key: $(this).attr('data-target')
					}, function(data) {
						_this._refetch("now");
					});
				})
			}

			/* Flight detail */
			var detailTbody = $('<tbody>').appendTo(
				$('<table class="table table-hover">').appendTo(
					$('<div>').appendTo(
						$('<td colspan="' + (this.options.track || this.options.tracked_list ? "12" : "11") + '">').appendTo(
							$('<tr class="active">').appendTo(tbody).hide()
						)
					).hide()
				).append(
					'<thead><tr class="active">' +
						'<th>No.</th>' +
						'<th>Flight number</th>' +
						'<th>Departure</th>' +
						'<th>Departure time</th>' +
						'<th>Destination</th>' +
						'<th>Arrival time</th>' +
						'<th>Flight time</th>' +
					'</tr></thead>'
				)
			);

			$('<tr class="active">').appendTo(detailTbody)
			.append(
				$('<td>').text("1")
			).append(
				$('<td>').text(data['f1_number'])
			).append(
				$('<td>').text(data['Departure']).airport({
					name: data['Departure name'],
					country: data['Departure country'],
					city: data['Departure city'],
					timezone: data['Departure timezone'],
					longitude: data['Departure longitude'],
					latitude: data['Departure latitude']
				})
			).append(
				$('<td>').text(data['Departure time'])
			).append(function() {
				if(data['Transfer time'] == 0) {
					return $('<td>').text(data['Destination']).airport({
						name: data['Destination name'],
						country: data['Destination country'],
						city: data['Destination city'],
						timezone: data['Destination timezone'],
						longitude: data['Destination longitude'],
						latitude: data['Destination latitude']
					});
				} else {
					return $('<td>').text(data['t1']).airport({
						name: data['t1_name'],
						country: data['t1_country'],
						city: data['t1_city'],
						timezone: data['t1_timezone'],
						longitude: data['t1_longitude'],
						latitude: data['t1_latitude']
					});
				}
			}).append(
				$('<td>').text(data['Transfer time'] == 0 ? data['Arrival time'] : data['f1_arrival_time'])
			).append(
				$('<td>').text(data['f1_flight_time'])
			);

			if(data['Transfer time'] >= 1) {
				$('<tr class="active">').appendTo(detailTbody)
				.append(
					$('<td>').text("2")
				).append(
					$('<td>').text(data['f2_number'])
				).append(
					$('<td>').text(data['t1']).airport({
						name: data['t1_name'],
						country: data['t1_country'],
						city: data['t1_city'],
						timezone: data['t1_timezone'],
						longitude: data['t1_longitude'],
						latitude: data['t1_latitude']
					})
				).append(
					$('<td>').text(data['f2_departure_time'])
				).append(function() {
					if(data['Transfer time'] == 1) {
						return $('<td>').text(data['Destination']).airport({
							name: data['Destination name'],
							country: data['Destination country'],
							city: data['Destination city'],
							timezone: data['Destination timezone'],
							longitude: data['Destination longitude'],
							latitude: data['Destination latitude']
						});
					} else {
						return $('<td>').text(data['t2']).airport({
							name: data['t2_name'],
							country: data['t2_country'],
							city: data['t2_city'],
							timezone: data['t2_timezone'],
							longitude: data['t2_longitude'],
							latitude: data['t2_latitude']
						});
					}
				}).append(
					$('<td>').text(data['Transfer time'] == 1 ? data['Arrival time'] : data['f2_arrival_time'])
				).append(
					$('<td>').text(data['f2_flight_time'])
				)
			}

			if(data['Transfer time'] == 2) {
				$('<tr class="active">').appendTo(detailTbody)
				.append(
					$('<td>').text("3")
				).append(
					$('<td>').text(data['f3_number'])
				).append(
					$('<td>').text(data['t2']).airport({
						name: data['t2_name'],
						country: data['t2_country'],
						city: data['t2_city'],
						timezone: data['t2_timezone'],
						longitude: data['t2_longitude'],
						latitude: data['t2_latitude']
					})
				).append(
					$('<td>').text(data['f3_departure_time'])
				).append(
					$('<td>').text(data['Destination']).airport({
						name: data['Destination name'],
						country: data['Destination country'],
						city: data['Destination city'],
						timezone: data['Destination timezone'],
						longitude: data['Destination longitude'],
						latitude: data['Destination latitude']
					})
				).append(
					$('<td>').text(data['Arrival time'])
				).append(
					$('<td>').text(data['f3_flight_time'])
				)
			}
		}
	}
});
