"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, BookOpen, AlertCircle, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { apiClient, ApiResponse } from "@/src/lib/api";
import ChatPane from "@/components/ChatPane";
import CitationsTable from "@/components/CitationsTable";
import { useToast } from "@/hooks/use-toast";

interface Citation {
  standard: string;
  paragraph: string | number;
  section?: string;
}

interface IFRSAnswer {
  status: "OK" | "ABSTAIN";
  answer: string;
  citations: Citation[];
  confidence: number;
}

interface PolicyConfig {
  min_confidence: number;
  require_citations: boolean;
  disallow_language: string[];
  restricted_advice: string[];
  source: string;
}

export default function KnowledgePage() {
  const [question, setQuestion] = useState("");
  const [topic, setTopic] = useState<string>("general");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IFRSAnswer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [policy, setPolicy] = useState<PolicyConfig | null>(null);
  const { toast } = useToast();

  // Load policy on mount
  useEffect(() => {
    loadPolicy();
  }, []);

  const loadPolicy = async () => {
    try {
      const response: ApiResponse<PolicyConfig> = await apiClient.getJson("/api/v1/policy");
      if (response.data) {
        setPolicy(response.data);
      }
    } catch (err) {
      console.error("Failed to load policy:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const requestBody: any = {
        question: question.trim(),
      };
      
      // Add topic parameter if not "general"
      if (topic !== "general") {
        requestBody.topic = topic;
      }
      
      const response: ApiResponse<IFRSAnswer> = await apiClient.postJson("/api/v1/ifrs/ask", requestBody);

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setResult(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OK":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "ABSTAIN":
        return <XCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OK":
        return "bg-green-100 text-green-800 border-green-200";
      case "ABSTAIN":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-800";
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              IFRS Knowledge Base
            </h1>
            <p className="text-muted-foreground mt-2">
              Ask questions about IFRS standards and get structured answers with citations.
            </p>
            {policy && (
              <div className="flex gap-2 mt-3">
                <Badge variant="outline" className="text-xs">
                  Min Confidence: {Math.round(policy.min_confidence * 100)}%
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Citations: {policy.require_citations ? "Required" : "Optional"}
                </Badge>
              </div>
            )}
          </div>
          <Button onClick={() => setIsChatOpen(true)} variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Open Chat
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ask an IFRS Question</CardTitle>
          <CardDescription>
            Get structured answers about IFRS standards with proper citations and confidence scores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Your Question</Label>
              <Textarea
                id="question"
                placeholder="e.g., Summarize IFRS 13 fair value hierarchy"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[100px]"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topic">Topic Focus</Label>
              <Select value={topic} onValueChange={setTopic} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic focus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General (All IFRS Standards)</SelectItem>
                  <SelectItem value="ifrs9_impairment">IFRS 9 - Impairment</SelectItem>
                  <SelectItem value="ifrs16_leases">IFRS 16 - Leases</SelectItem>
                  <SelectItem value="ifrs13_measurement">IFRS 13 - Measurement</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {topic === "general" && "Search across all IFRS standards"}
                {topic === "ifrs9_impairment" && "Focus on IFRS 9 impairment and expected credit losses"}
                {topic === "ifrs16_leases" && "Focus on IFRS 16 lease accounting and recognition"}
                {topic === "ifrs13_measurement" && "Focus on IFRS 13 fair value measurement"}
              </p>
            </div>
            <Button type="submit" disabled={isLoading || !question.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Ask Question"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(result.status)}
                  Answer
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(result.status)}>
                    {result.status}
                  </Badge>
                  <Badge className={getConfidenceColor(result.confidence)}>
                    {Math.round(result.confidence * 100)}% confidence
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">{result.answer}</div>
              </div>
            </CardContent>
          </Card>

          {result.status === "ABSTAIN" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                The system has abstained from providing an answer. This may be due to:
                <ul className="mt-2 list-disc list-inside">
                  <li>Insufficient relevant documents in the knowledge base</li>
                  <li>Low confidence in the retrieved information</li>
                  <li>Question outside the scope of IFRS standards</li>
                </ul>
                Try rephrasing your question or uploading more relevant IFRS documents.
              </AlertDescription>
            </Alert>
          )}

          <CitationsTable 
            citations={result.citations}
            title="Citations"
            description="Sources referenced in the answer"
          />
        </div>
      )}

      <ChatPane
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        pageId="knowledge"
      />
    </div>
  );
}
