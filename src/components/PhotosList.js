import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotosListItem from "./PhotosListItem";

function PhotosList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [doAddPhoto, results] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    doAddPhoto(album);
  };

  let content;
  if (isFetching) content = <Skeleton times={3} className="h-8 w-8" />;
  else if (error) content = <div>Error Loading Photos...</div>;
  else
    content = data.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />;
    });

  return (
    <div>
      <div className="m-2 flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button loading={results.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-start">
        {content}
      </div>
    </div>
  );
}

export default PhotosList;
