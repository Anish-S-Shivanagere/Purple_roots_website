import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

// Replace * with your website's address (e.g. https://violetroots.in) once it is live
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

http.route({
  path: "/request",
  method: "OPTIONS",
  handler: httpAction(async () => new Response(null, { status: 204, headers: cors })),
});

http.route({
  path: "/request",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const { name, phone, item } = await req.json();
    if (!name || !phone || String(phone).replace(/\D/g, "").length < 10) {
      return new Response("Invalid input", { status: 400, headers: cors });
    }
    await ctx.runMutation(internal.requests.add, {
      name: String(name).slice(0, 80),
      phone: String(phone).slice(0, 20),
      item: String(item ?? "").slice(0, 80),
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }),
});

export default http;
