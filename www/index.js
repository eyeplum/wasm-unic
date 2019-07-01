import * as wasm from "wasm-unic";

alert("Unicode Version: " +
  wasm.unicode_version_major() + "." +
  wasm.unicode_version_minor() + "." +
  wasm.unicode_version_micro());
