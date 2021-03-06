import React from "react";
import Title from "@components/atoms/Title";
import Post from "@components/posts/Post";
import Divider from "@components/atoms/Divider";

const PostList = ({ posts }) => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <Divider />
        <Title size={4} color="text-secondary-main">
          Blog
        </Title>
      </div>
      <Title size={2} className="mb-4">
        Stuff I've written
      </Title>
      <div className="space-y-4 ">
        {posts.map((entry) => {
          const p = entry.fields;
          return (
            <Post
              entry={entry}
              key={entry.sys.id}
              image={p.image?.fields}
              title={p.title}
            />
          );
        })}
      </div>
    </>
  );
};

export default PostList;
