import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from "./sidebar";

export const metadata: Metadata = {
  title: "AgentCloud",
  description: "AgentCloud dashboard starter",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Providers>
          <div className="ac-shell md:flex">
            <Sidebar />
            <main className="ac-main">
              <div className="ac-content">{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
