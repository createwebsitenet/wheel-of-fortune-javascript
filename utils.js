var easing = {
	easeIn: function(x) {
		return 1 - Math.pow(Math.min(1, Math.max(0, x)) - 1, 2);
	}
}

function toRadians(deg) {
	return deg * Math.PI / 180;
}

function toDegrees(rad) {
	return rad * 180 / Math.PI;
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}