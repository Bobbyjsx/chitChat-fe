"use client";
import React, { createContext, useContext, useState } from "react";
import { LoadingScreen } from "../components/common/LoadingScreen";

type PageLoaderContextType = {
  loading: { active: boolean; text?: string };
  setLoading: (loading: { active: boolean; text?: string }) => void;
};

const PageLoaderContext = createContext<PageLoaderContextType | undefined>(
  undefined,
);

export const PageLoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<{ active: boolean; text?: string }>({
    active: false,
  });

  return (
    <PageLoaderContext.Provider value={{ loading, setLoading }}>
      {loading.active ? <LoadingScreen text={loading?.text} /> : children}
    </PageLoaderContext.Provider>
  );
};

export const usePageLoader = () => {
  const context = useContext(PageLoaderContext);
  if (!context) {
    throw new Error("usePageLoader must be used within a PageLoaderProvider");
  }
  return context;
};
