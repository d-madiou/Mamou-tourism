import fs from "node:fs";
import path from "node:path";

const baseUrl = "https://villedemamou.org";
const today = new Date().toISOString().split("T")[0];

const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/tourism", changefreq: "weekly", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/education", changefreq: "weekly", priority: "0.8" },
  { path: "/articles", changefreq: "daily", priority: "0.8" },
  { path: "/sport", changefreq: "weekly", priority: "0.8" },
  { path: "/mairie", changefreq: "weekly", priority: "0.7" },
  { path: "/administration", changefreq: "weekly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/nourriture", changefreq: "weekly", priority: "0.7" },
  { path: "/hotel", changefreq: "weekly", priority: "0.7" },
  { path: "/place", changefreq: "weekly", priority: "0.7" },
  { path: "/activitepopulaire", changefreq: "weekly", priority: "0.7" },
  { path: "/cultures", changefreq: "weekly", priority: "0.7" },
  { path: "/galerie", changefreq: "weekly", priority: "0.7" },
  { path: "/police", changefreq: "monthly", priority: "0.6" },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ path: routePath, changefreq, priority }) => `  <url>
    <loc>${baseUrl}${routePath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const outputPath = path.resolve("public", "sitemap.xml");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, xml, "utf8");

console.log(`Sitemap generated at ${outputPath}`);
