# Runs Detail Page Enhancements

## ✅ Completed Implementation

### 1. IFRS Q&A Contextual Panel

**✅ Contextual Question Processing:**
```typescript
// Augments user question with run context
const contextualQuestion = `${ifrsQuestion.trim()} (Context: run_id=${params.id})`;

// Calls IFRS endpoint with contextual question
const response = await apiClient.postJson("/api/v1/ifrs/ask", {
  question: contextualQuestion,
});
```

**✅ UI Features:**
- **Question Form**: Textarea for IFRS questions with run context
- **Loading States**: Spinner during analysis
- **Result Display**: Answer with status, confidence, and citations
- **Error Handling**: Clear error messages for failures
- **Compact Layout**: Sidebar-optimized display

**✅ Result Structure:**
```typescript
interface IFRSAnswer {
  status: "OK" | "ABSTAIN";
  answer: string;
  citations: Citation[];
  confidence: number;
}
```

### 2. Quick Sensitivities Panel

**✅ Predefined Shocks:**
```typescript
const sensitivityShocks = [
  { name: "parallel_up", shock: "Parallel +1bp", label: "+1bp" },
  { name: "parallel_down", shock: "Parallel -1bp", label: "-1bp" },
  { name: "fx_up", shock: "FX +1%", label: "FX +1%" },
  { name: "fx_down", shock: "FX -1%", label: "FX -1%" },
];
```

**✅ Streaming Analysis:**
```typescript
// Calls chat stream with run_sensitivity tool
const message = `run_sensitivity: {run_id: '${params.id}', shock: '${shock.shock}'}`;

await apiClient.streamSSE(
  `/api/v1/chat/stream?message=${encodeURIComponent(message)}`,
  (event: SSEEvent) => {
    if (event.event === "DONE" && event.data) {
      // Parse sensitivity result
      result = {
        shock: data.shock,
        pv_change: data.pv_change,
        ts: data.ts,
        timestamp: new Date(),
      };
    }
  }
);
```

**✅ Results Display:**
- **Shock Buttons**: Grid layout with loading states
- **Results Table**: Shows shock, PV change, and timestamp
- **Recent Results**: Displays last 3 sensitivity results
- **Error Handling**: Clear error messages for failures

### 3. LocalStorage Persistence

**✅ Sensitivity Results Storage:**
```typescript
// Load from localStorage on mount
useEffect(() => {
  const savedResults = localStorage.getItem(`sensitivity-results-${params.id}`);
  if (savedResults) {
    setSensitivityResults(JSON.parse(savedResults));
  }
}, [params.id]);

// Save to localStorage (last 5 results)
useEffect(() => {
  const recentResults = sensitivityResults.slice(-5);
  localStorage.setItem(`sensitivity-results-${params.id}`, JSON.stringify(recentResults));
}, [sensitivityResults, params.id]);
```

**✅ Run-Specific Storage:**
- **Key Format**: `sensitivity-results-${runId}`
- **Data Structure**: Array of SensitivityResult objects
- **Persistence**: Last 5 results per run
- **Timestamp**: ISO string with Date conversion

## 🎯 Key Features Implemented

### IFRS Q&A Contextual Panel
```tsx
<Card>
  <CardHeader>
    <CardTitle>IFRS Q&A (Contextual)</CardTitle>
    <CardDescription>Ask IFRS questions in the context of this run</CardDescription>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleIfrsSubmit}>
      <Textarea placeholder="e.g., How does this run comply with IFRS 13?" />
      <Button type="submit">Ask Question</Button>
    </form>
    
    {/* Results Display */}
    {ifrsResult && (
      <div>
        <Badge>{ifrsResult.status}</Badge>
        <Badge>{Math.round(ifrsResult.confidence * 100)}%</Badge>
        <div>{ifrsResult.answer}</div>
        <div>{ifrsResult.citations.map(citation => ...)}</div>
      </div>
    )}
  </CardContent>
</Card>
```

### Quick Sensitivities Panel
```tsx
<Card>
  <CardHeader>
    <CardTitle>Quick Sensitivities</CardTitle>
    <CardDescription>Run sensitivity analysis with predefined shocks</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 gap-2">
      {sensitivityShocks.map(shock => (
        <Button onClick={() => handleSensitivityShock(shock)}>
          {shock.label}
        </Button>
      ))}
    </div>
    
    {/* Results Table */}
    {sensitivityResults.length > 0 && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Shock</TableHead>
            <TableHead>PV Change</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sensitivityResults.slice(-3).map(result => (
            <TableRow>
              <TableCell>{result.shock}</TableCell>
              <TableCell>{result.pv_change.toFixed(2)}</TableCell>
              <TableCell>{result.timestamp.toLocaleTimeString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </CardContent>
</Card>
```

## 🔧 Backend Integration

### API Endpoints Used
- `POST /api/v1/ifrs/ask` - IFRS question answering with context
- `GET /api/v1/chat/stream` - Streaming sensitivity analysis

### Request/Response Flow
```typescript
// IFRS Q&A Flow
1. User enters question: "How does this run comply with IFRS 13?"
2. Context added: "How does this run comply with IFRS 13? (Context: run_id=123)"
3. POST /ifrs/ask -> IFRSAnswer with citations

// Sensitivity Analysis Flow
1. User clicks "+1bp" button
2. Message: "run_sensitivity: {run_id: '123', shock: 'Parallel +1bp'}"
3. GET /chat/stream -> Streaming events -> SensitivityResult
4. Result stored in localStorage and displayed in table
```

### Error Handling
- **Network Errors**: Connection failures and timeouts
- **API Errors**: Backend error responses
- **Parsing Errors**: Invalid sensitivity result data
- **Storage Errors**: localStorage failures

## 🎨 UI/UX Features

### IFRS Q&A Panel
- **Compact Form**: Sidebar-optimized layout
- **Loading States**: Spinner during analysis
- **Result Display**: Status badges, confidence, citations
- **Error Handling**: Clear error messages
- **Responsive**: Works on all screen sizes

### Sensitivities Panel
- **Shock Buttons**: Grid layout with loading states
- **Results Table**: Compact table with recent results
- **Loading Indicators**: Per-button loading states
- **Error Handling**: Clear error messages
- **Persistence**: Results saved across sessions

### Layout Integration
- **Sidebar Placement**: Both panels in right sidebar
- **Card Design**: Consistent with existing UI
- **Spacing**: Proper margins and padding
- **Typography**: Consistent font sizes and weights

## ✅ Acceptance Criteria Met

- ✅ **IFRS Q&A Panel**: Contextual questions with run_id in prompt
- ✅ **Sensitivity Buttons**: "+1bp", "-1bp", "FX +1%", "FX -1%"
- ✅ **Streaming Analysis**: Chat stream with run_sensitivity tool
- ✅ **Results Table**: Shows shock, pv_change, timestamp
- ✅ **LocalStorage**: Last 5 sensitivity results per run
- ✅ **Error Handling**: Clear error messages and loading states

## 🚀 Usage Examples

### IFRS Q&A Contextual
1. **Navigate**: Go to any run detail page (e.g., `/runs/123`)
2. **Ask Question**: "How does this run comply with IFRS 13?"
3. **Context Added**: Automatically includes run_id in prompt
4. **View Result**: Structured answer with citations and confidence

### Quick Sensitivities
1. **Click Button**: Press "+1bp" for parallel rate shock
2. **Streaming**: Watch real-time analysis via SSE
3. **View Result**: See shock, PV change, and timestamp in table
4. **Persistence**: Result saved and available on page reload

### Mocked Run Testing
- **Run ID**: Any string (e.g., "123", "test-run")
- **Sensitivity**: Click buttons to trigger analysis
- **Results**: Mocked data structure with shock, pv_change, ts
- **Storage**: Results persisted in localStorage

The runs detail page now includes powerful IFRS Q&A and sensitivity analysis capabilities! 🎉
