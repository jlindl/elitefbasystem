"use client";

import { useEffect } from "react";
import { mergeSeen } from "../_lib/changelog";
import { writePrefCookie } from "../_lib/use-pref-cookie";
import { COOKIES, readPrefCookie } from "../_lib/welcome";

/**
 * On the What's new page: remembers every update on it as seen, while this visit's
 * "new to you" markers stay on screen. Ids never contain ".", so joining is safe.
 */
export function MarkNewsSeen({ ids }: { ids: string[] }) {
  const key = ids.join(".");
  useEffect(() => {
    if (key) writePrefCookie(COOKIES.newsSeen, mergeSeen(readPrefCookie(COOKIES.newsSeen), key.split(".")));
  }, [key]);
  return null;
}
