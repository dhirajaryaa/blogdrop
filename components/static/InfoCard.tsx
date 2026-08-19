import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function InfoCard({ title, description, icon }: InfoCardProps) {
  return (
    <Card className="flex flex-col h-full bg-card hover:bg-accent/50 transition-colors shadow-sm">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon && <div className="text-primary">{icon}</div>}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
