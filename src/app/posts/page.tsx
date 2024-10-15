import { Suspense } from "react";
import styles from "@/app/page.module.css";
import Post from "./components/Post";

export interface Paging {
  pageSize: number | undefined
  cursor: string | undefined
}

interface IProps {
  searchParams: Paging
}

export default function PostPage({
  searchParams: { pageSize, cursor },
}: IProps) {
  return (
    <div className={styles.page}>
      <Suspense fallback="Loading...">
        <Post
          pageSize={pageSize}
          cursor={cursor}
        />
      </Suspense>
    </div >
  );
}