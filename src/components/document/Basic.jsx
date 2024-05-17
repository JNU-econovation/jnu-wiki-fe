import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import DocumentHeading from "./DocumentHeading";
import DocumentLabel from "./DocumentLabel";
import SelectInput from "@/components/common/input/SelectInput";
import ScrapBtn from "@/components/common/button/ScrapBtn";
import { basicModify } from "@/services/document";
import "react-toastify/dist/ReactToastify.css";
import { adminApproval } from "@/utils/toast";
import useDocsMutation from "@/hooks/useDocsMutation";
import { ERROR_MSG, CATEGORY } from "@/constant/document/create";
import DocumentInputGroup from "@/components/createDocument/DocumentInputGroup";
import useScrap from "@/hooks/useScrap";
import { useWebSocket } from "@/hooks/useWebSocket";

const Basic = ({ data }) => {
  const dispatch = useDispatch();
  const { id: docsId, docsName, docsCategory, scrap: isScraped } = data || {};
  const { latitude: getLat, longitude: getLng } = useSelector(
    (state) => state.latLng
  );
  let { address, initialAddress } = useSelector((state) => state.address);
  const { isEdit } = useSelector((state) => state.edit);

  const { mutate: mutationBasicModify } = useDocsMutation(basicModify);
  const { handleOnScrapFill } = useScrap();
  const { publish } = useWebSocket(isEdit);

  const methods = useForm();
  const { handleSubmit, setValue, getValues, reset } = methods;

  const handleSaveClick = () => {
    setValue("docsId", docsId);
    setValue("docsRequestLocation", { lat: getLat, lng: getLng });

    publish(docsId);
    mutationBasicModify(getValues(), {
      onSuccess: () => {
        adminApproval();
        handleReset();
      },
    });
  };

  const handleReset = () => {
    dispatch({ type: "disableEdit" });
    reset();
  };

  useEffect(() => {
    dispatch({ type: "disableEdit" });
  }, [data, dispatch]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSaveClick)}>
        <BasicInfo>
          <DocumentHeading
            isEdit={isEdit}
            onEditClick={() => dispatch({ type: "enableEdit" })}
            onCancelClick={handleReset}
          >
            기본 정보
          </DocumentHeading>
          <ScrapBtn
            onClick={() => handleOnScrapFill(isScraped, docsId)}
            isScraped={isScraped}
          />
        </BasicInfo>

        <Box>
          <EditName
            name="docsRequestName"
            isEdit={isEdit}
            requiredMsg={ERROR_MSG.NAME}
            placeholder={docsName}
            defaultInfo={docsName}
          >
            문서 제목
          </EditName>

          <EditName
            name="docsRequestLocation"
            isEdit={isEdit}
            defaultInfo={initialAddress}
            value={address}
            disabled
          >
            위치
          </EditName>

          <DocsInfo>
            <DocumentLabel htmlFor="docsRequestCategory">
              카테고리
            </DocumentLabel>
            <Container>
              {isEdit ? (
                <SelectInput
                  name="docsRequestCategory"
                  selected={docsCategory}
                  list={CATEGORY}
                />
              ) : (
                <DocsContent>{docsCategory}</DocsContent>
              )}
            </Container>
          </DocsInfo>
        </Box>
      </form>
    </FormProvider>
  );
};

const BasicInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DocsInfo = styled.section`
  display: flex;
  align-items: baseline;
  margin-bottom: 2.2rem;
`;

const Box = styled.section`
  margin: 1rem 0 3.5rem 0;
`;

const DocsContent = styled.article`
  width: 15.5rem;
  font-size: 1.1rem;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
`;

const EditName = styled(DocumentInputGroup)`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  height: 3rem;
  margin-bottom: 1.3rem;
`;

const Container = styled.section`
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export default Basic;
