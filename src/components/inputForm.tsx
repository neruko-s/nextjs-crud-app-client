import { Dispatch, SetStateAction, useState } from "react";
import User from "../types/User";

type Props = {
  styles: {
    readonly [key: string]: string;
  };
  baseUrl: string;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
};

const InputForm = ({ styles, baseUrl, users, setUsers }: Props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const clickSubmitBtn = async () => {
    const data = {
      firstName,
      lastName,
      email,
    };
    const url = `${baseUrl}/api/users`;
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setUsers([...users, result]);
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <div className={styles.input_form}>
      <h2>Input Form</h2>
      <div>
        <span>FirstName:</span>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
      </div>
      <div>
        <span>LastName:</span>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
      </div>
      <div>
        <span>Email:</span>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <button onClick={clickSubmitBtn}>Submit</button>
    </div>
  );
};

export default InputForm;
