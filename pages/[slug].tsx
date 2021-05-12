import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownPage from '../components/Layout/MarkdownPage';
import { GetStaticProps } from 'next';
// import MarkdownPage from 'components/Layout/MarkdownPage';

export default function Page({
  content,
  frontmatter,
}: {
  content: string;
  frontmatter: Record<string, unknown>;
}) {
  return <MarkdownPage content={content} frontmatter={frontmatter} />;
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync('pages/static');
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;
  const markdownWithMetadata = fs
    .readFileSync(path.join('pages/static', slug + '.md'))
    .toString();

  const { data, content } = matter(markdownWithMetadata);
  const frontmatter = data;

  return {
    props: {
      content: `# ${frontmatter.title}\n\n${content}`,
      frontmatter,
    },
  };
};
