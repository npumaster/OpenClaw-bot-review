"use client";

import { useI18n } from "@/lib/i18n";

const hosts = [
  { name: "host-prod-01", cpu: 32, memory: "128 GB", disk: "2 TB SSD" },
  { name: "host-stage-01", cpu: 16, memory: "64 GB", disk: "1 TB SSD" },
  { name: "host-dev-01", cpu: 8, memory: "32 GB", disk: "512 GB SSD" },
  { name: "host-ci-01", cpu: 12, memory: "48 GB", disk: "1 TB SSD" },
];

export default function HostsPage() {
  const { t } = useI18n();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold ac-title">{t("hostsTitle")}</h1>
      <div className="ac-panel p-5 ac-muted">{t("hostsDesc")}</div>
      <div className="ac-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-soft)]/65">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">{t("hostName")}</th>
                <th className="px-4 py-3 font-semibold">{t("hostCpu")}</th>
                <th className="px-4 py-3 font-semibold">{t("hostMemory")}</th>
                <th className="px-4 py-3 font-semibold">{t("hostDisk")}</th>
              </tr>
            </thead>
            <tbody>
              {hosts.map((host) => (
                <tr key={host.name} className="border-t border-[var(--border)]">
                  <td className="px-4 py-3 font-medium">{host.name}</td>
                  <td className="px-4 py-3">{host.cpu}</td>
                  <td className="px-4 py-3">{host.memory}</td>
                  <td className="px-4 py-3">{host.disk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
