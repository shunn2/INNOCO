import { api } from '@api';
import queryKeys from '@react-query/queryKeys';
import { useQuery } from 'react-query';

const useImage = () => {
  const { data } = useQuery(queryKeys.image, () => api.fetchProjects());
  return data;
};

export default useImage;
