"use client";

import { useI18n } from "@/lib/i18n";

export default function SettingsPage() {
  const { t } = useI18n();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold ac-title">{t("settingsTitle")}</h1>
      <div className="ac-panel p-5 ac-muted">
        这里是设置页面占位，可扩展主题、权限、通知等配置能力。
      </div>
      <div className="ac-panel p-5">
        <div className="text-sm ac-muted mb-2">界面偏好</div>
        <div className="flex gap-2">
          <span className="ac-chip">主题</span>
          <span className="ac-chip">语言</span>
          <span className="ac-chip">布局</span>
        </div>
      </div>
    </section>
  );
}
