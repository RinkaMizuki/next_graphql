import { getClient } from "@/lib/ApolloClient";
import { graphql } from "@/gql";
import { DocumentNode } from "@apollo/client";
import { MAX_PAGE_SIZE } from "@/constants/paging";
import LoadPostBtn from "./LoadPostBtn";
import { Paging } from "../page";

export default async function Post({ pageSize, cursor }: Paging) {
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
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  `);

  const fetcher = (query: DocumentNode) => {
    return getClient().query<GetPostsResponse>({
      query,
      variables: {
        first: pageSize ? Number(pageSize) : MAX_PAGE_SIZE,
        after: cursor || null
      }
    });
  };

  const { data } = await fetcher(getPostDocument);

  const posts = data.posts.edges;
  const { hasNextPage, hasPreviousPage, startCursor, endCursor } = data.posts.pageInfo;

  // await new Promise(r => setTimeout(r, 1000)); // Fake loading with Suspense

  return (<>
    {posts.map((post) => (
      <div key={post.node.id}>
        <h3>{post.node.title}</h3>
        <p>{post.node.content}</p>
      </div>
    ))}
    <LoadPostBtn
      hasNextPage={hasNextPage}
      startCursor={startCursor}
      endCursor={endCursor}
    />
  </>)

}