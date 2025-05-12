export const GET_COUNTRIES = `
  query GetCountries {
    countries {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;

export const GET_COUNTRY = `
  query GetCountry($code: String!) {
  country(code: $code) {
    code
    name
    emoji
    continent {
      name
    }
  }
}
`;

export const ADD_COUNTRY = `
  mutation AddCountry($data: NewCountryInput!) {
  addCountry(data: $data) {
    code
    name
    emoji
    continent {
      id
    }
  }
}`;
