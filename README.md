# Violet Roots website

A small static storefront for Violet Roots, with a Convex backend for order requests.

## Project layout

- `index.html` - home and contact pages
- `assets/css/styles.css` - site styles
- `assets/js/main.js` - navigation, order form, WhatsApp links, and hero text animation
- `assets/images/` - product photos
- `assets/videos/video-main.mp4` - muted looping home page hero video
- `convex/` - Convex HTTP handler, schema, and request functions

## Customer request storage

Submitting the order form sends the customer's name, phone number, selected item, and submission time to the Convex `requests` table. Each row also has a `status` value initialized to `new`. Review submissions from the Convex dashboard's Data view. The database insert is internal, so the site does not expose a public query that returns customer contact details.

The site is configured for deployment `https://exuberant-manatee-960.convex.cloud`. Its HTTP form endpoint is automatically built using the matching `.convex.site` host at `/request`.

Run `npm install` to install the Convex server library. Then run `npx convex dev` from this folder and select the existing Convex project when prompted. This generates the `_generated` files and syncs the backend to its development deployment. Once the changes are ready for the live site, run `npx convex deploy` for the project's production deployment. The form stores submissions after the HTTP action and schema have been deployed to the configured production project.

Open `index.html` directly or serve the project folder with a static web server. The hero video path is relative to `index.html`.
