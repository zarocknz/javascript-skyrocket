/*
    This file contains all the JS to power the designer which allows the creation of skyrocket explosion shapes
    and other other properties such as the animation type and duration to be specified.
 */

// Get the canvas and its context so we can draw in it.
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var halfWidth = canvas.width / 2;
var halfHeight = canvas.height / 2;

// Declare some global variables.
var guideColour = 'rgba(255, 0, 0, 0.5)';
var currentColour = 1;
var colours = Array('', '234,229,111', '125,230,239', '137,242,110');
var mouseDown = false;
var selectedParticle = null;
var particles = Array();

// Get all the controls on the page so we can access them in all the code below.
var actionAdd = document.getElementById('action-add');
var actionSelect = document.getElementById('action-select');
var actionDelete = document.getElementById('action-delete');
var locationX = document.getElementById('location-x');
var locationY = document.getElementById('location-y');
var radiusRange = document.getElementById('radius-range');
var radiusText = document.getElementById('radius-text');
var colourOne = document.getElementById('colour-one');
var colourTwo = document.getElementById('colour-two');
var colourThree = document.getElementById('colour-three');
var alphaRange = document.getElementById('alpha-range');
var alphaText = document.getElementById('alpha-text');
var explosionName = document.getElementById('explosion-name');
var creatorName = document.getElementById('creator-name');
var animationDuration = document.getElementById('animation-duration');
var animationPower = document.getElementById('animation-power');
var animationEase = document.getElementById('animation-ease');
var animationTest = document.getElementById('animation-test');

// Guide controls...
var circleRange = document.getElementById('circle-range');
var circleText = document.getElementById('circle-text');
var circleShow = document.getElementById('circle-show');
var circleSnap = document.getElementById('circle-snap');
var gridRange = document.getElementById('grid-range');
var gridText = document.getElementById('grid-text');
var gridShow = document.getElementById('grid-show');
var gridSnap = document.getElementById('grid-snap');

// Controls related to creation and loading of config.
var createJson = document.getElementById('create-json');
var loadJson = document.getElementById('load-json');
var jsonText = document.getElementById('config-textarea');

/**
 * Class for particles.
 * @param JSON options json containing the properties for the particle.
 */
function Particle(options) {
    // Define default options used if not specified.
    defaultOptions = {
        'x' : 0,    // Xpos - relative to the center point.
        'y' : 0,    // yPos
        'r' : 10,   // Radius
        'c' : 1,    // Colour number (1-3)
        'a' : 0.8,  // Alpha
    };

    // Now loop through the default options and create properties of this class set to the value for
    // the option passed in if a value was, or if not then set the value of the default.
    for (var key in defaultOptions) {
        if ((options != null) && (typeof(options[key]) !== 'undefined'))
            this[key] = options[key];
        else
            this[key] = defaultOptions[key];
    }
}

// =====================================================================================================================
// =====================================================================================================================
/**
 * Draws on the canvas.
 * @return void
 */
function draw() {
    // Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // If there are particles
    if (particles.length > 0) {
        // Loop and draw all particles.
        for (x = 0; x < particles.length; x ++) {
            particle = particles[x];

            // Save context so colour change does not affect anything else.
            ctx.save();

            // Set fillstyle to the color which must be rgb plus the alpha
            // We can change the alpha to do the fade.
            ctx.fillStyle = 'rgba(' + colours[particle.c] + ', ' + particle.a + ')';

            // Beign the path for the circle.
            ctx.beginPath();

            // Draw the particle relative to the center point.
            ctx.arc(halfWidth + particle.x, halfHeight + particle.y,particle.r,0,2*Math.PI);

            // Fill and stroke
            if (particle.c) {
                ctx.fill();
            }

            // Restore canvas settings.
            ctx.restore();
        }
    }

    // If we are to draw the grid guide then do so.
    ctx.save();
    ctx.strokeStyle = guideColour;

    if (gridShow.checked) {
        drawGridLines();
    }

    // If we are to draw the circle 1 guide then do so.
    if (circleShow.checked) {
        ctx.beginPath();
        ctx.arc(halfWidth, halfHeight, circleText.value, 0, 2*Math.PI);
        ctx.stroke();
    }

    // Call function to draw a guide as to where the particle will be added.
    if (actionAdd.checked) {
        drawParticleGuide();
    } else if (actionSelect.checked && selectedParticle) {
        // If a particle is selected then draw a circle around it to indicate the selection
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(halfWidth + selectedParticle.x, halfHeight + selectedParticle.y, selectedParticle.r + 1, 0, 2*Math.PI);
        ctx.stroke();
        ctx.strokeStyle = guideColour;
        ctx.lineWidth = 1;
    }

    // Draw the center dot which is where the firework will explode from last so it always appears on top.
    ctx.fillStyle = guideColour;
    ctx.fillRect(halfWidth - 3, halfHeight - 3, 6, 6);
    ctx.restore();
}

/**
 * Called from above, draws a grid on the canvas. The lines must intersect at the center point so the dot there
 * is on the crossing of a vertical and a horizontal line.
 * @return void
 */
function drawGridLines()
{
    var gridSize = gridText.value;

    ctx.beginPath();

    // Loop and draw vertial lines.
    var x = halfWidth;
    var x2 = halfWidth;
    var y = halfHeight;
    var y2 = halfHeight;

    // Draw vertical lines.
    while(x < canvas.width) {
        // Draw lines in the right half.
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);

        // Draw lines in the left half at the time time using negative values.
        ctx.moveTo(x2, 0);
        ctx.lineTo(x2, canvas.height);

        // Increment this by the size of the grid.
        x += (1 * gridText.value);    // Force JS to treat the value as a number.
        x2 -= (1 * gridText.value);
    }

    // Draw horizontal lines.
    while(y < canvas.height) {
        // Draw lines in the lower half.
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);

        // Draw lines in the top half.
        ctx.moveTo(0, y2);
        ctx.lineTo(canvas.width, y2);

        // Increment this by the size of the grid.
        y += (1 * gridText.value);    // Force JS to treat the value as a number.
        y2 -= (1 * gridText.value);
    }

    ctx.stroke();
}

/**
 * Draws the particle guide so the user knows when the new particle will be placed.
 * Snaps to the grid or circle if that option is on.
 * @return void
 */
function drawParticleGuide() {
    // If the grid is shown and the snap is on then snap the position to the nearest intercestion of the lines.
    if (gridShow.checked && gridSnap.checked) {
        // Work out how many squares from the center point the location is.
        var squareX = Math.round(locationX.value / gridText.value);
        var squareY = Math.round(locationY.value / gridText.value);

        // Now alter the location values to the number of squares multiplied by the grid size.
        locationX.value = (squareX * gridText.value);
        locationY.value = (squareY * gridText.value);
    } else if (circleShow.checked && circleSnap.checked) {
        // If the circle is shown and to snap to if then do so - its more of a follow than snap.
        // Work out the angle (in radians) of the current mouse location (this is already relative to the center point).
        var radians = Math.atan2(locationX.value, locationY.value);

        // Work ut a new X and Y that is at the same angle, just at the radius of the circle guide.
        var newX=Math.round(circleText.value*Math.sin(radians));
        var newY=Math.round(circleText.value*Math.cos(radians));

        locationX.value = newX;
        locationY.value = newY;
    }

    // Draw the particle guide.
    ctx.beginPath();
    ctx.arc(halfWidth + (1 * locationX.value), halfHeight + (1 * locationY.value), radiusText.value, 0, 2*Math.PI);
    ctx.stroke();
}

/**
 * Event for mouse being pressed on the canvas.
 * @param  Event e the mouse event
 * @return void
 */
canvas.onmousedown = function(e)
{
    mouseDown = true;

    // Call function to work out if there is a particle at the location the user clicked.
    if (actionSelect.checked || actionDelete.checked) {
        getSelectedParticle(e);

        if (actionDelete.checked) {
            deleteSelectedParticle();
        }

    } else {
        addParticle(e);
    }
}

/**
 * Mouse up event.
 * @param  Event e the mouse event
 * @return void
 */
canvas.onmouseup = function(e)
{
    mouseDown = false;

    if (actionAdd.checked) {
        selectedParticle = null;
    }

    draw();
}

/**
 * Mouse move event.
 * @param  Event e the mouse event
 * @return void
 */
canvas.onmousemove = function(e)
{
    var rect = canvas.getBoundingClientRect();

    // Update the display of the mouse position relative to the center point.
    locationX.value = Math.round((e.clientX - rect.left) - halfWidth);
    locationY.value = Math.round((e.clientY - rect.top) - halfHeight);

    // If the mouse is down and a particle selected then move it.
    if (mouseDown && selectedParticle) {
        selectedParticle.x = (1 * locationX.value);
        selectedParticle.y = (1 * locationY.value);
    }

    // Call the draw function.
    draw();
}

/**
 * Checks to see if there is a particle where the user clicked if so its selected so that it can be moved
 * @param  Event e the mouse event
 * @return void
 */
function getSelectedParticle(e)
{
    // Reset global var to null.
    selectedParticle = null;

    if (particles.length > 0) {
        // Figure out real mouse position and make it relative to the center point.
        var rect = canvas.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) - halfWidth;
        mouseY = (e.clientY - rect.top) - halfHeight;

        // Loop though all particles and find the one the mouse click is inside. Loop backwards so that particles
        // placed on top are selected rather than those on the bottom if 2 are overlapping.
        for (var x = particles.length-1; x >= 0; x--) {
            // Use poor mans matching to make this quicker by selecting based on a bounding box around the paritcle circle
            // exact matching will require more math - i.e. trig stuff based on the angle etc.
            var item = particles[x];

            if ((mouseX >= (item.x - item.r) && mouseX <= (item.x + item.r)) &&
                (mouseY >= (item.y - item.r) && mouseY <= (item.y + item.r))) {

                // Set the selected particle to the one matched
                selectedParticle = particles[x];

                // Also update some fields in the UI to values in the existing particle.
                radiusRange.value = radiusText.value = selectedParticle.r;
                alphaText.value = selectedParticle.a;
                alphaRange.value = alphaText.value * 100;

                currentColour = selectedParticle.c;

                if (currentColour == 3) {
                    colourThree.checked = true;
                } else if (currentColour == 2) {
                    colourTwo.checked = true;
                } else {
                    colourOne.checked = true;
                }

                break;
            }
        }
    }
}

/**
 * Adds a new particle at the mouse location.
 * @param Event e mouse event
 */
function addParticle(e)
{
    // Set the options as per values in different fields on the page.
    // Ensure values are all converted to numbers other wise this causes issues when it comes time to do some math.
    options = {
        x: (1 * locationX.value),
        y: (1 * locationY.value),
        r: (1 * radiusText.value),
        c: currentColour,
        a: (1 * alphaText.value)
    };

    // Add new particle to the particles array.
    particles.push(selectedParticle = new Particle(options));

    // Call draw so new particle is rendered.
    draw();
}

/**
 * deletes the selected particle.
 * @return void
 */
function deleteSelectedParticle()
{
    if (selectedParticle) {
        // Flag the particle for deletion.
        selectedParticle.delete = true;

        // Now loop though the particles array and find the index of this particle.
        particleIndex = null;

        for (var x = 0; x < particles.length; x ++) {
            if (particles[x].delete) {
                particleIndex = x;
                break;
            }
        }

        // Shorten the array (take out the deleted particle and move all others down to fill the gap).
        if (particleIndex !== null) {
            particles.splice(particleIndex, 1);
        }
    }
}

/**
 * Updates the selected particle by setting its properties to that of the fields in the UI
 * @return void
 */
function updateSelectedParticle()
{
    if (selectedParticle) {
        // Not the x,y as that is of where the mouse last was over the canvas so acts weird.
        selectedParticle.r = (1 * radiusText.value);
        selectedParticle.c = currentColour;
        selectedParticle.a = (1 * alphaText.value);
        draw();
    }
}

/**
 * Tests the animation by starting an animation loop, then tweens all the particles so the move.
 * once all is complete the animation loop is turned off again to save CPU.
 * @return void
 */
function testAnimation()
{
    animationTest.disabled = true;

    // To make this easy lets tween FROM and set 0,0 as the xy to the particles animate from there to their current position.
    var properties = new Array(null);
    properties['y']    = 0;
    properties['x']    = 0;
    properties['ease'] = animationPower.value + '.' + animationEase.value;
    properties['onComplete'] = animationCompleted;

    // Hook in to the tween max ticker which will call the draw function each request animation frame tick.
    TweenMax.ticker.addEventListener("tick", draw);

    // Apply the tween to all the particles by passing the entire array.
    TweenMax.from(particles, animationDuration.value, properties);
}

/**
 * Called from tweenmax when the animation has finished
 * @return void
 */
function animationCompleted()
{
    // Remove the tick event listener.
    TweenMax.ticker.removeEventListener("tick");

    // Reenable the test button.
    animationTest.disabled = false;
}

/**
 * Creates the JSON configuration information for the rocket.
 * To be copied and pasted in to a rocket definitions file.
 * @return void
 */
function createJsonConfig()
{
    // Put all the information about the rocket in to the textarea as JSON. The user can then copy this in to a rocket
    // definitions file for use in the skyrokcet show.

    /* This is what we need to create...
    {
        name : 'explosionName',
        creator : 'rocketCreator',
        duration: animationDuration,
        power: animationPower,
        ease: animationEase
        particles :
        [
            {x: Xpos, y: Ypos, r: radius, c: colorNumber, a: alpha},
            {x: Xpos, y: Ypos, r: radius, c: colorNumber, a: alpha},
            {x: Xpos, y: Ypos, r: radius, c: colorNumber, a: alpha}...
        ]
    },
    */

    var nl = "\n";
    var cnl = '",' + nl;

    // Blank the text area setting the opening {
    jsonText.value = '{' + nl;

    // Add name, creator.
    jsonText.value += '  "name": "' + explosionName.value + cnl;
    jsonText.value += '  "creator": "' + creatorName.value + cnl;

    // Add animation properties.
    jsonText.value += '  "duration": ' + animationDuration.value + ",\n";
    jsonText.value += '  "power": "' + animationPower.value + cnl;
    jsonText.value += '  "ease": "' + animationEase.value + cnl;

    // Open the paritcles array.
    jsonText.value += '  "particles":' + nl + '  [' + nl;

    // Loop and add line for every particle that is part of the explosion shape.
    for (var x = 0; x < particles.length; x ++) {
        var item = particles[x];
        jsonText.value += '    {"x": ' + item.x + ', "y": ' + item.y + ', "r": ' + item.r + ', "c": ' + item.c + ', "a": ' + item.a + '}';

        if (x < particles.length -1) {
            jsonText.value += ",\n";
        } else {
            jsonText.value += nl;
        }
    }

    // Close particles array
    jsonText.value += '  ]' + nl;

    // Add ending }
    jsonText.value += "}";
}

/**
 * Attempts to load the text in the JSON config text area. Sets fields and creates particles with the properties defined
 * handy to load existing explosions and edit them.
 * @return void
 */
function loadJsonConfig()
{
    var config = JSON.parse(jsonText.value);

    if (config.name) {
        explosionName.value = config.name;
    }

    if (config.creator) {
        creatorName.value = config.creator;
    }

    if (config.duration) {
        animationDuration.value = config.duration;
    }

    if (config.power) {
        animationPower.value = config.power;
    }

    if (config.ease) {
        animationEase.value = config.ease;
    }

    if (config.particles) {
        // Blank the current particles array.
        particles = Array();

        config.particles.forEach(function(item){
            options = {
                x: item.x,
                y: item.y,
                r: item.r,
                c: item.c,
                a: item.a
            };

            // Add new particle to the particles array.
            particles.push(new Particle(options));
        });
    }
}

/**
 * Ensures the canvas stays full width, called on initial load and if the window is re-sized.
 * @return void
 */
function resizeCanvas()
{
    // Get the canvas
    var canvas = document.getElementById('canvas');

    // Get width of window.
    var w = window.innerWidth;

    // Assuming only the width will change to be responsive.
    canvas.width = w;

    // Ensure this is updated.
    halfWidth = canvas.width / 2;

    // Call the draw function to re-draw the canvas, ensures the white dot stays in the center.
    draw();
}

// =====================================================================================================================
// =====================================================================================================================
// Now the wiring for the all the controls on the page, we want to sync the range elements with the text fields
// underneath, and vice versa. Also the Show checkboxes need to call draw().
actionAdd.addEventListener('click', function() {
    selectedParticle = null;
    draw();
});

radiusRange.addEventListener('change', function() {
    radiusText.value = radiusRange.value;
    updateSelectedParticle();
});

radiusText.addEventListener('change', function() {
    radiusRange.value = radiusText.value;
    updateSelectedParticle();
});

colourOne.addEventListener('click', function() {
    currentColour = 1;
    updateSelectedParticle();
});

colourTwo.addEventListener('click', function() {
    currentColour = 2;
    updateSelectedParticle();
});

colourThree.addEventListener('click', function() {
    currentColour = 3;
    updateSelectedParticle();
});

// Ranges don't seem to do decimals so convert 0-100 to 0.0-1.0 for the alpha.
alphaRange.addEventListener('change', function() {
    alphaText.value = (alphaRange.value / 100);
    updateSelectedParticle();
});

alphaText.addEventListener('change', function() {
    alphaRange.value = (alphaText.value * 100);
    updateSelectedParticle();
});

circleRange.addEventListener('change', function() {
    circleText.value = circleRange.value;
    draw();
});

circleText.addEventListener('change', function() {
    circleRange.value = circleText.value;
    draw();
});

circleShow.addEventListener('click', function() {
    draw();
});

gridRange.addEventListener('change', function() {
    gridText.value = gridRange.value;
    draw();
});

gridText.addEventListener('change', function() {
    gridRange.value = gridText.value;
    draw();
});

gridShow.addEventListener('click', function() {
    draw();
});

createJson.addEventListener('click', createJsonConfig);
loadJson.addEventListener('click', function() {
    if (confirm("Are you sure you want to load? Any changes will be lost!")) {
        loadJsonConfig();
    }
});
animationTest.addEventListener('click', testAnimation);

// Call the draw function the initial time.
draw();