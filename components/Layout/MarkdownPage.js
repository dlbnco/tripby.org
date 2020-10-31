import React from 'react';
import { Box } from 'rebass';
import styled, { css } from 'styled-components';
import Container from '../Container';
import { background } from 'styled-system';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
// import SEO from 'components/seo';

const Wrapper = styled(Box)`
  ${background}
  width: 100%;
  /* html */
  ${({ theme }) => css`
    color: ${theme.textColor};
    line-height: 1.5;
    font-size: 1.2rem;
    color: ${theme.textColor};
    blockquote {
      padding-left: 1rem;
      border-left: ${theme.border};
      font-weight: 500;
    }
    a:link {
      color: ${theme.colors.purpleHeart};
      font-weight: 500;
    }
    p {
      margin-bottom: 1rem;
    }
    ul,
    ol {
      margin-left: 1rem;
      margin-bottom: 1rem;
    }
    /* custom list bullets */
    ol {
      li {
        margin-bottom: 0.5rem;
      }
    }
    ul {
      li {
        margin-bottom: 0.5rem;
        &:before {
          content: '•';
          color: ${theme.colors.purpleHeart};
          display: inline-block;
          width: 1em;
        }
      }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 600;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 3.25rem;
    }
    h2 {
      font-size: 2.5rem;
    }
    h3 {
      font-size: 2.25rem;
    }
    h4 {
      font-size: 2rem;
    }
    h5 {
      font-size: 1.5rem;
    }
    h6 {
      font-size: 1rem;
    }
  `}
`;

const MarkdownPage = ({ content, frontmatter }) => {
  return (
    <Wrapper variant="primary">
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      {/* <SEO title={frontmatter.title} /> */}
      <Container mx="0" py={[2, null, null, 3]}>
        <div style={{ maxWidth: 768 }}>
          <ReactMarkdown source={content} />
        </div>
      </Container>
    </Wrapper>
  );
};

export default MarkdownPage;
