//! Field names shared with the existing HubSpot form.
pub fn fields(email: &str, company: &str, use_case: &str, source: &str) -> Vec<serde_json::Value> {
    [("email", email), ("company", company), ("primary_use_case", use_case), ("source", source)]
        .into_iter()
        .filter(|(_, value)| !value.trim().is_empty())
        .map(|(name, value)| serde_json::json!({ "objectTypeId": "0-1", "name": name, "value": value.trim() }))
        .collect()
}
