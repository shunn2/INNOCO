import { api } from '@api';
import { useQuery } from 'react-query';

const useProjects = () => {
  const { data } = useQuery('projects', () => api.fetchProjects());
  return data;
};

export default useProjects;
