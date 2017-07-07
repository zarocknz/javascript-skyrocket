/*
//++ Class for show overall which might be redundant so remove??
function Skyrocket(options)
{
	defaultOptions = {
		'canvasId' : 'canvas',
	};

	// -----------------------------------------
    // Loop through the default options and create properties of this class set to the value for
    // the option passed in or if not value for the option was passed in then to the default.
    for (var key in defaultOptions) {
        if ((options != null) && (typeof(options[key]) !== 'undefined')) {
            this[key] = options[key];
        } else {
            this[key] = defaultOptions[key];
        }
    }

	// Also loop though the passed in options and add anything specified not part of the class in to it as a property.
    if (options != null) {
        for (var key in options) {
            if (typeof(this[key]) === 'undefined') {
                this[key] = options[key];
            }
        }
    }
	// If have the canvasID then get it and keep a copy in memory.
	if (this.canvasId) {
        fcanvas = document.getElementById(this.canvasId);

		// If have the canvas then get it's context.
		if (this.canvas) {
			fctx = this.canvas.getContext('2d');
		}
	}
}
*/

// Class for particles which have x, y, color, alpha etc.
function Particle(options)
{
	// Define default options
	defaultOptions = {
		'x' : 0,
		'y' : 0,
		'color' : '0,255,0',
		'alpha' : 0.8,			// Used with the colour to set rgba fillStyle.
		'strokeStyle' : '',
		'lineWidth' : 0,
		'radius' : 3
	};

	// Now loop through the default options and create properties of this class set to the value for
    // the option passed in if a value was, or if not then set the value of the default.
    for (var key in defaultOptions) {
        if ((options != null) && (typeof(options[key]) !== 'undefined'))
            this[key] = options[key];
        else
            this[key] = defaultOptions[key];
    }

    // Also loop though the passed in options and add anything specified not part of the class in to it as a property.
    // This allows the developer to easily add properties to particles at creation time.
    if (options != null) {
        for (var key in options) {
            if (typeof(this[key]) === 'undefined') {
                this[key] = options[key];
            }
        }
    }
}

// Draws the particle.
Particle.prototype.draw = function()
{
	// Save context so colour change does not affect anything else.
	fctx.save();
	// Set fillstyle to the color which must be rgb plus the alpha
	// We can change the alpha to do the fade.
	fctx.fillStyle = 'rgba(' + this.color + ', ' + this.alpha + ')';
	fctx.strokeStyle = this.strokeStyle;
	fctx.lineWidth = this.lineStyle;

	// Beign the path for the circle.
	fctx.beginPath();

	// X, y, radius, startAngle, endAngle.
	fctx.arc(this.x,this.y,this.radius,0,2*Math.PI);

	// Fill and stroke
	if (this.color) {
		fctx.fill();
	}

	if (this.strokeStyle && this.lineWidth) {
		fctx.stroke();
	}

	// Restore canvas settings.
	fctx.restore();
}

// Class for firework (i.e. an individual skyrocket)
//++ Think this needs to be able to be sublassed so have different explosions and
//++ also images etc for the rockets, can have different sounds in future.
function Firework(id, options)
{
	// Define default options
	//++ Work out what other options there might be.
	defaultOptions = {
		'power' : 60
	};

	// Now loop through the default options and create properties of this class set to the value for
    // the option passed in if a value was, or if not then set the value of the default.
    for (var key in defaultOptions) {
        if ((options != null) && (typeof(options[key]) !== 'undefined'))
            this[key] = options[key];
        else
            this[key] = defaultOptions[key];
    }

    // Also loop though the passed in options and add anything specified not part of the class in to it as a property.
    // This allows the developer to easily add properties to particles at creation time.
    if (options != null) {
        for (var key in options) {
            if (typeof(this[key]) === 'undefined') {
                this[key] = options[key];
            }
        }
    }

	// Set the ID, X position, then look at other options.
	this.id = id;

	// Set initial position to center bottom of the canvas.
	//++ This may be one of the options, other users might not want it launched from the center.
	this.x = (fcanvas.width / 2);
	this.y = fcanvas.height;

	// Arrays for the particles making up the explosion and also the trail.
	this.glitter = new Array(null);
	this.trail = new Array(null); //++ @TODO figure out trail math and whole trail animation if have time.

	// Also set something to keep track of the state of the firework.
	this.state = 'new';

	// Call function to auto launch the firework straight away?
	//++ @TODO decide if fireworks can be queued up and launched later so don't call this here.
	this.launch();
}

// Draws the firework
//++ @TODO change to image or other thing, needs to be angled in the direction of the targetx,y
Firework.prototype.draw = function()
{
	fctx.fillStyle = 'black';

	if (this.state == 'launching')
	{
		// Same as before but with little rocket tail.
		fctx.fillStyle = 'yellow';
		fctx.fillRect(this.x, this.y, 10, 30);
		fctx.fillStyle = 'brown';
		fctx.fillRect(this.x, this.y, 2, 70);

		// Draw triangle at the top.
		fctx.beginPath();
		fctx.moveTo(this.x, this.y);
		fctx.lineTo(this.x + 5, this.y - 10);
		fctx.lineTo(this.x + 10, this.y);
		fctx.closePath();
		fctx.fillStyle = 'aqua';
		fctx.fill();

	}
	else if ((this.state == 'explosion') || (this.state == 'fade'))
	{
		// We need to draw the particles making up the explosion.
		for (y = 0; y < this.glitter.length; y ++) {
			this.glitter[y].draw();
		}
	}
}

// Launches the firework upwards to random x/y by creating a tween.
Firework.prototype.launch = function()
{
	this.state = 'launching';

	// Work out random height between 1/3 and top of the canvas to stop at.
	var randomY = ((Math.random() * fcanvas.height / 3) + 100);

	// Also work out a radom x so the firework goes to the left or right
	// ensure not too far left or right so not off the screen.
	var randomX = ((Math.random() * (fcanvas.width - 100)) + 50);

	var properties = new Array(null);
	properties['y']                = randomY;
	properties['x']				   = randomX;
	properties['ease']             = 'Power1.easeOut';
	properties['onComplete']       = triggerExplode;   // Call function to perform actions when animation has finished.
	properties['onCompleteParams'] = new Array('' + this.id);   // Add the Id of this one to the params.

	var randTime = (Math.random() * 2) + 1;

	// Do the tween animation passing the properties from the animation object as an array of key => value pairs.
	TweenMax.to(this, randTime, properties);
}

// Called after the launch, we need to set the x and y on all giltter particles to that of the firework
// and also compute the targetX and targetY of where we want the particles to be at the end of the animation.
Firework.prototype.explode = function()
{
	this.state = 'explosion';

	//++ @TODO this will need to be different for each forework type so some sort of inheritince
	//++ and this subclassing might be good so we can overload this function for each rocket created.

	// When creating firework the user can specify the power which controls how big the explosion is.
	var targetRadius = this.power;

	//++ Just loop for number of particles wanted.
	for (var y = 0; y < 50; y ++)
	{
		// Create particle and set intial x,y position to that of the firework.
		//++ @TODO can pass more properties like the colour of each particle, might be same
		//++ of 1 of 2 colours or random etc
		this.glitter[y] = new Particle({
			'x': this.x,
			'y': this.y,
			'color' : '255,0,0'	// Needs to be RGB to alpha can be added for fade.
		});

		// Work out angle and radius.
		var randAngle = Math.random() * 359;	// Angle that partciles can be around the center point.
		var randRadius = Math.random() * 20;	// Give some variance to the particle distance, no perfect circles.

		// Convert the angle in to radians since that is what the math functions need to be.
		var radian = (randAngle * 0.0174532925);

		// Work out the targetX and targetY, this is relative to the center point.
		var targetX = (targetRadius + randRadius) * Math.cos(radian);
		var targetY = (targetRadius + randRadius) * Math.sin(radian);

		// Put together the properties for the tweenmax animation.
		var properties = new Array(null);
		properties['x'] = this.x + targetX;
		properties['y'] = this.y + targetY;
		properties['ease'] = 'Power1.easeOut';

		TweenMax.to(this.glitter[y], 2, properties);
	}

	// Create bogus tween on the firework for 1.8 seconds so can trigger the fade
	var properties = new Array(null);
	properties['x']				   = 0;
	properties['onComplete']       = triggerFade;               //++ This will get called for each petal which is not desirable, how to make for whole firework??
	properties['onCompleteParams'] = new Array('' + this.id);   // Add the Id of this one to the params.
	TweenMax.to(this, 2, properties);
}

// Called at the end of the explosion, quickly fades the petals.
Firework.prototype.fade = function()
{
	this.state = 'fade';

	// Need to trigger the firework dead at the same time as the particles are finished
	//++ @TODO review if this is the best way to do it as alpha was on the firework as a whole before.
	var properties = new Array(null);
	properties['ease']  		   = 'Power0.easeNone';
	properties['onComplete']       = triggerDead;
	properties['onCompleteParams'] = new Array('' + this.id);
	TweenMax.to(this, 0.8, properties);

	// Loop though petals and get them to drop a bit as they fade to simulate gravity.
	for (y = 0; y < this.glitter.length; y ++)
	{
		var properties = new Array(null);
		properties['y']     = (this.glitter[y].y + 10);
		properties['ease']  = 'Power0.easeNone';
		properties['alpha'] = 0;    // Setting the alpha to 0 fades it out.

		TweenMax.to(this.glitter[y], 0.8, properties);
	}
}

// Define array and count to hold the fireworks.
var fireworks = new Array(null);
var fireCount = 0;

// Converts degress to radians.
function degreesToRadians(d) {
	return d * 0.0174532925199432957;
}

// Helper functions, must be outside of classes so that TweenMax can call them.
// How do we know what to explode. Id is number of firework in array.
function triggerExplode(id) {
	fireworks[id].explode();
}

function triggerFade(id) {
	fireworks[id].fade();
}

function triggerDead(id) {
	fireworks[id] = null;
}

// Ensures that the fireworks are drawn, called by the tweenMax ticker.
function animationLoop()
{
	// Clear the canvas.
	fctx.clearRect(0, 0, fcanvas.width, fcanvas.height);

	// Loop and draw all fireworks.
	//++ It will take longer to do this each time. Some sort of queue system
	//++ @TODO would be nice where the fireworks a pushed on then popped off? - How does that affect the ID though?
	for(i=0; i < fireworks.length; i ++) {
		// If firework exists at that array position then draw it, otherwise skip.
		if (fireworks[i]) {
			fireworks[i].draw();
		}
	}
}

// Need to make the canvas full width and height.
function resizeCanvas()
{
	// Get the canvas
	var canvas = document.getElementById('canvas');

	// Get width of window.
	var w = window.innerWidth;

	// Set height to the current height of the canvas since we don't adjust it.
	var h = window.innerHeight;

	// Assuming only the width will change to be responsive.
	canvas.width = w;
	canvas.height = h;

	// To ensure the wheel stays inside the canvas, work out what is the smaller
	// value between width and height, and set the outerRadius to half of that.
	if (w < h) {
		theWheel.outerRadius = (w / 2);
	} else {
		theWheel.outerRadius = (h / 2);
	}

	/*
	// In order to keep the wheel in the center of the canvas the centerX and
	// centerY need to be set to the middle point of the canvas.
	theWheel.centerX = (canvas.width / 2);
	theWheel.centerY = (canvas.height / 2);

	// Other possible TODO
	// - Alter the font size.
	// - Adjust inner radius if the wheel has one.

	// Re-draw the wheel.
	theWheel.draw();
	*/
}

// Hook in to the tick event of greensock to update the wheel.
TweenLite.ticker.addEventListener("tick", animationLoop);