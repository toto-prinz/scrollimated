(function(){
	/* DEFINE ELEMENTS */
	var w = $(window),
		main = $('#main'),
		scrollimated = $('.scrollimated'),
		els = scrollimated.find('[data-scrollimated-transition]'),
	/* DEFINE PARAMS */
		wHeight = w.height(),
		sWidth = scrollimated.width(),
		sHeight = scrollimated.height(),
		sTop = scrollimated.offset().top,
		sCenter = sTop + sHeight / 2,
		sBottom = sTop + sHeight,
		finalPositions = [];

	els.each(function(index) {
		finalPositions[index] = [$(this).position().left, $(this).position().top];
	});

	function dToCenter(elt) {
		var wCenter = w.scrollTop() + wHeight / 2;

		return Math.abs(sCenter - wCenter);
	}

	function dToBorder(elt) {
		var wTop = w.scrollTop(),
			wCenter = w.scrollTop() + wHeight / 2,
			wBottom = w.scrollTop() + wHeight,
			diff = sCenter - wCenter;

		if(diff < 0) {
			return sBottom - wTop;
		}
		else {
			return wBottom - sTop;
		}
	}

	w.scroll(function() {
		var dc = dToCenter(scrollimated),
			db = dToBorder(scrollimated);

		if (dc > 150 && db > 0) {
			els.each(function(index) {
				var $t = $(this),
					ownDir = $t.data('scrollimated-transition'),
					vx, vy, newLeft;

				switch(ownDir) {
					case 'left':
						vx = -1;
						vy = 0;
						break;
					case 'right':
						vx = 1;
						vy = 0;
						break;
				}

				newLeft = finalPositions[index][0] + (dc - 150) * $t.data('scrollimated-priority') * vx;

				$t.css('left', newLeft + 'px');
			});
		}
		else if (dc <= 150 ) {
			els.each(function(index) {
				$(this).css('left', finalPositions[index][0] + 'px');
			});
		}
	});

	w.resize(function() {
		wHeight = w.height();
	})

})($);