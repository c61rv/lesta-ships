import { gql } from '@apollo/client/core';

export const GET_VEHICLES = gql`
  query Vehicles($languageCode: String = "ru") {
    vehicles(lang: $languageCode) {
      title
      description
      icons {
        large
        medium
      }
      level
      type {
        name
        title
        icons {
          default
        }
      }
      nation {
        name
        title
        color
        icons {
          small
          medium
          large
        }
      }
    }
    nations {
      name
      title
    }
    itemTypes {
      name
      title
    }
  }
`;