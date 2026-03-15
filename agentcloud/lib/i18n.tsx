"use client";

import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

type Locale = "zh" | "en";

const messages = {
  zh: {
    appName: "AgentCloud",
    appSubtitle: "Control Center",
    navHome: "首页",
    navAgents: "智能体",
    navSettings: "设置",
    navOverview: "总览",
    navConfig: "配置",
    expandSidebar: "展开侧边栏",
    collapseSidebar: "收起侧边栏",
    homeTitle: "欢迎使用 AgentCloud",
    homeDesc: "这是基于原项目界面壳层构建的新项目模板。",
    agentsTitle: "智能体页面",
    settingsTitle: "设置页面",
  },
  en: {
    appName: "AgentCloud",
    appSubtitle: "Control Center",
    navHome: "Home",
    navAgents: "Agents",
    navSettings: "Settings",
    navOverview: "Overview",
    navConfig: "Config",
    expandSidebar: "Expand Sidebar",
    collapseSidebar: "Collapse Sidebar",
    homeTitle: "Welcome to AgentCloud",
    homeDesc: "This is a new project template based on the original UI shell.",
    agentsTitle: "Agents Page",
    settingsTitle: "Settings Page",
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
