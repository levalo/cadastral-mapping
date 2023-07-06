import * as L from 'leaflet'

L.ImageMarker = L.Layer.extend({

	// @section
	// @aka Image options
	options: {
        // @option href: String
        // Points at a URL for the image file
        href: '',

        size: 0,

		anchor: [ 0, 0 ],

		// Option inherited from "Interactive layer" abstract class
		interactive: true,

		// @option bubblingMouseEvents: Boolean = true
		// When `true`, a mouse event on this image will trigger the same event on the map
		// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
		bubblingMouseEvents: true
	},

	initialize(latlng, options) {
		L.Util.setOptions(this, options);
		this._latlng = L.latLng(latlng);
		this._size = this.options.size;

		if (Array.isArray(this.options.size)) {
			this._size = this.options.size[0];
			this._sizeY = this.options.size[1];
		}
	},

	// @method setLatLng(latLng: LatLng): this
	// Sets the position of a circle marker to a new location.
	setLatLng(latlng) {
		const oldLatLng = this._latlng;
		this._latlng = L.latLng(latlng);
		this.redraw();

		// @event move: Event
		// Fired when the marker is moved via [`setLatLng`](#circlemarker-setlatlng). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
		return this.fire('move', {oldLatLng, latlng: this._latlng});
	},

	// @method getLatLng(): LatLng
	// Returns the current geographical position of the circle marker
	getLatLng() {
		return this._latlng;
	},

	// @method setRadius(radius: Number): this
	// Sets the radius of a circle marker. Units are in pixels.
	setSize(size) {
		this.options.size = this._size = size;

		if (Array.isArray(size)) {
			this._size = size[0];
			this._sizeY = size[1];
		}

		return this.redraw();
	},

	// @method getRadius(): Number
	// Returns the current radius of the circle
	getSize() {
		return this._size;
	},

	setStyle(options) {
		const size = options ? options.size : this._size;

		L.Util.setOptions(this, options);

		if (this._renderer) {
			this._renderer._updateStyle(this);
			this._updateBounds();
		}

		this.setSize(size);

		return this;
	},

	_project() {
		this._point = this._map.latLngToLayerPoint(this._latlng);
		this._updateBounds();
	},

	_updateBounds() {
		const s = this.size,
		    s2 = this._sizeY || s,
		    p = [s, s2];
		this._pxBounds = L.bounds(this._point.subtract(p), this._point.add(p));
	},

	_update() {
		if (this._map) {
			this._updateImage();
		}
	},

	_updateImage() {
		this._renderer._updateImage(this);
	},

	_empty() {
		return this._size && !this._renderer._bounds.intersects(this._pxBounds);
	},

	// Needed by the `Canvas` renderer for interactivity
	_containsPoint(p) {
		return p.distanceTo(this._point) <= this._size;
	},

	beforeAdd(map) {
		// Renderer is set here because we need to call renderer.getEvents
		// before this.getEvents.
		this._renderer = map.getRenderer(this);

		return this;
	},

	onAdd() {
		this._renderer._initImage(this);
		this._reset();
		this._renderer._addImage(this);
	},

	onRemove() {
		this._renderer._removeImage(this);
	},

	// @method redraw(): this
	// Redraws the layer. Sometimes useful after you changed the coordinates that the image uses.
	redraw() {
		if (this._map) {
			this._renderer._updateImage(this);
		}
		return this;
	},

	getElement() {
		return this._image;
	},

	toGeoJSON() {
		return L.GeoJSON.getFeature(this, {
			type: 'Point',
			coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
		});
	},

	_reset() {
		// defined in child classes
		this._project();
		this._update();
	},

	// @method bringToFront(): this
	// Brings the layer to the top of all path layers.
	bringToFront() {
		if (this._renderer) {
			this._renderer._bringToFront(this);
		}
		return this;
	},

	// @method bringToBack(): this
	// Brings the layer to the bottom of all path layers.
	bringToBack() {
		if (this._renderer) {
			this._renderer._bringToBack(this);
		}
		return this;
	},
});

// @namespace CustomRenderer
L.imageMarker = function imageMarker(latlng, options) {
	return new L.ImageMarker(latlng, options);
}