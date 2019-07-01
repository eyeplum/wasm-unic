import * as unic from "wasm-unic";

function get_unicode_version_string() {
  return unic.unicode_version_major() + "." +
    unic.unicode_version_minor() + "." +
    unic.unicode_version_micro();
}

console.log("Unicode Version: " + get_unicode_version_string());

var button = document.createElement("input");
button.type = "button";
button.value = "Print Unicode Name";
button.addEventListener("click", () => {
  var userInput = document.getElementById("char-input").value;
  console.log(unic.get_unicode_name(userInput));
});
document.body.appendChild(button);
