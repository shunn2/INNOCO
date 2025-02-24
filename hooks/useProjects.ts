import { api } from '@api';
import queryKeys from '@react-query/queryKeys';
import { useQuery } from 'react-query';

const useProjects = () => {
  const { data } = useQuery(queryKeys.projects, () => api.fetchProjects());
  console.log(data);

  return data;
};

export default useProjects;
