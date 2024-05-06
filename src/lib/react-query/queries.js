import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getInfiniteScrollPosts } from "../mongodb/actions/post.actions";
import { getMostMessagedUsers } from "../mongodb/actions/user.actions";

export const useInvalidate = (keys) => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: keys, exact: true });
}

export const useInfiniteScrollPosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 2 }) => {
      const { posts } = await getInfiniteScrollPosts({ page: pageParam, limit: 12 })
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
      const { posts } = await getInfiniteScrollPosts({ page: pageParam, limit: 10 })
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