"use client";

import { useI18n } from "@/lib/i18n";

export default function AgentsPage() {
  const { t } = useI18n();

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold ac-title">{t("agentsTitle")}</h1>
      <div className="ac-panel p-5 ac-muted">
        这里是智能体业务页面占位，可接入你的后端与业务卡片。
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="ac-panel p-5">
          <div className="text-sm ac-muted">在线状态</div>
          <div className="text-lg mt-1 font-medium">12 Active Agents</div>
        </div>
        <div className="ac-panel p-5">
          <div className="text-sm ac-muted">任务队列</div>
          <div className="text-lg mt-1 font-medium">36 Pending Jobs</div>
        </div>
      </div>
    </section>
  );
}
