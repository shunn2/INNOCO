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
    <div className="flex flex-col">
      {/* {user.authority === 'EDITOR' && (
        <div className="-mb-4 z-10">
          <img src="/editor_crown.png" />
        </div>
      )} */}
      <Avatar
        name={user.userId}
        fgColor={user.authority === 'EDITOR' ? 'black' : '#fff'}
        size="30"
        color={colors[idx]}
        textSizeRatio={2}
        round="50%"
      />
    </div>
  );
};

export default UserAvatar;
