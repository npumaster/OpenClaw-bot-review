import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const OPENCLAW_HOME = process.env.OPENCLAW_HOME || path.join(process.env.HOME || "", ".openclaw");
const CONFIG_PATH = path.join(OPENCLAW_HOME, "openclaw.json");
const DEGRADED_LATENCY_MS = 1500;

export async function GET() {
  const startedAt = Date.now();
  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    const config = JSON.parse(raw);
    const port = config.gateway?.port || 18789;
    const token = config.gateway?.auth?.token || "";

    const url = `http://localhost:${port}/api/health`;
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const resp = await fetch(url, { headers, signal: controller.signal });
    clearTimeout(timeout);
    const checkedAt = Date.now();
    const responseMs = checkedAt - startedAt;

    if (!resp.ok) {
      return NextResponse.json({
        ok: false,
        error: `HTTP ${resp.status}`,
        status: "down",
        checkedAt,
        responseMs,
      });
    }

    const data = await resp.json().catch(() => null);
    return NextResponse.json({
      ok: true,
      data,
      status: responseMs > DEGRADED_LATENCY_MS ? "degraded" : "healthy",
      checkedAt,
      responseMs,
      webUrl: `http://localhost:${port}/chat${token ? '?token=' + encodeURIComponent(token) : ''}`,
    });
  } catch (err: any) {
    const checkedAt = Date.now();
    const responseMs = checkedAt - startedAt;
    const msg = err.cause?.code === "ECONNREFUSED"
      ? "Gateway 未运行"
      : err.name === "AbortError"
        ? "请求超时"
        : err.message;
    return NextResponse.json({
      ok: false,
      error: msg,
      status: "down",
      checkedAt,
      responseMs,
    });
  }
}
