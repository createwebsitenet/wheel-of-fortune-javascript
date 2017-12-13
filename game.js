/** CANVAS VARS **/
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var cw = canvas.width / 2;
var ch = canvas.height / 2;
var r = cw;

/** SPIN VARS **/
const NUMBER_PRIZES = sections.length;
const PRIZE_CENTER = Math.PI / NUMBER_PRIZES/2;
const DEG360 = Math.PI * 2;
var timeToSpin = 0;
var whereToStop = 0;
var startTime = 0;
var startPos = 0;

/** GAME VARS **/
var canSpin = true;
var plays = 0; // CURRENT NUMBER OF SPINS
var limitPlays = 2; // MAXIMUM NUMBER OF SPINS ALLOWED
var points = 0; // TODAY'S SCORE
var selectedPrize = undefined;

function initGame(){
	//**** USE THIS TO CREATE RANDOM BOARD GAME ****
	shuffle(sections);
	context.resetTransform();
	context.translate(cw, ch);
	drawGame();
}

function drawGame() {
	var currentPoint = 0;
	var nextPoint = 0;
	for (var i = 0; i < sections.length; i++) {
		nextPoint = currentPoint + toRadians(sections[i].size);
		drawArc(currentPoint, nextPoint, sections[i].color);
		currentPoint = nextPoint;
	}
	drawText();
	if (canSpin) {
		drawMiddleCircle();
		drawPointer();
		drawMiddleText();
	}
}

function drawArc(start, end, color) {
	context.fillStyle = color;
	context.beginPath();
	context.moveTo(0, 0);
	context.arc(0, 0, r, start, end);
	context.moveTo(0, 0);
	context.closePath();
	context.fill();
}

function drawText() {
	var nextPoint = 0;
	var currentPoint = 0;
	context.font = "20px Roboto";
	context.fillStyle = "#fff";
	context.textAlign = "center";
	for (var i = 0; i < sections.length; i++) {
		context.save();
		nextPoint = currentPoint + toRadians((sections[i].size / 2) + 3);
		context.rotate(nextPoint);
		context.fillText(sections[i].text, 150, 0);
		currentPoint = nextPoint + toRadians((sections[i].size / 2) - 3);
		context.restore();
	}
}

function drawMiddleText() {
	context.font = "bold 25px Roboto";
	context.fillStyle = "rgb(109,32,33)";
	context.textAlign = "center";
	context.fillText(plays + "/" + limitPlays, 0, -20);
	context.fillText("Spins Left", 0, 20);
}

function drawMiddleCircle() {
	context.fillStyle = "rgb(252,206,3)";
	context.beginPath();
	context.arc(0, 0, 70, 0, 2 * Math.PI);
	context.fill();
	context.fillStyle = "#000";
	context.stroke();
}

function drawPointer() {
	context.beginPath();
	context.moveTo(69, -5);
	context.lineTo(90, 0);
	context.lineTo(69, 5);
	context.fillStyle = "rgb(252,206,3)";
	context.fill();
	context.fillStyle = "#000";
	context.stroke();
}

function startSpin() {
	if (canSpin && plays < limitPlays) {
		timeToSpin = Math.floor(Math.random() * (7 - 4) + 4);
		console.log(timeToSpin);
		var time = new Date().valueOf();
		if (time - startTime > timeToSpin * 1000) {
			plays++;
			startTime = undefined;
			spinTheWheel(Math.floor(Math.random() * NUMBER_PRIZES));
			requestAnimationFrame(update);
		}
	}
}

function spinTheWheel(toPrize) {
	whereToStop %= DEG360;
	startPos = whereToStop
	whereToStop += DEG360 - whereToStop;
	whereToStop += DEG360 * 2;
	whereToStop += (toPrize / NUMBER_PRIZES) * DEG360;
	whereToStop += PRIZE_CENTER;

	var d = toDegrees(whereToStop);

	for (var i = sections.length - 1; i >= 0; i--) {
		var sd = sections[i].size;
		if(d > sd){
			d -= sd;
			if(i == 0){
				i = sections.length;
			}
			selectedPrize = sections[i-1];
		}
	}
}

function updateWheel(wheelPos) {
	context.resetTransform();
	context.clearRect(0, 0, cw * 2, ch * 2);
	context.translate(cw, ch);
	context.rotate(wheelPos);
	drawGame();
	context.rotate(-wheelPos);
	drawMiddleCircle();
	drawPointer();
	drawMiddleText();
}

function update(time) {
	var spinTime, wheel;

	if (startTime === undefined) {
		startTime = time;
	}

	spinTime = (time - startTime);
	spinTime /= timeToSpin * 1000;
	wheel = easing.easeIn(spinTime);
	wheel *= whereToStop - startPos;
	wheel += startPos;

	updateWheel(wheel);

	if (spinTime >= 1) {
		canSpin = true;
		applyAction();
	} else {
		canSpin = false;
		requestAnimationFrame(update)
	}
}

function applyAction(){
	var sp = selectedPrize;
	var spValue = sp.value;

	if(spValue != undefined){
		if(isNaN(spValue)){
			if(spValue == "t1"){
				plays--;
			}else if(spValue == "ph"){
				points /= 2;
			}else if(spValue == "p0"){
				points = 0;
			}
		}else{
			points += spValue;
			$('#txt_points').html(spValue+"<p style='margin:0'>points</p>");
			$('#txt_points').addClass('show');
			setTimeout(function() {
				$('#txt_points').removeClass('show');
			}, 400);
		}
	}
	$('#label_points_today').text(points);
	$('#input_points').val(points);
	

	if(plays == limitPlays){
		showForm();
	}
}
