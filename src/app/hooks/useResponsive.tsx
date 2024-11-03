"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const useResponsive = ({
  clientSide = false,
}: {
  clientSide?: boolean;
}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  if (clientSide) {
    // Client-side: use window object
    return {
      isTabletOrMobile: window?.innerWidth < 1024,
      isDesktopOrLaptop: window?.innerWidth >= 1224,
      isBigScreen: window?.innerWidth >= 1824,
      isPortrait: window?.innerHeight > window?.innerWidth,
      isRetina: window?.devicePixelRatio >= 2,
    };
  } else {
    // Server-side or not clientSide: use react-responsive
    return {
      isDesktopOrLaptop,
      isBigScreen,
      isTabletOrMobile,
      isPortrait,
      isRetina,
    };
  }
};
