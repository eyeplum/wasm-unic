#![warn(clippy::all)]

use unic::ucd::{name::Name, version::UNICODE_VERSION};
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

#[wasm_bindgen]
pub fn get_unicode_name(chr: char) -> String {
    Name::of(chr)
        .map(|n| n.to_string())
        .unwrap_or_else(|| "<none>".to_owned())
}
