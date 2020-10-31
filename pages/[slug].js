import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownPage from '../components/Layout/MarkdownPage';
// import MarkdownPage from 'components/Layout/MarkdownPage';

export default function Page({ content, frontmatter }) {
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

export const getStaticProps = async (ctx) => {
  const {
    params: { slug },
  } = ctx;
  const markdownWithMetadata = fs
    .readFileSync(path.join('pages/static', slug + '.md'))
    .toString();

  const { data, content } = matter(markdownWithMetadata);
  const frontmatter = data;

  return {
    props: {
      ...ctx,
      content: `# ${frontmatter.title}\n\n${content}`,
      frontmatter,
    },
  };
};
