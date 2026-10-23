## What changed?

<!-- Describe the change and how you checked it. -->

## Blog post checklist

For PRs that add or update a blog post:

- [ ] I reviewed the social card: set `social_image` in front matter, or intentionally chose a text-only preview.
- [ ] If included, the social card loads and looks good in the homepage preview and blog listing.
- [ ] Local social-card images are committed under `public/blog/<slug>/` (or the HTTPS image URL works).
- [ ] Title, description, author, date, and draft status are correct.
- [ ] Links and images work, and image descriptions are useful.
- [ ] `cargo test --test blog` passes.

<!-- For non-blog changes, mark this checklist as not applicable. -->
