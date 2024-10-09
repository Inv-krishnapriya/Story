import { act, fireEvent, render, screen } from "@testing-library/react";
import DeliveryDetailsPage from "../delivery/[id]/page";
import AppTheme from "../../../theme";
import { videoChatService, researchService } from "@/common/apiUrls";
import { useSelector } from "react-redux";
import screenfull from "screenfull";

const mockDeliveryDetails = {
  basics: {
    title: "recording and screening ",
    status: 2,
    startsAt: "2024-02-29T00:00:00Z",
    endsAt: "2024-03-14T00:00:00Z",
    monitorsCount: 12,
    duration: 30,
    rewardPoint: 3000,
    includeCondition: "sample ",
    excludeCondition: "",
    industries: [],
    gender: 0,
    maritalStatus: 0,
    hasChildren: 0,
    occupation: [],
    prefectures: [],
    hasScreening: true,
    screeningId: "279796a0575e426da1810fb7011fd19f",
    timeslotsList: [
      {
        startTime: "2024-02-29T10:30:00Z",
        endTime: "2024-02-29T11:00:00Z",
        id: "8c21565473594b21b3778e17f21a1ea5",
        status: 1,
        type: 0,
      },
    ],
    monitorsDetails: [
      {
        id: "3c86a6e305944464b2b1217dedcd3814",
        status: 2,
        timeSlotDetails: {
          id: "571f976d945f43b2bcfbff6e65adcd2d",
          startTime: "2024-02-29T11:00:00Z",
          endTime: "2024-02-29T11:30:00Z",
          status: 1,
          consumedStatus: 1,
          type: 0,
        },
        memo: "",
        unreadCount: 0,
      },
      {
        id: "c0abef3c9cdd49aaa89e89e9fccb9e5e",
        status: 2,
        memo: "dgfdgdfgdfg",
        timeSlotDetails: {
          id: "8c21565473594b21b3778e17f21a1ea5",
          startTime: "2024-02-29T10:30:00Z",
          endTime: "2024-02-29T11:00:00Z",
          status: 1,
          consumedStatus: 7,
          type: 0,
        },
        unreadCount: 0,
      },
    ],
    timezone: "Asia/Calcutta",
    ngIndustries: [],
    personalIncomeStart: 0,
    personalIncomeEnd: 0,
    householdIncomeStart: 0,
    householdIncomeEnd: 0,
    ageFrom: 0,
    ageTo: 0,
    id: "b56dbb29555d4f9a9d0b021edfa760b8",
    defaultLanguageId: "ja",
    screening: {
      id: "279796a0575e426da1810fb7011fd19f",
      question: [
        {
          questionText: "sample",
          type: 1,
          isRequired: true,
          order: 1,
          sequence: 1,
          options: [
            {
              id: "ae4615fa83b3406186ace251dd4aa3ee",
              optionText: "123",
              order: 1,
              optionType: 1,
            },
            {
              id: "2b4f19339b504839a270567ecc001423",
              optionText: "345",
              order: 2,
              optionType: 1,
            },
            {
              id: "1001ee094ad14df0a4f53411e6b4bcc3",
              optionText: "その他",
              order: 4,
              optionType: 3,
            },
            {
              id: "8d088c5126184ed7932f37b604df667c",
              optionText: "当てはまるものはない",
              order: 5,
              optionType: 2,
            },
          ],
          id: "bf3dd8b6b5d943d4a09bdf16249a05c7",
        },
      ],
      status: 1,
      defaultLanguageId: "ja",
      order: 1,
      createdAt: "2024-02-29T10:01:12.600476Z",
      updatedAt: "2024-02-29T10:01:12.600513Z",
      answers: "[]",
      clientId: "",
    },
  },
  videos: [
    {
      recordingId: "8f2f48d11ad04d68bfed8405390b9122",
      recordingLink:
        "757127439/bfc4376e2a4464b1984d1692cbf073d0_757127439.m3u8",
      recordingName: "recording and screening ",
      recordingStartTime: "2024-02-29T11:02:01.851713+00:00",
      recordingEndTime: "2024-02-29T11:04:26.003228+00:00",
      meetingId:
        "b56dbb29555d4f9a9d0b021edfa760b8-3c86a6e305944464b2b1217dedcd3814",
      monitorId: "3c86a6e305944464b2b1217dedcd3814",
      screeningId: "279796a0575e426da1810fb7011fd19f",
      monitorName: "jinu t j　こにちわｗたしわジヌです",
      recordingDuration: 0,
      monitorDetails: {
        id: "3c86a6e305944464b2b1217dedcd3814",
        nickName: "jinu t j　こにちわｗたしわジヌです",
        createdAt: "2024-02-15T10:45:34.083813Z",
        updatedAt: "2024-02-15T10:45:34.084677Z",
        profileLanguageId: "ja",
        isMarried: 1,
        hasChildren: 1,
        age: 26,
        ageCode: 4,
        numHousemate: 4,
        hasHousemateParent: 1,
        hasHousemateSibling: 1,
        hasMobileServiceProvider2: 1,
        hasDriverLicense: 1,
        hasOwnCar: 1,
        hasDrinkingHabit: 1,
        gender: 1,
        prefecture: "山梨県",
        area: "中部地方",
        occupation: "会社員(事務系)",
        industry: "農業・林業・漁業・鉱業",
        firstName: "",
        lastName: "",
        noOfAttempts: 0,
        lockReleasedAt: "",
        phoneNumber: "",
        personalIncome: "",
        householdIncome: "",
        studentType: 0,
        hasHousematePartner: 0,
        hasHousemateChild: 0,
        hasHousemateGrandparent: 0,
        hasHousemateOtherFamily: 0,
        hasHousemateEtc: 0,
        numChild: 0,
        hasHousemateGrandson: 0,
        birthOldestChild: "",
        birthOldestChildMmdd: "",
        ageOldestChild: 0,
        birthYoungestChild: "",
        birthYoungestChildMmdd: "",
        ageYoungestChild: 0,
        hasMobileServiceProvider1: 0,
        hasMobileServiceProvider3: 0,
        hasMobileServiceProvider4: 0,
        hasMobileServiceProvider5: 0,
        financialAsset: 0,
        useSns1: 0,
        useSns2: 0,
        useSns3: 0,
        useSns4: 0,
        useSns5: 0,
        email: "",
        mid: "",
      },
      memo: "",
    },
  ],
};

jest.mock("screenfull", () => ({
  isEnabled: true,
  isFullscreen: false,
  toggle: jest.fn(),
  on: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useParams: jest.fn().mockReturnValue({ id: 123456 }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../../common/apiUrls", () => ({
  videoChatService: {
    getDeliveryDetails: jest.fn(() => Promise.resolve({ data: { data: "" } })),
  },
  researchService: {
    getMonitorScreeningDetails: jest.fn(() =>
      Promise.resolve({ data: { data: {} } })
    ),
  },
}));

jest.mock("react-player/lazy", () => {
  return jest.fn().mockImplementation((props) => {
    return <div className="react-player">{props.url}</div>;
  });
});

describe("Delivery details page", () => {
  beforeEach(async () => {
    await act(async () => {
      videoChatService.getDeliveryDetails.mockResolvedValue({
        data: { data: mockDeliveryDetails },
      });
      researchService.getMonitorScreeningDetails.mockResolvedValue({
        data: {
          data: {
            // monitor:{},
            screening: [],
          },
        },
      });
    });
    useSelector.mockImplementation((selector) =>
      selector({
        global: {
          clientData: {
            accessToken: "token",
          },
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
          <DeliveryDetailsPage />
        </AppTheme>
      );
    });

    expect(screen.getByText("インタビュー動画一覧に戻る")).toBeInTheDocument();
  });
});

describe("Delivery Details full screen", () => {
  beforeEach(async () => {
    await act(async () => {
      videoChatService.getDeliveryDetails.mockResolvedValue({
        data: { data: mockDeliveryDetails },
      });
      researchService.getMonitorScreeningDetails.mockResolvedValue({
        data: {
          data: {
            // monitor:{},
            screening: [],
          },
        },
      });
      // screenfull.on("change").mockResolvedValue({

      // })
    });
    useSelector.mockImplementation((selector) =>
      selector({
        global: {
          clientData: {
            accessToken: "token",
          },
        },
      })
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render full screen", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <DeliveryDetailsPage />
        </AppTheme>
      );
    });
    await act(async () => {
      const fullscreenButton = screen.getByTestId("make-fullscreen");
      fireEvent.click(fullscreenButton);
      screenfull.isFullscreen = true;
      const changeHandler = screenfull.on.mock.calls[0][1];
      changeHandler({ target: { isFullscreen: true } });
    });

    expect(screen.getByText("インタビュー動画一覧に戻る")).toBeInTheDocument();
  });
});
