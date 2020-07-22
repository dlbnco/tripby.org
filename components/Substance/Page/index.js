import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Flex, Box } from 'rebass';
import { position } from 'styled-system';
import styled from 'styled-components';
import Head from 'next/head';
import { adopt } from 'react-adopt';

import Container from '../../Container';
import GET_SUBSTANCE from './query';
import SubstancePageHeader from '../Header';
import SubstanceContent from '../Content';
import { FormattedMessage } from 'react-intl';
import SubstanceMeta from './Meta';
import { graphql } from 'react-apollo';
import Spinner from '../../Spinner';
import ApolloError from '../../ApolloError';
import { useRouter } from 'next/router';

const StickyHeader = styled(Box).attrs(() => ({
  position: ['relative', null, 'sticky'],
}))`
  ${position}
  top: 0;
  height: 100%;
`;

const SubstancePage = () => {
  const {
    query: { name },
  } = useRouter();
  const { data, loading, error } = useQuery(GET_SUBSTANCE, {
    variables: {
      query: name,
    },
  });
  if (loading) {
    return <Spinner mx="auto" />;
  }
  if (error) {
    return (
      <Container>
        <ApolloError error={data.error} />
      </Container>
    );
  }
  if (data && data.substances && data.substances.length) {
    const substance = data.substances[0];
    return (
      <Container py={[3, 4, 5]}>
        <SubstanceMeta substance={substance} />
        <Flex flexWrap="wrap" m={[-2, -3, -4]}>
          <StickyHeader width={[1, null, 2 / 5, 1 / 3]} p={[2, 3, 4]}>
            <SubstancePageHeader substance={substance} />
          </StickyHeader>
          <Box flex="1" p={[2, 3, 4]}>
            <SubstanceContent substance={substance} />
          </Box>
        </Flex>
      </Container>
    );
  }
  return null;
};

SubstancePage.propTypes = {
  name: PropTypes.string.isRequired,
};

SubstancePage.getStaticProps = (props) => {
  // const apolloClient = initializeApollo()
  console.log(props);

  // await apolloClient.query({
  //   query: ALL_POSTS_QUERY,
  //   variables: allPostsQueryVars,
  // })

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
};

export default SubstancePage;
