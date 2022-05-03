import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import User from "../types/User";
import UserCard from "./userCard";

type Props = {
  styles: {
    readonly [key: string]: string;
  };
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  baseUrl: string;
};

const UserList = ({ styles, users, setUsers, baseUrl }: Props) => {
  const clickDeleteBtn: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const id = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    const url = `${baseUrl}/api/users/${id}`;
    const res = (): Promise<User> =>
      fetch(url, {
        method: "DELETE",
        mode: "cors",
      }).then((x) => x.json());
    const result = await res();
    const newUsers = users.filter((user, i) => i !== +index!);
    setUsers(newUsers);
  };

  return (
    <ul className={styles.users_ul}>
      {users!.map((user, i) => (
        <UserCard
          key={i}
          index={i}
          styles={styles}
          user={user}
          clickDeleteBtn={clickDeleteBtn}
        />
      ))}
    </ul>
  );
};

export default UserList;
