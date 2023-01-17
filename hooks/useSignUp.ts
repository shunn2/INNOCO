import api from '@api/authApi';
import { SignUpPayload } from '@/types/auth';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const useSignUp = () => {
  const router = useRouter();
  const { mutate } = useMutation(
    (payload: SignUpPayload) => api.signUp(payload),
    {
      onSuccess: () => {
        alert('회원가입 완료');
        router.push('/auth/sign-in');
      },
    }
  );
  return { mutate };
};

export default useSignUp;
