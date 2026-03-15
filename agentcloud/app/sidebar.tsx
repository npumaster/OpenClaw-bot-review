"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher, useI18n } from "@/lib/i18n";
import { ThemeSwitcher } from "@/lib/theme";

type NavKey = "navHome" | "navHosts" | "navFinance" | "navAgents" | "navSkills" | "navSettings";
type NavGroupKey = "navOverview" | "navSkillsLib" | "navConfig";

const navGroups: Array<{ group: NavGroupKey; items: Array<{ href: string; key: NavKey; icon: string }> }> = [
  {
    group: "navOverview",
    items: [
      { href: "/", key: "navHome", icon: "🏠" },
      { href: "/hosts", key: "navHosts", icon: "🖥️" },
      { href: "/agents", key: "navAgents", icon: "🤖" },
      { href: "/finance", key: "navFinance", icon: "💰" },
    ],
  },
  {
    group: "navSkillsLib",
    items: [{ href: "/skills", key: "navSkills", icon: "🧩" }],
  },
  {
    group: "navConfig",
    items: [{ href: "/settings", key: "navSettings", icon: "⚙️" }],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className="md:hidden border-b border-[var(--border)] bg-[var(--card)]/90 backdrop-blur px-3 py-2 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl leading-none">☁️</span>
            <div>
              <div className="text-sm font-bold tracking-wide">{t("appName")}</div>
              <div className="text-[10px] uppercase tracking-wider ac-muted">{t("appSubtitle")}</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1 overflow-x-auto pb-0.5">
          {navGroups.flatMap((group) => group.items).map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs border ${
                  active
                    ? "border-[var(--accent)]/70 bg-[var(--accent)]/16 text-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--text-muted)]"
                }`}
              >
                {item.icon} {t(item.key)}
              </Link>
            );
          })}
        </div>
      </div>

      <aside className="sidebar hidden md:flex" style={{ width: collapsed ? 72 : 228 }}>
        <div className="border-b border-[var(--border)]" style={{ padding: collapsed ? "16px 0" : "16px 16px" }}>
          {collapsed ? (
            <div className="flex flex-col items-center gap-2">
              <Link href="/" className="text-[34px] leading-none">☁️</Link>
              <button
                onClick={() => setCollapsed(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors text-lg"
                title={t("expandSidebar")}
              >
                »
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-[34px] leading-none">☁️</span>
                  <div>
                    <div className="text-sm font-bold tracking-wide">{t("appName")}</div>
                    <div className="text-[10px] uppercase tracking-wider ac-muted">{t("appSubtitle")}</div>
                  </div>
                </Link>
                <button
                  onClick={() => setCollapsed(true)}
                  className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors text-lg"
                  title={t("collapseSidebar")}
                >
                  «
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3 pl-8">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </div>
          )}
        </div>

        <nav className="sidebar-nav" style={{ padding: collapsed ? "14px 8px" : "14px 10px" }}>
          <div className="space-y-5">
            {navGroups.map((group) => (
              <div key={group.group}>
                {!collapsed && (
                  <div className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider ac-muted flex items-center justify-between">
                    {t(group.group)}
                    <span className="opacity-40">—</span>
                  </div>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={collapsed ? t(item.key) : undefined}
                        className={`flex items-center rounded-lg text-sm transition-colors ${
                          active
                            ? "bg-[var(--accent)]/16 text-[var(--accent)] font-medium"
                            : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]"
                        }`}
                        style={{
                          padding: collapsed ? "8px 0" : "8px 12px",
                          justifyContent: collapsed ? "center" : "flex-start",
                          gap: collapsed ? 0 : 10,
                        }}
                      >
                        <span>{item.icon}</span>
                        {!collapsed && t(item.key)}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      <div className="hidden md:block" style={{ width: collapsed ? 72 : 228, flexShrink: 0, transition: "width 0.2s" }} />
    </>
  );
}
