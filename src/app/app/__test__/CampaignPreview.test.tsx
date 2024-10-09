import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Page from "../campaign/creation/preview/page";
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
  Campaign: {
    title: "Test",
    includeCondition: "Test",
    excludeCondition: "Test",
    ngIndustries: [
      "a0ce515823f341f4aa27cdfd041320ad",
      "244c80b1603147c4b493a51b625634d0",
    ],
    monitorsCount: 10,
    interviewDurationId: "3109e00337b84f5fb432a37f7fab2eb4",
    startsAt: "06-03-2024",
    endsAt: "08-03-2024",
    timeslot: [
      {
        scheduledDate: "07-03-2024",
        startTime: "11:00",
        endTime: "11:30",
      },
      {
        startTime: "12:00",
        endTime: "12:30",
        scheduledDate: "07-03-2024",
      },
    ],
    hasScreening: true,
    gender: 1,
    ageFrom: 28,
    ageTo: 43,
    prefectures: [
      "ef279ca621da4c58b6dfe50eb3555463",
      "74d926021baf4ddea78095e826588c7c",
      "9c3f78cd7b6241289992374bec88269e",
      "a6d25670705647e184a48eba53a9e204",
      "e922c2c7401a43ee98b05b454721ac91",
      "55aed9daac0441a9b0b574f166d9485d",
    ],
    maritalStatus: 1,
    hasChildren: 1,
    occupations: ["cd450ead34f144ee84730234c7d9a6a7"],
    personalIncomeStart: 800,
    personalIncomeEnd: 1000,
    householdIncomeStart: 400,
    householdIncomeEnd: 800,
    screening: {
      order: 1,
      question: [
        {
          questionText: "1",
          type: 1,
          isRequired: "1",
          order: 1,
          sequence: 1,
          options: [
            {
              optionText: "e",
              order: 1,
              optionType: 1,
            },
            {
              optionText: "e",
              order: 2,
              optionType: 1,
            },
            {
              optionText: "e",
              order: 3,
              optionType: 1,
            },
            {
              optionText: "その他",
              order: 4,
              optionType: 3,
            },
            {
              optionText: "当てはまるものはない",
              order: 5,
              optionType: 2,
            },
          ],
        },
        {
          questionText: "2",
          type: 2,
          isRequired: "1",
          order: 1,
          sequence: 2,
          options: [
            {
              optionText: "2",
              order: 1,
              optionType: 1,
            },
            {
              optionText: "2",
              order: 2,
              optionType: 1,
            },
            {
              optionText: "2",
              order: 3,
              optionType: 1,
            },
            {
              optionText: "その他",
              order: 4,
              optionType: 3,
            },
            {
              optionText: "当てはまるものはない",
              order: 5,
              optionType: 2,
            },
          ],
        },
        {
          questionText: "dddd",
          type: 3,
          isRequired: "1",
          order: 1,
          sequence: 3,
          options: [],
        },
      ],
    },
    status: 1,
  },
  campaignId: "0e2f77a1dc6d434dbc6d1237a8b06f77",
};
const dummyScheduleData = {
  selectedSlots: [
    {
      scheduledDate: "07-03-2024",
      startTime: "11:00",
      endTime: "11:30",
    },
    {
      startTime: "12:00",
      endTime: "12:30",
      scheduledDate: "07-03-2024",
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
      {
        id: "455d0423faad4bbb8b061f920fa1dfcd",
        name: "製造業(酒類)",
        order: 4,
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
        id: "1b20a486a7f64b23a63eb399a2c66240",
        name: "電気通信業",
        order: 19,
      },
      {
        id: "b90c5cadcbfa44aa807a9a6d3f3ff7a2",
        name: "卸売・小売業(食料・飲料(酒類除く))",
        order: 20,
      },
      {
        id: "ff983657ce9a4151b7f5b12fa92437d9",
        name: "卸売・小売業(酒類)",
        order: 21,
      },
      {
        id: "2484b11e8ad8473a8ff1d6232b85eb3e",
        name: "卸売・小売業(衣服・繊維製品)",
        order: 22,
      },
      {
        id: "5260cb2b7ce54587a844b857e3229fbc",
        name: "卸売・小売業(石けん・合成洗剤・医薬品・化粧品)",
        order: 23,
      },
      {
        id: "bd1238c8702f486caa0ae0769321d98b",
        name: "卸売・小売業(日用品)",
        order: 24,
      },
      {
        id: "edfcea2425394ebaad269abbe0004ec7",
        name: "卸売・小売業(製紙・パルプ)",
        order: 25,
      },
      {
        id: "fa440dce6e4a440b9c0d961935523940",
        name: "卸売・小売業(石油製品)",
        order: 26,
      },
      {
        id: "35ab98925f5a4e179e8b0119e7c753aa",
        name: "卸売・小売業(AV・家電・電気機械器具)",
        order: 27,
      },
      {
        id: "4aeaa60f1ca4448ca7ecdfa6138e7d8f",
        name: "卸売・小売業(コンピュータ)",
        order: 28,
      },
      {
        id: "19c9abe623164baa96a119839468bdb2",
        name: "卸売・小売業(自動車・輸送機器)",
        order: 29,
      },
      {
        id: "a7999534617a4c7c91e2d9b4d4f378ca",
        name: "卸売・小売業(その他)",
        order: 30,
      },
      {
        id: "64fdcf83975c415a8d9276c37b3f1c65",
        name: "飲食店",
        order: 31,
      },
      {
        id: "2d2af804ff8c46599916b2d8739ecba7",
        name: "金融業",
        order: 32,
      },
      {
        id: "11d1e467b3ac48c9a764f7197274b703",
        name: "保険業",
        order: 33,
      },
      {
        id: "db8dea1d0dfe4a19ad1d27d047d7909f",
        name: "不動産業",
        order: 34,
      },
      {
        id: "614bd27393234f1182b33d62948af959",
        name: "サービス業(旅館・その他の宿泊所・娯楽業)",
        order: 35,
      },
      {
        id: "91afcd3cd7234cd193c8325f4122eba2",
        name: "サービス業(その他)",
        order: 36,
      },
      {
        id: "70f147c538714551ba5590fd3f19fe8e",
        name: "放送業",
        order: 37,
      },
      {
        id: "6d0526398a434da788152664a60ac4df",
        name: "ソフトウェア・情報サービス業",
        order: 38,
      },
      {
        id: "46d3dc700e004428b577be1280e06915",
        name: "調査業・広告代理業",
        order: 39,
      },
      {
        id: "7bd53f41d1fa4565b82f16cfb67c33de",
        name: "医療業",
        order: 40,
      },
      {
        id: "43918588494046f4a6fb7800ea67686e",
        name: "協同組合・教育関連・公務員",
        order: 41,
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
  selectedDuration: 30,
  selectedSchedule: [
    {
      start: "11:00",
      end: "11:30",
      title: "",
    },
    {
      start: "12:00",
      end: "12:30",
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
            campaignAddData: {
              title: "Test",
              includeCondition: "Test",
              excludeCondition: "Test",
              ngIndustries: [
                "a0ce515823f341f4aa27cdfd041320ad",
                "244c80b1603147c4b493a51b625634d0",
              ],
              monitorsCount: 10,
              interviewDurationId: "3109e00337b84f5fb432a37f7fab2eb4",
              startsAt: "06-03-2024",
              endsAt: "08-03-2024",
              timeslot: [
                {
                  scheduledDate: "07-03-2024",
                  startTime: "11:00",
                  endTime: "11:30",
                },
                {
                  startTime: "12:00",
                  endTime: "12:30",
                  scheduledDate: "07-03-2024",
                },
              ],
              hasScreening: true,
              gender: 1,
              ageFrom: 28,
              ageTo: 43,
              prefectures: [
                "ef279ca621da4c58b6dfe50eb3555463",
                "74d926021baf4ddea78095e826588c7c",
                "9c3f78cd7b6241289992374bec88269e",
                "a6d25670705647e184a48eba53a9e204",
                "e922c2c7401a43ee98b05b454721ac91",
                "55aed9daac0441a9b0b574f166d9485d",
              ],
              maritalStatus: 1,
              hasChildren: 1,
              occupations: ["cd450ead34f144ee84730234c7d9a6a7"],
              personalIncomeStart: 800,
              personalIncomeEnd: 1000,
              householdIncomeStart: 400,
              householdIncomeEnd: 800,
              screening: {
                order: 1,
                question: [
                  {
                    questionText: "1",
                    type: 1,
                    isRequired: "1",
                    order: 1,
                    sequence: 1,
                    options: [
                      {
                        optionText: "e",
                        order: 1,
                        optionType: 1,
                      },
                      {
                        optionText: "e",
                        order: 2,
                        optionType: 1,
                      },
                      {
                        optionText: "e",
                        order: 3,
                        optionType: 1,
                      },
                      {
                        optionText: "その他",
                        order: 4,
                        optionType: 3,
                      },
                      {
                        optionText: "当てはまるものはない",
                        order: 5,
                        optionType: 2,
                      },
                    ],
                  },
                  {
                    questionText: "2",
                    type: 2,
                    isRequired: "1",
                    order: 1,
                    sequence: 2,
                    options: [
                      {
                        optionText: "2",
                        order: 1,
                        optionType: 1,
                      },
                      {
                        optionText: "2",
                        order: 2,
                        optionType: 1,
                      },
                      {
                        optionText: "2",
                        order: 3,
                        optionType: 1,
                      },
                      {
                        optionText: "その他",
                        order: 4,
                        optionType: 3,
                      },
                      {
                        optionText: "当てはまるものはない",
                        order: 5,
                        optionType: 2,
                      },
                    ],
                  },
                  {
                    questionText: "dddd",
                    type: 3,
                    isRequired: "1",
                    order: 1,
                    sequence: 3,
                    options: [],
                  },
                ],
              },
              status: 1,
            },
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
    const goBackButton = screen.getByTestId("goBack-button");
    fireEvent.click(goBackButton);
  });
  it("draft submit", async () => {
    render(
      <AppTheme>
        <Page />
      </AppTheme>
    );
    const draftButton = screen.getByTestId("draft-button");
    fireEvent.click(draftButton);
  });
  it("publish submit", async () => {
    render(
      <AppTheme>
        <Page />
      </AppTheme>
    );
    const publishButton = screen.getByTestId("publish-button");
    fireEvent.click(publishButton);
  });

  // Add more tests as needed
});
