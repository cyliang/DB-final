$.widget("custom.ticket", {
	options: {
		track: false,
	},
	_create: function() {
		var _this = this;
		this.selectHTML = {
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
		};
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
						'<input type="radio" name="trans" value="2"> 2' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input type="radio" name="trans" value="1"> 1' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input type="radio" name="trans" value="0"> 0' +
					'</label>' +
				'</div>'
			)
		);

		this.searchForm.clone(true).appendTo(this.element);
	},
	_destroy: function() {
		this.element.empty();
	}
});
