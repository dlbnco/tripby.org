import gql from 'graphql-tag';

const GET_SUBSTANCE = gql`
  query getSubstance($query: String) {
    substances(query: $query) {
      name
      url
      effects {
        name
        url
      }
      class {
        chemical
        psychoactive
      }
      tolerance {
        full
        half
        zero
      }
      roas {
        name
        dose {
          units
          threshold
          heavy
          common {
            min
            max
          }
          light {
            min
            max
          }
          strong {
            min
            max
          }
        }
        duration {
          duration {
            min
            max
            units
          }
          onset {
            min
            max
            units
          }
          comeup {
            min
            max
            units
          }
          peak {
            min
            max
            units
          }
          offset {
            min
            max
            units
          }
          afterglow {
            min
            max
            units
          }
          total {
            min
            max
            units
          }
        }
        bioavailability {
          min
          max
        }
      }
      summary
      addictionPotential
      toxicity
      crossTolerances
      uncertainInteractions {
        name
      }
      unsafeInteractions {
        name
      }
      dangerousInteractions {
        name
      }
    }
  }
`;

export default GET_SUBSTANCE;
