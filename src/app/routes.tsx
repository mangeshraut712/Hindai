import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { Onboarding } from "./components/Onboarding";
import { AppLayout } from "./components/AppLayout";
import { Dashboard } from "./components/Dashboard";
import { ChatInterface } from "./components/ChatInterface";
import { ScriptureReader } from "./components/ScriptureReader";
import { KnowledgeGraph } from "./components/KnowledgeGraph";
import { Settings } from "./components/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "chat", Component: ChatInterface },
      { path: "reader", Component: ScriptureReader },
      { path: "graph", Component: KnowledgeGraph },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "*",
    Component: LandingPage,
  },
]);
