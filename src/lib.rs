#![warn(clippy::all)]

use unic::{
    char::property::EnumeratedCharProperty,
    segment::Graphemes,
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

// We need to have a special value acting as the separator because wasm-bindgen doesn't support
// two-dimentional vector as return values
const GRAPHEME_SEPARATOR_VALUE: i32 = -1;

///
/// Get segmented Unicode scalars of a string with each segmentation representing a Unicode
/// grapheme cluster.
///
/// Returns a list of 32-bit signed integers where:
/// - Integers equal or greater than 0 represent a code point of a Unicode character
/// - Integers less than 0 are separators of the segmentations
///
#[wasm_bindgen]
pub fn get_segmented_scalars(string: &str) -> Vec<i32> {
    let mut scalars = vec![];
    {
        Graphemes::new(string).for_each(|grapheme| {
            grapheme.chars().for_each(|scalar| {
                scalars.push(scalar as i32);
            });
            scalars.push(GRAPHEME_SEPARATOR_VALUE);
        });
    }
    scalars
}

///
/// Convert a Unicode code point to a character.
/// If the code point is invalid, U+FFFD is returned.
///
#[wasm_bindgen]
pub fn get_character_from_code_point(code_point: u32) -> char {
    std::char::from_u32(code_point).unwrap_or_else(|| std::char::from_u32(0xFFFD).unwrap())
}

#[wasm_bindgen]
pub fn get_code_point(chr: char) -> u32 {
    chr as u32
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
