import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AppTheme from "../../../../../theme";

import configureStore from "redux-mock-store";
import ScheduleSlotSelection from "../ScheduleSlotSelection";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
    '{"title":"Test","conditions":"","exclusion":"","ngIndustries":[],"monitorscount":40,"duration":"9ff0821a3d0849fbb2d404a61990189c","gender":0,"age":{"lower":"","upper":""},"prefecture":[],"married":0,"children":0,"personalIncome":{"lower":"","upper":""},"householdIncome":{"lower":"","upper":""},"profession":[],"screening":{"id":"8051db5924834b798a1bd355847d2a7c","question":[{"questionText":"ggg","type":1,"order":1,"sequence":1,"options":[{"id":"55a6ae8ed8fb4803b4621c0320fa1bed","optionText":"ggggg","order":0,"optionType": 1,}],"id":"786d2dc467494ec6a02f1664160a9d8d","isRequired":false},{"questionText":"eeeeeee","type":3,"order":1,"sequence":2,"id":"3d8dd3217e3347eea5651248c1461eff","isRequired":false,"options":[]},{"questionText":"ee66666","type":3,"order":1,"sequence":3,"id":"0d6dc270cb7f4c999eeaf714469cfa18","isRequired":false,"options":[]}],"defaultLanguageId":"ja","order":1,"createdAt":"2024-02-09T05:25:59.693010Z","updatedAt":"2024-02-09T05:25:59.693071Z","clientId":"","status":0}}',
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
  ],
  industries: [],
  prefectures: [],
  profession: [],
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
  ],
};
const dummyInterviewData = {
  interviewDates: {
    start: "2024-02-09T00:00:00.000Z",
    end: "2024-02-23T00:00:00.000Z",
  },
};
const dummyUserData = {
  tickets: {
    availableTickets: 238,
    lockedTickets: 78,
    unlockedTickets: 160,
  },
  campaigns: {
    draftedCampaign: 90,
    publishedCampaign: 18,
  },
};
const dummyDashboardData = {
  dashboardDrawerStatus: true,
};

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("dragselect", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  }),
}));
describe("ScheduleSlotSelection component", () => {
  beforeAll(() => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          global: {
            isInPreviewMode: false,
            publishedCampaign: 15,
          },
          data: {
            ...dummyStoreData,
            Campaign:
              '{"title":"Test","conditions":"","exclusion":"","ngIndustries":[],"monitorscount":40,"duration":"9ff0821a3d0849fbb2d404a61990189c","gender":0,"age":{"lower":null,"upper":null},"prefecture":[],"married":0,"children":0,"personalIncome":{"lower":null,"upper":null},"householdIncome":{"lower":null,"upper":null},"profession":[],"screening":{"id":"8051db5924834b798a1bd355847d2a7c","question":[{"questionText":"ggg","type":1,"order":1,"sequence":1,"options":[{"id":"55a6ae8ed8fb4803b4621c0320fa1bed","optionText":"ggggg","order":0,"optionType": 1,}],"id":"786d2dc467494ec6a02f1664160a9d8d","isRequired":false},{"questionText":"eeeeeee","type":3,"order":1,"sequence":2,"id":"3d8dd3217e3347eea5651248c1461eff","isRequired":false,"options":[]},{"questionText":"ee66666","type":3,"order":1,"sequence":3,"id":"0d6dc270cb7f4c999eeaf714469cfa18","isRequired":false,"options":[]}],"defaultLanguageId":"ja","order":1,"createdAt":"2024-02-09T05:25:59.693010Z","updatedAt":"2024-02-09T05:25:59.693071Z","clientId":"","status":0}}',
          },
          schedule: dummyScheduleData,
          interviewdates: dummyInterviewData,
          dashboard: dummyDashboardData,
        })
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
    delete (window as any).matchMedia;
  });

  test("renders without crashing", () => {
    render(
      <AppTheme>
        <ScheduleSlotSelection
          data={{ durationSelected: 30, availableSlot: 5 }}
        />
      </AppTheme>
    );
  });

  // Add more test cases as needed...
});
