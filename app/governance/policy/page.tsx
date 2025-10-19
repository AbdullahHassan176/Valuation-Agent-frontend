"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Loader2, Save, Shield, AlertCircle, CheckCircle, Info } from "lucide-react";
import { apiClient, ApiResponse } from "@/src/lib/api";
import { useToast } from "@/hooks/use-toast";

interface PolicyConfig {
  min_confidence: number;
  require_citations: boolean;
  disallow_language: string[];
  restricted_advice: string[];
  source: string;
}

export default function PolicyEditorPage() {
  const [policy, setPolicy] = useState<PolicyConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [minConfidence, setMinConfidence] = useState(0.7);
  const [requireCitations, setRequireCitations] = useState(true);
  const [disallowLanguage, setDisallowLanguage] = useState<string[]>([]);
  const [restrictedAdvice, setRestrictedAdvice] = useState<string[]>([]);

  // Load policy on mount
  useEffect(() => {
    loadPolicy();
  }, []);

  const loadPolicy = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: ApiResponse<PolicyConfig> = await apiClient.getJson("/api/v1/policy");

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setPolicy(response.data);
        setMinConfidence(response.data.min_confidence);
        setRequireCitations(response.data.require_citations);
        setDisallowLanguage(response.data.disallow_language);
        setRestrictedAdvice(response.data.restricted_advice);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const updateData = {
        min_confidence: minConfidence,
        require_citations: requireCitations,
        disallow_language: disallowLanguage,
        restricted_advice: restrictedAdvice,
      };

      const response: ApiResponse<PolicyConfig> = await apiClient.postJson(
        "/api/v1/policy",
        updateData
      );

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setPolicy(response.data);
        toast({
          title: "Policy Updated",
          description: "Policy configuration has been saved successfully.",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const response: ApiResponse<{ message: string }> = await apiClient.postJson(
        "/api/v1/policy/reset",
        {}
      );

      if (response.error) {
        setError(response.error);
      } else {
        await loadPolicy();
        toast({
          title: "Policy Reset",
          description: "Policy has been reset to file defaults.",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const parseTags = (text: string): string[] => {
    return text
      .split('\n')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  };

  const formatTags = (tags: string[]): string => {
    return tags.join('\n');
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "runtime":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "file":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading policy configuration...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8" />
          Policy Configuration
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure system-wide policy settings for IFRS compliance and content filtering.
        </p>
      </div>

      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {policy && (
        <div className="mb-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Current policy source: <Badge className={getSourceColor(policy.source)}>
                {policy.source}
              </Badge>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="space-y-6">
        {/* Confidence Threshold */}
        <Card>
          <CardHeader>
            <CardTitle>Confidence Threshold</CardTitle>
            <CardDescription>
              Minimum confidence level required for IFRS answers (0.0 - 1.0)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="min-confidence">Minimum Confidence</Label>
                <Input
                  id="min-confidence"
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={minConfidence}
                  onChange={(e) => setMinConfidence(parseFloat(e.target.value) || 0)}
                  className="w-32"
                />
                <p className="text-sm text-muted-foreground">
                  Higher values (e.g., 0.8) will cause more ABSTAIN responses unless evidence is very strong.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Citation Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Citation Requirements</CardTitle>
            <CardDescription>
              Whether citations are required for IFRS answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="require-citations"
                checked={requireCitations}
                onCheckedChange={setRequireCitations}
              />
              <Label htmlFor="require-citations">Require Citations</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              When enabled, answers must include proper IFRS citations to be considered valid.
            </p>
          </CardContent>
        </Card>

        {/* Disallowed Language */}
        <Card>
          <CardHeader>
            <CardTitle>Disallowed Language</CardTitle>
            <CardDescription>
              Language tags that should be filtered out of responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="disallow-language">Language Tags (one per line)</Label>
              <Textarea
                id="disallow-language"
                value={formatTags(disallowLanguage)}
                onChange={(e) => setDisallowLanguage(parseTags(e.target.value))}
                placeholder="unprofessional&#10;offensive&#10;inappropriate"
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                Enter one language tag per line. These will be filtered from AI responses.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Restricted Advice */}
        <Card>
          <CardHeader>
            <CardTitle>Restricted Advice</CardTitle>
            <CardDescription>
              Advice categories that should be restricted or flagged
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="restricted-advice">Advice Tags (one per line)</Label>
              <Textarea
                id="restricted-advice"
                value={formatTags(restrictedAdvice)}
                onChange={(e) => setRestrictedAdvice(parseTags(e.target.value))}
                placeholder="investment&#10;legal&#10;medical"
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                Enter one advice tag per line. These will be flagged in AI responses.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Policy
                  </>
                )}
              </Button>
              <Button onClick={handleReset} variant="outline" disabled={isSaving}>
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
