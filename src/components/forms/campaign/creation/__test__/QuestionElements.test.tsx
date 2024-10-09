import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import AppTheme from "../../../../../theme";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  generalServices,
  researchService,
} from "../../../../../common/apiUrls";
import { act } from "react-dom/test-utils";
import { FormProvider, useForm } from "react-hook-form";
import {
  FreeTextQuestion,
  MultipleQuestion,
  SingleQuestion,
} from "../QuestionElements";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box } from "@mui/material";

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
        startTime: "2024-02-11T00:30:00Z",
        endTime: "2024-02-11T01:30:00Z",
        id: "d5e03452371f4d88983acc1543f1d197",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-11T01:30:00Z",
        endTime: "2024-02-11T02:30:00Z",
        id: "5cef11935366446585bf9b54edd007f8",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-11T02:30:00Z",
        endTime: "2024-02-11T03:30:00Z",
        id: "668c50e6cc4a48958623706c2330b3f0",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-11T03:30:00Z",
        endTime: "2024-02-11T04:30:00Z",
        id: "18686fec2ab447319937d5fde01d0a20",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-11T08:30:00Z",
        endTime: "2024-02-11T09:30:00Z",
        id: "00c5c37876534b13b9953c26de106f3b",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-12T00:30:00Z",
        endTime: "2024-02-12T01:30:00Z",
        id: "c380f7a2784f4de0b012df73df4d810d",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-12T01:30:00Z",
        endTime: "2024-02-12T02:30:00Z",
        id: "6f2beb50be8a41e99a7312d881bf0379",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-12T02:30:00Z",
        endTime: "2024-02-12T03:30:00Z",
        id: "21504aa1b52d45b7bad25ef397454bf4",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-12T03:30:00Z",
        endTime: "2024-02-12T04:30:00Z",
        id: "003060272c45469fa28b6a35972f613e",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-13T00:30:00Z",
        endTime: "2024-02-13T01:30:00Z",
        id: "7f60c42ed53f414a93a041d36272986e",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-13T01:30:00Z",
        endTime: "2024-02-13T02:30:00Z",
        id: "f1248aa39576499485f6eacded7c0417",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-13T02:30:00Z",
        endTime: "2024-02-13T03:30:00Z",
        id: "0c70c13e56d845d1a1296417a162eda3",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-13T03:30:00Z",
        endTime: "2024-02-13T04:30:00Z",
        id: "82853d5a08fa4ba596cbc28d9e29fb06",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-13T05:00:00Z",
        endTime: "2024-02-13T06:00:00Z",
        id: "dded8064cb304c42b70c62f0f8a9421c",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-13T06:00:00Z",
        endTime: "2024-02-13T07:00:00Z",
        id: "71e5b8ca26c84de1967f20f0fdbc97b7",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-13T07:00:00Z",
        endTime: "2024-02-13T08:00:00Z",
        id: "8e9ec9dc744848f5a9eedfb06017b816",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-13T08:00:00Z",
        endTime: "2024-02-13T09:00:00Z",
        id: "4294d4ca9f054dbd8b151a4d3e0ac9ac",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-13T09:00:00Z",
        endTime: "2024-02-13T10:00:00Z",
        id: "acdbb8c3e4554e81889a89318c0a5fc0",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-14T00:30:00Z",
        endTime: "2024-02-14T01:30:00Z",
        id: "a93f81fa0f634b758a534748dae9e04c",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-14T01:30:00Z",
        endTime: "2024-02-14T02:30:00Z",
        id: "5d078a795a494188bac0d5b7c3654734",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-14T02:30:00Z",
        endTime: "2024-02-14T03:30:00Z",
        id: "35bcb20cb6f0419a930d5138c2f833b7",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-14T03:30:00Z",
        endTime: "2024-02-14T04:30:00Z",
        id: "2b32ddeeb0e4422588cb894c942372a3",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-14T05:00:00Z",
        endTime: "2024-02-14T06:00:00Z",
        id: "e60cab9e97c74a34a3cfdb096611e5e8",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-14T06:00:00Z",
        endTime: "2024-02-14T07:00:00Z",
        id: "c2eaa8a0c00b4676ab96222267380daf",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-14T07:00:00Z",
        endTime: "2024-02-14T08:00:00Z",
        id: "69d2620635044ba09532cebafe737310",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-14T08:00:00Z",
        endTime: "2024-02-14T09:00:00Z",
        id: "2aad19df6c624ec88381b8ce521038dc",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-14T09:00:00Z",
        endTime: "2024-02-14T10:00:00Z",
        id: "a08fcefca0d148f2a0e9d20908bbcb69",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-15T00:30:00Z",
        endTime: "2024-02-15T01:30:00Z",
        id: "882ca8abd82c48b484523172d67004b9",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-15T01:30:00Z",
        endTime: "2024-02-15T02:30:00Z",
        id: "3d16ad9cc000496f9506973cded97536",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-15T02:30:00Z",
        endTime: "2024-02-15T03:30:00Z",
        id: "1824554c5d154d1fa913bc9da3ebab3e",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-15T03:30:00Z",
        endTime: "2024-02-15T04:30:00Z",
        id: "d9db1883d5334ba9826c3b5a237b49fc",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-15T05:00:00Z",
        endTime: "2024-02-15T06:00:00Z",
        id: "d7c0a1eca04043c38e2c56157b845f9b",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-15T06:00:00Z",
        endTime: "2024-02-15T07:00:00Z",
        id: "fb5f209fde9549ff8017dc425c096b5f",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-15T07:00:00Z",
        endTime: "2024-02-15T08:00:00Z",
        id: "17f6806bf7f74d6490e81468fda476ff",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-15T08:00:00Z",
        endTime: "2024-02-15T09:00:00Z",
        id: "d0e0811664e8446d848e888a56bb79ac",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-15T09:00:00Z",
        endTime: "2024-02-15T10:00:00Z",
        id: "f5bd860e08ca4e64a623314ff4d1917a",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-16T00:30:00Z",
        endTime: "2024-02-16T01:30:00Z",
        id: "1dcc4ed238714368a800c68f92aab521",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-16T01:30:00Z",
        endTime: "2024-02-16T02:30:00Z",
        id: "47892b8ae0e144d690b3efdb43a5e71b",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-16T02:30:00Z",
        endTime: "2024-02-16T03:30:00Z",
        id: "d28e922b749a4cacbedade0fcf0299ed",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-16T03:30:00Z",
        endTime: "2024-02-16T04:30:00Z",
        id: "f6f4fb98b4a84d05b4ddfd7ee922d882",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-16T05:00:00Z",
        endTime: "2024-02-16T06:00:00Z",
        id: "40a98c9c88ed4240a281037a56898b93",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-16T06:00:00Z",
        endTime: "2024-02-16T07:00:00Z",
        id: "b9e6d19bf53c4cca83aeb19248ac4c6d",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-16T07:00:00Z",
        endTime: "2024-02-16T08:00:00Z",
        id: "70efaba8d2304dcda791a22bde0b8f91",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-16T08:00:00Z",
        endTime: "2024-02-16T09:00:00Z",
        id: "29d7e19939b94ff4bc0b225b2a531a51",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-16T09:00:00Z",
        endTime: "2024-02-16T10:00:00Z",
        id: "26712c1127744ab2a16e4800d874d4b6",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-17T00:30:00Z",
        endTime: "2024-02-17T01:30:00Z",
        id: "f855e77e6c0d461c8343bb6e0b780809",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-17T01:30:00Z",
        endTime: "2024-02-17T02:30:00Z",
        id: "98fa536a0705425ba57cc4b7ae0364f2",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-17T02:30:00Z",
        endTime: "2024-02-17T03:30:00Z",
        id: "7050e3bcc2674e16a945e9a5b863896e",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-17T03:30:00Z",
        endTime: "2024-02-17T04:30:00Z",
        id: "beee9d2f11db4d8581e6cdf0dd646fa5",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-17T05:00:00Z",
        endTime: "2024-02-17T06:00:00Z",
        id: "3adcbdf8753042beb332a3fc727fcdaf",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-17T06:00:00Z",
        endTime: "2024-02-17T07:00:00Z",
        id: "acac8766bd7c465191d9f62b14f7d3d6",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-17T07:00:00Z",
        endTime: "2024-02-17T08:00:00Z",
        id: "f21b9e416def4fdd8b613d98ced78012",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-17T08:00:00Z",
        endTime: "2024-02-17T09:00:00Z",
        id: "a8838412bbb14353bdb3aaa5ede967a5",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-17T09:00:00Z",
        endTime: "2024-02-17T10:00:00Z",
        id: "382c59bf4c51494b8270b2577aad445f",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-18T00:30:00Z",
        endTime: "2024-02-18T01:30:00Z",
        id: "411ffa1f5bca4fddaf276b4139df3eaa",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-18T01:30:00Z",
        endTime: "2024-02-18T02:30:00Z",
        id: "45113cef3f9e469788f42f86a6423f9a",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-18T02:30:00Z",
        endTime: "2024-02-18T03:30:00Z",
        id: "ba15f01ed6e047cdadb8710e76c48f07",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-18T05:00:00Z",
        endTime: "2024-02-18T06:00:00Z",
        id: "4d7c3d5c89564d04bdbdf3b7c0013348",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-18T06:00:00Z",
        endTime: "2024-02-18T07:00:00Z",
        id: "68268a8d01f147f38b2c2bebb35c65fe",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-18T07:00:00Z",
        endTime: "2024-02-18T08:00:00Z",
        id: "f78786dfe0d6452f84ec754f4e0980dc",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-18T08:00:00Z",
        endTime: "2024-02-18T09:00:00Z",
        id: "194f139a3fd24e3d89c8e9fada4b8e7c",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-18T09:00:00Z",
        endTime: "2024-02-18T10:00:00Z",
        id: "dbf8b2734b4d4cbe86df3bd1ff46fc7e",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-19T00:30:00Z",
        endTime: "2024-02-19T01:30:00Z",
        id: "6b17eec79373409c87434e1bcd048c70",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-19T01:30:00Z",
        endTime: "2024-02-19T02:30:00Z",
        id: "a31c31a0d51e4821886904c52954631e",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-19T02:30:00Z",
        endTime: "2024-02-19T03:30:00Z",
        id: "e0a0f10b9ad342098b8c7f00809aa6f8",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-19T05:00:00Z",
        endTime: "2024-02-19T06:00:00Z",
        id: "1d66e596afd949e288a534d1623accaf",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-19T06:00:00Z",
        endTime: "2024-02-19T07:00:00Z",
        id: "080baf56e7594173828c56d0f9173904",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-19T07:00:00Z",
        endTime: "2024-02-19T08:00:00Z",
        id: "b2eb2eb125e64d1f89001c90385f2b29",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-19T08:00:00Z",
        endTime: "2024-02-19T09:00:00Z",
        id: "0fcb4ff343b44e11a105e425107a4356",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-19T09:00:00Z",
        endTime: "2024-02-19T10:00:00Z",
        id: "8eea52a412e74e1996e0c6125054bb25",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-20T00:30:00Z",
        endTime: "2024-02-20T01:30:00Z",
        id: "8b058fa46d47435c87e343a2da1c1edc",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-20T01:30:00Z",
        endTime: "2024-02-20T02:30:00Z",
        id: "0ba0a44b74de4e108a119f7a3e5c3e49",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-20T02:30:00Z",
        endTime: "2024-02-20T03:30:00Z",
        id: "08bd58881c4d46a5b66d681c93650d14",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-20T05:00:00Z",
        endTime: "2024-02-20T06:00:00Z",
        id: "11d5c8ff5d7c434bb3bb05c0630564bf",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-20T06:00:00Z",
        endTime: "2024-02-20T07:00:00Z",
        id: "dc2f7fbfa2bf4964a01e0c95f846a4cf",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-20T07:00:00Z",
        endTime: "2024-02-20T08:00:00Z",
        id: "8773e2c08b014e26b71563701021c74c",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-20T08:00:00Z",
        endTime: "2024-02-20T09:00:00Z",
        id: "38c5b00030564525b8de864ff12960ea",
        status: 0,
        type: 0,
      },
      {
        startTime: "2024-02-20T09:00:00Z",
        endTime: "2024-02-20T10:00:00Z",
        id: "f85c430e90d14390a5d42d4ef30f3aac",
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
      startTime: "08:00",
      endTime: "09:00",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "09:00",
      endTime: "10:00",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "10:00",
      endTime: "11:00",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "11:00",
      endTime: "12:00",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "12:00",
      endTime: "13:00",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "13:00",
      endTime: "14:00",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "14:00",
      endTime: "15:00",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "15:00",
      endTime: "16:00",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "16:30",
      endTime: "17:30",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "17:30",
      endTime: "18:30",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "18:30",
      endTime: "19:30",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "19:30",
      endTime: "20:30",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "20:30",
      endTime: "21:30",
      scheduledDate: "10-02-2024",
    },
    {
      startTime: "08:00",
      endTime: "09:00",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "09:00",
      endTime: "10:00",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "10:00",
      endTime: "11:00",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "11:00",
      endTime: "12:00",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "12:00",
      endTime: "13:00",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "13:00",
      endTime: "14:00",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "14:00",
      endTime: "15:00",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "15:00",
      endTime: "16:00",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "16:30",
      endTime: "17:30",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "17:30",
      endTime: "18:30",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "18:30",
      endTime: "19:30",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "19:30",
      endTime: "20:30",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "20:30",
      endTime: "21:30",
      scheduledDate: "11-02-2024",
    },
    {
      startTime: "08:00",
      endTime: "09:00",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "09:00",
      endTime: "10:00",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "10:00",
      endTime: "11:00",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "11:00",
      endTime: "12:00",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "12:00",
      endTime: "13:00",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "13:00",
      endTime: "14:00",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "14:00",
      endTime: "15:00",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "15:00",
      endTime: "16:00",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "16:30",
      endTime: "17:30",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "17:30",
      endTime: "18:30",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "18:30",
      endTime: "19:30",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "19:30",
      endTime: "20:30",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "20:30",
      endTime: "21:30",
      scheduledDate: "12-02-2024",
    },
    {
      startTime: "08:00",
      endTime: "09:00",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "09:00",
      endTime: "10:00",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "10:00",
      endTime: "11:00",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "11:00",
      endTime: "12:00",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "12:00",
      endTime: "13:00",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "13:00",
      endTime: "14:00",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "14:00",
      endTime: "15:00",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "15:00",
      endTime: "16:00",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "16:30",
      endTime: "17:30",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "17:30",
      endTime: "18:30",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "18:30",
      endTime: "19:30",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "19:30",
      endTime: "20:30",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "20:30",
      endTime: "21:30",
      scheduledDate: "13-02-2024",
    },
    {
      startTime: "08:00",
      endTime: "09:00",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "09:00",
      endTime: "10:00",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "10:00",
      endTime: "11:00",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "11:00",
      endTime: "12:00",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "12:00",
      endTime: "13:00",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "13:00",
      endTime: "14:00",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "14:00",
      endTime: "15:00",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "15:00",
      endTime: "16:00",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "16:30",
      endTime: "17:30",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "17:30",
      endTime: "18:30",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "18:30",
      endTime: "19:30",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "19:30",
      endTime: "20:30",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "20:30",
      endTime: "21:30",
      scheduledDate: "14-02-2024",
    },
    {
      startTime: "09:30",
      endTime: "10:30",
      scheduledDate: "15-02-2024",
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
      startTime: "09:30",
      endTime: "10:30",
      scheduledDate: "19-02-2024",
    },
    {
      startTime: "10:30",
      endTime: "11:30",
      scheduledDate: "19-02-2024",
    },
    {
      startTime: "11:30",
      endTime: "12:30",
      scheduledDate: "19-02-2024",
    },
    {
      startTime: "12:30",
      endTime: "13:30",
      scheduledDate: "19-02-2024",
    },
    {
      startTime: "13:30",
      endTime: "14:30",
      scheduledDate: "19-02-2024",
    },
    {
      startTime: "14:30",
      endTime: "15:30",
      scheduledDate: "19-02-2024",
    },
    {
      startTime: "17:00",
      endTime: "18:00",
      scheduledDate: "19-02-2024",
    },
    {
      startTime: "18:00",
      endTime: "19:00",
      scheduledDate: "19-02-2024",
    },
    {
      startTime: "19:00",
      endTime: "20:00",
      scheduledDate: "19-02-2024",
    },
    {
      startTime: "20:00",
      endTime: "21:00",
      scheduledDate: "19-02-2024",
    },
    {
      startTime: "09:30",
      endTime: "10:30",
      scheduledDate: "20-02-2024",
    },
    {
      startTime: "10:30",
      endTime: "11:30",
      scheduledDate: "20-02-2024",
    },
    {
      startTime: "11:30",
      endTime: "12:30",
      scheduledDate: "20-02-2024",
    },
    {
      startTime: "12:30",
      endTime: "13:30",
      scheduledDate: "20-02-2024",
    },
    {
      startTime: "13:30",
      endTime: "14:30",
      scheduledDate: "20-02-2024",
    },
    {
      startTime: "14:30",
      endTime: "15:30",
      scheduledDate: "20-02-2024",
    },
    {
      startTime: "17:00",
      endTime: "18:00",
      scheduledDate: "20-02-2024",
    },
    {
      startTime: "18:00",
      endTime: "19:00",
      scheduledDate: "20-02-2024",
    },
    {
      startTime: "19:00",
      endTime: "20:00",
      scheduledDate: "20-02-2024",
    },
    {
      startTime: "20:00",
      endTime: "21:00",
      scheduledDate: "20-02-2024",
    },
    {
      startTime: "17:00",
      endTime: "18:00",
      scheduledDate: "21-02-2024",
    },
    {
      startTime: "18:00",
      endTime: "19:00",
      scheduledDate: "21-02-2024",
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
      start: "2024-02-09T13:00:00.000Z",
      end: "2024-02-09T14:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-09T14:00:00.000Z",
      end: "2024-02-09T15:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-09T15:00:00.000Z",
      end: "2024-02-09T16:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-10T02:30:00.000Z",
      end: "2024-02-10T03:30:00.000Z",
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
    {
      start: "2024-02-15T04:00:00.000Z",
      end: "2024-02-15T05:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-15T05:00:00.000Z",
      end: "2024-02-15T06:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-15T06:00:00.000Z",
      end: "2024-02-15T07:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-15T07:30:00.000Z",
      end: "2024-02-15T08:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-15T09:00:00.000Z",
      end: "2024-02-15T10:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-16T04:00:00.000Z",
      end: "2024-02-16T05:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-16T05:00:00.000Z",
      end: "2024-02-16T06:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-16T06:00:00.000Z",
      end: "2024-02-16T07:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-16T07:00:00.000Z",
      end: "2024-02-16T08:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-16T08:00:00.000Z",
      end: "2024-02-16T09:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-16T09:00:00.000Z",
      end: "2024-02-16T10:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-16T11:30:00.000Z",
      end: "2024-02-16T12:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-16T12:30:00.000Z",
      end: "2024-02-16T13:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-16T13:30:00.000Z",
      end: "2024-02-16T14:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-16T14:30:00.000Z",
      end: "2024-02-16T15:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-17T04:00:00.000Z",
      end: "2024-02-17T05:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-17T05:00:00.000Z",
      end: "2024-02-17T06:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-17T06:00:00.000Z",
      end: "2024-02-17T07:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-17T07:00:00.000Z",
      end: "2024-02-17T08:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-17T08:00:00.000Z",
      end: "2024-02-17T09:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-17T09:00:00.000Z",
      end: "2024-02-17T10:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-17T11:30:00.000Z",
      end: "2024-02-17T12:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-17T12:30:00.000Z",
      end: "2024-02-17T13:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-17T13:30:00.000Z",
      end: "2024-02-17T14:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-17T14:30:00.000Z",
      end: "2024-02-17T15:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-18T04:00:00.000Z",
      end: "2024-02-18T05:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-18T05:00:00.000Z",
      end: "2024-02-18T06:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-18T06:00:00.000Z",
      end: "2024-02-18T07:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-18T07:00:00.000Z",
      end: "2024-02-18T08:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-18T08:00:00.000Z",
      end: "2024-02-18T09:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-18T09:00:00.000Z",
      end: "2024-02-18T10:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-18T11:30:00.000Z",
      end: "2024-02-18T12:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-18T12:30:00.000Z",
      end: "2024-02-18T13:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-18T13:30:00.000Z",
      end: "2024-02-18T14:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-18T14:30:00.000Z",
      end: "2024-02-18T15:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-19T04:00:00.000Z",
      end: "2024-02-19T05:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-19T05:00:00.000Z",
      end: "2024-02-19T06:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-19T06:00:00.000Z",
      end: "2024-02-19T07:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-19T07:00:00.000Z",
      end: "2024-02-19T08:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-19T08:00:00.000Z",
      end: "2024-02-19T09:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-19T09:00:00.000Z",
      end: "2024-02-19T10:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-19T11:30:00.000Z",
      end: "2024-02-19T12:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-19T12:30:00.000Z",
      end: "2024-02-19T13:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-19T13:30:00.000Z",
      end: "2024-02-19T14:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-19T14:30:00.000Z",
      end: "2024-02-19T15:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-20T04:00:00.000Z",
      end: "2024-02-20T05:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-20T05:00:00.000Z",
      end: "2024-02-20T06:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-20T06:00:00.000Z",
      end: "2024-02-20T07:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-20T07:00:00.000Z",
      end: "2024-02-20T08:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-20T08:00:00.000Z",
      end: "2024-02-20T09:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-20T09:00:00.000Z",
      end: "2024-02-20T10:00:00.000Z",
      title: "",
    },
    {
      start: "2024-02-20T11:30:00.000Z",
      end: "2024-02-20T12:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-20T12:30:00.000Z",
      end: "2024-02-20T13:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-20T13:30:00.000Z",
      end: "2024-02-20T14:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-20T14:30:00.000Z",
      end: "2024-02-20T15:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-21T11:30:00.000Z",
      end: "2024-02-21T12:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-21T12:30:00.000Z",
      end: "2024-02-21T13:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-21T13:30:00.000Z",
      end: "2024-02-21T14:30:00.000Z",
      title: "",
    },
    {
      start: "2024-02-21T14:30:00.000Z",
      end: "2024-02-21T15:30:00.000Z",
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
describe("Campaign updates ", () => {
  beforeAll(async () => {
    await act(async () => {
      (researchService.getCampaignDetail as any).mockResolvedValue({
        data: dummyData,
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

  it("Active question free text", async () => {
    render(
      <AppTheme>
        <div id="main-container">
          <WrapperForm>
            <FreeTextQuestion
              activeQuestionIndex={1}
              index={1}
              questionLength={4}
              onActiveQuestionIndexChange={() => {}}
              question={{
                questionText: "",
                type: 3,
                isRequired: true,
                order: 1,
                sequence: 1,
                options: [],
              }}
            />
          </WrapperForm>
        </div>
      </AppTheme>
    );
    const questionRemove = screen.getByTestId("question-remove");
    fireEvent.click(questionRemove);
    //
  });
  it("In Active question free text", async () => {
    render(
      <AppTheme>
        <div id="main-container">
          <WrapperForm>
            <FreeTextQuestion
              activeQuestionIndex={0}
              index={1}
              onActiveQuestionIndexChange={() => {}}
              question={{
                questionText: "",
                type: 3,
                isRequired: true,
                order: 1,
                sequence: 1,
                options: [],
              }}
              questionLength={4}
            />
          </WrapperForm>
        </div>
      </AppTheme>
    );

    //
  });
  it("Active question multi text", async () => {
    render(
      <AppTheme>
        <div id="main-container">
          <WrapperForm>
            <MultipleQuestion
              activeQuestionIndex={1}
              index={1}
              onActiveQuestionIndexChange={() => {}}
              question={{
                questionText: "",
                type: 2,
                isRequired: true,
                order: 1,
                sequence: 1,
                options: [
                  {
                    order: 1,
                    optionText: "ttt",
                    optionType: 1,
                  },
                  {
                    order: 1,
                    optionText: "ttt",
                    optionType: 1,
                  },
                ],
              }}
              openAnimation
              questionLength={4}
            />
          </WrapperForm>
        </div>
      </AppTheme>
    );
    const optionAddButton = screen.getByTestId("option-add");
    fireEvent.click(optionAddButton);
    fireEvent.click(screen.getByTestId("option-other"));
    fireEvent.click(screen.getByTestId("option-exclusive"));
    const multipleOptionButton = screen.getByTestId("multiple-option-button");
    fireEvent.click(multipleOptionButton);
    fireEvent.change(screen.getByTestId("multiOptions"), {
      target: { value: "hi" },
    });
    fireEvent.click(screen.getByTestId("multiOptions-submit"));
    const questionRemove = screen.getByTestId("question-remove");
    const optionRemoveElements = screen.queryAllByTestId("option-remove");
    const optionRemove = optionRemoveElements[0];
    fireEvent.click(optionRemove);
    fireEvent.click(questionRemove);

    //
  });
  it("In Active question multi text", async () => {
    render(
      <AppTheme>
        <div id="main-container">
          <WrapperForm>
            <MultipleQuestion
              activeQuestionIndex={3}
              index={1}
              onActiveQuestionIndexChange={() => {}}
              question={{
                questionText: "",
                type: 2,
                isRequired: true,
                order: 1,
                sequence: 1,
                options: [
                  {
                    order: 1,
                    optionText: "ttt",
                    optionType: 1,
                  },
                  {
                    order: 1,
                    optionText: "ttt",
                    optionType: 1,
                  },
                ],
              }}
              openAnimation
              questionLength={4}
            />
          </WrapperForm>
        </div>
      </AppTheme>
    );

    //
  });
  it("Active question single text", async () => {
    render(
      <AppTheme>
        <div id="main-container">
          <WrapperForm>
            <SingleQuestion
              activeQuestionIndex={1}
              questionLength={4}
              index={1}
              onActiveQuestionIndexChange={() => {}}
              question={{
                questionText: "",
                type: 2,
                isRequired: true,
                order: 1,
                sequence: 1,
                options: [
                  {
                    order: 1,
                    optionText: "ttt",
                    optionType: 1,
                  },
                  {
                    order: 1,
                    optionText: "ttt",
                    optionType: 1,
                  },
                ],
              }}
            />
          </WrapperForm>
        </div>
      </AppTheme>
    );
    const optionAddButton = screen.getByTestId("option-add");
    fireEvent.click(optionAddButton);
    fireEvent.click(screen.getByTestId("option-other"));
    fireEvent.click(screen.getByTestId("option-exclusive"));
    const multipleOptionButton = screen.getByTestId("multiple-option-button");
    fireEvent.click(multipleOptionButton);
    fireEvent.change(screen.getByTestId("multiOptions"), {
      target: { value: "hi" },
    });
    fireEvent.click(screen.getByTestId("multiOptions-submit"));

    const questionRemove = screen.getByTestId("question-remove");
    const optionRemoveElements = screen.queryAllByTestId("option-remove");
    const optionRemove = optionRemoveElements[0];
    fireEvent.click(optionRemove);
    fireEvent.click(questionRemove);
    //
  });
  it("In Active question single text", async () => {
    render(
      <AppTheme>
        <div id="main-container">
          <WrapperForm>
            <SingleQuestion
              activeQuestionIndex={3}
              index={1}
              onActiveQuestionIndexChange={() => {}}
              questionLength={4}
              question={{
                questionText: "",
                type: 1,
                isRequired: true,
                order: 1,
                sequence: 1,
                options: [
                  {
                    order: 1,
                    optionText: "ttt",
                    optionType: 1,
                  },
                  {
                    order: 1,
                    optionText: "ttt",
                    optionType: 1,
                  },
                ],
              }}
            />
          </WrapperForm>
        </div>
      </AppTheme>
    );

    //
  });
  it("Active question multi text empty option", async () => {
    render(
      <AppTheme>
        <div id="main-container">
          <WrapperForm>
            <MultipleQuestion
              activeQuestionIndex={1}
              index={1}
              onActiveQuestionIndexChange={() => {}}
              question={{
                questionText: "",
                type: 2,
                isRequired: true,
                order: 1,
                sequence: 1,
                options: [],
              }}
              openAnimation
              questionLength={4}
            />
          </WrapperForm>
        </div>
      </AppTheme>
    );

    //
  });
  it("Active question single text empty option", async () => {
    render(
      <AppTheme>
        <div id="main-container">
          <WrapperForm>
            <SingleQuestion
              activeQuestionIndex={1}
              index={1}
              onActiveQuestionIndexChange={() => {}}
              question={{
                questionText: "",
                type: 1,
                isRequired: true,
                order: 1,
                sequence: 1,
                options: [],
              }}
              questionLength={4}
            />
          </WrapperForm>
        </div>
      </AppTheme>
    );

    //
  });

  // Add more tests as needed
});
const WrapperForm = ({ children }: any) => {
  const methods = useForm({
    defaultValues: {
      question: [
        {
          questionText: "",
          type: 2,
          isRequired: true,
          order: 1,
          sequence: 1,
          options: [],
        },
        {
          questionText: "",
          type: 3,
          isRequired: true,
          order: 1,
          sequence: 1,
          options: [],
        },
        {
          questionText: "",
          type: 1,
          isRequired: true,
          order: 1,
          sequence: 1,
          options: [],
        },
      ],
    },
    mode: "onChange",
  });
  return (
    <FormProvider {...methods}>
      <DragDropContext onDragEnd={(source) => {}}>
        <Droppable droppableId="characters">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {provided.placeholder}
              <form onSubmit={methods.handleSubmit(() => {})}>
                {children}
                <button onClick={methods.handleSubmit(() => {})} type="submit">
                  Submit
                </button>
              </form>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </FormProvider>
  );
};
