export interface User {
  id: string;
  name: string;
  title: string;
  organization: string;
}

interface SearchPannelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPannelProps["param"]) => void;
}

export const SearchPannel = ({ param, setParam, users }: SearchPannelProps) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
        <select
          value={param.personId}
          onChange={(e) => setParam({ ...param, personId: e.target.value })}
        >
          <option value={""}>Manger</option>
          {users.map((user) => (
            <option key={user.name} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
