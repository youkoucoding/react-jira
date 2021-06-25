import { useState, useEffect } from "react";
import { SearchPannel } from "./search-pannel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { useHttp } from "utils/http";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 1000);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("project", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPannel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
