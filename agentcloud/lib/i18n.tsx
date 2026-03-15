"use client";

import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

type Locale = "zh" | "en";

const messages = {
  zh: {
    appName: "AgentCloud",
    appSubtitle: "Control Center",
    navHome: "首页",
    navHosts: "主机",
    navFinance: "财务",
    navAgents: "智能体",
    navSettings: "设置",
    navOverview: "总览",
    navConfig: "配置",
    expandSidebar: "展开侧边栏",
    collapseSidebar: "收起侧边栏",
    homeTitle: "欢迎使用 AgentCloud",
    homeDesc: "这是基于原项目界面壳层构建的新项目模板。",
    hostsTitle: "主机列表",
    hostsDesc: "展示当前可管理主机的硬件规格信息。",
    financeTitle: "购机清单",
    financeDesc: "展示已购买主机的财务与规格信息。",
    agentsTitle: "智能体页面",
    settingsTitle: "设置页面",
    hostName: "主机名字",
    hostCpu: "CPU数量",
    hostMemory: "内存大小",
    hostDisk: "硬盘大小",
    financeOrder: "订单号",
    financeAmount: "购买金额",
    financeDate: "购买时间",
    financeStatus: "状态",
  },
  en: {
    appName: "AgentCloud",
    appSubtitle: "Control Center",
    navHome: "Home",
    navHosts: "Hosts",
    navFinance: "Finance",
    navAgents: "Agents",
    navSettings: "Settings",
    navOverview: "Overview",
    navConfig: "Config",
    expandSidebar: "Expand Sidebar",
    collapseSidebar: "Collapse Sidebar",
    homeTitle: "Welcome to AgentCloud",
    homeDesc: "This is a new project template based on the original UI shell.",
    hostsTitle: "Host List",
    hostsDesc: "Displays hardware specs for manageable hosts.",
    financeTitle: "Host Purchase List",
    financeDesc: "Displays financial and specification details of purchased hosts.",
    agentsTitle: "Agents Page",
    settingsTitle: "Settings Page",
    hostName: "Host Name",
    hostCpu: "CPU Cores",
    hostMemory: "Memory",
    hostDisk: "Disk",
    financeOrder: "Order ID",
    financeAmount: "Amount",
    financeDate: "Purchase Date",
    financeStatus: "Status",
  },
} as const;

type MsgKey = keyof typeof messages.zh;

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MsgKey) => string;
}>({
  locale: "zh",
  setLocale: () => {},
  t: (key) => messages.zh[key],
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const t = useCallback(
    (key: MsgKey) => {
      return messages[locale][key];
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <button
      onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
      className="ac-action-btn text-sm cursor-pointer"
    >
      {locale === "zh" ? "EN" : "中文"}
    </button>
  );
}
