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
							.removeAttr("disabled").attr("required");
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
							.removeAttr("disabled").attr("required");
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
							sel.removeAttr("disabled").attr("required");
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
			'<div class="form-group"><div class="col-md-2 col-md-offset-5">' +
				'<button class="btn btn-warning btn-block" type="submit">Search</button>' + 
			'</div></div>'
		).submit(function() {
			event.preventDefault();

			_this.searchModal.append(_this.searchForm)
					.appendTo(_this.element)
					.remodal();
			_this.searchPanel.remove();
			_this.tbl.table_ticket({
				source: 'php/ticket-view.php?' + $(this).serialize()
			});
		});

		this.tbl = $('<div>').appendTo(this.element);

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
		track: false
	}, 
	_create: function() {
		this.removeTh = false;
		this._super();
	},
	_refresh: function() {
		if(!this.removeTh) {
			this.ctrlSearch.row
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

			this.column.Detail = $("<th>Detail</th>").appendTo(this.table.find("thead tr"));
			this.table.removeClass("table-striped table-hover");//.addClass("table-bordered");

			this.removeTh = true;
		}
		this._super();
		var tbody = this.table.find("tbody").empty();

		for(var row in this.data.data) {
			var tr = $("<tr>").appendTo(tbody);
			var data = this.data.data[row];

			/* Departure */
			$("<td>").text(data['Departure']).appendTo(tr);

			/* Departure */
			$("<td>").text(data['Destination']).appendTo(tr);

			/* Others */
			$("<td>").text(data['Departure time']).appendTo(tr);
			$("<td>").text(data['Arrival time']).appendTo(tr);
			$("<td>").text(data['Transfer time']).appendTo(tr);
			$("<td>").text(data['Total flying time']).appendTo(tr);
			$("<td>").text(data['Total transferring time']).appendTo(tr);
			$("<td>").text(data['Overnight']).appendTo(tr);
			$("<td>").text(data['Price']).appendTo(tr);

			/* Detail */
			$('<a href="#">Detail</a>').appendTo(
				$("<td>").appendTo(tr)
			).click(function() {
				$(this).parent().parent().next().slideToggle()
								.find("div").slideToggle();
			});

			var detailTbody = $('<tbody>').appendTo(
				$('<table class="table table-hover">').appendTo(
					$('<div>').appendTo(
						$('<td colspan="10">').appendTo(
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
				$('<td>').text(data['Departure'])
			).append(
				$('<td>').text(data['Departure time'])
			).append(
				$('<td>').text(data['Transfer time'] == 0 ? data['Destination'] : data['t1'])
			).append(
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
					$('<td>').text(data['t1'])
				).append(
					$('<td>').text(data['f2_departure_time'])
				).append(
					$('<td>').text(data['Transfer time'] == 1 ? data['Destination'] : data['t2'])
				).append(
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
					$('<td>').text(data['t2'])
				).append(
					$('<td>').text(data['f3_departure_time'])
				).append(
					$('<td>').text(data['Destination'])
				).append(
					$('<td>').text(data['Arrival time'])
				).append(
					$('<td>').text(data['f3_flight_time'])
				)
			}
		}
	}
});
