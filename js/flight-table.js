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
				$(this).airport({
					name: $(this).next().html(),
					country: $(this).next().next().html(),
					city: $(this).next().next().next().html(),
					timezone: $(this).next().next().next().next().html(),
					longitude: $(this).next().next().next().next().next().text(),
					latitude: $(this).next().next().next().next().next().next().text()
				});

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
