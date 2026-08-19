import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "./SectionTitle";

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-4 mb-8">
      <SectionTitle as="h2" className="mt-0">{title}</SectionTitle>
      {children}
    </div>
  );
}

export function LegalCard({ children }: { children: ReactNode }) {
  return (
    <Card className="shadow-sm border-border bg-card">
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  );
}
