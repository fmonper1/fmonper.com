import React from "react";
import Title from "@components/atoms/Title";
import Divider from "@components/atoms/Divider";
import Card from "@components/cards/Card";
import Link from "next/link";

const GistList = ({ gists }) => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <Divider />
        <Title size={4} color="text-secondary-main">
          Gists
        </Title>
      </div>
      <Title size={2} className="mb-4">
        Stuff I reuse
      </Title>
      <div className="space-y-4 w-full flex">
        {gists.map((entry, i) => (
          <Card className="w-full sm:w-1/2 md:w-1/3 cursor-pointer" key={i}>
            <Link href={`gists/${entry.slug}`}>
              <a href={`gists/${entry.slug}`}>
                <div className="flex">
                  <Title size={3}>{entry.title}</Title>
                </div>
                <div className="flex">
                  {entry.tags.map((tag, i) => (
                    <div className="p-2 rounded-sm" key={i}>
                      {tag}
                    </div>
                  ))}
                </div>
              </a>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
};

export default GistList;
