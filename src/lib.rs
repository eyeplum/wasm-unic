use unic::ucd::version::UNICODE_VERSION;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn unicode_version_major() -> u16 {
    UNICODE_VERSION.major
}

#[wasm_bindgen]
pub fn unicode_version_minor() -> u16 {
    UNICODE_VERSION.minor
}

#[wasm_bindgen]
pub fn unicode_version_micro() -> u16 {
    UNICODE_VERSION.micro
}
