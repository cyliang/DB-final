$.widget("custom.table_flight", $.custom.table, {
	_create: function() {
		this.removeTh = false;
		this._super();
	},
	_refresh: function() {
		if(!this.removeTh) {
			this.column['Departure name']
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
			.add(this.column['Destination latitude']).remove();

			this.removeTh = true;
		}
		this._super();

		var _this = this;
		this.table.find("tbody tr").each(function() {
			var modify = _this.options.editable ? 1 : 0;

			$(this).find("td").eq(2 + modify)
			.add($(this).find("td").eq(10 + modify)).each(function() {
				var pos = $(this).next().next().next().next().next().next().text() + ',' + 
					$(this).next().next().next().next().next().text();
					
				$(this).html(
					$('<a href="#">').text($(this).text())
					.popover({
						html: true,
						placement: "bottom",
						trigger: "hover",
						title: $(this).html() + ' (' + $(this).next().html() + ')',
						content: 
							'<p><strong>Country:</strong> ' + $(this).next().next().html() + '<br>' +
							'<strong>City:</strong> ' + $(this).next().next().next().html() + '<br>' + 
							'<strong>Timezone:</strong> ' + $(this).next().next().next().next().html() + '</p>' +
							'<img src="' + 
								"http://maps.googleapis.com/maps/api/staticmap?center=" + pos +
								"&zoom=12&size=244x200&sensor=false&markers=%7C" + pos +
							'">'
					})
				);

				$(this).next()
				.add($(this).next().next())
				.add($(this).next().next().next())
				.add($(this).next().next().next().next())
				.add($(this).next().next().next().next().next())
				.add($(this).next().next().next().next().next().next()).remove();
			});
		});
	}
});
