import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getInfiniteHomePosts, getInfiniteScrollPosts, searchForPosts } from "../mongodb/actions/post.actions";
import { getMostMessagedUsers, searchForUsers } from "../mongodb/actions/user.actions";

export const useInvalidate = (keys) => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: keys, exact: true });
}

export const useInfiniteScrollPosts = ({limit, timeline}) => {
  return useInfiniteQuery({
    queryKey: ["posts", timeline],
    queryFn: async ({ pageParam = 2 }) => {
      const posts = await getInfiniteScrollPosts({ page: pageParam, limit, timeline })
      return posts
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime: Infinity,
  });
}

export const useInfiniteHomePosts = () => {
  return useInfiniteQuery({
    queryKey: ["homePosts"],
    queryFn: async ({ pageParam = 2 }) => {
      const posts = await getInfiniteHomePosts({ page: pageParam, limit: 10 })
      return posts
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime: Infinity,
  });
}

export const useMostMessagedUsers = ({userId, limit}) => {
  return useQuery({
    queryKey: ["most-messaged-users", userId],
    queryFn: async () => {
      const users = await getMostMessagedUsers({ userId, limit });
      return users;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!userId
  });
}

export const useSearchPosts = ({ query, tab }) => {
  return useQuery({
    queryKey: ["search-posts", query, tab],
    queryFn: async () => {
      const posts = await searchForPosts({ query, tab });
      return posts;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!query && ['captions', 'tags', 'locations'].includes(tab)
  });
}

export const useSearchUsers = ({ query, tab }) => {
  return useQuery({
    queryKey: ["search-users", query, tab],
    queryFn: async () => {
      const users = await searchForUsers(query);
      return users;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!query && tab === 'accounts'
  });
}