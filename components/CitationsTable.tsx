"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Citation {
  standard: string;
  paragraph: string | number;
  section?: string;
}

interface CitationsTableProps {
  citations: Citation[];
  title?: string;
  description?: string;
}

export default function CitationsTable({ 
  citations, 
  title = "Citations",
  description = "Sources referenced in the analysis"
}: CitationsTableProps) {
  if (!citations || citations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Standard</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Paragraph</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {citations.map((citation, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {citation.standard}
                </TableCell>
                <TableCell>{citation.section || "—"}</TableCell>
                <TableCell>{citation.paragraph}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
