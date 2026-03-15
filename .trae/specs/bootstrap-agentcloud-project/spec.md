# AgentCloud 新项目初始化 Spec

## Why
当前仓库的界面风格与交互质量较高，适合作为新项目的 UI 基座。需要在不耦合 OpenClaw 业务逻辑的前提下，快速创建独立项目 `agentcloud`，用于后续接入新业务。

## What Changes
- 创建新项目目录 `agentcloud`，基于 Next.js + TypeScript + Tailwind 初始化可运行工程
- 复用现有项目的界面壳层能力：全局布局、侧边导航、主题切换、基础设计变量
- 移除与 OpenClaw 强绑定的页面与 API 逻辑，替换为占位页面与通用数据接口骨架
- 保留可扩展的 i18n 与主题 Provider 结构，确保后续业务可增量接入

## Impact
- Affected specs: 新项目脚手架、UI 壳层复用、路由与 API 最小可运行能力
- Affected code: `agentcloud/` 下的 app、lib、样式、配置与依赖清单

## ADDED Requirements
### Requirement: 创建独立项目目录
系统 SHALL 在仓库根目录创建 `agentcloud` 目录，并包含可独立安装与运行的前端工程结构。

#### Scenario: 新项目初始化成功
- **WHEN** 开发者在 `agentcloud` 目录安装依赖并启动开发服务
- **THEN** 项目可成功启动并打开首页

### Requirement: 复用 UI 壳层
系统 SHALL 在 `agentcloud` 中提供与原项目一致风格的壳层能力，包括全局布局、侧边导航、主题切换与基础色彩变量。

#### Scenario: 壳层渲染成功
- **WHEN** 用户访问首页
- **THEN** 页面展示侧边导航与主题切换，并支持深浅色模式

### Requirement: 业务解耦与占位能力
系统 SHALL 去除 OpenClaw 专用业务依赖，提供通用占位页面与基础 API 路由以支持后续迁移。

#### Scenario: 占位能力可用
- **WHEN** 用户访问预设导航页面或请求基础 API
- **THEN** 系统返回可用占位内容，不依赖 OpenClaw 本地配置

## MODIFIED Requirements
### Requirement: 原有单项目结构
仓库从单一应用结构调整为“原项目 + `agentcloud` 新项目”并存结构，新项目应保持独立构建与运行入口。

## REMOVED Requirements
### Requirement: 新项目直接读取 OpenClaw 本地配置
**Reason**: 方案 A 目标是复用界面框架并解耦原业务，避免新项目继承强绑定数据源。  
**Migration**: 以通用占位数据与可扩展 API 契约替代，后续按新业务逐步接入真实后端。
