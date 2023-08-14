import styled from "styled-components";
import TitleBox from "../admin/TitleBox";
import RequestContain from "../admin/RequestContain";
import { useEffect } from "react";
import Loader from "../layout/Loader";
import { forwardRef } from "react";
import React from "react";

//prop 으로 data 넘겨주기...

const RequestContainerBox = React.forwardRef(
  ({ title, border, data, route, modi, isLoading, isError, children }, ref) => {
    return (
      <RequestContainerBoxCss>
        <TitleBox title={title} data={data} isError={isError} />
        <RequestContain
          border={border}
          datas={data}
          route={route}
          modi={modi}
          isLoading={isLoading}
          isError={isError}
        >
          {isLoading && <Loader />}
          {/* 아래의 div가 관찰대상!!! */}
          {!isLoading && <div ref={ref}>.</div>}
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
