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

	_initTooltip(layer) {
		const p = layer._point,
			ox = layer.options.tooltip.offsetX || 5,
			oy = layer.options.tooltip.offsetY || ox;
		
		if (!layer._tooltip) {
			layer._tooltip = create('text');

			this._rootGroup.appendChild(layer._tooltip);
		}

		layer._tooltip.setAttribute('x', p.x + ox);
        layer._tooltip.setAttribute('y', p.y + oy);
		layer._tooltip.textContent = layer.options.tooltip.text;
	},

	_removeTooltip(layer) {
		layer.removeInteractiveTarget(layer._tooltip);
		layer._tooltip.remove();
		delete layer._tooltip;
	}
});

L.SVGCustom = L.SVG.extend({
	_updateCircle(layer) {
		L.SVG.prototype._updateCircle.call(this, layer);

		if (layer.options.tooltip) {
			this._initTooltip(layer);
		}
	},

	_removePath(layer) {
		L.SVG.prototype._removePath.call(this, layer);

		if (layer._tooltip) {
			this._removeTooltip(layer)
		}
	}
})