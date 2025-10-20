export function getUsers() {
  return {
    url: '/api/users',
  };
}

export function getTag(tagId) {
  return {
    url: `/tag/${tagId}.json`,
  };
}
