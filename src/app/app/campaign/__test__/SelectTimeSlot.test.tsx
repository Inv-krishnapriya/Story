import { render, screen } from "@testing-library/react";
import { SelectTimeSlots } from "../details/[id]/SelectTimeSlots";
import AppTheme from "@/theme";

describe("Select Time Slot Component", () => {
  it("Should render properly if limit has not reached", () => {
    render(
      <AppTheme>
        <SelectTimeSlots
          limitReached={false}
          value="100"
          options={[]}
          onChange={jest.fn()}
        />
      </AppTheme>
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("Should not render if limit has not reached", () => {
    render(
      <AppTheme>
        <SelectTimeSlots
          limitReached={true}
          value="100"
          options={[]}
          onChange={jest.fn()}
        />
      </AppTheme>
    );

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });
});
