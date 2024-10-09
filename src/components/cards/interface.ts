export interface ISurveyListCard {
  item: any;
  onDelete: (
    index: number,
    id: string,
    onSuccessMessage: () => void,
    onFailMessage: () => void
  ) => void;
  onSurveyStatusChange: (
    id: string,
    status: number,
    togglePlay: () => void,
    setSurveyStatus: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  index: number;
  handleEdit: (status: number, id: string) => void;
  handleResponse: (id: string) => void;
}
