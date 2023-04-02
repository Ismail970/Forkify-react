function usePagination(items, itemsPerPage, currentPage) {
  // Get total number of pages
  const numPages = Math.ceil(items.length / itemsPerPage);
  // Calculate the start and end index for the current page
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  // Slice the items array to get only the items for the current page
  const visibleItems = items.slice(startIndex, endIndex);

  // Return an object containing the current page, total pages, visible items, and functions to go to the next/previous page or a specific page
  return {
    visibleItems,
    numPages,
  };
}

export default usePagination;
