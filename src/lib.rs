#![warn(clippy::all)]

use unic::{
    char::property::EnumeratedCharProperty,
    ucd::{age::Age, category, name::Name, version},
};
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
pub struct GeneralCategory {
    internal: category::GeneralCategory,
}

#[wasm_bindgen]
impl GeneralCategory {
    pub fn get_human_readable_name(&self) -> String {
        self.internal.human_name().to_owned()
    }

    pub fn get_abbreviation(&self) -> String {
        self.internal.abbr_name().to_owned()
    }
}

impl GeneralCategory {
    fn new(internal: category::GeneralCategory) -> Self {
        GeneralCategory { internal }
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

#[wasm_bindgen]
pub fn get_general_category(chr: char) -> GeneralCategory {
    GeneralCategory::new(category::GeneralCategory::of(chr))
}
