"use client";

import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <section className="space-y-5">
      <div className="ac-panel p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl md:text-2xl font-semibold ac-title">{t("homeTitle")}</h1>
          <span className="ac-chip">v0.1</span>
        </div>
        <p className="ac-muted mt-2">{t("homeDesc")}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="ac-panel p-5">
          <div className="text-sm ac-muted">Status</div>
          <div className="text-lg mt-1 font-medium text-[var(--success)]">Ready</div>
          <div className="ac-muted text-sm mt-2">基础框架、主题与路由已就绪。</div>
        </div>
        <div className="ac-panel p-5">
          <div className="text-sm ac-muted">Mode</div>
          <div className="text-lg mt-1 font-medium text-[var(--accent)]">Template A</div>
          <div className="ac-muted text-sm mt-2">可按业务模块逐步接入后端能力。</div>
        </div>
      </div>
    </section>
  );
}
