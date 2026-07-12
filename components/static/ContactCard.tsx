import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import Link from "next/link";

interface ContactCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  actionText: string;
}

export function ContactCard({ title, description, icon, href, actionText }: ContactCardProps) {
  return (
    <Card className="flex flex-col bg-card shadow-sm border-border">
      <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-muted rounded-xl text-primary">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <Button asChild variant="outline" className="w-full mt-2">
          <Link href={href}>{actionText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
