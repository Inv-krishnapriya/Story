import { fireEvent, render } from "@testing-library/react";
import PrefectureModal from "../campaign/creation/PrefectureModal";
import { PrefectureResponse } from "@/common/types";
import AppTheme from "../../../theme";
describe("PrefectureModal component", () => {
  const prefectures: PrefectureResponse[] = [
    {
      id: "1",
      name: "Prefecture 1",
      order: "1",
      prefectures: [{ id: "1", name: "Subprefecture 1", order: 1 }],
    },
    {
      id: "2",
      name: "Prefecture 2",
      order: "2",
      prefectures: [{ id: "3", name: "Subprefecture 3", order: 1 }],
    },
    // Add more prefectures if needed
  ];

  it("should render with all elements", () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    const { getByText, getByLabelText } = render(
      <AppTheme>
        <PrefectureModal
          prefectures={prefectures}
          open={true}
          handleClose={handleClose}
          checked={[]}
          handleSubmit={handleSubmit}
        />
      </AppTheme>
    );
  });

  // Add more test cases for other functionalities if needed
});
