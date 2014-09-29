/*** SlideView.js ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function SlideView() {
        View.apply(this, arguments);

        // this.options created from any options passed in during
        // instantiation and the default options (explanation below)
        this.rootModifier = new StateModifier({
            size: this.options.size
        });

        this.mainNode = this.add(this.rootModifier);

        _createBackground.call(this);
    }

    SlideView.prototype = Object.create(View.prototype);
    SlideView.prototype.constructor = SlideView;

    // setting the size property in default options here
    SlideView.DEFAULT_OPTIONS = {
        size: [400, 450]
    };

    function _createBackground() {
        var background = new Surface({
            properties: {
                backgroundColor: '#FFFFF5',
                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
            }
        });

        this.mainNode.add(background);
    }

    function _createFilm() {
        this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder;

        var film = new Surface({
            size: [this.options.filmSize, this.options.filmSize],
            properties: {
                backgroundColor: '#222',
                zIndex: 1
            }
        });

        var filmModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0],
            transform: Transform.translate(0, this.options.filmBorder, 1)
        });

        this.mainNode.add(filmModifier).add(film);
    }

    module.exports = SlideView;
});