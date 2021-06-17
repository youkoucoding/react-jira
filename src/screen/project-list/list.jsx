export const List = ({ list, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Manager</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {/* optional chaining (?.)  to avoid the errors (when the object is null or undefined return undefined instead of error) */}
              {users.find((user) => user.id === project.personId)?.name ||
                "unknown"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
