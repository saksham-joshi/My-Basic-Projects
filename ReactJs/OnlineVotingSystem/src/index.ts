import { join } from "node:path";
import index from "./index.html";

console.log("🛠️ Initializing Online Voting System server...");

const server = Bun.serve({
  port: 3000,
  async fetch(req: Request) {
    try {
      const url = new URL(req.url);
      const path = url.pathname;

      console.log(`[${req.method}] ${path}`);

      // 1. Serve static files from public/ folder
      if (path !== "/" && path !== "") {
        const relativePath = path.startsWith("/") ? path.slice(1) : path;

        // ✅ Use import.meta.dir instead of process.cwd()
        const publicPath = join(import.meta.dir, "public", relativePath);
        const publicFile = Bun.file(publicPath);

        console.log("Attempting to serve:", publicPath);

        if (await publicFile.exists()) {
          return new Response(publicFile, {
            headers: {
              // ✅ Explicitly set Content-Type for images
              "Content-Type": publicFile.type || "application/octet-stream",
            },
          });
        }
      }

      // 2. Fallback to 'routes' (SPA entry point)
      return undefined;
    } catch (err: any) {
      console.error("Critical Server Error:", err);
      return new Response(`Server error occurred: ${err.message}`, {
        status: 500,
      });
    }
  },

  routes: {
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production",
} as any);

console.log(`🚀 Online Voting System running at ${server.url}`);