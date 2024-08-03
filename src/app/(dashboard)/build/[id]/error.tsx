'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

const ErrorParge = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex w-full h-full flex-col items-center">
      <h2 className="text-destructive text-4xl">Something went wrong!</h2>
      <Button asChild className="flex flex-row gap-2 items-center">
        <Link href={'/'}>
          <Home />
          Home
        </Link>
      </Button>
    </div>
  );
};

export default ErrorParge;
