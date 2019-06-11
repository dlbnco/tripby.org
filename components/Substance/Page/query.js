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
        zero
        half
        full
      }
      roas {
        name
        dose {
          units
          threshold
          light {
            min
            max
          }
          common {
            min
            max
          }
          strong {
            min
            max
          }
          heavy
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
        class {
          chemical
          psychoactive
        }
      }
      unsafeInteractions {
        name
        class {
          chemical
          psychoactive
        }
      }
      dangerousInteractions {
        name
        class {
          chemical
          psychoactive
        }
      }
    }
  }
`;

export default GET_SUBSTANCE;
