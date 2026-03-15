"use client";

import { useI18n } from "@/lib/i18n";

const skills = [
  { name: "代码审查", category: "工程质量", version: "v1.2", status: "可用" },
  { name: "日志分析", category: "运维诊断", version: "v1.0", status: "可用" },
  { name: "部署编排", category: "交付发布", version: "v0.9", status: "测试中" },
];

export default function SkillsPage() {
  const { t } = useI18n();

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold ac-title">{t("navSkills")}</h1>
      <div className="ac-panel p-5 ac-muted">这里展示技能库列表，可按业务扩展为可安装技能市场。</div>
      <div className="ac-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-soft)]/65">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">技能名称</th>
                <th className="px-4 py-3 font-semibold">分类</th>
                <th className="px-4 py-3 font-semibold">版本</th>
                <th className="px-4 py-3 font-semibold">状态</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((item) => (
                <tr key={item.name} className="border-t border-[var(--border)]">
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.version}</td>
                  <td className="px-4 py-3">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
