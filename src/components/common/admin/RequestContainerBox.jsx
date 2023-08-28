import styled from "styled-components";
import TitleBox from "../admin/TitleBox";
import RequestContain from "../admin/RequestContain";

import React from "react";

//prop 으로 data 넘겨주기...

const Bottom = styled.div`
  color: white;
`;

const RequestContainerBox = React.forwardRef(
  ({ title, border, data, route, modi, isLoading, error, children }, ref) => {
    console.log(error?.response?.status);
    return (
      <RequestContainerBoxCss>
        <TitleBox title={title} data={data} error={error} />
        <RequestContain
          border={border}
          datas={data}
          route={route}
          modi={modi}
          isLoading={isLoading}
          error={error}
        >
          {/* {isLoading && <Loader />} */}
          {/* 아래의 div가 관찰대상!!! */}
          {!isLoading && <Bottom ref={ref}>. </Bottom>}
        </RequestContain>
      </RequestContainerBoxCss>
    );
  }
);

RequestContainerBox.displayName = "RequestContainerBox";
const RequestContainerBoxCss = styled.div`
  display: flex;
  flex-direction: column;
`;

export default RequestContainerBox;
