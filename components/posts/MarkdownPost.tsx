import Link from "next/link";
import Title from "@components/atoms/Title";
import Card from "@components/cards/Card";
import React from "react";
import Divider from "@components/atoms/Divider";
import { IMarkdownPost } from "../../services/markdown.service";

type Props = {
  entry: IMarkdownPost;
};

const MarkdownPost: React.FC<Props> = ({ entry }) => {
  const tag = entry?.tags ? entry?.tags[0] : undefined;

  return (
    <Card>
      <Link href={`blog/${entry.slug}`}>
        <a href={`blog/${entry.slug}`}>
          <div className="flex">
            <div className="hidden md:flex justify-center items-center">
              <div
                className="flex justify-center items-center rounded-md mr-4"
                style={{ width: "150px ", height: "150px " }}
              >
                <img
                  alt={entry.title}
                  src={`blog/${entry.path.slice(
                    0,
                    entry.path.length - 3
                  )}/preview.png`}
                  className="rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div>
                <div className="text-sm uppercase" key={tag}>
                  {tag}
                </div>
                <Title size={2}>{entry.title}</Title>
              </div>
              <Divider />
              <div className="description">
                <p>{String(entry.excerpt).slice(0, 200).trim()}...</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </Card>
  );
};

export default MarkdownPost;
