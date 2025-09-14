import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CreditCard,
  Calculator,
  Scale,
  FileText,
  Percent,
  Landmark,
  Lightbulb,
  Bot,
} from 'lucide-react';
import Link from 'next/link';

const loanSections = [
  {
    title: 'Loan Types',
    description: 'Explore Home, Construction, and Plot loans.',
    icon: <CreditCard className="w-8 h-8 text-primary" />,
    href: '#',
  },
  {
    title: 'Eligibility Calculator',
    description: 'Get instant eligibility based on your income.',
    icon: <Calculator className="w-8 h-8 text-primary" />,
    href: '#',
  },
  {
    title: 'Compare Loans',
    description: 'Compare rates and fees from top banks.',
    icon: <Scale className="w-8 h-8 text-primary" />,
    href: '#',
  },
  {
    title: 'Documents Required',
    description: 'Checklist for KYC, salary, and property papers.',
    icon: <FileText className="w-8 h-8 text-primary" />,
    href: '#',
  },
  {
    title: 'EMI Calculator',
    description: 'See your EMI breakdown with our interactive tool.',
    icon: <Percent className="w-8 h-8 text-primary" />,
    href: '#',
  },
  {
    title: 'Government Schemes',
    description: 'Learn about PMAY, subsidies, and state schemes.',
    icon: <Landmark className="w-8 h-8 text-primary" />,
    href: '#',
  },
  {
    title: 'Loan Tips',
    description: 'Improve credit score and reduce your EMI.',
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    href: '#',
  },
  {
    title: 'AI Loan Advisor',
    description: 'Ask our AI for personalized loan advice.',
    icon: <Bot className="w-8 h-8 text-primary" />,
    href: '#',
  },
];

export default function LoanGuidePage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Loan Guide"
        description="Your complete resource for securing home financing."
      />
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanSections.map((section) => (
            <Link href={section.href} key={section.title}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  {section.icon}
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
