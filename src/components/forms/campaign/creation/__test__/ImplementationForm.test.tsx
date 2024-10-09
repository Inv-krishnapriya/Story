import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { useDispatch, useSelector } from "react-redux";
import {
  generalServices,
  researchService,
} from "../../../../../common/apiUrls";
import { act } from "react-dom/test-utils";
import { FormProvider, useForm } from "react-hook-form";
import ImplementationForm from "../ImplementationForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import userEvent from "@testing-library/user-event";
import AppTheme from "@/theme";

// Mock dependencies

const dummyDuration = [
  {
    id: "3109e00337b84f5fb432a37f7fab2eb4",
    duration: 30,
    ticketsCount: 1,
    monitorPoints: 3000,
  },
  {
    id: "9ff0821a3d0849fbb2d404a61990189c",
    duration: 60,
    ticketsCount: 2,
    monitorPoints: 4000,
  },
  {
    id: "0faf2e6491494f62bed7546f6cac77e9",
    duration: 90,
    ticketsCount: 3,
    monitorPoints: 5000,
  },
  {
    id: "5119c77693364602a572a5cccfefc6db",
    duration: 120,
    ticketsCount: 4,
    monitorPoints: 6000,
  },
];

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("123"), // mock campaignId
  }),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const dummyData = {
  errorCode: {
    research: "",
  },
  message: {
    research: "",
  },
  data: {
    id: "96b7edb373e64fb892747170a85562d7",
    title: "Test kattaa",
    hasScreening: true,
    startsAt: "2024-02-08T00:00:00Z",
    endsAt: "2024-02-22T00:00:00Z",
    interviewDurationId: "9ff0821a3d0849fbb2d404a61990189c",
    defaultLanguageId: "ja",
    monitorsCount: 20,
    screeningId: "1d8f58bc9fee413e8767673b3c973bdf",
    createdBy: "a5926abe76dc4195b7a58dae9733b2fe",
    ticketsCount: 40,
    timeslotsList: [
      {
        startTime: "2024-02-09T02:30:00Z",
        endTime: "2024-02-09T03:30:00Z",
        id: "3ecadc8a78a44b43bf26bf7d470cd033",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-09T03:30:00Z",
        endTime: "2024-02-09T04:30:00Z",
        id: "efda4e0a1cb2469eb3cda3bf09e86024",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-09T04:30:00Z",
        endTime: "2024-02-09T05:30:00Z",
        id: "de4cbb482c914b8f9ced11048cccd1ef",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-09T05:30:00Z",
        endTime: "2024-02-09T06:30:00Z",
        id: "481b54f828984abead2e9793b0b49796",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-10T02:30:00Z",
        endTime: "2024-02-10T03:30:00Z",
        id: "a864e0f3dc6b499d9fe4a18fbc924162",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-10T03:30:00Z",
        endTime: "2024-02-10T04:30:00Z",
        id: "d71f2a86dc3f449290248adc3f5b6c63",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-10T04:30:00Z",
        endTime: "2024-02-10T05:30:00Z",
        id: "ec11831fde0e4ca9b0d5ebbb4c27ae9c",
        status: 0,
        type: 0,
      },
    ],
    createdAt: "2024-02-08T09:45:54.728691Z",
    updatedAt: "2024-02-08T12:17:28.798562Z",
    duration: 60,
    rewardPoint: 4000,
    timezone: "Asia/Tokyo",
    includeCondition: "",
    excludeCondition: "",
    ngIndustries: "",
    status: 0,
    gender: 0,
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
    industries: [],
    timeslots: [],
    monitorsDetails: [],
    screening: {
      id: "1d8f58bc9fee413e8767673b3c973bdf",
      question: [
        {
          questionText: "Test",
          type: 1,
          order: 1,
          sequence: 1,
          options: [
            {
              id: "ab654ee453a84adeb8016cb15961a904",
              optionText: "test",
              order: 0,
              optionType: 1,
            },
          ],
          id: "fda3ad671539421ca7fc4dcd663b9be9",
          isRequired: false,
        },
      ],
      defaultLanguageId: "ja",
      order: 1,
      createdAt: "2024-02-08T12:17:29.026217Z",
      updatedAt: "2024-02-08T12:17:29.026253Z",
      clientId: "",
      status: 0,
    },
  },
  serviceHealth: {
    research: true,
    screening: true,
  },
};
const dummyStoreData = {
  totalAmount: 0,
  Campaign:
    '{"title":"Test","conditions":"","exclusion":"","ngIndustries":[],"monitorscount":40,"duration":"9ff0821a3d0849fbb2d404a61990189c","gender":0,"age":{"lower":"","upper":""},"prefecture":[],"married":0,"children":0,"personalIncome":{"lower":"","upper":""},"householdIncome":{"lower":"","upper":""},"profession":[],"screening":{"id":"8051db5924834b798a1bd355847d2a7c","question":[{"questionText":"ggg","type":1,"order":1,"sequence":1,"options":[{"id":"55a6ae8ed8fb4803b4621c0320fa1bed","optionText":"ggggg","order":0,"optionType": 1}],"id":"786d2dc467494ec6a02f1664160a9d8d","isRequired":false},{"questionText":"eeeeeee","type":3,"order":1,"sequence":2,"id":"3d8dd3217e3347eea5651248c1461eff","isRequired":false,"options":[]},{"questionText":"ee66666","type":3,"order":1,"sequence":3,"id":"0d6dc270cb7f4c999eeaf714469cfa18","isRequired":false,"options":[]}],"defaultLanguageId":"ja","order":1,"createdAt":"2024-02-09T05:25:59.693010Z","updatedAt":"2024-02-09T05:25:59.693071Z","clientId":"","status":0}}',
  campaignId: "0e2f77a1dc6d434dbc6d1237a8b06f77",
};
const dummyScheduleData = {
  selectedSlots: [
    {
      startTime: "11:30",
      endTime: "12:30",
      scheduledDate: "09-02-2024",
    },
    {
      startTime: "12:30",
      endTime: "13:30",
      scheduledDate: "09-02-2024",
    },
    {
      startTime: "13:30",
      endTime: "14:30",
      scheduledDate: "09-02-2024",
    },
  ],
  industries: [
    [
      {
        id: "a0ce515823f341f4aa27cdfd041320ad",
        name: "農業・林業・漁業・鉱業",
        order: 1,
      },
      {
        id: "a02ee5ff36244e71aa995403852d3dbd",
        name: "建設業",
        order: 2,
      },
      {
        id: "9992d6d174cf487b94cba595cb2495a7",
        name: "製造業(食料・飲料(酒類除く))",
        order: 3,
      },
    ],
  ],
  prefectures: [
    [
      {
        id: "1485e02513554025b04b5a885b9f3d3f",
        name: "香川県",
        order: 37,
      },
      {
        id: "58e2ca7ef7374b3bb28ac30b41972fca",
        name: "徳島県",
        order: 36,
      },
    ],
  ],
  profession: [
    [
      {
        id: "3109e00337b84f5fb432a37f7fab2eb4",
        name: "公務員",
        order: 1,
      },
      {
        id: "9ff0821a3d0849fbb2d404a61990189c",
        name: "経営者・役員",
        order: 2,
      },
      {
        id: "0faf2e6491494f62bed7546f6cac77e9",
        name: "会社員(事務系)",
        order: 3,
      },
      {
        id: "5119c77693364602a572a5cccfefc6db",
        name: "会社員(技術系)",
        order: 4,
      },
    ],
  ],
  durations: [
    [
      {
        id: "3109e00337b84f5fb432a37f7fab2eb4",
        duration: 30,
        ticketsCount: 1,
        monitorPoints: 3000,
      },
      {
        id: "9ff0821a3d0849fbb2d404a61990189c",
        duration: 60,
        ticketsCount: 2,
        monitorPoints: 4000,
      },
      {
        id: "0faf2e6491494f62bed7546f6cac77e9",
        duration: 90,
        ticketsCount: 3,
        monitorPoints: 5000,
      },
      {
        id: "5119c77693364602a572a5cccfefc6db",
        duration: 120,
        ticketsCount: 4,
        monitorPoints: 6000,
      },
    ],
  ],
  selectedDuration: 60,
  selectedSchedule: [
    {
      start: "2024-02-09T06:00:00.000Z",
      end: "2024-02-09T07:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-09T07:00:00.000Z",
      end: "2024-02-09T08:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-09T08:00:00.000Z",
      end: "2024-02-09T09:00:00.000Z",
      title: "",
    },
  ],
};
const dummyInterviewData = {
  interviewDates: {
    start: "2024-02-09T00:00:00.000Z",
    end: "2024-02-23T00:00:00.000Z",
  },
};

const dummyDashboardData = {
  dashboardDrawerStatus: true,
};

jest.mock("@/common/apiUrls", () => ({
  researchService: {
    getCampaigns: jest.fn(() =>
      Promise.resolve({
        data: {
          /* mock campaign data */
        },
      })
    ),
    getCampaignStatus: jest.fn(() =>
      Promise.resolve({
        data: {
          /* mock campaign data */
        },
      })
    ),
    updateCampaignDetail: jest.fn(() =>
      Promise.resolve({
        data: {},
      })
    ),
    getInterviewDuration: jest.fn(() =>
      Promise.resolve({
        data: {
          /* mock campaign data */
        },
      })
    ),
    getCampaignDetail: jest.fn(() =>
      Promise.resolve({
        data: {
          /* mock campaign data */
        },
      })
    ),
  },

  ticketService: {
    getUserDetails: jest.fn(() =>
      Promise.resolve({
        data: {
          /* mock user data */
        },
      })
    ),
  },
  generalServices: {
    getPrefectures: jest.fn(() =>
      Promise.resolve({
        data: {
          /* mock campaign data */
        },
      })
    ),
    getProfession: jest.fn(() =>
      Promise.resolve({
        data: {
          /* mock campaign data */
        },
      })
    ),
    getIndustries: jest.fn(() =>
      Promise.resolve({
        data: {
          /* mock campaign data */
        },
      })
    ),
  },
}));

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(({ children }: any) => <>{children}</>),
  };
});

jest.mock("axios");
// Write your tests

describe("ImplementationForm", () => {
  describe("Campaign updates ", () => {
    beforeAll(async () => {
      await act(async () => {
        (researchService.getCampaignDetail as any).mockResolvedValue({
          data: dummyData,
        });
        (researchService.getInterviewDuration as any).mockResolvedValue({
          data: {
            data: dummyDuration,
          },
        });

        (generalServices.getIndustries as any).mockResolvedValue({
          data: dummyScheduleData.industries,
        });
        (researchService.updateCampaignDetail as any).mockResolvedValue({
          status: 200,
        });
      });
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      (useSelector as jest.Mock).mockImplementation(
        (selector: (state: any) => any) =>
          selector({
            global: {
              isInPreviewMode: false,
            },
            data: dummyStoreData,
            schedule: dummyScheduleData,
            interviewdates: dummyInterviewData,
            dashboard: dummyDashboardData,
          })
      );
    });
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("open industry modal 1", () => {
      render(
        <AppTheme>
          <div id="main-container">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="ja"
              dateFormats={{ monthAndYear: "YYYY年MM月" }}
            >
              <WrapperForm>
                <ImplementationForm scheduleError="error" dateError="error" />
              </WrapperForm>
            </LocalizationProvider>
          </div>
        </AppTheme>
      );
      fireEvent.change(screen.getByTestId("interview.section2.monitorscount"), {
        target: { value: "hi" },
      });

      fireEvent.change(screen.getByTestId("interview.section2.duration"), {
        target: { value: "3109e00337b84f5fb432a37f7fab2eb4" },
      });

      userEvent.type(
        screen.getByTestId("mint-date-picker"),
        "2020010620200106",
        {
          delay: 1,
        }
      );
      const submitButton = screen.getByText("Submit");
      fireEvent.click(submitButton);
      //
    });

    // Add more tests as needed
  });

  describe("Campaign updates second", () => {
    beforeAll(async () => {
      await act(async () => {
        (researchService.getCampaignDetail as any).mockResolvedValue({
          data: dummyData,
        });
        (researchService.getCampaignDetail as any).mockResolvedValue({
          data: dummyDuration,
        });

        (generalServices.getIndustries as any).mockResolvedValue({
          data: dummyScheduleData.industries,
        });
        (researchService.updateCampaignDetail as any).mockResolvedValue({
          status: 200,
        });
      });
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      (useSelector as jest.Mock).mockImplementation(
        (selector: (state: any) => any) =>
          selector({
            global: {
              isInPreviewMode: false,
            },
            data: dummyStoreData,
            schedule: dummyScheduleData,
            interviewdates: {
              interviewDates: {
                start: "",
                end: "",
              },
            },
            dashboard: dummyDashboardData,
          })
      );
    });
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("open industry modal 2", async () => {
      render(
        <AppTheme>
          <div id="main-container">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="ja"
              dateFormats={{ monthAndYear: "YYYY年MM月" }}
            >
              <WrapperForm>
                <ImplementationForm scheduleError="error" dateError="error" />
              </WrapperForm>
            </LocalizationProvider>
          </div>
        </AppTheme>
      );
      fireEvent.change(screen.getByTestId("interview.section2.monitorscount"), {
        target: { value: "hi" },
      });

      fireEvent.change(screen.getByTestId("interview.section2.duration"), {
        target: { value: "3109e00337b84f5fb432a37f7fab2eb4" },
      });
      await userEvent.type(
        screen.getByTestId("mint-date-picker"),
        "2020010620200106",
        {
          delay: 1,
        }
      );
      const submitButton = screen.getByText("Submit");
      fireEvent.click(submitButton);
      //
    }, 10000);

    // Add more tests as needed
  });

  describe("Campaign updates second", () => {
    beforeAll(async () => {
      await act(async () => {
        (researchService.getCampaignDetail as any).mockResolvedValue({
          data: dummyData,
        });
        (researchService.getCampaignDetail as any).mockResolvedValue({
          data: dummyDuration,
        });

        (generalServices.getIndustries as any).mockResolvedValue({
          data: dummyScheduleData.industries,
        });
        (researchService.updateCampaignDetail as any).mockResolvedValue({
          status: 200,
        });
      });
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      (useSelector as jest.Mock).mockImplementation(
        (selector: (state: any) => any) =>
          selector({
            global: {
              isInPreviewMode: false,
            },
            data: {
              ...dummyStoreData,
              Campaign: {},
            },
            schedule: dummyScheduleData,
            interviewdates: {
              interviewDates: {
                start: "",
                end: "",
              },
            },
            dashboard: dummyDashboardData,
          })
      );
    });
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("open industry modal 3", async () => {
      render(
        <AppTheme>
          <div id="main-container">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="ja"
              dateFormats={{ monthAndYear: "YYYY年MM月" }}
            >
              <WrapperForm>
                <ImplementationForm scheduleError="error" dateError="error" />
              </WrapperForm>
            </LocalizationProvider>
          </div>
        </AppTheme>
      );
      fireEvent.change(screen.getByTestId("interview.section2.monitorscount"), {
        target: { value: "hi" },
      });

      fireEvent.change(screen.getByTestId("interview.section2.duration"), {
        target: { value: "3109e00337b84f5fb432a37f7fab2eb4" },
      });
      await userEvent.type(
        screen.getByTestId("mint-date-picker"),
        "2020010620200106",
        {
          delay: 1,
        }
      );
      const submitButton = screen.getByText("Submit");
      fireEvent.click(submitButton);
      //
    }, 10000);

    // Add more tests as needed
  });
});

const WrapperForm = ({ children }: any) => {
  const methods = useForm({
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        {children}
        <button onClick={methods.handleSubmit(() => {})} type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};
