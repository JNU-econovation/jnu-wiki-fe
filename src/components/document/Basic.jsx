import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import DocumentHeading from "./DocumentHeading";
import ErrorMsg from "./ErrorMsg";
import DocumentLabel from "./DocumentLabel";
import DocumentInput from "@/components/createDocument/DocumentInput";
import SelectInput from "@/components/common/input/SelectInput";
import ScrapBtn from "@/components/common/button/ScrapBtn";
import { basicModify } from "@/services/document";
import { scrapCreate, scrapDelete } from "@/services/scrap";
import "react-toastify/dist/ReactToastify.css";
import { nullTokenEdit, adminApproval } from "@/utils/toast";
import useDocsMutation from "@/hooks/useDocsMutation";
import { ERROR_MSG, CATEGORY } from "@/constant/document/create";

const Basic = ({ data }) => {
  const { isLogin, memberId } = useSelector((state) => state.user);

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
  const [scraped, setScrap] = useState(isScraped);

  const { mutate: mutationBasicModify } = useDocsMutation(basicModify);
  const { mutate: scrapDetailCreate } = useDocsMutation(scrapCreate);
  const { mutate: scrapDetailDelete } = useDocsMutation(scrapDelete);

  const methods = useForm();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = methods;

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
    setEditAddress(address);
  }, [address]);

  const handleBasicCancel = () => {
    setIsEditBasic(false);
    reset();
    setEditAddress(initialAddress);
  };

  useEffect(() => {
    setScrap(isScraped);
  }, [isScraped]);

  const handleOnScrapFill = () => {
    setScrap((prev) => !prev);
    if (!scraped) {
      scrapDetailCreate({ memberId, docsId: id });
    } else {
      scrapDetailDelete({ memberId, docsId: id });
    }
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
          <Scrap onClick={handleOnScrapFill} scrap={scraped} />
        </BasicInfo>

        <Box>
          <DocsInfo>
            <DocsLabel htmlFor="docsName">문서 제목</DocsLabel>
            {isEditBasic ? (
              <EditName>
                <DocumentInput
                  htmlFor="docsName"
                  id="docsName"
                  placeholder={docsName}
                  register={register("docsRequestName", {
                    required: ERROR_MSG.NAME,
                  })}
                  defaultValue={docsName}
                />
                <ErrorMsg errors={errors} name="docsRequestName" />
              </EditName>
            ) : (
              <DocsContent>{docsName}</DocsContent>
            )}
          </DocsInfo>

          <DocsInfo>
            <DocsLabel htmlFor="docsLocation">위치</DocsLabel>
            {isEditBasic ? (
              <DocumentInput
                htmlFor="docsLocation"
                id="docsLocation"
                name="docsRequestLocation"
                defaultValue={initialAddress}
                value={editAddress}
                disabled
              />
            ) : (
              <DocsContent>{initialAddress}</DocsContent>
            )}
          </DocsInfo>

          <DocsInfo>
            <DocsLabel htmlFor="docsCategory">카테고리</DocsLabel>
            {isEditBasic ? (
              <StyledSpan>
                <SelectInput
                  id="docsCategory"
                  selected={docsCategory}
                  name="docsRequestCategory"
                  list={CATEGORY}
                />
              </StyledSpan>
            ) : (
              <DocsContent>{docsCategory}</DocsContent>
            )}
          </DocsInfo>
        </Box>
      </form>
    </FormProvider>
  );
};

const DocsLabel = styled(DocumentLabel)`
  width: 6rem;
`;

const BasicInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DocsInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.2rem;
`;

const Box = styled.div`
  margin: 1rem 0 3rem 0;
`;

const DocsContent = styled.div`
  display: inline-block;
  width: 12rem;
`;

const EditName = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  display: inline-block;
  height: 1rem;
`;

const Scrap = styled(ScrapBtn)`
  margin-top: 0.5rem;
`;

export default Basic;
