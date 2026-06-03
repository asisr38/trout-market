"use client";

import { useEffect } from "react";
import { CHICKEN_BOARD } from "@/lib/menu-board";

/**
 * Headless kiosk behaviour for the /tv board: locks page scroll while mounted
 * and hard-refreshes on an interval so the TV picks up redeployed content. The
 * board content itself is server-rendered — this component renders nothing.
 */
export function KioskRuntime() {
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const refresh = setTimeout(
      () => window.location.reload(),
      CHICKEN_BOARD.refreshMs,
    );

    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      clearTimeout(refresh);
    };
  }, []);

  return null;
}
