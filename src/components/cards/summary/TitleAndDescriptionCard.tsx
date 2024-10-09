import React from 'react';
const TitleAndDescriptionCard = ({ titleAndDescription, languageId }: any) => {
  return titleAndDescription?.map((data: any) => {
    return data.languageId === languageId && <>{data.title}</>;
  });
};
export default TitleAndDescriptionCard;
