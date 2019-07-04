import * as unic from "wasm-unic";

function get_version_string(version) {
  return version.major + "." + version.minor + "." + version.micro;
}

function get_category_string(category) {
  return category.get_human_readable_name() + "(" + category.get_abbreviation() + ")";
}

console.log(">>>>> Unicode Version: " + get_version_string(unic.get_unicode_version()) + " <<<<<");

var button = document.getElementById("button");
var outputNode = document.getElementById("output");
var inputNode = document.getElementById("char-input");
button.addEventListener("click", () => {
  var userInput = inputNode.value;
  unic.get_segmented_scalars(userInput).forEach((value) => {
    if (value < 0) {
      // This is a separator
      console.log("======= End of Grapheme Cluster =======");
      console.log("");
    } else {
      // This is a code point
      var character = unic.get_character_from_code_point(value);
      outputValue = "================== " + character + " ==================";
      outputValue += "\n      Code Point : U+" + unic.get_code_point(character).toString(16).toUpperCase();
      outputValue += "\n            Name : " + unic.get_name(character);
      outputValue += "\n             Age : Unicode " + get_version_string(unic.get_age(character));
      outputValue += "\nGeneral Category : " + get_category_string(unic.get_general_category(character));
      outputValue += "\n==================================================";
      console.log(outputValue)
      pNode = document.createElement("p")
      p.innerHTML = outputValue
      outputNode.appendChild(pNode)
    }
  });
});
