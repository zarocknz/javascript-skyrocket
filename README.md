# javascript-skyrocket
Create fireworks on HTML canvas with Skyrocket.js

## Description
Skyrocket.js is a JavaScript library which displays skyrocket fireworks on HTML canvas.

Skyrockets launch from the bottom center of the screen, fly up, explode, then fade. Currently the rockets are Font Awesome icons.

Rocket properties are defined in rocket_definitions.js with rockets being picked at random.

Also there is a code generated background of a city skyline which is different each time the page is loaded.

GreenSock's Animation Platform (GSAP) is used to power the rocket and explosion animations.

## Example
For an example, load the included index.html file in your browser.

As you will see there is a function called addFirework() which is called repeatedly to spawn new fireworks at a random interval.

## Tutorials and other documentation
Sorry, there are none at this time. Currently this library is in a pre-release state, the v0.1 was created in one day during a coding hackathon.

## Maintainer
Douglas McKechie https://github.com/zarocknz

Keep informed about my JavaScript libraries by following https://twitter.com/dougtesting

## Credits
Special thanks to these people who collaborated with me on this during the hackday...

* Jaque van der Berg https://github.com/jaque777

* David Malone https://github.com/soulrolll

Also a big thank you to Catalyst http://www.catalyst.net.nz/ for having a hackday to celebrate 20 years and allowing us to get this open source library off off the ground.

## TODO
Heaps, which may include the following (not in any particular order)...

* Remove jQuery dependancy for the backdrop/skyline, use pure JS
* Stop sky from changing colour, ensure is nice and dark so can see fireworks
* Define more and better firework explosion shapes and colours
* Perhaps de-couple firework explosion shapes from the colours so users can pick a shape and specify any colour
* Remove Font Awesome and code-draw some skyrocket rockets
* Allow images to be used for the rockets
* Add launch and explosion sounds, either pre-recorded or perhaps audio API generated
* Lighten sky slightly when rockets explode
* Allow explosion particles to have tails (will aid in creating different looking explosions)
* Fade rocket trail particles from the bottom up over time
* Allow the user to specify where along the screen (x axis) the rocket launches from rather than always in the center, perhaps there is an option for this to be random
* Stop the timeout adding fireworks when the browser tab has lost focus (when the user returns 100's of fireworks can be launched at once)
* Sort backdrop building height being the same at mobile width
* Ensure that backdrop is optional and there are some config parameters for it
* Allow the user to click/tap to launch additional skyrockets, perhaps to the x,y location of the click
* Create some documentation and examples
