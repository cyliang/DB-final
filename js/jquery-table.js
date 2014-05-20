$.widget("custom.table", {
	options: {
		source: "",
		editable: false,

		border: false
	},
	_create: function() {
		this.table = $("<table>")
				.appendTo(this.element)
				.addClass("table table-striped table-hover")
				.append("<thead><tr>")
				.append("<tbody>");

		if(this.options.border) {
			this.table.addClass("table-bordered");
		}

		var _this = this;
		abPost(this.options.source, {}, function(data) {
			_this.data = data;
			_this.column = new Object();
			var theadRow = _this.table.find("thead tr")

			for(var col in data.data[0]) {
				_this.column[col] = $("<th>").appendTo(theadRow)
		       					.text(col + " ")
							.click(function() {
								_this._sort(col);
							});
			}

			_this._refresh();
		});

		this.ctrlPage = new Object();
		this.ctrlPage.nowPage = 1;

		this.ctrlPage.row = $('<div class="row">').insertAfter(this.table);

		var btnGroup1 = $('<div class="btn-group btn-group-justified">').appendTo(
					$('<div class="col-md-4">').appendTo(this.ctrlPage.row)
				);
		this.ctrlPage.firstBtn = $("<button>First page</button>")
					.appendTo(
						$('<div class="btn-group">').appendTo(btnGroup1)
					).addClass("btn btn-primary")
					.click(function() {
						_this._refetch("first");
					});
		this.ctrlPage.prevBtn = $("<button>Previous page</button>")
					.appendTo(
						$('<div class="btn-group">').appendTo(btnGroup1)
					).addClass("btn btn-default")
					.click(function() {
						_this._refetch("prev");
					});

		this.ctrlPage.pageInput = $('<input type="text">')
					.appendTo(
						$('<div class="col-md-4">').appendTo(this.ctrlPage.row)
					).addClass("form-control")
					.on("input", function() {
						_this._refetch($(this).val());
					});

		var btnGroup2 = $('<div class="btn-group btn-group-justified">').appendTo(
					$('<div class="col-md-4">').appendTo(this.ctrlPage.row)
				);
		this.ctrlPage.nextBtn = $("<button>Next page</button>")
					.appendTo(
						$('<div class="btn-group">').appendTo(btnGroup2)
					).addClass("btn btn-default")
					.click(function() {
						_this._refetch("next");
					});
		this.ctrlPage.lastBtn = $("<button>Last page</button>")
					.appendTo(
						$('<div class="btn-group">').appendTo(btnGroup2)
					).addClass("btn btn-primary")
					.click(function() {
						_this._refetch("last");
					});

		this.ctrlOrder = new Object();
		this.ctrlOrder.col = null;
		this.ctrlOrder.ord = "ASC";
	},
	_refetch: function(page) {
		switch(page) {
		case "first":
			page = 1;
			break;
		case "last":
			page = this.data.totalPage;
			break;
		case "next":
			page = this.ctrlPage.nowPage + 1;
			break;
		case "prev":
			page = this.ctrlPage.nowPage - 1;
			break;
		}

		if(page >= 1) {
			this.ctrlPage.nowPage = Number(page);
			var _this = this;

			abPost(this.options.source, {
				page: page
			}, function(data) {
				_this.data = data;
				_this._refresh();
			});
		}
	},
	_sort: function(col) {
		if(this.ctrlOrder.col != null) {
			this.column[this.ctrlOrder.col].text(col + " ");
		}

		if(col == this.ctrlOrder.col) {
			this.ctrlOrder.ord = this.ctrlOrder.ord == "ASC" ? "DESC" : "ASC";
		} else {
			this.ctrlOrder.col = col;
			this.ctrlOrder.ord = "ASC";
		}

		this._refetch("first");
		$('<span>').appendTo(this.column[col])
			.addClass('glyphicon glyphicon-circle-arrow-' + (this.ctrlOrder.ord == "ASC" ? "up text-danger" : "down text-success"));
	},
	_refresh: function() {
		var tbody = this.table.find("tbody").empty();

		for(var row in this.data.data) {
			var tr = $("<tr>").appendTo(tbody);
			for(var col in this.data.data[row]) {
				$("<td>").appendTo(tr)
					.text(this.data.data[row][col]);
			}
		}

		this.ctrlPage.pageInput.attr("placeholder", 
			"Input page no. to jump.   (" + 
			this.ctrlPage.nowPage + "/" + 
			this.data.totalPage + ")"
		).val("");
		if(this.ctrlPage.nowPage > 1) {
			this.ctrlPage.firstBtn.add(this.ctrlPage.prevBtn).removeAttr("disabled");
		} else {
			this.ctrlPage.firstBtn.add(this.ctrlPage.prevBtn).attr("disabled", "disabled");
		}
		if(this.ctrlPage.nowPage < this.data.totalPage) {
			this.ctrlPage.lastBtn.add(this.ctrlPage.nextBtn).removeAttr("disabled");
		} else {
			this.ctrlPage.lastBtn.add(this.ctrlPage.nextBtn).attr("disabled", "disabled");
		}
	}
});
