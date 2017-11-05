/*
    This file contains the code which generates the sky scraper background. If you want to do your own custom
    background, perhaps an SVG, then simply don't include this file on the index.html page.
 */

// Calculate the skyscraper dimensions
function skyline() {
    // Get all backdrop divs by class name.
    var drops = document.getElementsByClassName("backdrop");

    // Loop through all of them.
    for(var x = 0; x < drops.length; x++) {

        // Calculate random width between min and max. Don't want buildings too thick or too thin.
        var width = Math.floor((Math.random()*7) + 2) + "%";

        // On mobile devices reduce the building height.
        if (window.matchMedia("(min-width: 768px)").matches) {
            var height = Math.floor((Math.random() * 30) + 1) + "%";
        } else {
            var height = Math.floor((Math.random() * 15) + 1) + "%";
        }

        // Calculate the left using the loopX to position the buildings along the bottom of the screen.
        var left = 0.0 + (x*2.5) + "%";

        // Set the style on the building 'backdrop' div to the computed values.
        drops[x].style.width = width;
        drops[x].style.height = height;
        drops[x].style.left = left;
    }
}

// Generate "skyscraper" div's
var string = "";
for (var i = 0; i < 40; i++) {
    string += "<div class='backdrop'></div>";
}

// Add all these divs to the "main" div which contains the backdrop.
document.getElementById("main").innerHTML = string;

// Finally call the function above to generate the skyline from these divs.
skyline();
