import styles from "./page.module.css";

import { getClient } from "@/lib/ApolloClient";

import { gql } from "@/__generated__";

export default async function HomePage() {

  const getPostDocument = gql(/* GraphQL */`query 
    getPosts {
      posts {
        id,
        title,
        content,
        comments {
          id,
          content,
          author
        }
      }
    }`
  );

  const { data: { posts } } = await getClient().query({ query: getPostDocument });

  return (
    <div className={styles.page}>
      {posts.map((post: any) => (
        <div key={post.id}>
          <h3>
            {post.title}
          </h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
