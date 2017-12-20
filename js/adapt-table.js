define([
    'core/js/adapt',
    'core/js/views/componentView'
], function(Adapt, ComponentView) {

    var Table = ComponentView.extend({

        events: {
            "touchstart .component-widget": "handleTouchStart",
            "mousedown .component-widget": "handleTouchStart"
        },

        preRender: function() {
            this.checkIfResetOnRevisit();
            this.setHeadings();
            this.setColumnWidths();

            this.listenTo(Adapt, 'device:resize', this.onDeviceResize);

            _.bindAll(this, 'onMouseMove', 'onMouseUp');
        },

        postRender: function() {
            this.setupInview();

            this.$componentWidget = this.$('.component-widget');
            this.$tableWrapper = this.$('.table-wrapper');
            this.table = this.$('table')[0];

            this.$('.component-widget').imageready(_.bind(function() {
                this.setReadyStatus();
                this.onDeviceResize(Adapt.device.screenWidth);
            }, this));
        },

        setupInview: function() {
            this.$('.component-widget').on('inview', _.bind(this.inview, this));
        },

        setHeadings: function() {
            var rowHeaderIndexArray = JSON.parse("[" + this.model.get('_rowHeaderIndexes') + "]");
            var rows = this.model.get('_rows');
            var colHeaderIndexArray = JSON.parse("[" + this.model.get('_colHeaderIndexes') + "]");

            for (var i = 0; i < rows.length; i++) {
                for (var j = 0; j < rows[i]._cells.length; j++) {
                    if (rowHeaderIndexArray.indexOf(i) !== -1 || colHeaderIndexArray.indexOf(j) !== -1) {
                        rows[i]._cells[j]._isHeading = true;
                    }
                }
            }
        },

        setColumnWidths: function() {
            var columnWidths = this.model.get('_columnWidths');
            var rows = this.model.get('_rows');

            if (!columnWidths) {
                return;
            }

            for (var i = 0; i < columnWidths.length; i++) {
                var colSpans = 0;
                for (var j = 0; j < columnWidths[i]._column; j++) {
                    colSpans += rows[0]._cells[j]._colSpan - 1;
                }

                rows[0]._cells[columnWidths[i]._column - colSpans]._width = columnWidths[i]._width;
            }
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$('.component-widget').off('inview');
                    this.setCompletionStatus();
                }
            }
        },

        onDeviceResize: function(deviceWidth) {
            var minW = this.model.get('_minWidth');
            if (this.$componentWidget.width() < minW) {
                this.$el.addClass('scroll');
            } else {
                this.$el.removeClass('scroll');
            }
            this.$tableWrapper.css('height', this.table.getBoundingClientRect().height+'px');
        },

        handleTouchStart: function(event) {
            if (event.type === "touchstart") {
                // ignore touch gestures since scrolling should work just fine
                event.stopPropagation();
                event.stopImmediatePropagation();
                event.originalEvent.stopPropagation();
                event.originalEvent.stopImmediatePropagation();
                this._touchFired = true;
                return;
            }

            if (this._touchFired) return;
            this._touchFired = false;

            this.startX = event.clientX;
            this.scrollLeft = this.$componentWidget[0].scrollLeft;

            // setup required MOUSE - handler
            this.setupMouseEvents();
        },

        setupMouseEvents: function() {
            $(document).on('mousemove', this.onMouseMove);
            $(document).one('mouseup', this.onMouseUp);
        },

        onMouseMove: function(event) {
            var delta = this.scrollLeft + this.startX - event.clientX;
            this.$componentWidget[0].scrollLeft = delta;
        },

        onMouseUp: function(event) {
            $(document).off('mousemove', this.onMouseMove);
        },

        remove: function() {
            this.$('.component-widget').off('inview');
            
            $(document).off('mousemove', this.onMouseMove);
            $(document).off('mouseup', this.onMouseUp);

            ComponentView.prototype.remove.call(this);
        }
    },
    {
        template: 'table'
    });

    Adapt.register('table', Table);

    return Table;
});
