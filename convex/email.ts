"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";

const enquiryInbox = "anishsshivanagere@gmail.com";

export const sendEnquiryEmail = internalAction({
  args: {
    name: v.string(),
    phone: v.string(),
    details: v.string(),
  },
  handler: async (_ctx, { name, phone, details }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !from) {
      throw new Error("Enquiry email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL.");
    }

    const safeName = name.replace(/[\r\n]+/g, " ").slice(0, 80);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [enquiryInbox],
        subject: `New purple sweet potato enquiry from ${safeName}`,
        text: [
          "New purple sweet potato enquiry",
          "",
          `Name: ${safeName}`,
          `Phone: ${phone}`,
          `Order details: ${details || "No extra details provided"}`,
          `Received: ${new Date().toISOString()}`,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      throw new Error(`Email delivery failed with status ${response.status}.`);
    }
  },
});
