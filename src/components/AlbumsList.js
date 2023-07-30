import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";
import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  const { data, isFetching, isError } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) content = <Skeleton className="h-10 w-full" times={5} />;
  else if (isError) content = <div>Error Loading Albums...</div>;
  else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }
  return (
    <div>
      <div className="m-2 flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
