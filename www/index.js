import * as unic from "wasm-unic";

if (process.env.NODE_ENV === 'production') {
  console.log('Running in Production mode.');
}

function get_version_string(version) {
  return version.major + "." + version.minor + "." + version.micro;
}

function get_category_string(category) {
  return category.get_human_readable_name() + "(" + category.get_abbreviation() + ")";
}

function get_code_point_string(code_point) {
  var hex_str = code_point.toString(16);
  if (hex_str.length < 4) {
    var num_of_paddings = 4 - hex_str.length;
    hex_str = "0".repeat(num_of_paddings) + hex_str;
  }
  return "U+" + hex_str.toUpperCase();
}

console.log(">>>>> Unicode Version: " + get_version_string(unic.get_unicode_version()) + " <<<<<");

function printCharacterResultInNode(character) {
  var outputValue = "================== " + character + " ==================";
  outputValue += "\n      Code Point : " + get_code_point_string(unic.get_code_point(character));
  outputValue += "\n            Name : " + unic.get_name(character);
  outputValue += "\n             Age : Unicode " + get_version_string(unic.get_age(character));
  outputValue += "\nGeneral Category : " + get_category_string(unic.get_general_category(character));
  console.log(outputValue);

  var trNode = document.createElement("tr");
  var codeNode = document.createElement("td");
  var codePointStr = get_code_point_string(unic.get_code_point(character));
  codeNode.innerHTML = "<a href=\"https://www.compart.com/en/unicode/"
    + codePointStr 
    + "\" target=\"_blank\">" 
    + codePointStr
    + "</a>";
  codeNode.align = "right";
  trNode.appendChild(codeNode);
  var cNode = document.createElement("td");
  var cPNode = document.createElement("p");
  cNode.align = "center";
  cPNode.className = "unic";
  cPNode.innerHTML = character;
  cNode.appendChild(cPNode);
  trNode.appendChild(cNode);
  var nameNode = document.createElement("td");
  nameNode.innerHTML = unic.get_name(character);
  nameNode.align = "left";
  trNode.appendChild(nameNode);
  return trNode;
}

function printResultsForOneQueyChar(char) {
  return tableNode;
}

var versionLabel = document.getElementById("version");
versionLabel.textContent = "Unicode Version " + get_version_string(unic.get_unicode_version());

var button = document.getElementById("button");
var outputNode = document.getElementById("output");
var inputNode = document.getElementById("char-input");
button.addEventListener("click", () => {
  outputNode.innerHTML = "";
  var userInput = inputNode.value;
  var iteratingChar = "";
  var tableNode = document.createElement("table");
  var scalars = unic.get_segmented_scalars(userInput);
  scalars.forEach((code_point) => {
    if (code_point >= 0) {
      // This is a code point
      var character = unic.get_character_from_code_point(code_point);
      iteratingChar += character;
      tableNode.appendChild(printCharacterResultInNode(character));
    } else {
      // This is a grapheme cluster separator
      var charNode = document.createElement("p");
      charNode.innerHTML = "▼ " + iteratingChar;
      charNode.className = "char";
      outputNode.appendChild(charNode);
      iteratingChar = "";

      outputNode.appendChild(tableNode);
      tableNode = document.createElement("table");
      console.log("======= End of Grapheme Cluster =======");
      console.log("");
    }
  });
});
