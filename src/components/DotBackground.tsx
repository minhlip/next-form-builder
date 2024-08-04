'use client';

import { cn } from '@/lib/utils';
import DotPattern from '@/components/magicui/dot-pattern';

export function DotBackground() {
  return (
    <div className=" flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <DotPattern className={cn('')} />
    </div>
  );
}
