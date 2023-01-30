import ImageUpload from '@components/Common/ImageUpload';

const PropsTab = () => {
  return (
    <div>
      <ImageUpload onClick={() => console.log('image')}>
        <p>upload</p>
      </ImageUpload>
    </div>
  );
};

export default PropsTab;
