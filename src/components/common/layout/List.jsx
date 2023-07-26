import { Link } from "react-router-dom";

const List = ({ to, children }) => {
  return (
    <Link className="list" to={to} style={{ all: "unset", cursor: "pointer" }}>
      {children}
    </Link>
  );
};

export default List;
