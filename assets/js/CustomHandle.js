let svgAlt = document.getElementById("parent-svg-alt");
let svg = document.getElementById("parent-svg");
let textInput = document.getElementById("preview-text-input");
let decalChoice = document.getElementById("decal-icon-chooser");
let fontOptions = document.getElementById("font-choice");
let colorBtns = document.querySelectorAll(".color-button span");

window.onload = function() {
  changeWidth();
  getFont();
};

textInput.addEventListener("keyup", function() {
  let numChar = document.getElementById("preview-text-input").value.length;
  let displayText = document.getElementById("custom-text");
  let displayTextAlt = document.getElementById("custom-text-alt");

  text = this.value;

  displayTextAlt.innerHTML = text;
  displayText.innerHTML = text;
  changeWidth();
});

decalChoice.addEventListener("change", function() {
  let displaySVG = document.getElementById("display-svg");
  let displaySVGAlt = document.getElementById("display-svg-alt");
  let useIcon = document.querySelectorAll(".use-icon");
  let icon = "icon-";
  icon += this.options[this.selectedIndex].text;
  displaySVG.className = icon;
  for (let i = 0; i < useIcon.length; i++) {
    useIcon[i].setAttribute("xlink:href", "#" + icon);
    console.log(useIcon[i]);
  }
});

fontOptions.addEventListener("change", function() {
  getFont();
  changeWidth();
});

for (const colorBtn of colorBtns) {
  colorBtn.addEventListener("click", function() {
    let bgColor = window.getComputedStyle(this, null).getPropertyValue("background-color");
    let cleanColor = bgColor.split("(")[1].split(")")[0];
    cleanColor = cleanColor.split(",");
    var hex = cleanColor.map(function(x) {
      //For each array element
      x = parseInt(x).toString(16); //Convert to a base16 string
      return x.length == 1 ? "0" + x : x; //Add zero if we get only one character
    });
    hex = "#" + hex.join("");
    console.log(hex);
    let id = "fill: " + hex;

    svg.setAttribute("style", id);
  });
}
function toHex(int) {
  var hex = int.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function getFont() {
  let fontChoice = document.getElementById("font-choice");
  let id = "font-family: " + fontChoice.options[fontChoice.selectedIndex].text;

  document.querySelector("#custom-text-alt").setAttribute("style", id);
  changeWidth();
  document.querySelector("#custom-text").setAttribute("style", id);
  changeWidth();
}

function changeWidth() {
  //get container width
  let maxWidth = document.querySelector(".preview-display").offsetWidth;
  let scaleSVG = document.getElementById("display-svg");
  svgAlt = document.getElementById("display-svg-alt");
  //console.log(maxWidth);
  //get bbox
  let bboxAlt = svgAlt.getBBox();
  //console.log(bbox);
  scaleSVG.setAttribute("viewBox", "0" + " " + "0" + " " + bboxAlt.width + " " + "100");
}
