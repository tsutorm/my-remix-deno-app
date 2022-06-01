import { queryFauna } from "../fauna.ts";

export async function findManyJokes() {
  const query = `
query {
  allJokes(_size: 3) {
    data {
      id: _id
      name
      content
    }
  }
}
`;

  const {
    data: {
      allJokes: { data: jokes },
    },
    error,
  } = await queryFauna(query, {});

  if (error) {
    return { error };
  }

  return jokes;
}
