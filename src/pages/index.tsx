import type { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import InputForm from "../components/inputForm";
import UserList from "../components/userList";
import styles from "../styles/Home.module.css";
import User from "../types/User";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  props: User[];
};

const Home = ({ props }: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(props);
  }, [props]);

  return (
    <main>
      <h1>CRUD APP</h1>
      <InputForm
        styles={styles}
        users={users}
        setUsers={setUsers}
        baseUrl={baseUrl!}
      />
      <UserList
        styles={styles}
        users={users}
        setUsers={setUsers}
        baseUrl={baseUrl!}
      />
    </main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const url = `${baseUrl}/api/users`;
  const res = await fetch(url);
  const users = await res.json();

  return {
    props: {
      props: users,
    },
    revalidate: 10,
  };
};
