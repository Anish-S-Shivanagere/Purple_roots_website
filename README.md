# Violet Roots website

A small static storefront for Violet Roots, with a Convex backend for order requests.

## Project layout

- `index.html` - home and contact pages
- `assets/css/styles.css` - site styles
- `assets/js/main.js` - navigation, order form, WhatsApp links, and hero text animation
- `assets/images/` - product photos
- `assets/videos/video-main.mp4` - muted looping home page hero video
- `convex/` - Convex HTTP handler, schema, and request functions

## Customer enquiries and email

Submitting the enquiry form stores the customer's name, phone number, order details, item, and submission time in the Convex `requests` table. Each row has a `status` value initialized to `new`. Review submissions from the Convex dashboard's Data view. The database insert is internal, so the site does not expose a public query that returns customer contact details.

The Convex backend also emails every enquiry to `anishsshivanagere@gmail.com` through Resend. Configure `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in the Convex deployment's environment settings. The sender address must belong to a domain verified with Resend. Set the variables for both the development deployment and production deployment, then deploy the Convex functions. Keep the Resend API key in Convex; it is never sent to the browser.

The site is configured for deployment `https://exuberant-manatee-960.convex.cloud`. Its HTTP form endpoint is automatically built using the matching `.convex.site` host at `/request`.

Run `npm install` to install the Convex server library. Then run `npx convex dev` from this folder and select the existing Convex project when prompted. This generates the `_generated` files and syncs the backend to its development deployment. Once the changes are ready for the live site, run `npx convex deploy` for the project's production deployment. The form stores and emails submissions after the HTTP action, email action, schema, and Resend environment variables have been configured on the deployment.

Open `index.html` directly or serve the project folder with a static web server. The hero video path is relative to `index.html`.
