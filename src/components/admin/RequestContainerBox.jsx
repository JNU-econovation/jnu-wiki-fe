import styled from "styled-components";
import TitleBox from "@/components/admin/TitleBox";
import RequestContain from "@/components/admin/RequestContain";
import Loader from "@/components/common/layout/Loader";
import React from "react";

//prop 으로 data 넘겨주기...

const Bottom = styled.div`
  color: white;
`;

const RequestContainerBox = React.forwardRef(
  ({ title, border, data, route, modi, isLoading, error, isError }, ref) => {
    return (
      <RequestContainerBoxCss>
        <TitleBox
          title={title}
          isLoading={isLoading}
          error={error}
          isError={isError}
        />
        <RequestContain
          border={border}
          datas={data}
          route={route}
          modi={modi}
          isLoading={isLoading}
          error={error}
        >
          {isLoading && <Loader />}
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
  margin-left: 1.5rem;
`;

export default RequestContainerBox;
