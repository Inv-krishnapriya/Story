import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/rootReducer";
import { SurveyStatusDeleted } from "../../../utils/common.data";

export const homeReducerSelector = (state: RootState) => state.home;

export const surveyListSelector = createSelector(
  homeReducerSelector,
  (state) => {
    const filteredData =
      state.surveyList?.filter(
        (item: any) => item?.surveyStatus !== SurveyStatusDeleted && !!item?.id
      ) || [];
    return filteredData;
  }
);
export const hasMoreSurveyScrollSelector = createSelector(
  homeReducerSelector,
  (state) => state.hasMoreScroll
);

export const surveyListLanguageData = createSelector(
  homeReducerSelector,
  (state) => {
    const filteredData =
      state.surveyList?.filter(
        (item: any) => item?.surveyStatus !== SurveyStatusDeleted && !!item?.id
      ) || [];
    const languageData = filteredData?.map((item: any) => {
      const data = item?.titleAndDescription[0];
      return {
        ...item,
        ...data,
      };
    });
    return languageData;
  }
);
export const surveyListByLanguageIdSelector = (id: number) =>
  createSelector(homeReducerSelector, (state) => {
    const filteredData =
      state.surveyList?.filter(
        (item: any) => item?.surveyStatus !== SurveyStatusDeleted
      ) || [];
    const languageData = filteredData?.map((item: any) => {
      const titleDescriptionDataPerId = item?.titleAndDescription?.find(
        (data: any) => data?.languageId === id
      );
      const titleDescriptionDataPerDefaultLanguage =
        item?.titleAndDescription?.find(
          (data: any) => data?.languageId === item?.defaultLanguage
        );
      const titleDescriptionData = titleDescriptionDataPerId?.title
        ? titleDescriptionDataPerId
        : titleDescriptionDataPerDefaultLanguage;
      return {
        ...item,
        ...titleDescriptionData,
      };
    });

    return languageData;
  });

export const editUpdatedDateSelector = createSelector(
  homeReducerSelector,
  (state) => state?.editUpdatedDate
);
export const addUpdatedDateSelector = createSelector(
  homeReducerSelector,
  (state) => state?.addUpdatedDate
);
export const hasMoreUserScrollSelector = createSelector(
  homeReducerSelector,
  (state) => state.hasMoreUserScroll
);
