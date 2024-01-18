"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { Button } from '@/components/ui/button';
import { formUrlQuery } from '@/lib/utils';

interface PaginationProps {
    urlParamName?: string;
    totalPages: number;
    page: number | string;
}

type ButtonType = "prev" | "next"
export  function Pagination({
    urlParamName,
    totalPages,
    page
}: PaginationProps) {
    const router = useRouter();
   const searchParams = useSearchParams();

   const onClick = (btnType: ButtonType) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: urlParamName || "page",
        value: String(pageValue)
    })

    router.push(newUrl, {
        scroll: false
    })
   }
  return (
    <div className='flex gap-2'>
      <Button
      size={"lg"}
      variant={"outline"}
      className='w-28'
      onClick={() => onClick("prev")}
      disabled={Number(page) <= 1}
      >Previous</Button>

      <Button
      size={"lg"}
      variant={"outline"}
      className='w-28'
      onClick={() => onClick("next")}
      disabled={Number(page) >= totalPages}
      >Next</Button>
    </div>
  )
}
