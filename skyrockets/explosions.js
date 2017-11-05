/*
	This file contains definitions for skyrocket explosion shapes.
	Colours are defined in colors.js which allows us to easily randomise the explosion and colour combinations.
	You can create your own exlosion shapes using tools/designer.html including loading and altering those defined here.
*/
var explosions =
[
	{
	  "name": "Three Ring",
	  "creator": "DouG",
	  "duration": 1,
	  "power": "Power1",
	  "ease": "easeOut",
	  "particles":
	  [
	    {"x": -80, "y": -6, "r": 6, "c": 1, "a": 0.8},
	    {"x": -74, "y": -30, "r": 6, "c": 1, "a": 0.8},
	    {"x": -62, "y": -51, "r": 6, "c": 1, "a": 0.8},
	    {"x": -40, "y": -69, "r": 6, "c": 1, "a": 0.8},
	    {"x": -9, "y": -80, "r": 6, "c": 1, "a": 0.8},
	    {"x": 19, "y": -78, "r": 6, "c": 1, "a": 0.8},
	    {"x": 50, "y": -62, "r": 6, "c": 1, "a": 0.8},
	    {"x": 72, "y": -35, "r": 6, "c": 1, "a": 0.8},
	    {"x": 80, "y": -1, "r": 6, "c": 1, "a": 0.8},
	    {"x": 75, "y": 28, "r": 6, "c": 1, "a": 0.8},
	    {"x": 59, "y": 54, "r": 6, "c": 1, "a": 0.8},
	    {"x": 35, "y": 72, "r": 6, "c": 1, "a": 0.8},
	    {"x": -4, "y": 80, "r": 6, "c": 1, "a": 0.8},
	    {"x": -32, "y": 73, "r": 6, "c": 1, "a": 0.8},
	    {"x": -48, "y": 64, "r": 6, "c": 1, "a": 0.8},
	    {"x": -67, "y": 43, "r": 6, "c": 1, "a": 0.8},
	    {"x": -76, "y": 24, "r": 6, "c": 1, "a": 0.8},
	    {"x": -46, "y": 3, "r": 6, "c": 2, "a": 0.8},
	    {"x": -40, "y": -23, "r": 6, "c": 2, "a": 0.8},
	    {"x": -21, "y": -41, "r": 6, "c": 2, "a": 0.8},
	    {"x": 15, "y": -44, "r": 6, "c": 2, "a": 0.8},
	    {"x": 39, "y": -24, "r": 6, "c": 2, "a": 0.8},
	    {"x": 46, "y": 3, "r": 6, "c": 2, "a": 0.8},
	    {"x": 33, "y": 32, "r": 6, "c": 2, "a": 0.8},
	    {"x": 9, "y": 45, "r": 6, "c": 2, "a": 0.8},
	    {"x": -21, "y": 41, "r": 6, "c": 2, "a": 0.8},
	    {"x": -37, "y": 26, "r": 6, "c": 2, "a": 0.8},
	    {"x": -1, "y": -17, "r": 6, "c": 3, "a": 0.8},
	    {"x": 16, "y": -4, "r": 6, "c": 3, "a": 0.8},
	    {"x": 9, "y": 13, "r": 6, "c": 3, "a": 0.8},
	    {"x": -7, "y": 14, "r": 6, "c": 3, "a": 0.8},
	    {"x": -15, "y": -4, "r": 6, "c": 3, "a": 0.8}
	  ]
  },
  {
	  "name": "SevenBurst",
	  "creator": "DouG",
	  "duration": 1,
	  "power": "Power4",
	  "ease": "easeOut",
	  "particles":
	  [
	    {"x": 37, "y": 70, "r": 10, "c": 1, "a": 0.8},
	    {"x": 81, "y": 12, "r": 10, "c": 1, "a": 0.8},
	    {"x": 49, "y": -67, "r": 10, "c": 1, "a": 0.8},
	    {"x": -20, "y": -81, "r": 10, "c": 1, "a": 0.8},
	    {"x": -73, "y": -32, "r": 10, "c": 1, "a": 0.8},
	    {"x": -74, "y": 40, "r": 10, "c": 1, "a": 0.8},
	    {"x": -24, "y": 75, "r": 10, "c": 1, "a": 0.8},
	    {"x": -19, "y": 56, "r": 8, "c": 1, "a": 0.8},
	    {"x": 28, "y": 52, "r": 8, "c": 1, "a": 0.8},
	    {"x": 64, "y": 6, "r": 8, "c": 1, "a": 0.8},
	    {"x": 38, "y": -52, "r": 8, "c": 1, "a": 0.8},
	    {"x": -15, "y": -63, "r": 8, "c": 1, "a": 0.8},
	    {"x": -56, "y": -23, "r": 8, "c": 1, "a": 0.8},
	    {"x": -60, "y": 30, "r": 8, "c": 1, "a": 0.8},
	    {"x": -42, "y": -16, "r": 5, "c": 1, "a": 0.8},
	    {"x": -50, "y": 23, "r": 5, "c": 1, "a": 0.8},
	    {"x": -16, "y": 42, "r": 5, "c": 1, "a": 0.8},
	    {"x": 22, "y": 38, "r": 5, "c": 1, "a": 0.8},
	    {"x": 50, "y": 2, "r": 5, "c": 1, "a": 0.8},
	    {"x": 31, "y": -40, "r": 5, "c": 1, "a": 0.8},
	    {"x": -12, "y": -49, "r": 5, "c": 1, "a": 0.8},
	    {"x": -31, "y": -11, "r": 4, "c": 1, "a": 0.8},
	    {"x": -10, "y": -38, "r": 4, "c": 1, "a": 0.8},
	    {"x": 26, "y": -32, "r": 4, "c": 1, "a": 0.8},
	    {"x": 41, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 17, "y": 28, "r": 4, "c": 1, "a": 0.8},
	    {"x": -14, "y": 34, "r": 4, "c": 1, "a": 0.8},
	    {"x": -41, "y": 18, "r": 4, "c": 1, "a": 0.8},
	    {"x": -20, "y": -8, "r": 3, "c": 1, "a": 0.8},
	    {"x": -33, "y": 13, "r": 3, "c": 1, "a": 0.8},
	    {"x": -12, "y": 25, "r": 3, "c": 1, "a": 0.8},
	    {"x": 12, "y": 19, "r": 3, "c": 1, "a": 0.8},
	    {"x": 34, "y": -3, "r": 3, "c": 1, "a": 0.8},
	    {"x": 21, "y": -24, "r": 3, "c": 1, "a": 0.8},
	    {"x": -8, "y": -30, "r": 3, "c": 1, "a": 0.8}
	  ]
  },
  {
	  "name": "Happy",
	  "creator": "DouG",
	  "duration": 1,
	  "power": "Power1",
	  "ease": "easeOut",
	  "particles":
	  [
	    {"x": -10, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": -10, "y": -20, "r": 4, "c": 1, "a": 0.8},
	    {"x": -10, "y": -10, "r": 4, "c": 1, "a": 0.8},
	    {"x": -10, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": -10, "y": 10, "r": 4, "c": 1, "a": 0.8},
	    {"x": -10, "y": 20, "r": 4, "c": 1, "a": 0.8},
	    {"x": -10, "y": 30, "r": 4, "c": 1, "a": 0.8},
	    {"x": 0, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": 10, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": 20, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": 20, "y": -20, "r": 4, "c": 1, "a": 0.8},
	    {"x": 20, "y": -10, "r": 4, "c": 1, "a": 0.8},
	    {"x": 20, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 10, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 0, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 40, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": 40, "y": -20, "r": 4, "c": 1, "a": 0.8},
	    {"x": 40, "y": -10, "r": 4, "c": 1, "a": 0.8},
	    {"x": 40, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 40, "y": 10, "r": 4, "c": 1, "a": 0.8},
	    {"x": 40, "y": 20, "r": 4, "c": 1, "a": 0.8},
	    {"x": 40, "y": 30, "r": 4, "c": 1, "a": 0.8},
	    {"x": 50, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": 60, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": 70, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": 70, "y": -20, "r": 4, "c": 1, "a": 0.8},
	    {"x": 70, "y": -10, "r": 4, "c": 1, "a": 0.8},
	    {"x": 70, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 60, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 50, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 90, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": 90, "y": -20, "r": 4, "c": 1, "a": 0.8},
	    {"x": 90, "y": -10, "r": 4, "c": 1, "a": 0.8},
	    {"x": 90, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 120, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": 120, "y": -20, "r": 4, "c": 1, "a": 0.8},
	    {"x": 120, "y": -10, "r": 4, "c": 1, "a": 0.8},
	    {"x": 100, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 110, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 120, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": 120, "y": 10, "r": 4, "c": 1, "a": 0.8},
	    {"x": 120, "y": 20, "r": 4, "c": 1, "a": 0.8},
	    {"x": 120, "y": 30, "r": 4, "c": 1, "a": 0.8},
	    {"x": -30, "y": 30, "r": 4, "c": 1, "a": 0.8},
	    {"x": -30, "y": 20, "r": 4, "c": 1, "a": 0.8},
	    {"x": -30, "y": 10, "r": 4, "c": 1, "a": 0.8},
	    {"x": -30, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": -30, "y": -10, "r": 4, "c": 1, "a": 0.8},
	    {"x": -30, "y": -20, "r": 4, "c": 1, "a": 0.8},
	    {"x": -30, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": -40, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": -50, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": -60, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": -60, "y": -20, "r": 4, "c": 1, "a": 0.8},
	    {"x": -60, "y": -10, "r": 4, "c": 1, "a": 0.8},
	    {"x": -60, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": -60, "y": 10, "r": 4, "c": 1, "a": 0.8},
	    {"x": -60, "y": 20, "r": 4, "c": 1, "a": 0.8},
	    {"x": -60, "y": 30, "r": 4, "c": 1, "a": 0.8},
	    {"x": -50, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": -40, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": -80, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": -80, "y": -20, "r": 4, "c": 1, "a": 0.8},
	    {"x": -80, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": -80, "y": -10, "r": 4, "c": 1, "a": 0.8},
	    {"x": -80, "y": 10, "r": 4, "c": 1, "a": 0.8},
	    {"x": -80, "y": 20, "r": 4, "c": 1, "a": 0.8},
	    {"x": -80, "y": 30, "r": 4, "c": 1, "a": 0.8},
	    {"x": -90, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": -100, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": -110, "y": 0, "r": 4, "c": 1, "a": 0.8},
	    {"x": -110, "y": -10, "r": 4, "c": 1, "a": 0.8},
	    {"x": -110, "y": -20, "r": 4, "c": 1, "a": 0.8},
	    {"x": -110, "y": -30, "r": 4, "c": 1, "a": 0.8},
	    {"x": -110, "y": 10, "r": 4, "c": 1, "a": 0.8},
	    {"x": -110, "y": 20, "r": 4, "c": 1, "a": 0.8},
	    {"x": -110, "y": 30, "r": 4, "c": 1, "a": 0.8}
	  ]
  },
  {
	  "name": "StarBurst",
	  "creator": "DouG",
	  "duration": 1,
	  "power": "Power1",
	  "ease": "easeOut",
	  "particles":
	  [
	    {"x": -1, "y": -117, "r": 15, "c": 1, "a": 0.8},
	    {"x": 99, "y": -50, "r": 15, "c": 1, "a": 0.8},
	    {"x": -100, "y": -45, "r": 15, "c": 1, "a": 0.8},
	    {"x": -73, "y": 100, "r": 15, "c": 1, "a": 0.8},
	    {"x": 76, "y": 102, "r": 15, "c": 1, "a": 0.8},
	    {"x": -13, "y": 14, "r": 5, "c": 1, "a": 0.5},
	    {"x": -26, "y": 30, "r": 5, "c": 1, "a": 0.5},
	    {"x": -38, "y": 46, "r": 5, "c": 1, "a": 0.5},
	    {"x": -53, "y": 65, "r": 5, "c": 1, "a": 0.5},
	    {"x": -62, "y": 79, "r": 5, "c": 1, "a": 0.5},
	    {"x": 15, "y": 10, "r": 5, "c": 1, "a": 0.5},
	    {"x": 36, "y": 34, "r": 5, "c": 1, "a": 0.5},
	    {"x": 46, "y": 51, "r": 5, "c": 1, "a": 0.5},
	    {"x": 62, "y": 71, "r": 5, "c": 1, "a": 0.5},
	    {"x": 14, "y": -12, "r": 5, "c": 1, "a": 0.5},
	    {"x": 42, "y": -32, "r": 5, "c": 1, "a": 0.5},
	    {"x": 60, "y": -40, "r": 5, "c": 1, "a": 0.5},
	    {"x": 75, "y": -46, "r": 5, "c": 1, "a": 0.5},
	    {"x": -1, "y": -94, "r": 5, "c": 1, "a": 0.5},
	    {"x": 2, "y": -73, "r": 5, "c": 1, "a": 0.5},
	    {"x": 2, "y": -59, "r": 5, "c": 1, "a": 0.5},
	    {"x": 3, "y": -30, "r": 5, "c": 1, "a": 0.5},
	    {"x": 3, "y": -15, "r": 5, "c": 1, "a": 0.5},
	    {"x": -13, "y": -5, "r": 5, "c": 1, "a": 0.5},
	    {"x": -31, "y": -12, "r": 5, "c": 1, "a": 0.5},
	    {"x": -44, "y": -20, "r": 5, "c": 1, "a": 0.5},
	    {"x": -59, "y": -28, "r": 5, "c": 1, "a": 0.5},
	    {"x": -70, "y": -30, "r": 5, "c": 1, "a": 0.5}
	  ]
	}
];