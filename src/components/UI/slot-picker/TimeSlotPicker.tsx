import React, { useRef } from "react";
import TimeSlotContainer from "./TimeSlotContainer";
import { DragSelectProvider } from "./drag/DragProvider";
import { Box } from "@mui/material";

interface ITimeSlotPickerProps {
  minDate: string;
  maxDate: string;
  slotDuration: number;
  eventsSlots: { scheduledDate: string; startTime: string; endTime: string }[];
  maxSlots: number;
  handleSlotChange: (data: any) => void;
  handleResetAll: (data: any) => void;
}
function TimeSlotPicker(props: ITimeSlotPickerProps) {
  const {
    minDate,
    maxDate,
    slotDuration,
    eventsSlots,
    maxSlots,
    handleSlotChange,
    handleResetAll,
  } = props;
  const targetRef = useRef<any>(null);
  return (
    <Box key={`${minDate}-${maxDate}`}>
      <DragSelectProvider
        settings={{
          area: targetRef?.current,
          draggability: false,
        }}
      >
        <TimeSlotContainer
          minDate={minDate}
          maxDate={maxDate}
          slotDuration={slotDuration}
          eventsSlots={eventsSlots}
          maxSlots={maxSlots}
          handleSlotChange={handleSlotChange}
          handleResetAll={handleResetAll}
          targetRef={targetRef}
        />
      </DragSelectProvider>
    </Box>
  );
}

export default React.memo(TimeSlotPicker);
