import PostCard from "@/components/shared/PostCard";
import { getAllPosts } from "@/lib/mongodb/actions/post.actions";

export default async function Home() {
  const recentPosts = await getAllPosts({
    limit: 10,
  })
  return (
    <div className="flex flex-1">
      <div
        className={`flex flex-col flex-1 items-center gap-10 overflow-y-scroll overflow-x-hidden py-6 px-0 md:px-8 lg:p-14 custom-scrollbar`}
      >
        <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="text-3xl md:text-2xl font-bold text-left w-full ml-4">
            Home Feed
          </h2>
          <section aria-labelledby="recent-posts" className="w-full">
            {recentPosts && (
              <ul className="w-full flex flex-col flex-1 gap-4">
                {recentPosts?.posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                  />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
