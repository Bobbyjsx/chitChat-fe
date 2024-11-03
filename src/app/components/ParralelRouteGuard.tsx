"use client";

import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useResponsive } from "../hooks/useResponsive";
import { usePageLoader } from "../context/PageLoaderProvider";
import { useEffect, useState } from "react";

type ParallelRouteGuardProps = {
  children: React.ReactNode;
  routeKey: "chatLobby" | "chatInfo" | "chatMessages";
};

export const ParallelRouteGuard = ({
  children,
  routeKey,
}: ParallelRouteGuardProps) => {
  const [appReady, setAppReady] = useState(false)
  useEffect(() => {
    if (appReady) { setAppReady(true) }
  }, [appReady]);

  const pathName = usePathname().split("/");
  const { isTabletOrMobile } = useResponsive({ clientSide: appReady });

  const isRouteActive = () => {
    const pathLength = pathName.length;

    switch (routeKey) {
      case "chatInfo":
        return pathLength > 3;
      case "chatMessages":
        return pathLength > 2 && pathLength < 5;
      case "chatLobby":
        return isTabletOrMobile
          ? pathLength === 2
          : pathLength === 2 || pathLength > 2;
      default:
        return false;
    }
  };


  return isRouteActive() ? children : null;
};
