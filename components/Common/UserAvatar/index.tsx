import Avatar from 'react-avatar';

interface UserProps {
  authority: string;
  authorityChangedToViewer: boolean;
  pageId: string;
  sessionId: string;
  userId: string;
}

const colors = ['red', 'green', 'blue', 'orange', 'yellow'];

const UserAvatar = ({ user, idx }: { user: UserProps; idx: number }) => {
  return (
    <Avatar
      name={user.userId}
      size="30"
      color={colors[idx]}
      textSizeRatio={2}
      round="50%"
    />
  );
};

export default UserAvatar;
