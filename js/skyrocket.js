// Class for particles which have x, y, color, alpha etc.
function Particle(options)
{
    // Define default options
    defaultOptions = {
        'x' : 0,
        'y' : 0,
        'color' : '0,255,0',
        'alpha' : 0.8,            // Used with the colour to set rgba fillStyle.
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
    ctx.save();
    // Set fillstyle to the color which must be rgb plus the alpha
    // We can change the alpha to do the fade.
    ctx.fillStyle = 'rgba(' + this.color + ', ' + this.alpha + ')';
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineStyle;

    // Beign the path for the circle.
    ctx.beginPath();

    // X, y, radius, startAngle, endAngle.
    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);

    // Fill and stroke
    if (this.color) {
        ctx.fill();
    }

    if (this.strokeStyle && this.lineWidth) {
        ctx.stroke();
    }

    // Restore canvas settings.
    ctx.restore();
}

// Class for firework (i.e. an individual skyrocket)
function Firework(id, options)
{
    // Define default options (most are to do with explosion).
    defaultOptions = {
        'rocketIcon' : '\uf135',    // Default icon.
        'rocketIconSize' : '14',    // Without the px
        'outerRadius' : 60,
        'innerRadius' : 30,
        'numParticles' : 50,
        'particleRadius' : 3,
        'particleAlpha' : 0.8,
        'color1' : '255,0,0',
        'color2' : null,
        'easing' : 'Power1.easeOut',
        'xFunction' : 'cos',
        'yFunction' : 'sin',
        'tail' : false,
        'tailWidth' : 1,
        'tailColor' : '0,255,0'
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
    //++ @TODO This may be one of the options, other users might not want it launched from the center.
    this.x = (canvas.width / 2);
    this.y = canvas.height;

    // Arrays for the particles making up the explosion and also the trail.
    this.glitter = new Array();
    this.trail = new Array();

    // Also set something to keep track of the state of the firework.
    this.state = 'new';

    // Call function to auto launch the firework straight away?
    //++ @TODO decide if fireworks can be queued up and launched later so don't call this here.
    this.launch();
}

// Draws the firework from a font-awesome icon.
Firework.prototype.draw = function()
{
    if (this.state == 'launching')
    {
        var trailId = this.trail.length;

        // Leave behind some particles as a trail. Not too many.
        //++ @TODO probably a better way to spawn these.
        if (this.addTailParticle === 1) {
            this.trail[trailId] = new Particle({
                'x': this.x + 2.5,
                'y': this.y,
                'color' : '100,100,100',
                'radius' : 2,
                'alpha' : 0.3
            });
        }

        this.addTailParticle ++;

        if (this.addTailParticle >= 3) {
            this.addTailParticle = 1;
        }

        // Draw all the particles for this rocket.
        for (var x = 0; x < this.trail.length; x ++)
        {
            if (this.trail[x].alpha > 0) {
                this.trail[x].radius += 0.1;
                this.trail[x].draw();

                // Slowly fade particles so onces at the bottom fade out over time.
                this.trail[x].alpha -= 0.003;
            }
        }

        // ---------------------------------------------------------------------
        // Draw the body of the skyrocket.
        ctx.save();

        // Rotate to the target angle of this rocket so that when we draw the nose points to where it is going.
        ctx.translate(this.x, this.y);
        ctx.rotate(degreesToRadians(this.targetAngle));
        ctx.translate(-this.x, -this.y);

        // Draw a rectangle representing the rocket body.
        ctx.fillStyle = 'rgba(' + this.color1 + ', ' + 1 + ')';
        ctx.fillRect(this.x, this.y, 5, 15);

        // Now a stick down the side. The side to draw it on was worked out in the launch so check tailSide param.
        ctx.fillStyle = 'brown';

        if (this.tailSide) {
            ctx.fillRect(this.x + 5, this.y, 1, 30);
        } else {
            ctx.fillRect(this.x -1, this.y, 1, 30);
        }

        // Draw triangle for the "nose cone" at the top of the rocket, use the secondary colour if there is one.
        var topColor = this.color2;

        if (topColor == null) {
            topColor = this.color1;
        }

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 2.5, this.y - 5);
        ctx.lineTo(this.x + 5, this.y);
        ctx.closePath();
        ctx.fillStyle = 'rgba(' + topColor + ', ' + 1 + ')';
        ctx.fill();
        ctx.restore();
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
    var randomY = ((Math.random() * canvas.height / 3) + 100);

    // Also work out a radom x so the firework goes to the left or right
    // ensure not too far left or right so not off the screen.
    var randomX = ((Math.random() * (canvas.width - 100)) + 50);

    // Work out the rotation angle of the rocket so that the nose of it points towards the randomX and randomY
    // otherwise it can look like the rocket flies sideways.
    var yDiff = (this.y - randomY);
    var xDiff = (randomX - this.x);
    var targetAngle = radiansToDegrees(Math.atan(xDiff/yDiff));

    // Finally after all that set the target angle of this skyrocket so the draw function can rotate the rocket
    // body correctly so that it nose first towards the targetX and targetY.
    this.targetAngle = targetAngle;

    // Quickly work out what side the tail/stick is to go on the rocket, if going left of the start should be on right
    // and if going to the right it should be on the left.
    if (randomX > this.x) {
        this.tailSide = 0;
    } else {
        this.tailSide = 1;
    }

    // Used to help control tail the particle rate.
    this.addTailParticle = 1;

    // Now configure greensock tween to animate the x and y position over time.
    var properties = new Array(null);
    properties['y']                = randomY;
    properties['x']                = randomX;
    properties['ease']             = 'Power1.easeOut';
    properties['onComplete']       = triggerExplode;   // Call function to perform actions when animation has finished.
    properties['onCompleteParams'] = new Array('' + this.id);   // Add the Id of this one to the params.

    var randTime = (Math.random() * 3) + 2;

    // Do the tween animation passing the properties from the animation object as an array of key => value pairs.
    TweenMax.to(this, randTime, properties);
}

// Called after the launch, we need to set the x and y on all giltter particles to that of the firework
// and also compute the targetX and targetY of where we want the particles to be at the end of the animation.
Firework.prototype.explode = function()
{
    this.state = 'explosion';

    for (var y = 0; y < this.numParticles; y ++)
    {
        // Figure out the color, there can be 2.
        var particleColor = this.color1;

        if ((this.color2 !== null) &&  (y % 2 === 0))  {
            particleColor = this.color2;
        }

        // Create particle and set intial x,y position to that of the firework.
        // And also set the colour, radius and alpha.
        this.glitter[y] = new Particle({
            'x': this.x,
            'y': this.y,
            'color' : particleColor,
            'radius' : this.particleRadius,
            'alpha' : this.particleAlpha
        });

        // Work out angle and radius.
        var randAngle = Math.random() * 359;    // Angle the particles around the full 360.

        // Work out a random radius between the inner and outerRadius.
        var randRadius = (Math.random() * (this.outerRadius - this.innerRadius)) + this.innerRadius;

        // Convert the angle in to radians since that is what the math functions need to be.
        var radian = (randAngle * 0.0174532925);

        // Work out the targetX and targetY, this is relative to the center point.
        var targetX = 0;
        var targetY = 0;

        if (this.xFunction == 'cos') {
            targetX = randRadius * Math.cos(radian);
        } else if (this.xFunction == 'tan') {
            targetX = randRadius * Math.tan(radian);
        } else if (this.xFunction == 'sin') {
            targetX = randRadius * Math.sin(radian);
        }

        if (this.yFunction == 'cos') {
            targetY = randRadius * Math.cos(radian);
        } else if (this.yFunction == 'tan') {
            targetY = randRadius * Math.tan(radian);
        } else if (this.yFunction == 'sin') {
            targetY = randRadius * Math.sin(radian);
        }

        // Put together the properties for the tweenmax animation.
        var properties = new Array(null);
        properties['x'] = this.x + targetX;
        properties['y'] = this.y + targetY;
        properties['ease'] = this.easing;

        TweenMax.to(this.glitter[y], 2, properties);
    }

    // Create bogus tween on the firework for 1.8 seconds so can trigger the fade
    var properties = new Array(null);
    properties['x']                   = 0;
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

function radiansToDegrees(r) {
    return r * (180/Math.PI);
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
}

// Hook in to the tick event of greensock to update the wheel.
TweenLite.ticker.addEventListener("tick", animationLoop);