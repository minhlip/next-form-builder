import { GetForms, GetFormStats } from '@/actions/form';
import React, { Suspense } from 'react';
import {
  ArrowRight,
  Captions,
  EyeIcon,
  MousePointerClick,
  Redo,
  SquarePen,
  Star,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/components/CreateFormBtn';
import { Form } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Page = () => {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>

      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your Form </h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gird-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense fallback={<FormCardSkeleton />}>
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
};

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardProps {
  loading: boolean;
  data?: Awaited<ReturnType<typeof GetFormStats>>;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Visits"
        icon={<Star className="text-blue-500" />}
        helperText="All time form visits"
        loading={loading}
        value={data?.visits.toLocaleString() || ''}
        className="shadow-md shadow-blue-600"
      />

      <StatsCard
        title="Total Submissions"
        icon={<Captions className="text-yellow-500" />}
        helperText="All time form submissions"
        loading={loading}
        value={data?.subimissions.toLocaleString() + '%' || ''}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Submission rate"
        icon={<MousePointerClick className="text-green-500" />}
        helperText="Visits that result in form submission"
        loading={loading}
        value={data?.submissionRate.toLocaleString() + '%' || ''}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Bounce rate"
        icon={<Redo className="text-red-500" />}
        helperText="Visits that leaves without interacting"
        loading={loading}
        value={data?.bounceRate.toLocaleString() + '%' || ''}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

interface StatsCard {
  title: string;
  icon: React.ReactElement;
  helperText: string;
  loading: boolean;
  value: string;
  className: string;
}

function StatsCard({
  title,
  icon,
  helperText,
  loading,
  className,
  value,
}: StatsCard) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
          <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />;
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-cneter gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant={'destructive'} className="p-2">
              Draft
            </Badge>
          )}
        </CardTitle>

        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <div className="flex items-center gap-2">
              <Star className="text-muted-foreground" />
              <span>{form.visits.toLocaleString() || ''}</span>
              <Captions className="text-muted-foreground" />
              <span>{form.subimissions.toLocaleString() || ''}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || 'No description'}
      </CardContent>

      <CardFooter>
        {form.published ? (
          <Button className="w-full flex mt-2 text-md gap-4" asChild>
            <Link href={`/form/${form.id}`}>
              View Submission <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button
            className="w-full text-center flex-row flex mt-2 text-md gap-2"
            asChild
            variant={'secondary'}
          >
            <Link href={`/build/${form.id}`}>
              Edit
              <SquarePen className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default Page;
