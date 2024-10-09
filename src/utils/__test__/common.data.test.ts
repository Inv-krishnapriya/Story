import {
  DataOrder,
  QuestionType,
  SurveyStatusDraft,
  SurveyStatusInReview,
  SurveyStatusReady,
  SurveyStatusPublished,
  SurveyStatusStopped,
  SurveyStatusDeleted,
  LANGUAGES,
} from "../common.data";

describe("Common Data Tests", () => {
  it("should have unique IDs for DataOrder", () => {
    const uniqueIds = new Set(DataOrder.map((item) => item.id));
    expect(uniqueIds.size).toBe(DataOrder.length);
  });

  it("should have unique IDs for QuestionType", () => {
    const uniqueIds = new Set(QuestionType.map((item) => item.id));
    expect(uniqueIds.size).toBe(QuestionType.length);
  });

  it("should have unique IDs for LANGUAGES", () => {
    const uniqueIds = new Set(LANGUAGES.map((item) => item.id));
    expect(uniqueIds.size).toBe(LANGUAGES.length);
  });

  it("should have unique names for DataOrder", () => {
    const uniqueNames = new Set(DataOrder.map((item) => item.name));
    expect(uniqueNames.size).toBe(DataOrder.length);
  });

  it("should have unique names for QuestionType", () => {
    const uniqueNames = new Set(QuestionType.map((item) => item.name));
    expect(uniqueNames.size).toBe(QuestionType.length);
  });

  it("should have unique names for LANGUAGES", () => {
    const uniqueNames = new Set(LANGUAGES.map((item) => item.name));
    expect(uniqueNames.size).toBe(LANGUAGES.length);
  });

  it("should have unique codes for LANGUAGES", () => {
    const uniqueCodes = new Set(LANGUAGES.map((item) => item.code));
    expect(uniqueCodes.size).toBe(LANGUAGES.length);
  });

  it("should have unique values for survey statuses", () => {
    const surveyStatuses = [
      SurveyStatusDraft,
      SurveyStatusInReview,
      SurveyStatusReady,
      SurveyStatusPublished,
      SurveyStatusStopped,
      SurveyStatusDeleted,
    ];

    const uniqueValues = new Set(surveyStatuses);
    expect(uniqueValues.size).toBe(surveyStatuses.length);
  });
});
