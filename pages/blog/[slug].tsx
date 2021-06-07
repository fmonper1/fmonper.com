import { GistsService, PostsService } from "../../services/markdown.service";
import Head from "next/head";
import TransparentHero from "@components/template/hero/TransparentHero";
import PageContainer from "@components/template/PageContainer";
import Title from "@components/atoms/Title";
import Button from "@components/atoms/Button";
import React, { useEffect, useState } from "react";
import MarkdownParser from "@utils/markdown.parser";
import * as prism from "prismjs";
import Icon from "@mdi/react";
import {
  mdiArrowLeftBold,
  mdiArrowRightBold,
  mdiHome,
  mdiMinus,
  mdiPlus,
} from "@mdi/js";
import Link from "next/link";
import clsx from "clsx";

export default function PostPage({ post, headings }) {
  // const html = useMarkdown(post.content);
  useEffect(() => {
    prism.highlightAll();
  }, [post]);

  const [openToc, setOpenToc] = useState<boolean>(true);

  const TOC = () => (
    <div className="flex">
      <div className="p-3 bg-white rounded-md mb-8">
        <div className="flex items-center">
          <Title size={2} className="text-lg">
            Table of Contents
          </Title>

          <Button
            size="xs"
            className="ml-4"
            onClick={() => setOpenToc((open) => !open)}
          >
            <Icon path={openToc ? mdiMinus : mdiPlus} size={1} />
          </Button>
        </div>
        <div
          className={clsx(
            "transform transition-all",
            !openToc && "scale-y-0 max-h-0"
          )}
        >
          <div className="border-t border-secondary my-2" />
          <ul>
            {headings.map((item) => (
              <li style={{ paddingLeft: `${(item.level - 2) * 24}px` }}>
                <a href={`#${item.slug}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>{post?.title} | fmonper</title>
      </Head>

      <main>
        <TransparentHero title={post?.title} subtitle={post?.subtitle} />

        <PageContainer className="my-8" size="narrow">
          {/* START TABLE OF CONTENTS */}

          <TOC />
          <div
            id="post-entry"
            className="space-y-5"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />

          <div className="my-8">
            <Title size={3}>Tags</Title>
            <div className="flex space-x-2 flex-wrap ">
              {post?.tags?.map((tag, i) => (
                <Button key={i} className="my-2">
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <div
            id="post-navigation"
            className="my-8 flex items-center justify-center flex-wrap space-y-2 md:space-y-0"
          >
            <div
              className="w-full md:w-auto group"
              style={{ minWidth: "270px" }}
            >
              {post?.previousPost && (
                <Link href={`/blog/${post?.previousPost.slug}`}>
                  <a href={`/blog/${post?.previousPost.slug}`}>
                    <div className="flex w-full justify-between bg-primary p-2 hover:bg-primary-light transition transition-colors">
                      <Icon
                        path={mdiArrowLeftBold}
                        size={2}
                        className="text-secondary-main transition transform group-hover:-translate-x-1"
                      />
                      <div className="text-white flex items-center px-2 ">
                        {post?.previousPost.title}
                      </div>
                    </div>
                  </a>
                </Link>
              )}
            </div>
            <div className="w-full md:w-auto group">
              <Link href="/">
                <a href="/">
                  <div className="md:mx-4 p-2 flex bg-primary hover:bg-primary-light transition transition-colors ">
                    <Icon
                      path={mdiHome}
                      size={2}
                      className="text-white transition transform group-hover:scale-110"
                    />
                  </div>
                </a>
              </Link>
            </div>
            <div className="w-full md:w-auto" style={{ minWidth: "270px" }}>
              {post?.nextPost && (
                <Link href={`/blog/${post?.nextPost.slug}`}>
                  <a href={`/blog/${post?.nextPost.slug}`}>
                    <div className="group flex w-full justify-between bg-primary p-2 hover:bg-primary-light transition transition-colors">
                      <div className="text-white flex items-center px-2">
                        {post?.nextPost.title}
                      </div>
                      <Icon
                        path={mdiArrowRightBold}
                        size={2}
                        className="text-secondary-main transition transform group-hover:translate-x-1"
                      />
                    </div>
                  </a>
                </Link>
              )}
            </div>
          </div>

          {/*<pre>{JSON.stringify(post, null, 2)}</pre>*/}
        </PageContainer>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = PostsService.getPostBySlug(params.slug, [
    "title",
    "subtitle",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "tags",
    "excerpt",
  ]);

  const postNavigation = PostsService.getPreviousAndNextPosts(params.slug);
  const { data, headings } = MarkdownParser.parse(post.content);
  return {
    props: {
      post: {
        ...post,
        ...postNavigation,
        content: data,
      },
      headings,
    },
  };
}

export async function getStaticPaths() {
  const posts = PostsService.getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          // @ts-ignore
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
