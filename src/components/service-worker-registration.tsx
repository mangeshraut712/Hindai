"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return () => {};
    }

    const registerSW = () => {
      if (process.env.NODE_ENV !== "production") {
        void navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            void registration.unregister();
          }
        });
        return;
      }
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const swUrl = new URL("sw.js", window.location.origin + basePath + "/");
      navigator.serviceWorker
        .register(swUrl.pathname)
        .then((registration) => {
          void registration;
        })
        .catch(() => {
          // Pages still works without a SW; do not fail the session.
        });
    };

    let hasListener = false;
    if (document.readyState === "complete") {
      registerSW();
    } else {
      window.addEventListener("load", registerSW);
      hasListener = true;
    }

    return () => {
      if (hasListener) {
        window.removeEventListener("load", registerSW);
      }
    };
  }, []);

  return null;
}
