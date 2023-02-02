import { api } from '@api';
import queryKeys from '@react-query/queryKeys';
import { useQuery } from 'react-query';

const useTemplates = () => {
  const { data } = useQuery(queryKeys.templates, () => api.fetchTemplates());
  return data;
};

export default useTemplates;
