$.widget("custom.airport", {
	options: {
		name: "",
		country: "",
		city: "",
		timezone: "",
		longitude: 0,
		latitude: 0
	},
	_create: function() {
		this.original = this.element.html();
		var pos = this.options.latitude + ',' + this.options.longitude;

		this.element.html(
			$('<a href="#">').text(this.element.text())
			.popover({
				html: true,
				placement: "bottom",
				trigger: "hover",
				title: this.element.html() + ' (' + this.options.name + ')',
				content: 
					'<p><strong>Country:</strong> ' + this.options.country + '<br>' +
					'<strong>City:</strong> ' + this.options.city + '<br>' + 
					'<strong>Timezone:</strong> ' + this.options.timezone + '</p>' +
					'<img src="' + 
						"http://maps.googleapis.com/maps/api/staticmap?center=" + pos +
						"&zoom=12&size=244x200&sensor=false&markers=%7C" + pos +
					'">'
			})
		);
	},
	_destroy: function() {
		this.element.empty().html(this.original);
	}
});
