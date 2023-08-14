import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const RequestCss = styled.span`
  background-color: #ffffff;
  border-radius: 0.5rem;
  width: 16rem;
  margin: 1rem 1rem 1rem 1.5rem;
  padding: 2rem;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.25);
`;

const PCss = styled.p`
  color: #216d32;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 0.5rem;
`;
const PCss2 = styled.p`
  color: #89b090;
  font-weight: 100;
  font-size: 16px;
`;
const Request = ({ data, route }) => {
  const navigate = useNavigate();
  return (
    <RequestCss onClick={() => navigate(route)}>
      <PCss>{data.docsRequestName}</PCss>
      <PCss2>{data.docsRequestAt}</PCss2>
    </RequestCss>
  );
};

export default Request;
