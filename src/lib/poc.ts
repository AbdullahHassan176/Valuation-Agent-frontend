/**
 * PoC API client for constrained ChatGPT integration
 */

import API_CONFIG from './api-config';

const BACKEND_BASE = API_CONFIG.BASE_URL;

export interface ExtractRequest {
  text?: string;
  file_id?: string;
  instrument_hint?: 'IRS' | 'CCS';
  ccy_hint?: string;
}

export interface ExtractField {
  key: string;
  value: string | number | null;
  confidence: number;
  source_span?: string;
}

export interface ExtractResponse {
  status: 'OK' | 'ABSTAIN';
  instrument?: string;
  fields: ExtractField[];
  citations: any[];
  confidence: number;
  warnings: string[];
}

export interface IFRSAskRequest {
  question: string;
  sources: Array<{
    source_id: string;
    text: string;
    section?: string;
  }>;
}

export interface IFRSAnswer {
  status: 'OK' | 'ABSTAIN';
  answer: string;
  citations: Array<{ source_id: string; section: string }>;
  confidence: number;
  warnings: string[];
}

export interface ExplainRunRequest {
  run_id: string;
  api_base: string;
  extra_context?: string;
  sources?: Array<{
    source_id: string;
    text: string;
    section?: string;
  }>;
}

export interface ExplainRunResponse {
  status: 'OK' | 'ABSTAIN';
  narrative: string;
  key_points: string[];
  citations: Array<{ source_id: string; section: string }>;
  confidence: number;
  warnings: string[];
}

/**
 * Parse contract terms from text
 */
export async function parseContract(request: ExtractRequest): Promise<ExtractResponse> {
  const response = await fetch(`${BACKEND_BASE}/poc/parse_contract`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Parse contract failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Parse contract from file upload
 */
export async function parseContractFile(file: File, hints?: { instrument_hint?: 'IRS' | 'CCS'; ccy_hint?: string }): Promise<ExtractResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  if (hints?.instrument_hint) {
    formData.append('instrument_hint', hints.instrument_hint);
  }
  if (hints?.ccy_hint) {
    formData.append('ccy_hint', hints.ccy_hint);
  }

  const response = await fetch(`${BACKEND_BASE}/poc/parse_contract`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Parse contract file failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Ask IFRS question with sources
 */
export async function ifrsAsk(question: string, sources: Array<{ source_id: string; text: string; section?: string }>): Promise<IFRSAnswer> {
  const request: IFRSAskRequest = {
    question,
    sources,
  };

  const response = await fetch(`${BACKEND_BASE}/poc/ifrs_ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`IFRS ask failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Explain a valuation run
 */
export async function explainRun(runId: string, apiBase: string = API_CONFIG.BASE_URL, extraContext?: string, sources?: Array<{ source_id: string; text: string; section?: string }>): Promise<ExplainRunResponse> {
  const request: ExplainRunRequest = {
    run_id: runId,
    api_base: apiBase,
    extra_context: extraContext,
    sources: sources || [],
  };

  const response = await fetch(`${BACKEND_BASE}/poc/explain_run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Explain run failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Check PoC health status
 */
export async function checkPoCHealth(): Promise<{ status: string; enabled_features: string[]; version: string }> {
  const response = await fetch(`${BACKEND_BASE}/poc/health`);
  
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}



