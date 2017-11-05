/*
    This file defines colours used on the skyrockets. Currently the skyrocket explosion shapes defined in
    explosions.js may use up to 3 colours so all colour definifions here must contain 3 colours, but note you can
    make 2 or all three of the colours the same if you want single colour explosions.

    Note: that color 1 is used for the colour of the body of the rocket.
 */
var colors =
[
    // Single colours, but 3 tone for some variety (otherwise they look too flat)
    {
        "name": "Red",
        "1": "232,68,44",    // Mid
        "2": "205,23,25",    // Dark
        "3": "232,120,68",   // Light
    },
    {
        "name": "Orange",
        "1": "240,131,58",  // Mid
        "2": "213,116,51",  // Dark
        "3": "248,170,26",  // Light
    },
    {
        "name": "Yellow",
        "1": "249,204,65",  // Mid
        "2": "218,175,13",  // Dark
        "3": "250,231,28",  // Light
    },
    {
        "name": "Green",
        "1": "152,194,29",  // Mid
        "2": "69,172,52",   // Dark
        "3": "169,215,32",  // Light
    },
    {
        "name": "Blue",
        "1": "96,186,216",  // Mid
        "2": "55,148,182",  // Dark
        "3": "132,212,236", // Light
    },
    {
        "name": "Purple",
        "1": "127,53,133",  // Mid
        "2": "74,54,130",   // Dark
        "3": "175,73,183",  // Light
    },
    {
        "name": "Silver",
        "1": "211,209,209", // Mid
        "2": "172,170,170", // Dark
        "3": "231,230,229", // Light
    },

    // Now 3 colours combinations of the above (we'll skip 2 colour combos as they look weird for explosions designed for 3 colours.
    // To make things easy lets combo them with silver as the 3rd colour most of time.
    {
        "name": "RedOrangeSilver",
        "1": "232,68,44",
        "2": "240,131,58",
        "3": "211,209,209",
    },
    {
        "name": "OrangeYellowSilver",
        "1": "240,131,58",
        "2": "249,204,65",
        "3": "211,209,209",
    },
    {
        "name": "YellowGreenSilver",
        "1": "249,204,65",
        "2": "152,194,29",
        "3": "211,209,209",
    },
    {
        "name": "GreenBlueSilver",
        "1": "152,194,29",
        "2": "96,186,216",
        "3": "211,209,209",
    },
    {
        "name": "BluePurpleSilver",
        "1": "96,186,216",
        "2": "127,53,133",
        "3": "211,209,209",
    },
    {
        "name": "PurpleSilverYellow",
        "1": "127,53,133",
        "2": "211,209,209",
        "3": "249,204,65",
    },
    {
        "name": "SilverRedBlue",
        "1": "211,209,209",
        "2": "232,68,44",
        "3": "96,186,216",
    },
];