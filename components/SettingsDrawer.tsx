"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, X, Save, TestTube } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { apiClient } from "@/src/lib/api";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsDrawer({ isOpen, onClose }: SettingsDrawerProps) {
  const {
    requireApiKey,
    apiKey,
    backendBaseUrl,
    setRequireApiKey,
    setApiKey,
    setBackendBaseUrl,
  } = useSettings();

  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [tempBackendUrl, setTempBackendUrl] = useState(backendBaseUrl);
  const [tempRequireApiKey, setTempRequireApiKey] = useState(requireApiKey);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleSave = () => {
    setApiKey(tempApiKey);
    setBackendBaseUrl(tempBackendUrl);
    setRequireApiKey(tempRequireApiKey);
    onClose();
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      // Test the connection with current settings
      const originalBaseUrl = apiClient.getBaseUrl();
      const originalApiKey = apiClient.getApiKey();

      // Temporarily update API client
      apiClient.setBaseUrl(tempBackendUrl);
      apiClient.setApiKey(tempRequireApiKey ? tempApiKey : null);

      const response = await apiClient.getJson("/healthz");
      
      if (response.error) {
        setTestResult(`❌ Connection failed: ${response.error}`);
      } else {
        setTestResult("✅ Connection successful!");
      }

      // Restore original settings
      apiClient.setBaseUrl(originalBaseUrl);
      apiClient.setApiKey(originalApiKey);
    } catch (error) {
      setTestResult(`❌ Connection failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsTesting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Backend Configuration */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Backend Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Configure the backend API endpoint and authentication.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backend-url">Backend Base URL</Label>
                <Input
                  id="backend-url"
                  value={tempBackendUrl}
                  onChange={(e) => setTempBackendUrl(e.target.value)}
                  placeholder="http://localhost:8001"
                />
                <p className="text-xs text-muted-foreground">
                  The base URL for the backend API (dev only)
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="require-api-key"
                  checked={tempRequireApiKey}
                  onCheckedChange={setTempRequireApiKey}
                />
                <Label htmlFor="require-api-key">Require API Key</Label>
              </div>

              {tempRequireApiKey && (
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    placeholder="Enter your API key"
                  />
                  <p className="text-xs text-muted-foreground">
                    The X-API-Key header value for authentication
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                >
                  {isTesting ? (
                    <>
                      <TestTube className="mr-2 h-4 w-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <TestTube className="mr-2 h-4 w-4" />
                      Test Connection
                    </>
                  )}
                </Button>
              </div>

              {testResult && (
                <div className={`p-3 rounded-md text-sm ${
                  testResult.startsWith("✅") 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {testResult}
                </div>
              )}
            </div>

            <Separator />

            {/* Current Settings Summary */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Current Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Summary of your current configuration.
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Backend URL:</span>
                  <span className="font-mono">{backendBaseUrl}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Key Required:</span>
                  <span>{requireApiKey ? "Yes" : "No"}</span>
                </div>
                {requireApiKey && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">API Key:</span>
                    <span className="font-mono">
                      {apiKey ? `${apiKey.substring(0, 8)}...` : "Not set"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <Separator />
        <div className="p-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}
