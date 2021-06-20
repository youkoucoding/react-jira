import { useState, useEffect } from "react";
import { SearchPannel } from "./search-pannel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { stringify } from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);

  const debouncedParam = useDebounce(param, 1000);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${stringify(cleanObject(debouncedParam))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPannel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
