import Link from "next/link";
import Title from "@components/atoms/Title";
import Card from "@components/cards/Card";
import React from "react";
import Divider from "@components/atoms/Divider";

function Post({ entry, image, title }) {
  let { file, description } = image;
  const tag = entry.fields.tags[0];

  return (
    <Card>
      <Link href={`blog/${entry.fields.slug}`}>
        <a href={`blog/${entry.fields.slug}`}>
          <div className="flex">
            <div className="hidden md:flex justify-center items-center">
              <div
                className="flex justify-center items-center rounded-md mr-4"
                style={{ width: "150px ", height: "150px " }}
              >
                <img
                  alt={description}
                  src={`https:${file.url}`}
                  className="rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div>
                <div className="text-sm uppercase" key={tag.fields.title}>
                  {tag.fields.title}
                </div>
                <Title size={2}>{title}</Title>
              </div>
              <Divider />
              <div className="description">
                <p>{String(entry.fields.excerpt).slice(0, 200).trim()}...</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </Card>
  );
}

export default Post;
