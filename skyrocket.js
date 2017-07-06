// Class for the skyrocket show over all.
//++ perhaps name should be "show"??

//var fcanvas = null
//var fctx = null;

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

// Class for particles which have x, y, colour.
function Particle(options)
{
	// Define default options
	defaultOptions = {
		'x' : 0,
		'y' : 0,
		'fillStyle' : 'yellow',
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
	fctx.fillStyle = this.fillStyle;
	fctx.strokeStyle = this.strokeStyle;
	fctx.lineWidth = this.lineStyle;

	// Beign the path for the circle.
	fctx.beginPath();

	// X, y, radius, startAngle, endAngle.
	fctx.arc(this.x,this.y,this.radius,0,2*Math.PI);

	// Fill and stroke
	if (this.fillStyle) {
		fctx.fill();
	}

	if (this.strokeStyle && this.lineWidth) {
		fctx.stroke();
	}

	// Restore canvas settings.
	fctx.restore();
}

// Class for firework (i.e. an individual skyrocket)
//++ @TODO might move to another file, or make abstract class?
//++ Should x be passed in or part of the options?
function Firework(id, x, options)
{
	// Set the ID, X position, then look at other options.
	this.id = id;
	this.power = 80;	//++ To remove or sort use.

	// Set initial position to center bottom of the canvas.
	this.x = x;
	this.y = fcanvas.height;

	// Arrays for the particles making up the explosion and also the trail.
	this.glitter = new Array(null);
	this.trail = new Array(null); //++ @TODO figure out trail math.

	//++ @TODO work out and set other options from default etc??

	// Also set something to keep track of the state of the firework.
	this.state = 'new';

	// Call function to auto launch the firework straight away?
	//++ TODO decide if fireworks can be queued up and launched later so don't call this here.
	this.launch();
}

// Draws the firework
//++ This will likely change to an image for font so draw would be different.
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
		//ctx.save();
		// All petals have same colour and also alpha as the firework.
		//ctx.fillStyle = 'rgba(' + this.color + ', ' + this.alpha + ')';

		// We need to draw the particles making up the explosion.
		for (y = 0; y < this.glitter.length; y ++) {
			this.glitter[y].draw();
		}

		//ctx.restore();
	}
}

// Launches the firework upwards to random x/y by creating a tween.
Firework.prototype.launch = function()
{
	this.state = 'launching';

	// Work out random height between 1/3 and top of the canvas to stop at.
	//++ @TODO Also if lanuching from middle out then need to work out a X.
	var randomY = ((Math.random() * fcanvas.height / 2) + 100);

	var properties = new Array(null);
	properties['y']                = randomY;
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

	// Create array for petals.
	//++this.glitter = new Array(null);

	//++ @TODO this function will change to compute the animation so will just use the
	//++ properies defined here such as the number of particles, radius etc.

	//++ @TODO change to center-based calculation with trig math rather than below from the newyear prototype.

	for (var y = 0; y < 50; y ++)
	{
		// Create particle and set intial x,y position to that of the firework.
		this.glitter[y] = new Particle({'x': this.x, 'y': this.y});
		//this.petals[y].x = this.x;
		//this.petals[y].y = this.y;

		// Also need to tween each petal, randomise x and y a bit.
		//++ This to change, sort how power would come in to it - just affects the radius?
		var randomX = (Math.random() * this.power) + 1;
		var randomY = (Math.random() * this.power) + 1;

		//var randomFix = (Math.random() * 2 + 1);

		if (randomX + randomY >= this.power)
		{
			randomX = randomX / 1.5;
			randomY = randomY / 1.5;
		}

		var xFlip = Math.floor((Math.random() * 2) + 1);
		var yFlip = Math.floor((Math.random() * 2) + 1);

		// Calculate the new x and Y of the petal by adding or subtracting the random to the current values in the tween.
		var properties = new Array(null);

		if (xFlip > 1) {
			properties['x'] = this.x - randomX;
		} else {
			properties['x'] = this.x + randomX;
		}

		if (yFlip > 1) {
			properties['y'] = this.y - randomY;
		} else {
			properties['y'] = this.y + randomY;
		}
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

	// Fade the alpha on the firework itself.
	var properties = new Array(null);
	properties['alpha']            = 0;    // Setting the alpha to 0 fades it out.
	properties['ease']             = 'Power0.easeNone';
	properties['onComplete']       = triggerDead;
	properties['onCompleteParams'] = new Array('' + this.id);
	TweenMax.to(this, 0.8, properties);

	// Loop though petals and get them to drop a bit as they fade to simulate gravity.
	for (y = 0; y < this.glitter.length; y ++)
	{
		var properties = new Array(null);
		properties['y']     = (this.glitter[y].y + 10);
		properties['ease']  = 'Power0.easeNone';

		TweenMax.to(this.glitter[y], 0.8, properties);
	}
}