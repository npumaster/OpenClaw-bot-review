"use client";

import { useI18n } from "@/lib/i18n";

const purchases = [
  {
    orderId: "PO-2026-0001",
    hostName: "host-prod-01",
    cpu: 32,
    memory: "128 GB",
    disk: "2 TB SSD",
    amount: "¥48,000",
    date: "2026-02-10",
    status: "已交付",
  },
  {
    orderId: "PO-2026-0002",
    hostName: "host-prod-02",
    cpu: 32,
    memory: "128 GB",
    disk: "2 TB SSD",
    amount: "¥48,000",
    date: "2026-02-18",
    status: "已交付",
  },
  {
    orderId: "PO-2026-0003",
    hostName: "host-stage-02",
    cpu: 16,
    memory: "64 GB",
    disk: "1 TB SSD",
    amount: "¥22,000",
    date: "2026-03-02",
    status: "采购中",
  },
];

export default function FinancePage() {
  const { t } = useI18n();

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold ac-title">{t("financeTitle")}</h1>
      <div className="ac-panel p-5 ac-muted">{t("financeDesc")}</div>
      <div className="ac-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-soft)]/65">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">{t("financeOrder")}</th>
                <th className="px-4 py-3 font-semibold">{t("hostName")}</th>
                <th className="px-4 py-3 font-semibold">{t("hostCpu")}</th>
                <th className="px-4 py-3 font-semibold">{t("hostMemory")}</th>
                <th className="px-4 py-3 font-semibold">{t("hostDisk")}</th>
                <th className="px-4 py-3 font-semibold">{t("financeAmount")}</th>
                <th className="px-4 py-3 font-semibold">{t("financeDate")}</th>
                <th className="px-4 py-3 font-semibold">{t("financeStatus")}</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((item) => (
                <tr key={item.orderId} className="border-t border-[var(--border)]">
                  <td className="px-4 py-3 font-medium">{item.orderId}</td>
                  <td className="px-4 py-3">{item.hostName}</td>
                  <td className="px-4 py-3">{item.cpu}</td>
                  <td className="px-4 py-3">{item.memory}</td>
                  <td className="px-4 py-3">{item.disk}</td>
                  <td className="px-4 py-3">{item.amount}</td>
                  <td className="px-4 py-3">{item.date}</td>
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
