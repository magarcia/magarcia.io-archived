import moment from 'moment';
import { paginate } from './utils';
import repository from './repository';

const repo = repository();

export const getPost = async ({ id, year, month, day }) => {
  const date = moment(new Date(year, month - 1, day)).format('YYYY-MM-DD');
  return repo.get(`${date}-${id}`);
};

export const listPosts = ({ page }) => {
  const currentPage = parseInt(page, 10) || 1;
  const limit = 5;
  const contents = paginate(repo.list().reverse(), currentPage, limit).map(repo.get);
  return {
    page: currentPage,
    limit,
    total: Math.ceil(repo.list().length / limit),
    results: contents
  };
};
