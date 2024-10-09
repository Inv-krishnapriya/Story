import { render, act, screen, fireEvent } from "@testing-library/react";
import CampaignDetails from "../campaign/details/[id]/page";
import AppTheme from "../../../theme";
import { useTranslation } from "react-i18next";
import { customerService } from "@/common/apiUrls";
import { useSelector } from "react-redux";
import configureStore from 'redux-mock-store';

const { t } = useTranslation();
const mockStore = configureStore([]);

jest.mock("swiper/react", () => ({
  Swiper: () => jest.fn(),
  SwiperSlide: () => jest.fn(),
}));

jest.mock("swiper/css", () => jest.fn());

jest.mock("swiper/css/navigation", () => jest.fn());

jest.mock("swiper/modules", () => ({
  Navigation: () => jest.fn(),
  Autoplay: () => jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/common/apiUrls", () => ({
  customerService: {
    getPublishedCampaignDetails: jest.fn(() =>
      Promise.resolve({
        data: {
          /* mock campaign data */
        },
      })
    ),
    getFilterData: jest.fn(() =>
      Promise.resolve({
        data: {
          /* mock campaign data */
        },
      })
    ),
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useParams: jest.fn().mockReturnValue({ id: 123456 }),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});

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
    updatedAt: "2024-02-publishedDetails01T07:34:26.553552Z",
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

jest.mock("@/common/apiUrls", () => ({
  customerService: {
    getPublishedCampaignDetails: jest.fn(() => Promise.resolve({ data: {} })),
    getFilterData: jest.fn(() => Promise.resolve({ data: {} })),
  },
  generalServices: {
    getProfession: jest.fn(() => Promise.resolve({ data: {} })),
    getPrefectures: jest.fn(() => Promise.resolve({ data: {} })),
  },
}));

describe("campaign details", () => {
  beforeEach(async () => {
    await act(async () => {
      (
        customerService.getPublishedCampaignDetails as jest.Mock
      ).mockResolvedValue({
        data: { data: publishedDetails },
      });

      (customerService.getFilterData as jest.Mock).mockResolvedValue({
        data: { data: publishedDetails },
      });
    });

    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          data: {
            campaignDetails: publishedDetails,
          },
          campaign: {
            monitorData: {},
          },
        })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <CampaignDetails />
        </AppTheme>
      );
    });

    expect(
      screen.getByText(t("campaign.campaignDetail.checkProjectDetails"))
    ).toBeInTheDocument();
  });

  test("tab second", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <CampaignDetails />
        </AppTheme>
      );
    });

    expect(
      screen.getByText(t("campaign.campaignDetail.checkProjectDetails"))
    ).toBeInTheDocument();

    screen.debug();
  });
  
});

describe('CampaignDetails Pagination', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      data: {
        campaignDetails: {},
        campaignDetailsPagination: { totalPages: 5 },
      },
      campaign: {
        monitorData: {},
        isDrawerOpen: false,
      },
    });
  });

  
test('calls getPublishedCampaignDetails on page change', async () => {
  const getPublishedCampaignDetailsMock = jest.spyOn(customerService, 'getFilterData');
  render(
    <AppTheme><CampaignDetails /></AppTheme>
        
      
  );
  expect(getPublishedCampaignDetailsMock).toHaveBeenCalled();
  const page2Button = screen.getByRole('button', { name: /1/i });

  // Simulate a click event on the page 2 button
  fireEvent.click(page2Button);
    expect(getPublishedCampaignDetailsMock).toHaveBeenCalledTimes(2);
    console.log(getPublishedCampaignDetailsMock.mock.calls);
    expect(getPublishedCampaignDetailsMock).toHaveBeenNthCalledWith(
      1,
      expect.any(Number),
      expect.objectContaining({ currentPage: undefined, status: 1 }),
      
    );
    expect(getPublishedCampaignDetailsMock).toHaveBeenNthCalledWith(
      2,
      expect.any(Number),
      expect.objectContaining({ currentPage:1, status: 1 })
    );
    
    
  
});

});
