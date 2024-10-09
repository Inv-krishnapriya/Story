import { act, fireEvent, render, screen } from "@testing-library/react";
import AppTheme from "../../../theme";
import HomePage from "../home/page";
import { customerService } from "@/common/apiUrls";
import { useDispatch } from "react-redux";

const notificationList = [
  {
    id: "df52e4e527854c349d353b071918f38f",
    title: "New message from monitor1",
    body: "Monitor from test video interview has sent you a message",
    sender: "d145798efe1043beb3ab50d00104e1f1",
    receiver: "d7206b5d30554cb1a382fb6f230b1812",
    readStatus: true,
    interviewId: "4b7a7e20a2154e2a966d769485cfeab6",
    notificationType: 7,
    category: 2,
    createdAt: "2024-02-12T10:14:43.728877Z",
    updatedAt: "2024-02-12T10:14:43.728938Z",
  },
  {
    id: "71a86b4cb77848dd91be57ca5f3f3418",
    title: "New message from monitor2",
    body: "Monitor from test video interview has sent you a message",
    sender: "c0abef3c9cdd49aaa89e89e9fccb9e5e",
    receiver: "d7206b5d30554cb1a382fb6f230b1812",
    readStatus: true,
    interviewId: "4b7a7e20a2154e2a966d769485cfeab6",
    notificationType: 7,
    category: 1,
    createdAt: "2024-02-12T10:14:41.866012Z",
    updatedAt: "2024-02-12T10:14:41.866041Z",
  },
  {
    id: "309a99c8947d4511abcbc587ca73febc",
    title: "New message from monitor",
    body: "Monitor from test video interview has sent you a message",
    sender: "c0abef3c9cdd49aaa89e89e9fccb9e5e",
    receiver: "d7206b5d30554cb1a382fb6f230b1812",
    readStatus: true,
    interviewId: "4b7a7e20a2154e2a966d769485cfeab6",
    notificationType: 7,
    category: 2,
    createdAt: "2024-02-12T10:14:39.499089Z",
    updatedAt: "2024-02-12T10:14:39.499123Z",
  },
  {
    id: "70ad5b967a7a407a91f7de2d499bbe5a",
    title: "New message from monitor",
    body: "Monitor from test video interview has sent you a message",
    sender: "c0abef3c9cdd49aaa89e89e9fccb9e5e",
    receiver: "d7206b5d30554cb1a382fb6f230b1812",
    readStatus: true,
    interviewId: "4b7a7e20a2154e2a966d769485cfeab6",
    notificationType: 7,
    category: 2,
    createdAt: "2024-02-12T10:14:37.058641Z",
    updatedAt: "2024-02-12T10:14:37.058699Z",
  },
  {
    id: "56b5ec788df845e091dbeff3c4fd5aad",
    title: "New message from monitor",
    body: "Monitor from test video interview has sent you a message",
    sender: "c0abef3c9cdd49aaa89e89e9fccb9e5e",
    receiver: "d7206b5d30554cb1a382fb6f230b1812",
    readStatus: true,
    interviewId: "4b7a7e20a2154e2a966d769485cfeab6",
    notificationType: 7,
    category: 2,
    createdAt: "2024-02-12T10:14:34.588170Z",
    updatedAt: "2024-02-12T10:14:34.588230Z",
  },
  {
    id: "6a31a6a9ccd04c028a973f9f6e64bb69",
    title: "New message from monitor",
    body: "Monitor from test video interview has sent you a message",
    sender: "c0abef3c9cdd49aaa89e89e9fccb9e5e",
    receiver: "d7206b5d30554cb1a382fb6f230b1812",
    readStatus: true,
    interviewId: "4b7a7e20a2154e2a966d769485cfeab6",
    notificationType: 7,
    category: 2,
    createdAt: "2024-02-12T10:14:31.889969Z",
    updatedAt: "2024-02-12T10:14:31.890000Z",
  },
  {
    id: "b7ca78fb99cf4738a57a3471f569a007",
    title: "New message from monitor",
    body: "Monitor from test video interview has sent you a message",
    sender: "c0abef3c9cdd49aaa89e89e9fccb9e5e",
    receiver: "d7206b5d30554cb1a382fb6f230b1812",
    readStatus: true,
    interviewId: "4b7a7e20a2154e2a966d769485cfeab6",
    notificationType: 7,
    category: 2,
    createdAt: "2024-02-12T10:14:29.786083Z",
    updatedAt: "2024-02-12T10:14:29.786144Z",
  },
  {
    id: "b2531ea74c0146b59d8b504de13925c8",
    title: "New message from monitor",
    body: "Monitor from test video interview has sent you a message",
    sender: "c0abef3c9cdd49aaa89e89e9fccb9e5e",
    receiver: "d7206b5d30554cb1a382fb6f230b1812",
    readStatus: true,
    interviewId: "4b7a7e20a2154e2a966d769485cfeab6",
    notificationType: 7,
    category: 2,
    createdAt: "2024-02-12T10:14:27.917350Z",
    updatedAt: "2024-02-12T10:14:27.917409Z",
  },
  {
    id: "5c2c91c0e39c406cb98c076a9b982ef9",
    title: "New message from monitor",
    body: "Monitor from test video interview has sent you a message",
    sender: "c0abef3c9cdd49aaa89e89e9fccb9e5e",
    receiver: "d7206b5d30554cb1a382fb6f230b1812",
    readStatus: true,
    interviewId: "4b7a7e20a2154e2a966d769485cfeab6",
    notificationType: 7,
    category: 2,
    createdAt: "2024-02-12T10:14:25.097818Z",
    updatedAt: "2024-02-12T10:14:25.097852Z",
  },
  {
    id: "10b48004f473449a9584d43d221aa2f0",
    title: "New message from monitor",
    body: "Monitor from test video interview has sent you a message",
    sender: "c0abef3c9cdd49aaa89e89e9fccb9e5e",
    receiver: "d7206b5d30554cb1a382fb6f230b1812",
    readStatus: true,
    interviewId: "4b7a7e20a2154e2a966d769485cfeab6",
    notificationType: 7,
    category: 2,
    createdAt: "2024-02-12T10:14:22.859559Z",
    updatedAt: "2024-02-12T10:14:22.859618Z",
  },
];

const todaysList = [
  {
    id: "0d4c25e9c08c4d598dbc6bb6d485f71d",
    startsAt: "12:30",
    endsAt: "13:00",
    title: "new test2",
    monitorId: "45186360923e4a58b59410b4b9b60a2b",
    nickName: "Monitor A",
  },
];

const publishedDetails = {
  id: "fc950c1dda7e4501bf954a3313925e1f",
  title: "sdds",
  includeCondition: "dsfd",
  hasScreening: true,
  startsAt: "2024-02-01T00:00:00Z",
  endsAt: "2024-03-02T00:00:00Z",
  status: 2,
  interviewDurationId: "3109e00337b84f5fb432a37f7fab2eb4",
  defaultLanguageId: "ja",
  gender: 1,
  monitorsCount: 4,
  screeningId: "7f0b5fcc93334a41818bc0357a41a577",
  createdBy: "d7206b5d30554cb1a382fb6f230b1812",
  ticketsCount: 4,
  industries: ["農業・林業・漁業・鉱業"],
  timeslotsList: [
    {
      startTime: "01-02-2024 14:30",
      endTime: "01-02-2024 15:00",
      id: "a2b76f04a34b4955b05a2e4b139efdc2",
      status: 1,
      type: 1,
    },
    {
      startTime: "01-02-2024 17:00",
      endTime: "01-02-2024 17:30",
      id: "00b9e934eee44ef994a71fd68df39b92",
      status: 0,
      type: 0,
    },
    {
      startTime: "03-02-2024 11:00",
      endTime: "03-02-2024 11:30",
      id: "060f30eaa6d447b98ed4f82a12bca735",
      status: 0,
      type: 0,
    },
    {
      startTime: "03-02-2024 14:30",
      endTime: "03-02-2024 15:00",
      id: "36c4411b74c4450481bf7d486fee4f96",
      status: 0,
      type: 0,
    },
    {
      startTime: "04-02-2024 19:30",
      endTime: "04-02-2024 20:00",
      id: "29ebcd2ece6a42beb31abf3756e29b6a",
      status: 0,
      type: 0,
    },
  ],
  createdAt: "2024-02-01T07:34:26.555215Z",
  updatedAt: "2024-02-01T07:34:28.131883Z",
  duration: 30,
  rewardPoint: 3000,
  excludeCondition: "",
  ngIndustries: "",
  maritalStatus: 0,
  hasChildren: 0,
  personalIncomeStart: 0,
  personalIncomeEnd: 0,
  householdIncomeStart: 0,
  householdIncomeEnd: 0,
  ageFrom: 0,
  ageTo: 0,
  prefectures: [],
  occupation: [],
  timeslots: [],
  screening: {
    id: "7f0b5fcc93334a41818bc0357a41a577",
    question: [
      {
        questionText: "question1",
        type: 1,
        order: 1,
        sequence: 1,
        options: [
          {
            id: "4b8e7a85f5c24fcd90eba5456e2e88c6",
            optionText: "sdfdsf",
            order: 0,
            optionType: 1,
          },
          {
            id: "5666be8dd045431cba8de8184a737594",
            optionText: "dfdsf",
            order: 0,
            optionType: 1,
          },
        ],
        id: "a20e2556badf4c6481c62c3ce7edf8f6",
        isRequired: false,
      },
      {
        questionText: "asdssf",
        type: 2,
        order: 1,
        sequence: 2,
        options: [
          {
            id: "5f7330adf2db481197894833a7068b1d",
            optionText: "dsf",
            order: 0,
            optionType: 1,
          },
          {
            id: "72420e8bf30c49d69a15b37b95523d55",
            optionText: "dsfds",
            order: 0,
            optionType: 1,
          },
        ],
        id: "91aa245e94854bc09f0c98d01b3ca26a",
        isRequired: false,
      },
    ],
    status: 1,
    defaultLanguageId: "ja",
    order: 1,
    createdAt: "2024-02-01T07:34:26.553486Z",
    updatedAt: "2024-02-01T07:34:26.553552Z",
    clientId: "",
  },
  monitors: [
    {
      id: "d145798efe1043beb3ab50d00104e1f1",
      nickName: "QA-NickName1",
      createdAt: "2024-02-01T00:00:05.471382Z",
      updatedAt: "2024-02-01T00:00:05.472136Z",
      profileLanguageId: "ja",
      isMarried: 2,
      hasChildren: 2,
      personalIncome: "400 - 600",
      householdIncome: "600 - 800",
      age: 31,
      ageCode: 5,
      numHousemate: 4,
      hasHousemateEtc: 1,
      hasMobileServiceProvider1: 1,
      hasDriverLicense: 1,
      hasOwnCar: 1,
      hasDrinkingHabit: 1,
      financialAsset: 1,
      useSns1: 1,
      useSns2: 1,
      useSns3: 1,
      useSns4: 1,
      useSns5: 1,
      gender: 1,
      prefecture: "岡山県",
      area: "area 4",
      occupation: "会社員(その他)",
      industry: "農業・林業・漁業・鉱業",
      firstName: "",
      lastName: "",
      noOfAttempts: 0,
      lockReleasedAt: "",
      phoneNumber: "",
      studentType: 0,
      hasHousematePartner: 0,
      hasHousemateChild: 0,
      hasHousemateParent: 0,
      hasHousemateSibling: 0,
      hasHousemateGrandparent: 0,
      hasHousemateOtherFamily: 0,
      numChild: 0,
      hasHousemateGrandson: 0,
      birthOldestChild: "",
      birthOldestChildMmdd: "",
      ageOldestChild: 0,
      birthYoungestChild: "",
      birthYoungestChildMmdd: "",
      ageYoungestChild: 0,
      hasMobileServiceProvider2: 0,
      hasMobileServiceProvider3: 0,
      hasMobileServiceProvider4: 0,
      hasMobileServiceProvider5: 0,
      email: "",
      mid: "",
      answer: [["sdfdsf"], ["dsfds"]],
      monitorStatus: 6,
      memo: "",
      scheduledDate: null,
      unreadCount: 0,
      timeSlotDetails: {
        id: "a2b76f04a34b4955b05a2e4b139efdc2",
        scheduledDate: "2024-02-01 00:00:00+00:00",
        startTime: "14:30",
        endTime: "15:00",
        status: 1,
        type: 1,
        consumedStatus: 1,
      },
      meetingDetails: {
        meetingId:
          "fc950c1dda7e4501bf954a3313925e1f-d145798efe1043beb3ab50d00104e1f1",
        startTime: "2024-02-01T06:30:00.000000+0000",
        endTime: "2024-02-02T15:00:00.000000+0000",
        meetingName: "sdds",
        status: "0",
        link: "https://front-customer-sa.ip-poc.com/video-chat/auth/login?meetingId=fc950c1dda7e4501bf954a3313925e1f-d145798efe1043beb3ab50d00104e1f1",
        id: "230717579",
        passCode: "285956",
      },
    },
  ],
};

jest.mock("axios");
jest.mock("../../../common/apiUrls", () => ({
  customerService: {
    getNotificationList: jest.fn(() => Promise.resolve({ data: { data: "" } })),
    getTodaysInterviewList: jest.fn(() =>
      Promise.resolve({ data: { data: "" } })
    ),
    getPublishedCampaignDetails: jest.fn(() =>
      Promise.resolve({ data: { data: "" } })
    ),
    getFilterData: jest.fn(() => Promise.resolve({ data: { data: "" } })),
  },
}));
jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useParams: jest.fn().mockReturnValue({ id: 123456 }),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
describe("Home page", () => {
  beforeAll(() => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });
  beforeEach(async () => {
    await act(async () => {
      (customerService.getNotificationList as jest.Mock).mockResolvedValue({
        data: { data: notificationList },
      });
      (customerService.getTodaysInterviewList as jest.Mock).mockResolvedValue({
        data: { data: todaysList },
      });
      (
        customerService.getPublishedCampaignDetails as jest.Mock
      ).mockResolvedValue({
        data: { data: publishedDetails },
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <HomePage />
        </AppTheme>
      );
    });

    expect(screen.getByText("New message from monitor1")).toBeInTheDocument();
  });

  test("notification click", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <HomePage />
        </AppTheme>
      );
    });
    fireEvent.click(screen.getByText("New message from monitor1"));
  });

  test("notiification click on category 1", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <HomePage />
        </AppTheme>
      );
    });
    fireEvent.click(screen.getByTestId("go-to-schedule"));
  });
});
