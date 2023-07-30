import { GoTrash, GoSync } from "react-icons/go";
import { useRemovePhotoMutation } from "../store";

function PhotosListItem({ photo }) {
  const [doRemovePhoto, results] = useRemovePhotoMutation();
  const handleDeletePhoto = () => {
    console.log(results);
    doRemovePhoto(photo);
  };
  return (
    <div onClick={handleDeletePhoto} className="relative m-2 cursor-pointer">
      <img className="h-20 w-20" src={photo.url} alt="random" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        {results.isLoading ? (
          <GoSync className="text-3xl animate-spin" />
        ) : (
          <GoTrash className="text-3xl" />
        )}
      </div>
    </div>
  );
}

export default PhotosListItem;
