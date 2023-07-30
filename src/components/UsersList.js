import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";
import Skeleton from "./Skeleton";
import Button from "./Button";

function UsersList() {
  const [isLoadingUsers, loadingUsersError, doFetchUsers] =
    useThunk(fetchUsers);
  const [isAddingUser, addingUserError, doAddUser] = useThunk(addUser);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleAddUser = () => {
    doAddUser();
  };

  const { data } = useSelector((state) => state.users);

  let content;
  if (isLoadingUsers) content = <Skeleton times={10} className="h-10 w-full" />;
  else if (loadingUsersError) content = <div>Error Loading users</div>;
  else
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isAddingUser} onClick={handleAddUser}>
          + Add User
        </Button>
        {addingUserError && "Error adding user..."}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
