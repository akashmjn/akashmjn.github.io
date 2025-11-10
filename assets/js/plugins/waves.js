(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.WaveCanvas = factory(root);
	}
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

	'use strict';

	var document = window && window.document ? window.document : null;

	var extend = function () {
		var extended = {};
		Array.prototype.forEach.call(arguments, function (obj) {
			if (!obj) return;
			for (var key in obj) {
				if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
				var value = obj[key];
				if (Object.prototype.toString.call(value) === '[object Object]') {
					extended[key] = extend(extended[key], value);
				} else {
					extended[key] = value;
				}
			}
		});
		return extended;
	};

	var defaults = {
		autoInitSelector: '#waves',
		autoStart: true,
		autoResize: true,
		autoDetectColors: true,
		numLines: 40,
		numPoints: 300,
        maxCanvasWidth: 1088,  // times 0.6 ~= max width of text column
		waveWidthFactor: 0.6,
		waveHeightFactor: 0.6,
		baseAmplitude: 60,
		bellCurveFactor: 8,
		timeSpeed: 0.04,
		lineModulationRange: 0.3,
		lineModulationBase: 0.7,
		lineModulationFreq: 0.07,
		lineWidth: 1.5,
		fallbackBackgroundColor: '#000',
		fallbackStrokeColor: '#fff',
		timeMultipliers: {
			lineModulation: 0.2
		}
	};

	var WaveCanvas = function (canvas, options) {
		if (!document) {
			throw new Error('WaveCanvas: document is not available.');
		}

		if (typeof canvas === 'string') {
			canvas = document.querySelector(canvas);
		}

		if (!canvas || typeof canvas.getContext !== 'function') {
			throw new Error('WaveCanvas: A valid canvas element is required.');
		}

		var settings = extend({}, defaults, options);
		var timeMultipliers = extend({}, defaults.timeMultipliers, options && options.timeMultipliers);
		settings.timeMultipliers = timeMultipliers;

		var ctx = canvas.getContext('2d');
		var waveStates = [];
		var time = { value: 0 };
		var animationFrameId = null;
		var isRunning = false;
		var destroyed = false;
		var backgroundColor = settings.fallbackBackgroundColor;
		var strokeColor = settings.fallbackStrokeColor;
		var drawArea = { xStart: 0, yStart: 0, width: 0, height: 0 };
		var colorSchemeMediaQuery = null;

		var updateCanvasColors = function () {
			if (!settings.autoDetectColors) {
				backgroundColor = settings.fallbackBackgroundColor;
				strokeColor = settings.fallbackStrokeColor;
				return;
			}

			var style = window.getComputedStyle(canvas);
			var background = (style.getPropertyValue('--waves-background') || '').trim();
			var stroke = (style.getPropertyValue('--waves-stroke') || '').trim();

			backgroundColor = background || settings.fallbackBackgroundColor;
			strokeColor = stroke || settings.fallbackStrokeColor;
		};

		var initializeWaveStates = function () {
			waveStates.length = 0;

			for (var i = 0; i < settings.numLines; i++) {
				waveStates.push({
					yRelative: (i + 1) / (settings.numLines + 1),
					phase: Math.random() * Math.PI * 2
				});
			}
		};

		var updateDrawArea = function () {
			drawArea.width = canvas.width * settings.waveWidthFactor;
			drawArea.height = canvas.height * settings.waveHeightFactor;
			drawArea.xStart = (canvas.width - drawArea.width) / 2;
			drawArea.yStart = (canvas.height - drawArea.height) / 2;
		};

		var resize = function () {
			if (destroyed) return;
			canvas.width = Math.min(window.innerWidth, settings.maxCanvasWidth);
			canvas.height = window.innerHeight * 0.9;
			updateCanvasColors();
			updateDrawArea();
		};

		var generateWavePoints = function (waveState, centerY) {
			var points = [];
			var width = drawArea.width;
			var startX = drawArea.xStart;

			for (var i = 0; i <= settings.numPoints; i++) {
				var normalizedX = (i / settings.numPoints - 0.5) * 2;
				var x = startX + width / 2 + normalizedX * width / 2;
				var baseAmplitude = Math.exp(-normalizedX * normalizedX * settings.bellCurveFactor) * settings.baseAmplitude;
				var amplitude = baseAmplitude;
				var lineModulation = Math.sin(waveState.phase + i * settings.lineModulationFreq + time.value * settings.timeMultipliers.lineModulation) * settings.lineModulationRange + settings.lineModulationBase;
				var y = centerY - amplitude * lineModulation;
				points.push({ x: x, y: y });
			}

			return points;
		};

		var draw = function () {
			if (!isRunning || destroyed) {
				animationFrameId = null;
				return;
			}

			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.strokeStyle = strokeColor;
			ctx.lineWidth = settings.lineWidth;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';

			for (var i = 0; i < waveStates.length; i++) {
				var waveState = waveStates[i];
				var centerY = drawArea.yStart + waveState.yRelative * drawArea.height;
				var points = generateWavePoints(waveState, centerY);

				if (!points.length) continue;

				ctx.beginPath();
				ctx.moveTo(points[0].x, points[0].y);

				for (var j = 1; j < points.length; j++) {
					ctx.lineTo(points[j].x, points[j].y);
				}

				ctx.stroke();
			}

			time.value += settings.timeSpeed;
			animationFrameId = window.requestAnimationFrame(draw);
		};

		var start = function () {
			if (isRunning || destroyed) return;
			isRunning = true;
			animationFrameId = window.requestAnimationFrame(draw);
		};

		var stop = function () {
			if (!isRunning) return;
			isRunning = false;
			if (animationFrameId) {
				window.cancelAnimationFrame(animationFrameId);
				animationFrameId = null;
			}
		};

		var destroy = function () {
			if (destroyed) return;
			stop();
			if (settings.autoResize) {
				window.removeEventListener('resize', resize);
			}
            if (settings.autoDetectColors && colorSchemeMediaQuery) {
                colorSchemeMediaQuery.removeEventListener('change', updateCanvasColors);
                colorSchemeMediaQuery = null;
            }
			destroyed = true;
		};

		var api = {
			start: start,
			stop: stop,
			resize: resize,
			refreshColors: updateCanvasColors,
			destroy: destroy,
			isRunning: function () {
				return isRunning;
			},
			getCanvas: function () {
				return canvas;
			}
		};

		settings.autoDetectColors = settings.autoDetectColors !== false;

		initializeWaveStates();
		resize();

        if (settings.autoDetectColors) {
            colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            colorSchemeMediaQuery.addEventListener('change', updateCanvasColors);
        }

		if (settings.autoResize) {
			window.addEventListener('resize', resize);
		}

		if (settings.autoStart) {
			start();
		}

		return api;
	};

	var autoInit = function () {
		if (!document || !defaults.autoInitSelector) return;
		var element = document.querySelector(defaults.autoInitSelector);
		if (!element || element.__waveCanvasInstance) return;
		element.__waveCanvasInstance = WaveCanvas(element);
	};

	if (document && document.addEventListener) {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', autoInit);
		} else {
			autoInit();
		}
	}

	return WaveCanvas;

});

