

// Calculate the skyscraper dimensions
function skyline() {
  $(".backdrop").each(function(i){
    var width = Math.floor((Math.random()*8) + 1) + "%";

    // On mobile devices draw smaller skyscrapers
    if (window.matchMedia("(min-width: 768px)").matches) {
      var height = Math.floor((Math.random() * 30) + 1) + "%";
    } else {
        var height = Math.floor((Math.random() * 20) + 1) + "%";
    }

    var left = 0.0 + i*2.5 + "%";

    $(this).css({
      "width" : width,
      "height" : height,
      "left" : left
    });
  });
}

// Generate "skyscraper" div's
$(document).ready(function() {
  var string = "";
  for (var i = 0; i < 40; i++) {
    string += "<div class='backdrop'></div>";
  }
  $("#main").html(string);
  skyline();
});
