'use strict';

var Revive = function() {
	/**
	*
	* Set default elements
	*
	**/
	
    
    var W = window;
	var D = document;
	var HTML = D.documentElement;
	var PUBLIC = this;
	var PRIVATE = {};
    var TPL = {
        test: '/sources/_templates/test.tpl.html'    
    };
	var breakpoints = {
		xs: 'xs',
		s: 's',
		m: 'm',
		l: 'l',
		xl: 'xl'
	};
    var DOM = {
        fullHeightContent: document.getElementById('fullHeightContent')
    };
	

	/**
	*
	* PRIVATE FUNCTIONS
	*
	**/
	
    
	PRIVATE.getDocWidth = function() {
		return Math.max(
			D.body.scrollWidth, HTML.scrollWidth,
			D.body.offsetWidth, HTML.offsetWidth,
			D.body.clientWidth, HTML.clientWidth
		);
	};


    PRIVATE.setContentHeight = function(c, h) {
        if(c) {
            c.style.height = h + 'px';
        }
    };
	
    
    PRIVATE.getDocHeight = function() {
		return Math.max(
			D.body.scrollHeight, HTML.scrollHeight,
			D.body.offsetHeight, HTML.offsetHeight,
			D.body.clientHeight, HTML.clientHeight
		);
	};
	
    
    PRIVATE.setBodyClass = function(width) {
		switch(true) {
			case width >= 1280:
				HTML.setAttribute('breakpoint', breakpoints.xl);
				break;
			case width >= 1024 && width < 1280:
				HTML.setAttribute('breakpoint', breakpoints.l);
				break;
			case width >= 620 && width < 1024:
				HTML.setAttribute('breakpoint', breakpoints.m);
				break;
			case width >= 320 && width < 620:
				HTML.setAttribute('breakpoint', breakpoints.s);
				break;
			case width < 320:
				HTML.setAttribute('breakpoint', breakpoints.xs);
				break;
			default:
				console.log('Sorry, your HTML size not exist.');
		}
	};


	PRIVATE.listeners = function() {
		var dw;

		W.addEventListener('resize', function(){
			dw = PRIVATE.getDocWidth();

			PRIVATE.setBodyClass(dw);
            
            PRIVATE.setContentHeight(DOM.fullHeightContent, PRIVATE.getDocHeight());
		});
	};

    PRIVATE.accordion = function() {
        var itemElement = document.querySelectorAll('.accord-header');
        var el;

        if(!itemElement) {
            return;    
        }

        for(var i = 0; i < itemElement.length; i++) {
            el = itemElement[i];

            el.addEventListener('click', function(e) {
                var getParent = this.parentNode;
                
                if(getParent.classList.value.split(' ').indexOf('show') > 0) {
                    getParent.classList.remove('show');
                } else {
                    getParent.classList.add('show');
                }
            });   
        }
    };


    PRIVATE.checkboxStatus = function() {
        var itemElement = document.querySelectorAll('.list-checkbox li');
        var el;

        if(!itemElement) {
            return;    
        }

        for(var i = 0; i < itemElement.length; i++) {
            el = itemElement[i];

            el.addEventListener('change', function(e) {
                var input = this.querySelector('input');
                var span = input.parentNode;
                
                if(input.checked) {
                    span.classList.add('active');
                } else {
                    span.classList.remove('active');
                }
            });   
        }

    };


	/**
	*
	* PUBLIC FUNCTIONS
	*
	**/


	PUBLIC.init = function() {
        nunjucks.configure({
            autoescape: true
        });

		PRIVATE.setBodyClass(PRIVATE.getDocWidth());
		PRIVATE.listeners();

        PRIVATE.setContentHeight(DOM.fullHeightContent, PRIVATE.getDocHeight());
        PRIVATE.accordion();
        PRIVATE.checkboxStatus();

        // var container = document.getElementById('container');
        // var tplRendered = nunjucks.render(TPL.test, { foo: 'bar' });
        // container.innerHTML = tplRendered;
    };


	/**
	*
	* RETURN
	*
	**/
	return PUBLIC;
};


/**
*
* Main function, all functions init here.
*
**/
(function app(){
	var revive = new Revive();

    revive.init();
})();
