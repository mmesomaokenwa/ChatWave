import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';

const PostPreviewCard = ({ post }) => {
  return (
    <Link href={`/posts/${post._id}`}>
      <Card className="overflow-hidden rounded-2xl h-[175px]">
        <CardContent className="p-0 relative">
          {post?.media[0]?.type === "image" ? (
            <Image
              src={post.media[0].url}
              alt={post.media[0].url}
              width={500}
              height={500}
              className='object-cover'
            />
          ) : (
            <video
              autoPlay
              loop
              playsInline
              muted
              className="w-full h-full object-cover"
            >
              <source src={post.media[0].url} type="video/mp4" />
            </video>
          )}
          {post?.media?.length > 1 && (
            <Image
              src={"/assets/carousel.svg"}
              alt={"preview"}
              width={25}
              height={25}
              className="absolute top-3 right-3"
            />
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default PostPreviewCard