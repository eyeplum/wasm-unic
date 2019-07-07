import * as unic from "wasm-unic";
const runes = require('runes');

function get_version_string(version) {
  return version.major + "." + version.minor + "." + version.micro;
}

function get_category_string(category) {
  return category.get_human_readable_name() + "(" + category.get_abbreviation() + ")";
}

console.log(">>>>> Unicode Version: " + get_version_string(unic.get_unicode_version()) + " <<<<<");

function printCharacterResultInNode(character) {
  var outputValue = "================== " + character + " ==================";
  outputValue += "\n      Code Point : U+" + unic.get_code_point(character).toString(16).toUpperCase();
  outputValue += "\n            Name : " + unic.get_name(character);
  outputValue += "\n             Age : Unicode " + get_version_string(unic.get_age(character));
  outputValue += "\nGeneral Category : " + get_category_string(unic.get_general_category(character));
  outputValue += "\n==================================================";
  console.log(outputValue);

  var trNode = document.createElement("tr");
  var codeNode = document.createElement("td");
  codeNode.innerHTML = "U+" + unic.get_code_point(character).toString(16).toUpperCase();
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
  var tableNode = document.createElement("table");
  unic.get_segmented_scalars(char).forEach((value) => {
    if (value < 0) {
      // This is a separator
      console.log("======= End of Grapheme Cluster =======");
      console.log("");
    } else {
      var character = unic.get_character_from_code_point(value);
      tableNode.appendChild(printCharacterResultInNode(character));
    }
  });
  return tableNode;
}

var button = document.getElementById("button");
var outputNode = document.getElementById("output");
var inputNode = document.getElementById("char-input");
button.addEventListener("click", () => {
  outputNode.innerHTML = "";
  var userInput = inputNode.value.trim();
  runes(userInput).forEach((char) => { 
    var tableNode = printResultsForOneQueyChar(char);
    var charNode = document.createElement("p");
    charNode.innerHTML = char;
    charNode.className = "char";
    outputNode.appendChild(charNode);
    outputNode.appendChild(tableNode);
  });
});
