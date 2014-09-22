(function(){
	/* DEFINE ELEMENTS */
	var w = $(window),
		scrollimated = $('.scrollimated'),
		els = scrollimated.find('[data-scrollimated-transition]'),
	/* DEFINE PARAMS
	   window params */
		wHeight = w.height(),
	/* animated elem params */
		sHeight = scrollimated.height(),
		sTop = scrollimated.offset().top,
		sCenter = sTop + sHeight / 2,
		sBottom = sTop + sHeight,
		dMax, finalPositions = [],
	/* configuration params */
		actionRadio = 0.15,	// part of the window where elements are fixed (0..1)
		spread = 80,		// in percents
		duration = .3; 		// proportion of the total anim duration (0..1)


	scrollimated.css('height', scrollimated.css('width'));
	dMax = ( sHeight + wHeight ) / 2 - actionRadio;

	els.each( function(index) {
		finalPositions[index] = [ toPercentPosition( $(this), "left" ), toPercentPosition( $(this), "top" ) ];
	});

	w.scroll( changePosition );

	w.resize( function() {
		wHeight = w.height();
		scrollimated.css('height', scrollimated.css('width'));
		sHeight = scrollimated.height();
		sTop = scrollimated.offset().top;
		sCenter = sTop + sHeight / 2;
		sBottom = sTop + sHeight;

		changePosition();
	});






	function changePosition() {
		var dc = dToCenter(scrollimated),
			db = dToBorder(scrollimated),
			animCompleted = (dMax - db) / dMax;


		if ( dc > actionRadio * wHeight / 2 && db > - sHeight ) {
			els.each( function(index) {
				var $t = $(this),
					ownDir = $t.data('scrollimated-transition') || 'left',
					delay = $t.data('scrollimated-delay') / 100 || 0,
					elemCompleted = ( animCompleted - delay < 0 ) ? 0 : Math.min( animCompleted - delay, duration),
					vx, vy, newLeft, newTop;

				switch( ownDir ) {
					case 'left':
					default:
						vx = -1;
						vy = 0;
						break;
					case 'right':
						vx = 1;
						vy = 0;
						break;
					case 'top':
						vx = 0;
						vy = -1;
						break;
					case 'bottom':
						vx = 0;
						vy = 1;
						break;
					case 'topLeft':
						vx = -1;
						vy = -1;
						break;
					case 'topRight':
						vx = 1;
						vy = -1;
						break;
					case 'bottomLeft':
						vx = -1;
						vy = 1;
						break;
					case 'bottomRight':
						vx = 1;
						vy = 1;
						break;
				}

				newLeft = finalPositions[index][0] + vx * spread * elemCompleted / duration;
				newTop = finalPositions[index][1] + vy * spread * elemCompleted / duration;

				$t.css({
					'left': newLeft + '%',
					'top' : newTop + '%',
					'background-size' : ( 1 - elemCompleted / duration ) * 100 + '%',
					'opacity' : ( 1 - elemCompleted / duration )
				});
			});
		}
		else if ( dc <= actionRadio * wHeight ) {
			els.each( function(index) {
				$(this).css({
					'left': finalPositions[index][0] + '%',
					'top' : finalPositions[index][1] + '%',
					'background-size' : '100%',
					'opacity' : 1
				});
			});
		}
	}

	function dToCenter(elt) {
		var wCenter = w.scrollTop() + wHeight / 2;

		return Math.abs( sCenter - wCenter );
	}

	function dToBorder(elt) {
		var wTop = w.scrollTop(),
			wCenter = wTop + wHeight / 2,
			wBottom = wTop + wHeight,
			diff = sCenter - wCenter;

		if( diff < 0 ) {
			return sBottom - wTop;
		}
		else {
			return wBottom - sTop;
		}
	}

	function toPercentPosition(el, prop) {
		if( prop === "top" || prop === "bottom")
			return ( 100 * parseFloat(el.css(prop), 10) / parseFloat(el.parent().css('height'), 10) );
		if( prop === "left" || prop === "right")
			return ( 100 * parseFloat(el.css(prop), 10) / parseFloat(el.parent().css('width'), 10) );
	}

})($);