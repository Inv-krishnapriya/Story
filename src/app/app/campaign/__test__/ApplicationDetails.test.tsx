import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ApplicantDetails from "../details/[id]/ApplicantDetails";
import AppTheme from "../../../../theme";
import { act } from "react-dom/test-utils";

jest.mock("../details/[id]/FilterModal", () => ({
  default: () => <div>h1</div>,
}));
// Mocking redux useSelector and useDispatch
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactElement }) => (
    <div>{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactElement }) => (
    <div>{children}</div>
  ),
  useSwiper: () => ({
    swiper: {
      slideNext: () => {},
    },
  }),
}));

jest.mock("swiper", () => ({
  default: jest.fn(),
  Thumbs: jest.fn(),
}));
jest.mock("swiper/modules", () => ({
  Navigation: jest.fn(),
  Autoplay: jest.fn(),
}));
jest.mock("swiper/css", () => "");
jest.mock("swiper/css/navigation", () => "");

jest.mock("../../../../../public/images/error.gif", () => ({
  default: "mocked-error.gif",
}));

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});

jest.mock("../details/[id]/Drawer", () => {
  return jest.fn().mockImplementation(() => {
    return <div>AppliedMonitorDrawer Component</div>;
  });
});

const mockCampaignDetails = {
  id: "90b7f3acbf08437db72291548a69eb41",
  title: "Auto1714025925",
  includeCondition: "This is an automation test",
  startsAt: "2024-04-25T00:00:00Z",
  endsAt: "2024-05-22T00:00:00Z",
  status: 2,
  interviewDurationId: "9ff0821a3d0849fbb2d404a61990189c",
  defaultLanguageId: "ja",
  gender: 3,
  maritalStatus: 3,
  hasChildren: 3,
  monitorsCount: 10,
  createdBy: "0bed5fd6858e47d6bcf4c25bc14d580e",
  ticketsCount: 20,
  timeslotsList: [
    {
      startTime: "2024-04-25T06:30:00Z",
      endTime: "2024-04-25T07:30:00Z",
      id: "5a9565c270ed4dc6b13bdd86f572ed79",
      status: 0,
      type: 0,
    },
    {
      startTime: "2024-04-25T07:30:00Z",
      endTime: "2024-04-25T08:30:00Z",
      id: "8d9dcae7bfdc411eb4e85ced6a894f33",
      status: 0,
      type: 0,
    },
    {
      startTime: "2024-04-25T08:30:00Z",
      endTime: "2024-04-25T09:30:00Z",
      id: "f61b57e79990487882181853d08eb606",
      status: 0,
      type: 0,
    },
  ],
  createdAt: "2024-04-25T06:19:11.060464Z",
  updatedAt: "2024-04-25T08:59:13.787506Z",
  duration: 60,
  rewardPoint: 4000,
  timezone: "Asia/Calcutta",
  excludeCondition: "",
  ngIndustries: "",
  hasScreening: false,
  personalIncomeStart: 0,
  personalIncomeEnd: 0,
  householdIncomeStart: 0,
  householdIncomeEnd: 0,
  ageFrom: 0,
  ageTo: 0,
  screeningId: "",
  prefectures: [],
  occupation: [],
  industries: [],
  timeslots: [],
  monitors: [
    {
      id: "d145798efe1043beb3ab50d00104e1f1",
      nickName: "test_36",
      createdAt: "2024-02-15T10:45:34.083813Z",
      updatedAt: "2024-02-15T10:45:34.084677Z",
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
      prefecture: "新潟県",
      area: "中部地方",
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
      monitorStatus: 1,
      memo: "",
      monitorCreatedAt: 1714035553785,
      timeSlotDetails: {
        id: "",
        startTime: "",
        endTime: "",
        status: 0,
        type: 0,
        consumedStatus: 0,
      },
      unreadCount: 0,
      notificationExist: false,
      answer: null,
      scheduledDate: null,
    },
  ],
};

const mockMonitor = {
  id: "monitor-id",
  nickName: "Monitor Nickname",
  monitorStatus: 1,
  timeSlotDetails: {
    consumedStatus: "confirmed",
  },
  memo: "Monitor Memo",
  gender: "Male",
  age: 30,
  occupation: "Software Engineer",
  prefecture: "Prefecture Name",
  meetingDetails: {
    link: "https://example.com/meeting",
    id: "meeting-id",
    passCode: "123456",
    meetingId: "meeting-id",
  },
  unreadCount: 0,
};

const setIsDrawerOpen = jest.fn();
const setMonitorData = jest.fn();
jest.mock("@/common/apiUrls", () => ({
  researchService: {
    getCampaigns: jest.fn(() =>
      Promise.resolve({
        data: {
          errorCode: {},
          errorMessage: {},
        },
      })
    ),
    getInterviewDuration: jest.fn(() =>
      Promise.resolve({
        data: {
          errorCode: {},
          errorMessage: {},
        },
      })
    ),
    getCampaignDetail: jest.fn(() =>
      Promise.resolve({
        data: {
          errorCode: {},
          errorMessage: {},
        },
      })
    ),
  },

  ticketService: {
    getUserDetails: jest.fn(() =>
      Promise.resolve({
        data: {
          errorCode: {},
          errorMessage: {},
        },
      })
    ),
  },
  generalServices: {
    getPrefectures: jest.fn(() =>
      Promise.resolve({
        data: {
          errorCode: {},
          errorMessage: {},
          data: {
            areas: [
              {
                id: "2849b3c3420e4228944cb199a00737ba",
                name: "四国地方",
                order: 7,
                prefectures: [
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
                  {
                    id: "65271b9a7a864a85886e79746482f310",
                    name: "愛媛県",
                    order: 38,
                  },
                  {
                    id: "879c7ec8a51a4877bd07a35ed6fa6622",
                    name: "高知県",
                    order: 39,
                  },
                ],
              },
              {
                id: "4762cccc88d94f6f98a36f3cd2746f13",
                name: "中部地方",
                order: 4,
                prefectures: [
                  {
                    id: "43fc2032ae814e5694506755843d3493",
                    name: "静岡県",
                    order: 22,
                  },
                  {
                    id: "52517035f5a04003b5707882513a57dc",
                    name: "愛知県",
                    order: 23,
                  },
                  {
                    id: "56e105838d924ceca4e7d6fd29e7f8a0",
                    name: "長野県",
                    order: 20,
                  },
                  {
                    id: "71fc33e2400c4e6ebed59e75af46ceae",
                    name: "石川県",
                    order: 17,
                  },
                  {
                    id: "74899f4661154f8c8cc238618f8f0e39",
                    name: "岐阜県",
                    order: 21,
                  },
                  {
                    id: "75aecc6f525c43f68c1a61e845252b85",
                    name: "新潟県",
                    order: 15,
                  },
                  {
                    id: "7aabc0fbdc744394939297df4c2001c4",
                    name: "三重県",
                    order: 24,
                  },
                  {
                    id: "c16cde667b1949f384f4ccddc0483266",
                    name: "福井県",
                    order: 18,
                  },
                  {
                    id: "e5c2ee35874c402b8acff5aa76228322",
                    name: "富山県",
                    order: 16,
                  },
                  {
                    id: "ec5e77f5c55544e19f5d1432b6d38100",
                    name: "山梨県",
                    order: 19,
                  },
                ],
              },
              {
                id: "65fa282ea37b4fe294be9034ad27da31",
                name: "北海道",
                order: 1,
                prefectures: [
                  {
                    id: "c1afdf1fea1b486180a36bab07361bd8",
                    name: "北海道",
                    order: 1,
                  },
                ],
              },
              {
                id: "68f994e114e043f7ba73f779f9455050",
                name: "近畿地方",
                order: 5,
                prefectures: [
                  {
                    id: "55aed9daac0441a9b0b574f166d9485d",
                    name: "和歌山県",
                    order: 30,
                  },
                  {
                    id: "74d926021baf4ddea78095e826588c7c",
                    name: "京都府",
                    order: 26,
                  },
                  {
                    id: "9c3f78cd7b6241289992374bec88269e",
                    name: "大阪府",
                    order: 27,
                  },
                  {
                    id: "a6d25670705647e184a48eba53a9e204",
                    name: "兵庫県",
                    order: 28,
                  },
                  {
                    id: "e922c2c7401a43ee98b05b454721ac91",
                    name: "奈良県",
                    order: 29,
                  },
                  {
                    id: "ef279ca621da4c58b6dfe50eb3555463",
                    name: "滋賀県",
                    order: 25,
                  },
                ],
              },
              {
                id: "c3e1a5d7935343d58a7c56c093b62c69",
                name: "九州地方",
                order: 8,
                prefectures: [
                  {
                    id: "2331af4f22be4907b07bf781af982902",
                    name: "熊本県",
                    order: 43,
                  },
                  {
                    id: "6d37e194d93f4d30b9c6c4e33cc68b5c",
                    name: "鹿児島県",
                    order: 46,
                  },
                  {
                    id: "81ac3f94c9574eca93f248cdb232cd05",
                    name: "大分県",
                    order: 44,
                  },
                  {
                    id: "dcfbd15bb57a458a87f0c0bdabfe864c",
                    name: "沖縄県",
                    order: 47,
                  },
                  {
                    id: "e6fe6868a2f0436496d0a51088dfbcf6",
                    name: "宮崎県",
                    order: 45,
                  },
                  {
                    id: "ed570e7e37a041e0a096cb0e71e52d04",
                    name: "長崎県",
                    order: 42,
                  },
                  {
                    id: "eede37c78d50467ebd46a6dfe2bcf6eb",
                    name: "福岡県",
                    order: 40,
                  },
                  {
                    id: "f0c8fc099a624771b1c0aec5bed529b0",
                    name: "佐賀県",
                    order: 41,
                  },
                ],
              },
              {
                id: "cf36e9ca0cf54d80855ac916cddd3bae",
                name: "中国地方",
                order: 6,
                prefectures: [
                  {
                    id: "02737be353004256a3595cc4696d8535",
                    name: "島根県",
                    order: 32,
                  },
                  {
                    id: "244d34a2fc4846cca02cf397458bbfc2",
                    name: "山口県",
                    order: 35,
                  },
                  {
                    id: "726d164de806418f8f3a88dea699827d",
                    name: "広島県",
                    order: 34,
                  },
                  {
                    id: "991458c42ff1482aad89b139452358dd",
                    name: "岡山県",
                    order: 33,
                  },
                  {
                    id: "efb0a0fd308e4f1ea33cce909bd8cfc3",
                    name: "鳥取県",
                    order: 31,
                  },
                ],
              },
              {
                id: "cfd4e7bbc57a43deb41101a095a5261c",
                name: "東北地方",
                order: 2,
                prefectures: [
                  {
                    id: "08b159da2cb5484c831f2d2a7dea66b6",
                    name: "青森県",
                    order: 2,
                  },
                  {
                    id: "1d5e561a26e647c0b12a3995667fc50f",
                    name: "福島県",
                    order: 7,
                  },
                  {
                    id: "3c3524a79971425abdc2a29312b2b408",
                    name: "宮城県",
                    order: 4,
                  },
                  {
                    id: "a3c88d8127004996a13fd2ae7a247342",
                    name: "山形県",
                    order: 6,
                  },
                  {
                    id: "b452261f166f4fe9b3f9f3d40bfe921a",
                    name: "岩手県",
                    order: 3,
                  },
                  {
                    id: "da8559c2ee0e418da635073c98d14161",
                    name: "秋田県",
                    order: 5,
                  },
                ],
              },
              {
                id: "e6fbebc7b3744bcebabc64075993c736",
                name: "関東地方",
                order: 3,
                prefectures: [
                  {
                    id: "08a86adcc9e7480daefc4c257eccab80",
                    name: "埼玉県",
                    order: 11,
                  },
                  {
                    id: "0d1051a49d8747ba85fd35856f58e86d",
                    name: "栃木県",
                    order: 9,
                  },
                  {
                    id: "2ffb017347ae41729a76bf3874c3fa77",
                    name: "東京都",
                    order: 13,
                  },
                  {
                    id: "8c8cff0e5dbb4a57a88775bcb58502c6",
                    name: "神奈川県",
                    order: 14,
                  },
                  {
                    id: "b88d03651a714299829cc91f8756a640",
                    name: "群馬県",
                    order: 10,
                  },
                  {
                    id: "c183df619c454d67af078ee1bb560625",
                    name: "茨城県",
                    order: 8,
                  },
                  {
                    id: "d0f47df312014450aadea3b8628d684d",
                    name: "千葉県",
                    order: 12,
                  },
                ],
              },
            ],
            prefectures: [
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
              {
                id: "65271b9a7a864a85886e79746482f310",
                name: "愛媛県",
                order: 38,
              },
              {
                id: "879c7ec8a51a4877bd07a35ed6fa6622",
                name: "高知県",
                order: 39,
              },
              {
                id: "43fc2032ae814e5694506755843d3493",
                name: "静岡県",
                order: 22,
              },
              {
                id: "52517035f5a04003b5707882513a57dc",
                name: "愛知県",
                order: 23,
              },
              {
                id: "56e105838d924ceca4e7d6fd29e7f8a0",
                name: "長野県",
                order: 20,
              },
              {
                id: "71fc33e2400c4e6ebed59e75af46ceae",
                name: "石川県",
                order: 17,
              },
              {
                id: "74899f4661154f8c8cc238618f8f0e39",
                name: "岐阜県",
                order: 21,
              },
              {
                id: "75aecc6f525c43f68c1a61e845252b85",
                name: "新潟県",
                order: 15,
              },
              {
                id: "7aabc0fbdc744394939297df4c2001c4",
                name: "三重県",
                order: 24,
              },
              {
                id: "c16cde667b1949f384f4ccddc0483266",
                name: "福井県",
                order: 18,
              },
              {
                id: "e5c2ee35874c402b8acff5aa76228322",
                name: "富山県",
                order: 16,
              },
              {
                id: "ec5e77f5c55544e19f5d1432b6d38100",
                name: "山梨県",
                order: 19,
              },
              {
                id: "c1afdf1fea1b486180a36bab07361bd8",
                name: "北海道",
                order: 1,
              },
              {
                id: "55aed9daac0441a9b0b574f166d9485d",
                name: "和歌山県",
                order: 30,
              },
              {
                id: "74d926021baf4ddea78095e826588c7c",
                name: "京都府",
                order: 26,
              },
              {
                id: "9c3f78cd7b6241289992374bec88269e",
                name: "大阪府",
                order: 27,
              },
              {
                id: "a6d25670705647e184a48eba53a9e204",
                name: "兵庫県",
                order: 28,
              },
              {
                id: "e922c2c7401a43ee98b05b454721ac91",
                name: "奈良県",
                order: 29,
              },
              {
                id: "ef279ca621da4c58b6dfe50eb3555463",
                name: "滋賀県",
                order: 25,
              },
              {
                id: "2331af4f22be4907b07bf781af982902",
                name: "熊本県",
                order: 43,
              },
              {
                id: "6d37e194d93f4d30b9c6c4e33cc68b5c",
                name: "鹿児島県",
                order: 46,
              },
              {
                id: "81ac3f94c9574eca93f248cdb232cd05",
                name: "大分県",
                order: 44,
              },
              {
                id: "dcfbd15bb57a458a87f0c0bdabfe864c",
                name: "沖縄県",
                order: 47,
              },
              {
                id: "e6fe6868a2f0436496d0a51088dfbcf6",
                name: "宮崎県",
                order: 45,
              },
              {
                id: "ed570e7e37a041e0a096cb0e71e52d04",
                name: "長崎県",
                order: 42,
              },
              {
                id: "eede37c78d50467ebd46a6dfe2bcf6eb",
                name: "福岡県",
                order: 40,
              },
              {
                id: "f0c8fc099a624771b1c0aec5bed529b0",
                name: "佐賀県",
                order: 41,
              },
              {
                id: "02737be353004256a3595cc4696d8535",
                name: "島根県",
                order: 32,
              },
              {
                id: "244d34a2fc4846cca02cf397458bbfc2",
                name: "山口県",
                order: 35,
              },
              {
                id: "726d164de806418f8f3a88dea699827d",
                name: "広島県",
                order: 34,
              },
              {
                id: "991458c42ff1482aad89b139452358dd",
                name: "岡山県",
                order: 33,
              },
              {
                id: "efb0a0fd308e4f1ea33cce909bd8cfc3",
                name: "鳥取県",
                order: 31,
              },
              {
                id: "08b159da2cb5484c831f2d2a7dea66b6",
                name: "青森県",
                order: 2,
              },
              {
                id: "1d5e561a26e647c0b12a3995667fc50f",
                name: "福島県",
                order: 7,
              },
              {
                id: "3c3524a79971425abdc2a29312b2b408",
                name: "宮城県",
                order: 4,
              },
              {
                id: "a3c88d8127004996a13fd2ae7a247342",
                name: "山形県",
                order: 6,
              },
              {
                id: "b452261f166f4fe9b3f9f3d40bfe921a",
                name: "岩手県",
                order: 3,
              },
              {
                id: "da8559c2ee0e418da635073c98d14161",
                name: "秋田県",
                order: 5,
              },
              {
                id: "08a86adcc9e7480daefc4c257eccab80",
                name: "埼玉県",
                order: 11,
              },
              {
                id: "0d1051a49d8747ba85fd35856f58e86d",
                name: "栃木県",
                order: 9,
              },
              {
                id: "2ffb017347ae41729a76bf3874c3fa77",
                name: "東京都",
                order: 13,
              },
              {
                id: "8c8cff0e5dbb4a57a88775bcb58502c6",
                name: "神奈川県",
                order: 14,
              },
              {
                id: "b88d03651a714299829cc91f8756a640",
                name: "群馬県",
                order: 10,
              },
              {
                id: "c183df619c454d67af078ee1bb560625",
                name: "茨城県",
                order: 8,
              },
              {
                id: "d0f47df312014450aadea3b8628d684d",
                name: "千葉県",
                order: 12,
              },
            ],
          },
        },
      })
    ),
    getProfession: jest.fn(() =>
      Promise.resolve({
        data: {
          errorCode: {},
          errorMessage: {},
          data: [
            {
              id: "03609be89d134e0bb61e709aa4361bed",
              name: "パート・アルバイト",
              order: 9,
            },
            {
              id: "0faf2e6491494f62bed7546f6cac77e9",
              name: "会社員(事務系)",
              order: 3,
            },
            {
              id: "3109e00337b84f5fb432a37f7fab2eb4",
              name: "公務員",
              order: 1,
            },
            {
              id: "36d2130459da49288871f0440e014bfa",
              name: "自営業",
              order: 6,
            },
            {
              id: "5119c77693364602a572a5cccfefc6db",
              name: "会社員(技術系)",
              order: 4,
            },
            {
              id: "5d4e62a3ea9642b78c1ad2064bf8fe58",
              name: "その他",
              order: 11,
            },
            {
              id: "77360ab5e9ad4144a42e5b3b6ee4f4db",
              name: "会社員(その他)",
              order: 5,
            },
            {
              id: "7bb2e89793d6414da37ccf5d48f7e534",
              name: "無職",
              order: 12,
            },
            {
              id: "850bac00d7334d97b65c7dc7f60552c8",
              name: "専業主婦(主夫)",
              order: 8,
            },
            {
              id: "9ff0821a3d0849fbb2d404a61990189c",
              name: "経営者・役員",
              order: 2,
            },
            {
              id: "cb44defa19b645a5afa0d542934c6df6",
              name: "学生",
              order: 10,
            },
            {
              id: "cd450ead34f144ee84730234c7d9a6a7",
              name: "自由業",
              order: 7,
            },
          ],
        },
      })
    ),
    getIndustries: jest.fn(() =>
      Promise.resolve({
        data: {
          errorCode: {},
          errorMessage: {},
        },
      })
    ),
  },
  customerService: {
    sendOff: jest.fn(() =>
      Promise.resolve({
        data: {
          errorCode: {},
          errorMessage: {},
        },
      })
    ),
  },
}));

describe("ApplicantDetails component", () => {
  it("renders without crashing", () => {
    render(
      <AppTheme>
        <ApplicantDetails
          campaignDetails={mockCampaignDetails}
          handleCampaign={jest.fn()}
          isFetching={false}
        />
        ;
      </AppTheme>
    );
  });

  it("sets monitor data and opens the drawer", () => {
    render(
      <AppTheme>
        <ApplicantDetails
          campaignDetails={mockCampaignDetails}
          handleCampaign={jest.fn()}
          isFetching={false}
        />
      </AppTheme>
    );
    fireEvent.click(screen.getByLabelText("item-0"));
    fireEvent.click(screen.getByLabelText("item-0"));
    fireEvent.click(screen.getByLabelText("all-checked"));
    fireEvent.click(screen.getByLabelText("all-checked"));
    fireEvent.click(screen.getByTestId("click-button"));
  });

  it("sets monitor data and opens the drawer", () => {
    render(
      <AppTheme>
        <ApplicantDetails
          campaignDetails={mockCampaignDetails}
          handleCampaign={jest.fn()}
          isFetching={false}
        />
      </AppTheme>
    );
    fireEvent.click(screen.getByLabelText("item-0"));

    fireEvent.click(screen.getByLabelText("all-checked"));
    fireEvent.click(screen.getByLabelText("all-checked"));
    fireEvent.click(screen.getByTestId("sendoff-button"));
    fireEvent.click(screen.getByTestId("agree-button"));
  });

  it("sets monitor data and opens the drawer", () => {
    render(
      <AppTheme>
        <ApplicantDetails
          campaignDetails={mockCampaignDetails}
          handleCampaign={jest.fn()}
          isFetching={false}
        />
      </AppTheme>
    );
    fireEvent.click(screen.getByTestId("drawer-open"));
  });

  it("should render", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <ApplicantDetails
            campaignDetails={mockCampaignDetails}
            handleCampaign={jest.fn()}
            isFetching={false}
          />
        </AppTheme>
      );
    });
  });
});
