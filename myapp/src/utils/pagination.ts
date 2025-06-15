export function getPagination(query: any) {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function getSorting(sortBy = 'createdAt:desc') {
  const [field, order] = sortBy.split(':');
  return { [field]: order === 'desc' ? 'desc' : 'asc' };
}

// import { getPagination, getSorting } from '../utils/pagination';