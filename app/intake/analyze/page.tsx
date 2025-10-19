"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, FileText, Download, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { apiClient, ApiResponse } from "@/src/lib/api";
import CitationsTable from "@/components/CitationsTable";

interface Citation {
  standard: string;
  paragraph: string | number;
  section?: string;
}

interface ChecklistItem {
  id: string;
  key: string;
  description: string;
  met: boolean;
  notes?: string;
  citations: Citation[];
}

interface Feedback {
  status: "OK" | "NEEDS_REVIEW" | "ABSTAIN";
  summary: string;
  items: ChecklistItem[];
  confidence: number;
}

interface UploadResult {
  doc_id: string;
  hash: string;
}

interface IngestResult {
  doc_id: string;
  pages: number;
  chunks: number;
  hash: string;
}

export default function DocumentAnalyzePage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [docId, setDocId] = useState<string | null>(null);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;
    
    const file = files[0];
    if (!file.type.includes('pdf') && !file.type.includes('docx')) {
      setError("Please upload a PDF or DOCX file");
      return;
    }
    
    await processFile(file);
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    await processFile(file);
  }, []);

  const processFile = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setFeedback(null);
    setUploadProgress("Uploading document...");

    try {
      // Step 1: Upload document
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadResponse: ApiResponse<UploadResult> = await apiClient.postJson(
        "/api/v1/docs/upload",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (uploadResponse.error) {
        throw new Error(uploadResponse.error);
      }

      const { doc_id } = uploadResponse.data!;
      setDocId(doc_id);
      setUploadProgress("Ingesting document...");

      // Step 2: Ingest document
      const ingestResponse: ApiResponse<IngestResult> = await apiClient.postJson(
        "/api/v1/docs/ingest",
        {
          doc_id,
          standard: "IFRS 13"
        }
      );

      if (ingestResponse.error) {
        throw new Error(ingestResponse.error);
      }

      setUploadProgress("Analyzing document...");

      // Step 3: Analyze document for feedback
      const feedbackResponse: ApiResponse<Feedback> = await apiClient.postJson(
        "/api/v1/feedback/analyze",
        {
          doc_id,
          standard: "IFRS 13"
        }
      );

      if (feedbackResponse.error) {
        throw new Error(feedbackResponse.error);
      }

      setFeedback(feedbackResponse.data!);
      setUploadProgress("Analysis complete!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  const handleExport = () => {
    if (!feedback || !docId) return;

    const exportData = {
      doc_id: docId,
      timestamp: new Date().toISOString(),
      feedback: feedback
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docId}-feedback.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OK":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "NEEDS_REVIEW":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "ABSTAIN":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OK":
        return "bg-green-100 text-green-800 border-green-200";
      case "NEEDS_REVIEW":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ABSTAIN":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-800";
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getMetBadgeColor = (met: boolean) => {
    return met 
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Document Analysis
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload a document for IFRS compliance analysis and feedback.
        </p>
      </div>

      {/* Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>
            Upload a PDF or DOCX document for IFRS compliance analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-primary/50"
            } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            {isUploading ? (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                <div>
                  <p className="text-lg font-medium">{uploadProgress}</p>
                  <p className="text-sm text-muted-foreground">Please wait...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">Drop your document here</p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                </div>
                <div>
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button asChild>
                      <span>Choose File</span>
                    </Button>
                  </Label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Supports PDF and DOCX files up to 10MB
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {feedback && (
        <div className="space-y-6">
          {/* Analysis Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(feedback.status)}
                  Analysis Summary
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(feedback.status)}>
                    {feedback.status}
                  </Badge>
                  <Badge className={getConfidenceColor(feedback.confidence)}>
                    {Math.round(feedback.confidence * 100)}% confidence
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">{feedback.summary}</div>
              </div>
            </CardContent>
          </Card>

          {/* Checklist Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Compliance Checklist</CardTitle>
                <Button onClick={handleExport} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Findings
                </Button>
              </div>
              <CardDescription>
                Detailed compliance analysis with citations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Citations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedback.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.key}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <Badge className={getMetBadgeColor(item.met)}>
                          {item.met ? "Met" : "Not Met"}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.notes || "—"}</TableCell>
                      <TableCell>
                        {item.citations.length > 0 ? (
                          <div className="space-y-1">
                            {item.citations.map((citation, idx) => (
                              <div key={idx} className="text-xs">
                                <div className="font-medium">{citation.standard}</div>
                                <div className="text-muted-foreground">
                                  {citation.section && `${citation.section} `}
                                  {citation.paragraph}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Citations Summary */}
          {feedback.items.some(item => item.citations.length > 0) && (
            <CitationsTable 
              citations={feedback.items.flatMap(item => item.citations)}
              title="All Citations"
              description="Complete list of IFRS references used in the analysis"
            />
          )}
        </div>
      )}
    </div>
  );
}
