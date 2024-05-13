import React from "react";
import Image from "next/image";
import PostForm from "@/components/shared/PostForm";
import { getPostById } from "@/lib/mongodb/actions/post.actions";

const UpdatePost = async ({ params: { postId } }) => {
  const postPromise = getPostById(postId);
  const post = await postPromise
  return (
    <main className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-y-scroll custom-scrollbar py-4 px-5 md:px-8 lg:p-14">
        <div className="max-w-5xl w-full flex justify-start gap-3">
          <Image
            src="/assets/add-post.svg"
            alt="add"
            height={36}
            width={36}
            className="invert dark:invert-0"
          />
          <h2 className="text-3xl md:text-2xl font-bold">Update Post</h2>
        </div>
        <PostForm action={"update"} post={post} />
      </div>
    </main>
  );
};

export default UpdatePost;
