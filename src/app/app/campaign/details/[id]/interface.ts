interface IMonitorDetail {
  memo?: string;
  gender?: number;
  age?: number;
  occupation?: string;
  prefecture?: string;
}

interface IScheduleInfo {
  url: string;
  id: string;
  passcode: string;
  meetingId: string;
}

interface IMonitorData {
  campaignId: string;
  id: string;
  name?: string;
  status: number;
  confirmedStatus: number;
  timeslotsList?: any;
  answers?: { questionText: string; answer?: string }[];
  monitorDetail: IMonitorDetail;
  meetingDetails: IScheduleInfo;
  scheduleConfirmationDetails: any;
  unreadCount: number;
}

interface IDrawerProps {
  closeDrawer: () => void;
  open: boolean;
  campaignDetail: {
    campaignId: string;
    duration: number;
    startDate: string;
    endDate: string;
  };
  limitReached: boolean;
  monitorData: IMonitorData;
  handleCampaign: (id: string) => void;
}

interface IScheduleOfferDateProp {
  selected: string[];
  setSelected: (state: string[]) => void;
  timeslotsList: {
    startTime: string;
    endTime: string;
    id: string;
    status: number;
  }[];
  consumedTimeSlots: any;
  limitReached: boolean;
  monitorStatus: number;
}

interface IScheduleDate {
  startTime: string;
  endTime: string;
  scheduledDate: string;
}

interface ISelectOfferDateProp {
  timeslotsList: {
    startTime: string;
    endTime: string;
    id: string;
    status: number;
    type: number
  }[];
  scheduledDate: IScheduleDate[];
  setScheduledDate: (state: IScheduleDate[]) => void;
  duration: number;
  consumedTimeSlots: any;
  setSelected: (state: IScheduleDate[]) => void;
  selected: IScheduleDate[] | [];
  campaignDetail: {
    startDate: string;
    endDate: string;
  };
  limitReached: boolean;
}
