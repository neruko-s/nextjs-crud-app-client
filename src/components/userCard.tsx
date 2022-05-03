import { MouseEventHandler, useState } from "react";
import User from "../types/User";

type Props = {
  index: number;
  styles: {
    readonly [key: string]: string;
  };
  user: User;
  clickDeleteBtn: MouseEventHandler<HTMLButtonElement>;
};

const UserCard = ({ index, styles, user, clickDeleteBtn }: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [email, setEmail] = useState<string>(user.email);

  const clickUpdateBtn = async () => {
    setIsEdit(!isEdit);
    if (isEdit === false) return;
    const data = {
      firstName,
      lastName,
      email,
    };

    const url = `${baseUrl}/api/users/${user.id}`;
    const res = (): Promise<User> =>
      fetch(url, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((x) => x.json());
    const result = await res();
    setFirstName(result.firstName);
    setLastName(result.lastName);
    setEmail(result.email);
  };

  return (
    <li>
      <div>
        <span className={styles.id_span}>{user.id}</span>
        <div className={styles.name_input_box}>
          <input
            className={isEdit ? "" : styles.readonly}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            disabled={!isEdit}
          />
          <input
            className={isEdit ? "" : styles.readonly}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            disabled={!isEdit}
          />
        </div>
        <div className={`${styles.email_box} ${styles.user_list_child_div}`}>
          <span>Email:</span>
          <input
            className={isEdit ? "" : styles.readonly}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={!isEdit}
          />
        </div>
        <div className={styles.user_list_child_div}>
          <span>createdAt:</span>
          <span>{user.createdAt}</span>
        </div>
        <div className={styles.user_list_child_div}>
          <span>updatedAt:</span>
          <span>{user.updatedAt}</span>
        </div>
      </div>
      <div>
        <button
          className={isEdit ? styles.update_btn : ""}
          onClick={clickUpdateBtn}
        >
          {isEdit ? "Update" : "Edit"}
        </button>
        <button onClick={clickDeleteBtn} data-id={user.id} data-index={index}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default UserCard;
