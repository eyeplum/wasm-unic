import * as unic from "wasm-unic";

function get_version_string(version) {
  return version.major + "." + version.minor + "." + version.micro;
}

function get_category_string(category) {
  return category.get_human_readable_name() + "(" + category.get_abbreviation() + ")";
}

console.log(">>>>> Unicode Version: " + get_version_string(unic.get_unicode_version()) + " <<<<<");

var button = document.createElement("input");
button.type = "button";
button.value = "Print Unicode Name";
button.addEventListener("click", () => {
  var userInput = document.getElementById("char-input").value;
  console.log("================== Unicode Data ==================");
  console.log("            Name : " + unic.get_name(userInput));
  console.log("             Age : " + get_version_string(unic.get_age(userInput)));
  console.log("General Category : " + get_category_string(unic.get_general_category(userInput)));
  console.log("==================================================");
});
document.body.appendChild(button);
