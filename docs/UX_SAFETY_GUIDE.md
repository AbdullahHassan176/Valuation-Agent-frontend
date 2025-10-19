# UX Safety Guide

## Overview

This guide outlines user experience safety principles and accessibility requirements for the Valuation Agent frontend. All UI components and interactions must follow these guidelines to ensure safe, accessible, and compliant user experiences.

## UI Copy Rules

### Never Guarantee Certainty

#### ❌ Avoid These Phrases
- "The answer is definitely..."
- "This is 100% accurate..."
- "We guarantee that..."
- "This is certain..."
- "Without a doubt..."

#### ✅ Use These Instead
- "Based on available information..."
- "The system indicates..."
- "According to the data..."
- "This suggests..."
- "The analysis shows..."

### Display Confidence Levels

#### Confidence Indicators
- **High (80-100%)**: Green badge with "High Confidence"
- **Medium (50-79%)**: Yellow badge with "Medium Confidence"  
- **Low (0-49%)**: Red badge with "Low Confidence"
- **Unknown**: Gray badge with "Confidence Unknown"

#### Visual Design
```css
.confidence-high {
  background-color: #10B981;
  color: white;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
}

.confidence-medium {
  background-color: #F59E0B;
  color: white;
}

.confidence-low {
  background-color: #EF4444;
  color: white;
}
```

### Show ABSTAIN Why/How

#### When System Abstains
Always display:
1. **Reason**: Why the system abstained
2. **Context**: What information was missing
3. **Action**: What the user can do next

#### Example UI Components
```tsx
<Alert className="border-yellow-200 bg-yellow-50">
  <AlertTriangle className="h-4 w-4" />
  <AlertDescription>
    <div className="font-medium text-yellow-800">System Abstained</div>
    <div className="text-sm text-yellow-700 mt-1">
      Insufficient information to provide a reliable answer. 
      The question requires specific IFRS 13 guidance that is not available in the current knowledge base.
    </div>
    <div className="text-xs text-yellow-600 mt-2">
      <strong>Suggested actions:</strong>
      <ul className="list-disc list-inside mt-1">
        <li>Upload relevant IFRS 13 documentation</li>
        <li>Reframe the question with more specific context</li>
        <li>Contact support for assistance</li>
      </ul>
    </div>
  </AlertDescription>
</Alert>
```

## Accessibility Obligations

### WCAG 2.1 AA Compliance

#### Color Contrast
- **Normal text**: 4.5:1 contrast ratio minimum
- **Large text**: 3:1 contrast ratio minimum
- **UI components**: 3:1 contrast ratio minimum

#### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order should be logical and intuitive
- Focus indicators must be visible
- Skip links for main content areas

#### Screen Reader Support
- Semantic HTML elements
- ARIA labels and descriptions
- Alt text for all images
- Form labels properly associated

### Implementation Examples

#### Accessible Form Controls
```tsx
<div className="space-y-2">
  <Label htmlFor="question-input" className="text-sm font-medium">
    Your Question
  </Label>
  <Textarea
    id="question-input"
    placeholder="Ask about IFRS standards..."
    className="min-h-[100px]"
    aria-describedby="question-help"
  />
  <p id="question-help" className="text-xs text-gray-500">
    Be specific about the IFRS standard and your question context.
  </p>
</div>
```

#### Accessible Data Tables
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Standard</TableHead>
      <TableHead scope="col">Confidence</TableHead>
      <TableHead scope="col">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item.standard}</TableCell>
        <TableCell>
          <Badge className={getConfidenceClass(item.confidence)}>
            {formatConfidence(item.confidence)}
          </Badge>
        </TableCell>
        <TableCell>
          <span className="sr-only">Status: </span>
          {getStatusIcon(item.status)}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

#### Accessible Alerts and Notifications
```tsx
<Alert role="alert" className="border-blue-200 bg-blue-50">
  <Info className="h-4 w-4" aria-hidden="true" />
  <AlertDescription>
    <span className="font-medium">Information</span>
    <p className="mt-1">
      Your question has been processed. The system found relevant information 
      with {confidence}% confidence.
    </p>
  </AlertDescription>
</Alert>
```

### Focus Management
- Focus should return to logical locations after actions
- Modal dialogs should trap focus
- Dynamic content changes should announce to screen readers

### Error Handling
- Errors must be clearly identified
- Error messages should be descriptive and actionable
- Form validation errors should be associated with form controls

## Export/Print Behavior

### Export Functionality

#### Data Export Safety
- **Confidentiality Warning**: Always show before export
- **Data Classification**: Mark exported data appropriately
- **Watermarking**: Include user and timestamp information
- **Format Selection**: Offer multiple export formats

#### Export Warning Dialog
```tsx
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Export Data</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Confidentiality Notice:</strong>
          <p className="mt-1">
            The exported data contains sensitive financial information. 
            Please ensure proper handling and storage according to your 
            organization's data protection policies.
          </p>
        </AlertDescription>
      </Alert>
      
      <div className="space-y-2">
        <Label>Export Format</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">PDF Document</SelectItem>
            <SelectItem value="excel">Excel Spreadsheet</SelectItem>
            <SelectItem value="json">JSON Data</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="confidentiality-agreement" />
        <Label htmlFor="confidentiality-agreement" className="text-sm">
          I understand the confidentiality requirements and will handle 
          the exported data appropriately.
        </Label>
      </div>
    </div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Export Data</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Print Behavior

#### Print-Specific Styling
```css
@media print {
  .no-print {
    display: none !important;
  }
  
  .print-header {
    display: block !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }
  
  .print-footer {
    display: block !important;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #ccc;
    padding: 10px;
    font-size: 10px;
    color: #666;
  }
  
  .print-watermark {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 48px;
    color: rgba(0, 0, 0, 0.1);
    z-index: 1000;
    pointer-events: none;
  }
}
```

#### Print Header/Footer
```tsx
<div className="print-header no-print">
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-lg font-bold">Valuation Agent Report</h1>
      <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
    </div>
    <div className="text-right">
      <p className="text-sm">Confidential</p>
      <p className="text-xs text-gray-500">User: {user.name}</p>
    </div>
  </div>
</div>

<div className="print-footer no-print">
  <div className="flex justify-between">
    <span>Valuation Agent - Confidential Document</span>
    <span>Page <span className="page-number"></span></span>
  </div>
</div>

<div className="print-watermark no-print">
  CONFIDENTIAL
</div>
```

## Data Privacy in UI

### Personal Information Handling
- Never display full personal information in UI
- Use partial masking for sensitive data
- Implement data minimization principles
- Provide clear data usage notices

### Example: Masked Data Display
```tsx
const MaskedEmail = ({ email }: { email: string }) => {
  const [showFull, setShowFull] = useState(false);
  
  const maskedEmail = email.replace(/(.{2}).*(@.*)/, '$1***$2');
  
  return (
    <div className="flex items-center space-x-2">
      <span>{showFull ? email : maskedEmail}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowFull(!showFull)}
        className="text-xs"
      >
        {showFull ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
};
```

## Error State Design

### Error Message Guidelines
- **Clear**: Explain what went wrong
- **Actionable**: Tell user how to fix it
- **Helpful**: Provide relevant context
- **Respectful**: Use appropriate tone

### Error State Examples
```tsx
// System Error
<Alert className="border-red-200 bg-red-50">
  <AlertCircle className="h-4 w-4" />
  <AlertDescription>
    <div className="font-medium text-red-800">System Error</div>
    <p className="text-sm text-red-700 mt-1">
      We're experiencing technical difficulties. Please try again in a few moments.
    </p>
    <div className="mt-2">
      <Button variant="outline" size="sm">
        Try Again
      </Button>
    </div>
  </AlertDescription>
</Alert>

// Validation Error
<Alert className="border-yellow-200 bg-yellow-50">
  <AlertTriangle className="h-4 w-4" />
  <AlertDescription>
    <div className="font-medium text-yellow-800">Validation Error</div>
    <p className="text-sm text-yellow-700 mt-1">
      Please provide a more specific question about IFRS standards.
    </p>
  </AlertDescription>
</Alert>
```

## Loading States

### Loading Indicators
- Show progress for long operations
- Provide estimated completion times
- Allow cancellation when possible
- Use skeleton screens for content loading

### Example Loading Component
```tsx
const LoadingState = ({ message, progress }: { message: string; progress?: number }) => (
  <div className="flex items-center space-x-3 p-4">
    <RefreshCw className="w-5 h-5 animate-spin" />
    <div className="flex-1">
      <p className="text-sm font-medium">{message}</p>
      {progress !== undefined && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
        </div>
      )}
    </div>
  </div>
);
```

## Testing Requirements

### Accessibility Testing
- Automated testing with axe-core
- Manual keyboard navigation testing
- Screen reader testing
- Color contrast validation

### User Testing
- Usability testing with real users
- A/B testing for critical flows
- Feedback collection and analysis
- Regular UX audits

## Implementation Checklist

### Before Release
- [ ] All text follows safety guidelines
- [ ] Confidence levels clearly displayed
- [ ] ABSTAIN states properly explained
- [ ] Accessibility requirements met
- [ ] Export/print functionality tested
- [ ] Error states designed and tested
- [ ] Loading states implemented
- [ ] Security headers configured
- [ ] Privacy controls in place

### Ongoing Maintenance
- [ ] Regular accessibility audits
- [ ] User feedback collection
- [ ] Performance monitoring
- [ ] Security updates
- [ ] Content updates
- [ ] Training materials updated

---

**Note**: This guide should be reviewed and updated regularly to ensure compliance with evolving accessibility standards and user safety requirements.
