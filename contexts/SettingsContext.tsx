"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiClient } from "@/src/lib/api";

interface SettingsContextType {
  requireApiKey: boolean;
  apiKey: string;
  backendBaseUrl: string;
  setRequireApiKey: (value: boolean) => void;
  setApiKey: (value: string) => void;
  setBackendBaseUrl: (value: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [requireApiKey, setRequireApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [backendBaseUrl, setBackendBaseUrl] = useState(
    process.env.NEXT_PUBLIC_BACKEND_BASE || "http://localhost:8001"
  );

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedRequireApiKey = localStorage.getItem("require-api-key");
    const savedApiKey = localStorage.getItem("api-key");
    const savedBackendUrl = localStorage.getItem("backend-base-url");

    if (savedRequireApiKey) {
      setRequireApiKey(JSON.parse(savedRequireApiKey));
    }
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    if (savedBackendUrl) {
      setBackendBaseUrl(savedBackendUrl);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("require-api-key", JSON.stringify(requireApiKey));
  }, [requireApiKey]);

  useEffect(() => {
    localStorage.setItem("api-key", apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem("backend-base-url", backendBaseUrl);
  }, [backendBaseUrl]);

  // Update API client when settings change
  useEffect(() => {
    apiClient.setBaseUrl(backendBaseUrl);
    apiClient.setApiKey(requireApiKey ? apiKey : null);
  }, [backendBaseUrl, requireApiKey, apiKey]);

  return (
    <SettingsContext.Provider
      value={{
        requireApiKey,
        apiKey,
        backendBaseUrl,
        setRequireApiKey,
        setApiKey,
        setBackendBaseUrl,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
