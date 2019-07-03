#![warn(clippy::all)]

use unic::ucd::{age::Age, name::Name, version};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Default)]
pub struct Version {
    pub major: u16,
    pub minor: u16,
    pub micro: u16,
}

impl Version {
    fn new(version: version::UnicodeVersion) -> Self {
        Version {
            major: version.major,
            minor: version.minor,
            micro: version.micro,
        }
    }
}

#[wasm_bindgen]
pub fn get_unicode_version() -> Version {
    Version::new(version::UNICODE_VERSION)
}

#[wasm_bindgen]
pub fn get_name(chr: char) -> String {
    Name::of(chr)
        .map(|n| n.to_string())
        .unwrap_or_else(|| "<none>".to_owned())
}

#[wasm_bindgen]
pub fn get_age(chr: char) -> Version {
    Age::of(chr)
        .map(|age| Version::new(age.actual()))
        .unwrap_or_default()
}
