import * as L from 'leaflet'

const create = (name) => {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}

L.SVG.include({

	_initImage(layer) {
        const image = layer._image = create('image')

		// @namespace Path
		// @option className: String = null
		// Custom class name set on an element. Only for SVG renderer.
		if (layer.options.className) {
			image.classList.add(...L.Util.splitWords(layer.options.className))
		}

		if (layer.options.interactive) {
			image.classList.add('leaflet-interactive')
		}

		this._updateImageStyle(layer)
		this._layers[L.stamp(layer)] = layer
    },

	_updateImageStyle(layer) {
		const image = layer._image,
		    options = layer.options;

		if (!image) { return; }

        image.setAttribute('href', options.href);
	},

	_addImage(layer) {
		if (!this._rootGroup) { this._initContainer(); }
		this._rootGroup.appendChild(layer._image);
		layer.addInteractiveTarget(layer._image);
	},

	_removeImage(layer) {
		layer._image.remove();
		layer.removeInteractiveTarget(layer._image);
		delete this._layers[L.stamp(layer)];
	},

	_updateImage(layer) {
		const p = layer._point,
		    s = Math.max(Math.round(layer._size), 1),
		    s2 = Math.max(Math.round(layer._sizeY), 1) || s,
			xa = layer.options.anchor[0], ya = layer.options.anchor[1];

        layer._image.setAttribute('x', p.x - xa);
        layer._image.setAttribute('y', p.y - ya);
        layer._image.setAttribute('width', s);
        layer._image.setAttribute('height', s2);
	},
});