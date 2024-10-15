'use client'

import { MAX_PAGE_SIZE } from "@/constants/paging";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

interface IProps {
  hasNextPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

const LoadPostBtn = ({ hasNextPage, startCursor, endCursor }: IProps) => {

  const router = useRouter();

  const handlePagingPost = (hasNextPage: boolean) => {
    if (hasNextPage) {
      router.push(`${process.env.NEXT_PRIVATE_API_URL}/posts?pageSize=${MAX_PAGE_SIZE}&cursor=${endCursor}`);
    } else {
      router.push(`${process.env.NEXT_PRIVATE_API_URL}/posts?pageSize=${MAX_PAGE_SIZE}`);
    }
  }

  return (
    <Button onClick={() => handlePagingPost(hasNextPage)}>{hasNextPage ? "Load more..." : "See less"}</Button>
  )
}

export default LoadPostBtn