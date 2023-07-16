export const PaginationResponse = (modal, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  if (endIndex < modal.length) {
    results.next = {
      page: page + 1,
      limit: limit,
      totle: modal.length,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
      totle: modal.length,
    };
  }

  results.data = modal.slice(startIndex, endIndex);
  return results;
};
