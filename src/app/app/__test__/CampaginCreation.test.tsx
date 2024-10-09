import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Page from "../campaign/creation/page";
import AppTheme from "../../../theme";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { generalServices, researchService } from "../../../common/apiUrls";
import { act } from "react-dom/test-utils";
import i18n from "../../../i18n";
import { useSearchParams } from "next/navigation";

// Mock dependencies

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
      {
        startTime: "2024-02-10T05:30:00Z",
        endTime: "2024-02-10T06:30:00Z",
        id: "b590147e576b4599bb9c8bab2f187d05",
        status: 0,
        type: 0,
      },

      {
        startTime: "2024-02-21T00:30:00Z",
        endTime: "2024-02-21T01:30:00Z",
        id: "a3c6d2ead99442b8bfb140e602de0917",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-21T01:30:00Z",
        endTime: "2024-02-21T02:30:00Z",
        id: "94c6f432bf204b3a9c2b29a60db02af1",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-21T02:30:00Z",
        endTime: "2024-02-21T03:30:00Z",
        id: "3d4014b8b6594b009451b756ba278efa",
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
    '{"title":"Test","conditions":"","exclusion":"","ngIndustries":[],"monitorscount":40,"duration":"9ff0821a3d0849fbb2d404a61990189c","gender":0,"age":{"lower":"","upper":""},"prefecture":[],"married":0,"children":0,"personalIncome":{"lower":"","upper":""},"householdIncome":{"lower":"","upper":""},"profession":[],"screening":{"id":"8051db5924834b798a1bd355847d2a7c","question":[{"questionText":"ggg","type":1,"order":1,"sequence":1,"options":[{"id":"55a6ae8ed8fb4803b4621c0320fa1bed","optionText":"ggggg","order":0, "optionType":1}],"id":"786d2dc467494ec6a02f1664160a9d8d","isRequired":false},{"questionText":"eeeeeee","type":3,"order":1,"sequence":2,"id":"3d8dd3217e3347eea5651248c1461eff","isRequired":false,"options":[]},{"questionText":"ee66666","type":3,"order":1,"sequence":3,"id":"0d6dc270cb7f4c999eeaf714469cfa18","isRequired":false,"options":[]}],"defaultLanguageId":"ja","order":1,"createdAt":"2024-02-09T05:25:59.693010Z","updatedAt":"2024-02-09T05:25:59.693071Z","clientId":"","status":0}}',
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
    {
      startTime: "14:30",
      endTime: "15:30",
      scheduledDate: "09-02-2024",
    },
    {
      startTime: "16:30",
      endTime: "17:30",
      scheduledDate: "09-02-2024",
    },
    {
      startTime: "17:30",
      endTime: "18:30",
      scheduledDate: "09-02-2024",
    },
    {
      startTime: "18:30",
      endTime: "19:30",
      scheduledDate: "09-02-2024",
    },
    {
      startTime: "19:30",
      endTime: "20:30",
      scheduledDate: "09-02-2024",
    },
    {
      startTime: "20:30",
      endTime: "21:30",
      scheduledDate: "09-02-2024",
    },

    {
      startTime: "10:30",
      endTime: "11:30",
      scheduledDate: "15-02-2024",
    },
    {
      startTime: "11:30",
      endTime: "12:30",
      scheduledDate: "15-02-2024",
    },
    {
      startTime: "13:00",
      endTime: "14:00",
      scheduledDate: "15-02-2024",
    },
    {
      startTime: "14:30",
      endTime: "15:30",
      scheduledDate: "15-02-2024",
    },
    {
      startTime: "09:30",
      endTime: "10:30",
      scheduledDate: "16-02-2024",
    },
    {
      startTime: "10:30",
      endTime: "11:30",
      scheduledDate: "16-02-2024",
    },
    {
      startTime: "11:30",
      endTime: "12:30",
      scheduledDate: "16-02-2024",
    },
    {
      startTime: "12:30",
      endTime: "13:30",
      scheduledDate: "16-02-2024",
    },
    {
      startTime: "13:30",
      endTime: "14:30",
      scheduledDate: "16-02-2024",
    },
    {
      startTime: "14:30",
      endTime: "15:30",
      scheduledDate: "16-02-2024",
    },
    {
      startTime: "17:00",
      endTime: "18:00",
      scheduledDate: "16-02-2024",
    },
    {
      startTime: "18:00",
      endTime: "19:00",
      scheduledDate: "16-02-2024",
    },
    {
      startTime: "19:00",
      endTime: "20:00",
      scheduledDate: "16-02-2024",
    },
    {
      startTime: "20:00",
      endTime: "21:00",
      scheduledDate: "16-02-2024",
    },
    {
      startTime: "09:30",
      endTime: "10:30",
      scheduledDate: "17-02-2024",
    },
    {
      startTime: "10:30",
      endTime: "11:30",
      scheduledDate: "17-02-2024",
    },
    {
      startTime: "11:30",
      endTime: "12:30",
      scheduledDate: "17-02-2024",
    },
    {
      startTime: "12:30",
      endTime: "13:30",
      scheduledDate: "17-02-2024",
    },
    {
      startTime: "13:30",
      endTime: "14:30",
      scheduledDate: "17-02-2024",
    },
    {
      startTime: "14:30",
      endTime: "15:30",
      scheduledDate: "17-02-2024",
    },
    {
      startTime: "17:00",
      endTime: "18:00",
      scheduledDate: "17-02-2024",
    },
    {
      startTime: "18:00",
      endTime: "19:00",
      scheduledDate: "17-02-2024",
    },
    {
      startTime: "19:00",
      endTime: "20:00",
      scheduledDate: "17-02-2024",
    },
    {
      startTime: "20:00",
      endTime: "21:00",
      scheduledDate: "17-02-2024",
    },
    {
      startTime: "09:30",
      endTime: "10:30",
      scheduledDate: "18-02-2024",
    },
    {
      startTime: "10:30",
      endTime: "11:30",
      scheduledDate: "18-02-2024",
    },
    {
      startTime: "11:30",
      endTime: "12:30",
      scheduledDate: "18-02-2024",
    },
    {
      startTime: "12:30",
      endTime: "13:30",
      scheduledDate: "18-02-2024",
    },
    {
      startTime: "13:30",
      endTime: "14:30",
      scheduledDate: "18-02-2024",
    },
    {
      startTime: "14:30",
      endTime: "15:30",
      scheduledDate: "18-02-2024",
    },
    {
      startTime: "17:00",
      endTime: "18:00",
      scheduledDate: "18-02-2024",
    },
    {
      startTime: "18:00",
      endTime: "19:00",
      scheduledDate: "18-02-2024",
    },
    {
      startTime: "19:00",
      endTime: "20:00",
      scheduledDate: "18-02-2024",
    },
    {
      startTime: "20:00",
      endTime: "21:00",
      scheduledDate: "18-02-2024",
    },

    {
      startTime: "19:00",
      endTime: "20:00",
      scheduledDate: "21-02-2024",
    },
    {
      startTime: "20:00",
      endTime: "21:00",
      scheduledDate: "21-02-2024",
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
        id: "5964cab1c8b844b7a5611974ef68c71e",
        name: "製造業(衣服・繊維製品)",
        order: 5,
      },
      {
        id: "4a2f8d953260411eb736f829e21c666c",
        name: "製造業(石けん・合成洗剤・医薬品・化粧品)",
        order: 6,
      },
      {
        id: "16b7a9bf6023475e9b42a6409d5f0b6b",
        name: "製造業(日用品)",
        order: 7,
      },
      {
        id: "6e5f955db4d1401a944139aa42547844",
        name: "製造業(製紙・パルプ)",
        order: 8,
      },
      {
        id: "ab048528022c48578ee166cf89175d85",
        name: "製造業(石油製品)",
        order: 9,
      },
      {
        id: "255b6d54d9ed431f9884452d1761d08d",
        name: "製造業(AV・家電・電気機械器具)",
        order: 10,
      },
      {
        id: "f3d0efda6e6249028358e8e36d765d7f",
        name: "製造業(コンピュータ)",
        order: 11,
      },
      {
        id: "77328fb2781b475ca1072c57f6a13c0a",
        name: "製造業(自動車・輸送機器)",
        order: 12,
      },
      {
        id: "c082edf297f741fba5e24776e89144ff",
        name: "製造業(その他)",
        order: 13,
      },
      {
        id: "244c80b1603147c4b493a51b625634d0",
        name: "鉄鋼業",
        order: 14,
      },
      {
        id: "e81293a795d8437dbcfea4ee015d0589",
        name: "出版・印刷関連産業",
        order: 15,
      },
      {
        id: "b54f826dc05d4aa090f5f7398d06177a",
        name: "電気・ガス・熱供給・水道業",
        order: 16,
      },
      {
        id: "3aecd8bbf1044f3db04ed8172a117038",
        name: "運送・輸送業",
        order: 17,
      },
      {
        id: "5379d74e4dda4be0a42fb1bd55af458a",
        name: "旅行業",
        order: 18,
      },

      {
        id: "efe8610c9d9a494c8eca2217b2f9cd33",
        name: "勤めていない(専業主婦・学生などを含む)",
        order: 42,
      },
      {
        id: "796a1f4b9cf8426282ec05eae940169d",
        name: "その他",
        order: 43,
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
      {
        id: "77360ab5e9ad4144a42e5b3b6ee4f4db",
        name: "会社員(その他)",
        order: 5,
      },
      {
        id: "36d2130459da49288871f0440e014bfa",
        name: "自営業",
        order: 6,
      },
      {
        id: "cd450ead34f144ee84730234c7d9a6a7",
        name: "自由業",
        order: 7,
      },
      {
        id: "850bac00d7334d97b65c7dc7f60552c8",
        name: "専業主婦(主夫)",
        order: 8,
      },
      {
        id: "03609be89d134e0bb61e709aa4361bed",
        name: "パート・アルバイト",
        order: 9,
      },
      {
        id: "cb44defa19b645a5afa0d542934c6df6",
        name: "学生",
        order: 10,
      },
      {
        id: "5d4e62a3ea9642b78c1ad2064bf8fe58",
        name: "その他",
        order: 11,
      },
      {
        id: "7bb2e89793d6414da37ccf5d48f7e534",
        name: "無職",
        order: 12,
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
    {
      start: "2024-02-09T09:00:00.000Z",
      end: "2024-02-09T10:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-09T11:00:00.000Z",
      end: "2024-02-09T12:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-09T12:00:00.000Z",
      end: "2024-02-09T13:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T03:30:00.000Z",
      end: "2024-02-10T04:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T04:30:00.000Z",
      end: "2024-02-10T05:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T05:30:00.000Z",
      end: "2024-02-10T06:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T06:30:00.000Z",
      end: "2024-02-10T07:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T07:30:00.000Z",
      end: "2024-02-10T08:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T08:30:00.000Z",
      end: "2024-02-10T09:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T09:30:00.000Z",
      end: "2024-02-10T10:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T11:00:00.000Z",
      end: "2024-02-10T12:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T12:00:00.000Z",
      end: "2024-02-10T13:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T13:00:00.000Z",
      end: "2024-02-10T14:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T14:00:00.000Z",
      end: "2024-02-10T15:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T15:00:00.000Z",
      end: "2024-02-10T16:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T02:30:00.000Z",
      end: "2024-02-11T03:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T03:30:00.000Z",
      end: "2024-02-11T04:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T04:30:00.000Z",
      end: "2024-02-11T05:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T05:30:00.000Z",
      end: "2024-02-11T06:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T06:30:00.000Z",
      end: "2024-02-11T07:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T07:30:00.000Z",
      end: "2024-02-11T08:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T08:30:00.000Z",
      end: "2024-02-11T09:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T09:30:00.000Z",
      end: "2024-02-11T10:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T11:00:00.000Z",
      end: "2024-02-11T12:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T12:00:00.000Z",
      end: "2024-02-11T13:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T13:00:00.000Z",
      end: "2024-02-11T14:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T14:00:00.000Z",
      end: "2024-02-11T15:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-11T15:00:00.000Z",
      end: "2024-02-11T16:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T02:30:00.000Z",
      end: "2024-02-12T03:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T03:30:00.000Z",
      end: "2024-02-12T04:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T04:30:00.000Z",
      end: "2024-02-12T05:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T05:30:00.000Z",
      end: "2024-02-12T06:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T06:30:00.000Z",
      end: "2024-02-12T07:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T07:30:00.000Z",
      end: "2024-02-12T08:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T08:30:00.000Z",
      end: "2024-02-12T09:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T09:30:00.000Z",
      end: "2024-02-12T10:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T11:00:00.000Z",
      end: "2024-02-12T12:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T12:00:00.000Z",
      end: "2024-02-12T13:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T13:00:00.000Z",
      end: "2024-02-12T14:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T14:00:00.000Z",
      end: "2024-02-12T15:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-12T15:00:00.000Z",
      end: "2024-02-12T16:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T02:30:00.000Z",
      end: "2024-02-13T03:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T03:30:00.000Z",
      end: "2024-02-13T04:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T04:30:00.000Z",
      end: "2024-02-13T05:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T05:30:00.000Z",
      end: "2024-02-13T06:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T06:30:00.000Z",
      end: "2024-02-13T07:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T07:30:00.000Z",
      end: "2024-02-13T08:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T08:30:00.000Z",
      end: "2024-02-13T09:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T09:30:00.000Z",
      end: "2024-02-13T10:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T11:00:00.000Z",
      end: "2024-02-13T12:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T12:00:00.000Z",
      end: "2024-02-13T13:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T13:00:00.000Z",
      end: "2024-02-13T14:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T14:00:00.000Z",
      end: "2024-02-13T15:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-13T15:00:00.000Z",
      end: "2024-02-13T16:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T02:30:00.000Z",
      end: "2024-02-14T03:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T03:30:00.000Z",
      end: "2024-02-14T04:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T04:30:00.000Z",
      end: "2024-02-14T05:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T05:30:00.000Z",
      end: "2024-02-14T06:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T06:30:00.000Z",
      end: "2024-02-14T07:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T07:30:00.000Z",
      end: "2024-02-14T08:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T08:30:00.000Z",
      end: "2024-02-14T09:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T09:30:00.000Z",
      end: "2024-02-14T10:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T11:00:00.000Z",
      end: "2024-02-14T12:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T12:00:00.000Z",
      end: "2024-02-14T13:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T13:00:00.000Z",
      end: "2024-02-14T14:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T14:00:00.000Z",
      end: "2024-02-14T15:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-14T15:00:00.000Z",
      end: "2024-02-14T16:00:00.000Z",
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
    DemoContainer: jest.fn(() => <></>),
  };
});
jest.mock("axios");
// Write your tests
describe("Campaign updates", () => {
  beforeAll(async () => {
    await act(async () => {
      (researchService.getCampaignDetail as any).mockResolvedValue({
        data: dummyData,
      });
      (generalServices.getIndustries as any).mockResolvedValue({
        data: dummyScheduleData.industries,
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
  it("renders with campaign heading", async () => {
    render(
      <AppTheme>
        <Page />
      </AppTheme>
    );
    expect(screen.getByText(i18n.t("interview.heading"))).toBeInTheDocument();
    const backButton = screen.getByText(
      i18n.t("campaign.creation.back-button")
    );
    fireEvent.click(backButton);
  });

  // Add more tests as needed
});
describe("Campaign creation", () => {
  beforeAll(async () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          global: {
            isInPreviewMode: true,
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
  it("renders with campaign heading", async () => {
    render(
      <AppTheme>
        <Page />
      </AppTheme>
    );
    expect(screen.getByText(i18n.t("interview.heading"))).toBeInTheDocument();
  });

  // Add more tests as needed
});
describe("Campaign updates in empty data", () => {
  beforeAll(async () => {
    await act(async () => {
      (researchService.getCampaignDetail as any).mockResolvedValue({
        data: {
          ...dummyData,
          data: {
            ...dummyData.data,
            startsAt: "",
            ageFrom: 20,
            ageTo: 30,
            personalIncomeStart: 1000,
            personalIncomeEnd: 1200,
            householdIncomeStart: 1000,
            householdIncomeEnd: 1200,
          },
        },
      });
      (generalServices.getIndustries as any).mockResolvedValue({
        data: dummyScheduleData.industries,
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
  it("renders with campaign heading", async () => {
    render(
      <AppTheme>
        <Page />
      </AppTheme>
    );
    expect(screen.getByText(i18n.t("interview.heading"))).toBeInTheDocument();
    const backButton = screen.getByText(
      i18n.t("campaign.creation.back-button")
    );
    fireEvent.click(backButton);
  });

  // Add more tests as needed
});
