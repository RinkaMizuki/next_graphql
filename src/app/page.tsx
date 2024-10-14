import { graphql } from "@/gql";
import styles from "./page.module.css";
import { getClient } from "@/lib/ApolloClient";
import { Pagination } from "@nextui-org/pagination";
import { DocumentNode } from "@apollo/client";

export default async function HomePage() {

  const getPostDocument: DocumentNode = graphql(/* GraphQL */`
    query getPosts($first: Int, $after: String) {
      posts(first: $first, after: $after) {
        edges {
          node {
            id
            title
            content
            comments {
              id
              content
              author
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `);

  const fetcher = (query: DocumentNode) => {
    return getClient().query<GetPostsResponse>({
      query,
      variables: {
        first: 5,
        after: null
      }
    });
  };

  const { data } = await fetcher(getPostDocument);

  const posts = data?.posts.edges || [];

  return (
    <div className={styles.page}>
      <Pagination total={10} initialPage={1} />
      {posts.map((post) => (
        <div key={post.node.id}>
          <h3>{post.node.title}</h3>
          <p>{post.node.content}</p>
        </div>
      ))}
      
    </div >
  );
}
