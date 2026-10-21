#[path = "../src/contact_fields.rs"]
mod contact_fields;

#[test]
fn matches_the_existing_hubspot_fields() {
    let fields = contact_fields::fields(
        " person@example.com ",
        "Example",
        "iot_embed",
        "enterprise-hero",
    );
    assert_eq!(
        fields,
        serde_json::json!([
            {"objectTypeId":"0-1", "name":"email", "value":"person@example.com"},
            {"objectTypeId":"0-1", "name":"company", "value":"Example"},
            {"objectTypeId":"0-1", "name":"primary_use_case", "value":"iot_embed"},
            {"objectTypeId":"0-1", "name":"source", "value":"enterprise-hero"}
        ])
        .as_array()
        .unwrap()
        .clone()
    );
}

#[test]
fn omits_empty_optional_fields_and_preserves_user_text() {
    let fields = contact_fields::fields("person@example.com", "  ", "", "");
    assert_eq!(fields.len(), 1);
    let company = "A \"company\" & </script>";
    let serialized = serde_json::to_string(&contact_fields::fields(
        "person@example.com",
        company,
        "other",
        "pricing",
    ))
    .unwrap();
    let round_trip: Vec<serde_json::Value> = serde_json::from_str(&serialized).unwrap();
    assert_eq!(round_trip[1]["value"], company);
}
