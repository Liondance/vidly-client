export function paginate(items, pageNumber, pageSize) {
  const start = (pageNumber - 1) * pageSize;
  const next = start + pageSize;
  return items.slice(start, next);
}
