Number.prototype.kFormat = function() {
    var num = this.valueOf();
    var ks = '';
    while ( num > 999 ) {
        ks += 'K';
        num = num / 1000;
    }
    num = num % 2 == 0 ? num.toFixed(0) : num.toFixed(2);
    num = Math.ceil( num );
    return num + ks;
}

var readyFunction = false;
jQuery(document).ready(function(){
	readyFunction = function() {
		jQuery('.collapsible').collapsible({
			accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		});

		jQuery('.quantityMask').mask('#', {reverse: true}); // For old browsers
	};
});