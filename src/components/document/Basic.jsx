import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import DocumentHeading from "./DocumentHeading";
import DocumentLabel from "./DocumentLabel";
import SelectInput from "@/components/common/input/SelectInput";
import ScrapBtn from "@/components/common/button/ScrapBtn";
import { basicModify } from "@/services/document";
import "react-toastify/dist/ReactToastify.css";
import { nullTokenEdit, adminApproval } from "@/utils/toast";
import useDocsMutation from "@/hooks/useDocsMutation";
import { ERROR_MSG, CATEGORY, DOCS_INFO } from "@/constant/document/create";
import DocumentInputGroup from "@/components/createDocument/DocumentInputGroup";
import useScrap from "@/hooks/useScrap";

const Basic = ({ data }) => {
  const { isLogin } = useSelector((state) => state.user);

  const {
    id,
    docsName,
    docsLocation,
    docsCategory,
    scrap: isScraped,
  } = data || {};

  const { latitude: getLat, longitude: getLng } = useSelector(
    (state) => state.latLng
  );

  let { address, initialAddress } = useSelector((state) => state.address);
  let addressInfo = { lat: getLat, lng: getLng };

  const [isEditBasic, setIsEditBasic] = useState(false);

  const { mutate: mutationBasicModify } = useDocsMutation(basicModify);
  const { scraped, handleOnScrapFill } = useScrap(isScraped, id);

  const methods = useForm();
  const { handleSubmit, setValue, getValues, reset } = methods;

  const handleSetInput = () => {
    if (!isLogin) return nullTokenEdit();
    setIsEditBasic(true);
  };

  const getAddressInfo = () => {
    if (!getLat) {
      addressInfo = docsLocation;
    }
    return addressInfo;
  };

  const saveBasicInfo = () => {
    setValue("docsId", id);
    setValue("docsRequestType", "MODIFIED");
    setValue("docsRequestLocation", getAddressInfo());

    mutationBasicModify(getValues());

    adminApproval();
  };

  const handleBasicSave = () => {
    setIsEditBasic(false);
    saveBasicInfo();
  };

  const [editAddress, setEditAddress] = useState(initialAddress);

  useEffect(() => {
    if (editAddress) {
      methods.setValue("docsRequestLocation", {
        getLat,
        getLng,
      });
    }
  }, [methods, editAddress, getLat, getLng]);

  useEffect(() => {
    setEditAddress(address);
  }, [address]);

  const handleBasicCancel = () => {
    setIsEditBasic(false);
    reset();
    setEditAddress(initialAddress);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleBasicSave)}>
        <BasicInfo>
          <DocumentHeading
            isEdit={isEditBasic}
            clickEdit={handleSetInput}
            clickCancel={handleBasicCancel}
          >
            기본 정보
          </DocumentHeading>
          <ScrapBtn onClick={handleOnScrapFill} scrap={scraped} />
        </BasicInfo>

        <Box>
          <EditName
            type={DOCS_INFO.NAME}
            registerName="docsRequestName"
            isEdit={isEditBasic}
            requiredMsg={ERROR_MSG.NAME}
            placeholder={docsName}
            defaultInfo={docsName}
          >
            문서 제목
          </EditName>

          <EditName
            type={DOCS_INFO.LOCATION}
            registerName="docsRequestLocation"
            isEdit={isEditBasic}
            defaultInfo={initialAddress}
            value={editAddress}
            disabled
          >
            위치
          </EditName>

          <DocsInfo>
            <DocumentLabel htmlFor="docsCategory">카테고리</DocumentLabel>
            <Container>
              {isEditBasic ? (
                <SelectInput
                  id="docsCategory"
                  selected={docsCategory}
                  name="docsRequestCategory"
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

const BasicInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DocsInfo = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 2.2rem;
`;

const Box = styled.div`
  margin: 1rem 0 3rem 0;
`;

const DocsContent = styled.div`
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
  margin-bottom: 1rem;
`;

const Container = styled.div`
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export default Basic;
