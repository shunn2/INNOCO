import { useRouter } from 'next/router';

const InvitationRedirect = () => {
  const router = useRouter();
  console.log(router);

  return <div>hi</div>;
};

export default InvitationRedirect;
