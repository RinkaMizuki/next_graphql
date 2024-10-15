// Define types for individual comments
interface Comment {
  __typename: 'Comment'; // Optional, but useful for type checking
  id: string;
  content: string;
  author: string;
}

// Define types for each post
interface Post {
  __typename: 'Post'; // Optional
  id: string;
  title: string;
  content: string;
  comments: Comment[];
}

// Define types for the edges in the connection
interface PostsEdge {
  __typename: 'PostsEdge'; // Optional
  node: Post; // The actual post data
}

// Define types for pagination information
interface PageInfo {
  __typename: 'PageInfo'; // Optional
  hasNextPage: boolean;
  endCursor: string | null; // Use null if there can be no next cursor
  hasPreviousPage: boolean;
  startCursor: string | null;
}

// Define types for the posts connection
interface PostsConnection {
  __typename: 'PostsConnection'; // Optional
  edges: PostsEdge[]; // Array of post edges
  pageInfo: PageInfo; // Pagination info
  totalCount: number;
}

// Define the main type for the GraphQL query response
interface GetPostsResponse {
  posts: PostsConnection;
}
