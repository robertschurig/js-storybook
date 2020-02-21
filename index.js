// Import stylesheets
import "./style.css";

(function(w) {
  var tID;
  var ePosX = document.getElementById("posX");
  var ePosY = document.getElementById("posY");
  var eLog = document.getElementById("log");

  /// config ----------
  // the storybook-image from the playout is protected
  // by an hmac-token, so we take a public image
  var spriteUrl =
    "https://github.com/mi-rsc/storybook-assets/blob/master/storybook.jpeg?raw=true";
  var spritesPerRow = 10;
  var dimension = {
    width: 176,
    height: 100
  };
  
  var intervalSpeed = 60 * 2.5;
  var maxSprites = Math.pow(spritesPerRow, 2);
  var everyNTHSprite = 2;
  /// -----------------

  var init = function() {
    var storyBook = document.createElement("div");
    storyBook.setAttribute("id", "storyBook");
    storyBook.setAttribute(
      "style",
      `
      background-image: url("${spriteUrl}");
      width: ${dimension.width}px;
      height: ${dimension.height}px;
      `
    );

    storyBook.addEventListener("mouseover", () => startAnimation());
    storyBook.addEventListener("mouseout", () => stopAnimation());

    var demo = document.getElementById("demo");
    demo.appendChild(storyBook);
  };

  init();

  var stopAnimation = function() {
    clearInterval(tID);
  };

  var maskImage = function(img, pos, dimension) {
    var x = -pos.x * dimension.width;
    var y = -pos.y * dimension.height;

    img.style.backgroundPosition = `${x}px ${y}px`;
  };

  var calculatePositions = function() {
    var positions = [];

    for (var i = 0; i < maxSprites; i++) {
      if (i % everyNTHSprite === everyNTHSprite - 1) {
        var x = Math.floor(i % spritesPerRow);
        var y = Math.floor(i / spritesPerRow);

        positions.push({ x, y });
      }
    }

    return positions;
  };

  var startAnimation = function() {
    var img = document.getElementById("storyBook");
    var positions = calculatePositions();

    console.log("positions: ", positions);

    var index = 0;
    tID = setInterval(() => {
      var pos = positions[index];

      ePosX.innerHTML = pos.x;
      ePosY.innerHTML = pos.y;
      eLog.innerHTML = index;

      maskImage(img, pos, dimension);

      index++;

      if (index >= positions.length) {
        index = 0;
      }
    }, intervalSpeed);
  };

  w.startAnimation = startAnimation;
  w.stopAnimation = stopAnimation;
})(window);
