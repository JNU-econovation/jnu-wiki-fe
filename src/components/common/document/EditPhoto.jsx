import styled from "styled-components";

const ImgPhoto = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const EditPhoto = ({ className, src, alt, onClick }) => {
  return (
    <picture onClick={onClick} className={className}>
      <ImgPhoto src={src} alt={alt} />
    </picture>
  );
};

export default EditPhoto;
