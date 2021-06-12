import React from "react";
import Title from "@components/atoms/Title";
import Divider from "@components/atoms/Divider";
import MarkdownPost from "@components/posts/MarkdownPost";

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
        {posts.map((entry, i) => (
          <MarkdownPost entry={entry} key={i} />
        ))}
      </div>
    </>
  );
};

export default PostList;
