import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CampaignListTable from "../CampaignListTable";
import AppTheme from "../../../theme";
import { useDispatch } from "react-redux";
import { researchService, ticketService } from "../../../common/apiUrls";

// Mocking useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

// Mocking useDispatch
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mocking the i18n translation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: jest.fn() }),
}));
const mockData: any = [
  {
    id: "de98c0e501374468a59dd69d69441aa5",
    title: "multiple users",
    startsAt: "2023-12-13 00:00:00",
    endsAt: "2024-01-12 00:00:00",
    status: 0,
    defaultLanguageId: "ja",
    monitorsCount: 1,
    interviewDuration: 30,
    monitorPoints: 3000,
    appliedMonitorCount: 1,
    vacantSlots: 1,
    releaseDate: "2023-12-13 12:47:11",
    updatedAt: "",
    scheduleConfirmed: 0,
    isNew: 0,
    completion: 0,
  },
  {
    id: "a8b8de786e2a469dba727ea9a9442516",
    title: "Details",
    startsAt: "2023-12-14 00:00:00",
    endsAt: "2024-01-13 00:00:00",
    defaultLanguageId: "ja",
    monitorsCount: 1,
    vacantSlots: 1,
    status: 1,
    interviewDuration: 0,
    monitorPoints: 0,
    updatedAt: "",
    appliedMonitorCount: 0,
    scheduleConfirmed: 0,
    isNew: 0,
    releaseDate: "",
    completion: 0,
  },
  {
    id: "5172c49cb03d4115b11c5484a35fca1f",
    title: "Details",
    startsAt: "2023-12-14 00:00:00",
    endsAt: "2024-01-13 00:00:00",
    defaultLanguageId: "ja",
    monitorsCount: 1,
    vacantSlots: 1,
    status: 2,
    interviewDuration: 0,
    monitorPoints: 0,
    updatedAt: "",
    appliedMonitorCount: 0,
    scheduleConfirmed: 0,
    isNew: 0,
    releaseDate: "",
    completion: 0,
  },
  {
    id: "547c45cea57340c6800c9bbce6d37541",
    title: "survey-pro",
    startsAt: "2023-12-13 00:00:00",
    endsAt: "2024-01-12 00:00:00",
    status: 3,
    defaultLanguageId: "ja",
    monitorsCount: 1,
    interviewDuration: 30,
    monitorPoints: 3000,
    vacantSlots: 1,
    releaseDate: "2023-12-13 15:49:41",
    updatedAt: "",
    appliedMonitorCount: 0,
    scheduleConfirmed: 0,
    isNew: 0,
    completion: 0,
  },
  {
    id: "49677373e4b94683bba3da4d6023a67d",
    title: "Data-profession",
    startsAt: "2023-12-13 00:00:00",
    endsAt: "2024-01-12 00:00:00",
    status: 1,
    defaultLanguageId: "ja",
    monitorsCount: 1,
    interviewDuration: 30,
    monitorPoints: 3000,
    appliedMonitorCount: 2,
    vacantSlots: 1,
    releaseDate: "2023-12-13 15:01:54",
    updatedAt: "",
    scheduleConfirmed: 0,
    isNew: 0,
    completion: 0,
  },
  {
    id: "10e065fa54994fa592de878394221302",
    title: "profession",
    startsAt: "2023-12-13 00:00:00",
    endsAt: "2024-01-12 00:00:00",
    status: 1,
    defaultLanguageId: "ja",
    monitorsCount: 1,
    interviewDuration: 30,
    monitorPoints: 3000,
    vacantSlots: 1,
    releaseDate: "2023-12-13 14:59:00",
    updatedAt: "",
    appliedMonitorCount: 0,
    scheduleConfirmed: 0,
    isNew: 0,
    completion: 0,
  },
  {
    id: "ab4e86471f9645b78b94a41e372af179",
    title: "Survey Data",
    startsAt: "2023-12-13 00:00:00",
    endsAt: "2024-01-12 00:00:00",
    status: 0,
    defaultLanguageId: "ja",
    monitorsCount: 1,
    interviewDuration: 30,
    monitorPoints: 3000,
    vacantSlots: 1,
    releaseDate: "2023-12-13 14:57:34",
    updatedAt: "",
    appliedMonitorCount: 0,
    scheduleConfirmed: 0,
    isNew: 0,
    completion: 0,
  },
  {
    id: "c9cf9549be87498789b7d3e7ed0026a5",
    title: "qweryy",
    startsAt: "2023-12-13 00:00:00",
    endsAt: "2024-01-12 00:00:00",
    status: 0,
    defaultLanguageId: "ja",
    monitorsCount: 1,
    interviewDuration: 30,
    monitorPoints: 3000,
    vacantSlots: 1,
    releaseDate: "2023-12-13 13:16:30",
    updatedAt: "",
    appliedMonitorCount: 0,
    scheduleConfirmed: 0,
    isNew: 0,
    completion: 0,
  },
  {
    id: "5889587fb8684408b9da40e97ecd6f28",
    title: "survey condition",
    startsAt: "2023-12-13 00:00:00",
    endsAt: "2024-01-12 00:00:00",
    status: 1,
    defaultLanguageId: "ja",
    monitorsCount: 1,
    interviewDuration: 30,
    monitorPoints: 3000,
    appliedMonitorCount: 1,
    vacantSlots: 1,
    releaseDate: "2023-12-13 12:42:56",
    updatedAt: "",
    scheduleConfirmed: 0,
    isNew: 0,
    completion: 0,
  },
  {
    id: "b6dd88bfae934aafa6d99987b7eb9e72",
    title: "without surveys",
    startsAt: "",
    endsAt: "",
    status: 1,
    defaultLanguageId: "ja",
    monitorsCount: 1,
    interviewDuration: 30,
    monitorPoints: 3000,
    appliedMonitorCount: 1,
    vacantSlots: 1,
    releaseDate: "2023-12-13 12:40:36",
    updatedAt: "",
    scheduleConfirmed: 0,
    isNew: 0,
    completion: 0,
  },
];

jest.mock("../../../common/apiUrls", () => ({
  researchService: {
    getCampaignDetail: jest.fn(() => Promise.resolve({ data: { data: {} } })),
  },
}));
describe("CampaignListTable component", () => {
  const mockDispatch = jest.fn();
  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (researchService.getCampaignDetail as any).mockResolvedValue({
      data: {
        errorCode: { test: "" },
        message: { test: "error" },
        data: {
          id: "de98c0e501374468a59dd69d69441aa5",
          title: "multiple users",
          includeCondition: "multiple users",
          startsAt: "2023-12-13T00:00:00Z",
          endsAt: "2024-01-12T00:00:00Z",
          status: 2,
          interviewDurationId: "3109e00337b84f5fb432a37f7fab2eb4",
          defaultLanguageId: "ja",
          monitorsCount: 1,
          createdBy: "a5926abe76dc4195b7a58dae9733b2fe",
          ticketsCount: 1,
          industries: [
            "796a1f4b9cf8426282ec05eae940169d",
            "91afcd3cd7234cd193c8325f4122eba2",
            "b54f826dc05d4aa090f5f7398d06177a",
            "4a2f8d953260411eb736f829e21c666c",
            "bd1238c8702f486caa0ae0769321d98b",
            "1b20a486a7f64b23a63eb399a2c66240",
            "efe8610c9d9a494c8eca2217b2f9cd33",
            "fa440dce6e4a440b9c0d961935523940",
            "11d1e467b3ac48c9a764f7197274b703",
            "5379d74e4dda4be0a42fb1bd55af458a",
            "c082edf297f741fba5e24776e89144ff",
            "46d3dc700e004428b577be1280e06915",
            "9992d6d174cf487b94cba595cb2495a7",
            "e81293a795d8437dbcfea4ee015d0589",
            "6d0526398a434da788152664a60ac4df",
            "2484b11e8ad8473a8ff1d6232b85eb3e",
            "70f147c538714551ba5590fd3f19fe8e",
            "64fdcf83975c415a8d9276c37b3f1c65",
            "4aeaa60f1ca4448ca7ecdfa6138e7d8f",
            "244c80b1603147c4b493a51b625634d0",
            "16b7a9bf6023475e9b42a6409d5f0b6b",
            "614bd27393234f1182b33d62948af959",
            "edfcea2425394ebaad269abbe0004ec7",
            "43918588494046f4a6fb7800ea67686e",
            "7bd53f41d1fa4565b82f16cfb67c33de",
            "db8dea1d0dfe4a19ad1d27d047d7909f",
            "a02ee5ff36244e71aa995403852d3dbd",
            "2d2af804ff8c46599916b2d8739ecba7",
            "ab048528022c48578ee166cf89175d85",
            "19c9abe623164baa96a119839468bdb2",
            "ff983657ce9a4151b7f5b12fa92437d9",
            "a0ce515823f341f4aa27cdfd041320ad",
            "6e5f955db4d1401a944139aa42547844",
            "3aecd8bbf1044f3db04ed8172a117038",
            "b90c5cadcbfa44aa807a9a6d3f3ff7a2",
            "f3d0efda6e6249028358e8e36d765d7f",
            "5260cb2b7ce54587a844b857e3229fbc",
            "255b6d54d9ed431f9884452d1761d08d",
            "5964cab1c8b844b7a5611974ef68c71e",
            "455d0423faad4bbb8b061f920fa1dfcd",
            "35ab98925f5a4e179e8b0119e7c753aa",
            "77328fb2781b475ca1072c57f6a13c0a",
            "a7999534617a4c7c91e2d9b4d4f378ca",
          ],
          timeslotsList: [
            {
              startTime: "13-12-2023 20:00",
              endTime: "13-12-2023 20:30",
              id: "3118c574964f4b18988ab8652b00970f",
            },
          ],
          createdAt: "2023-12-13T12:47:11.523013Z",
          updatedAt: "2023-12-14T06:38:42.381789Z",
          duration: 30,
          rewardPoint: 3000,
          excludeCondition: "",
          ngIndustries: "",
          hasScreening: true,
          gender: 0,
          maritalStatus: 0,
          hasChildren: 0,
          personalIncomeStart: 1,
          personalIncomeEnd: 0,
          householdIncomeStart: 0,
          householdIncomeEnd: 0,
          ageFrom: 0,
          ageTo: 0,
          screeningId: "",
          prefectures: [],
          occupation: [],
          timeslots: [],
          monitorsDetails: [],
          screening: {
            id: "b834320bec5248f8ad5a05a182225af1",
            question: [
              {
                questionText: "123",
                type: 3,
                order: 1,
                sequence: 1,
                options: [
                  {
                    id: "17636a6cb0d1498bb864998263ffaf32",
                    order: 1,
                    optionText: "",
                  },
                ],
                id: "39b285c3f0984f0dbbaf4f41a723dfe3",
                isRequired: false,
              },
            ],
            status: 1,
            defaultLanguageId: "ja",
            order: 1,
            createdAt: "2023-12-13T15:18:23.682799Z",
            updatedAt: "2023-12-13T15:18:23.682867Z",
            clientId: "",
          },
        },
      },
    });
  });
  const mockHandlePageChange = jest.fn();

  const mockPaginationData = { totalPages: 5 }; // Provide mock pagination data as needed
  const mockPageNumber = 1;
  const mockIsFetching = false;

  it("renders CampaignListTable component correctly", () => {
    render(
      <AppTheme>
        <CampaignListTable
          campaignData={mockData}
          paginationData={mockPaginationData}
          handlePageChange={mockHandlePageChange}
          pageNumber={mockPageNumber}
          isFetching={mockIsFetching}
          setCampaignToDelete={jest.fn()}
          campaignToDelete=""
          deleteModal={true}
          handleDraftDeletion={jest.fn()}
          toggleDeleteModal={jest.fn()}
        />
      </AppTheme>
    );
    const rowItem = screen.getByTestId("title0");
    const rowItemSecond = screen.getByTestId("title1");
    fireEvent.click(rowItem);
    fireEvent.click(rowItemSecond);
  });

  it("handles row click correctly", () => {
    render(
      <AppTheme>
        <CampaignListTable
          campaignData={mockData}
          paginationData={mockPaginationData}
          handlePageChange={mockHandlePageChange}
          pageNumber={mockPageNumber}
          isFetching={mockIsFetching}
          setCampaignToDelete={jest.fn()}
          campaignToDelete=""
          deleteModal={true}
          handleDraftDeletion={jest.fn()}
          toggleDeleteModal={jest.fn()}
        />
      </AppTheme>
    );
    const deletebutton = screen.getByTestId(
      "delete-actionde98c0e501374468a59dd69d69441aa5"
    );
    const rowTitle = screen.getByTestId("title0");
    fireEvent.click(rowTitle);
    fireEvent.click(deletebutton);
  });
});

describe("CampaignListTable component", () => {
  const mockDispatch = jest.fn();
  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (researchService.getCampaignDetail as any).mockResolvedValue({
      data: {
        errorCode: { test: "" },
        message: { test: "error" },
        data: {
          id: "de98c0e501374468a59dd69d69441aa5",
          title: "multiple users",
          includeCondition: "multiple users",
          startsAt: "",
          endsAt: "",
          status: 2,
          interviewDurationId: "3109e00337b84f5fb432a37f7fab2eb4",
          defaultLanguageId: "ja",
          monitorsCount: 1,
          createdBy: "a5926abe76dc4195b7a58dae9733b2fe",
          ticketsCount: 1,
          industries: [
            "796a1f4b9cf8426282ec05eae940169d",
            "91afcd3cd7234cd193c8325f4122eba2",
            "b54f826dc05d4aa090f5f7398d06177a",
            "4a2f8d953260411eb736f829e21c666c",
            "bd1238c8702f486caa0ae0769321d98b",
            "1b20a486a7f64b23a63eb399a2c66240",
            "efe8610c9d9a494c8eca2217b2f9cd33",
            "fa440dce6e4a440b9c0d961935523940",
            "11d1e467b3ac48c9a764f7197274b703",
            "5379d74e4dda4be0a42fb1bd55af458a",
            "c082edf297f741fba5e24776e89144ff",
            "46d3dc700e004428b577be1280e06915",
            "9992d6d174cf487b94cba595cb2495a7",
            "e81293a795d8437dbcfea4ee015d0589",
            "6d0526398a434da788152664a60ac4df",
            "2484b11e8ad8473a8ff1d6232b85eb3e",
            "70f147c538714551ba5590fd3f19fe8e",
            "64fdcf83975c415a8d9276c37b3f1c65",
            "4aeaa60f1ca4448ca7ecdfa6138e7d8f",
            "244c80b1603147c4b493a51b625634d0",
            "16b7a9bf6023475e9b42a6409d5f0b6b",
            "614bd27393234f1182b33d62948af959",
            "edfcea2425394ebaad269abbe0004ec7",
            "43918588494046f4a6fb7800ea67686e",
            "7bd53f41d1fa4565b82f16cfb67c33de",
            "db8dea1d0dfe4a19ad1d27d047d7909f",
            "a02ee5ff36244e71aa995403852d3dbd",
            "2d2af804ff8c46599916b2d8739ecba7",
            "ab048528022c48578ee166cf89175d85",
            "19c9abe623164baa96a119839468bdb2",
            "ff983657ce9a4151b7f5b12fa92437d9",
            "a0ce515823f341f4aa27cdfd041320ad",
            "6e5f955db4d1401a944139aa42547844",
            "3aecd8bbf1044f3db04ed8172a117038",
            "b90c5cadcbfa44aa807a9a6d3f3ff7a2",
            "f3d0efda6e6249028358e8e36d765d7f",
            "5260cb2b7ce54587a844b857e3229fbc",
            "255b6d54d9ed431f9884452d1761d08d",
            "5964cab1c8b844b7a5611974ef68c71e",
            "455d0423faad4bbb8b061f920fa1dfcd",
            "35ab98925f5a4e179e8b0119e7c753aa",
            "77328fb2781b475ca1072c57f6a13c0a",
            "a7999534617a4c7c91e2d9b4d4f378ca",
          ],
          timeslotsList: [
            {
              startTime: "13-12-2023 20:00",
              endTime: "13-12-2023 20:30",
              id: "3118c574964f4b18988ab8652b00970f",
            },
          ],
          createdAt: "2023-12-13T12:47:11.523013Z",
          updatedAt: "2023-12-14T06:38:42.381789Z",
          duration: 30,
          rewardPoint: 3000,
          excludeCondition: "",
          ngIndustries: "",
          hasScreening: true,
          gender: 0,
          maritalStatus: 0,
          hasChildren: 0,
          personalIncomeStart: 0,
          personalIncomeEnd: 11,
          householdIncomeStart: 11,
          householdIncomeEnd: 11,
          ageFrom: 11,
          ageTo: 11,
          screeningId: "",
          prefectures: [],
          occupation: [],
          timeslots: [],
          monitorsDetails: [],
          screening: {
            id: "b834320bec5248f8ad5a05a182225af1",
            question: [
              {
                questionText: "123",
                type: 3,
                order: 1,
                sequence: 1,
                options: [
                  {
                    id: "17636a6cb0d1498bb864998263ffaf32",
                    order: 1,
                    optionText: "",
                  },
                ],
                id: "39b285c3f0984f0dbbaf4f41a723dfe3",
                isRequired: false,
              },
            ],
            status: 1,
            defaultLanguageId: "ja",
            order: 1,
            createdAt: "2023-12-13T15:18:23.682799Z",
            updatedAt: "2023-12-13T15:18:23.682867Z",
            clientId: "",
          },
        },
      },
    });
  });
  const mockHandlePageChange = jest.fn();

  const mockPaginationData = { totalPages: 5 }; // Provide mock pagination data as needed
  const mockPageNumber = 1;
  const mockIsFetching = false;

  it("renders CampaignListTable component correctly", () => {
    render(
      <AppTheme>
        <CampaignListTable
          campaignData={mockData}
          paginationData={mockPaginationData}
          handlePageChange={mockHandlePageChange}
          pageNumber={mockPageNumber}
          isFetching={mockIsFetching}
          setCampaignToDelete={jest.fn()}
          campaignToDelete=""
          deleteModal={true}
          handleDraftDeletion={jest.fn()}
          toggleDeleteModal={jest.fn()}
        />
      </AppTheme>
    );
    const rowItem = screen.getByTestId("title0");
    fireEvent.click(rowItem);
  });
});
describe("CampaignListTable component error", () => {
  const mockDispatch = jest.fn();
  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (researchService.getCampaignDetail as any).mockResolvedValue({
      data: {
        errorCode: { test: "" },
        message: { test: "error" },
        data: "",
      },
    });
  });
  const mockHandlePageChange = jest.fn();

  const mockPaginationData = { totalPages: 5 }; // Provide mock pagination data as needed
  const mockPageNumber = 1;
  const mockIsFetching = false;

  it("renders CampaignListTable component correctly", () => {
    render(
      <AppTheme>
        <CampaignListTable
          campaignData={mockData}
          paginationData={mockPaginationData}
          handlePageChange={mockHandlePageChange}
          pageNumber={mockPageNumber}
          isFetching={mockIsFetching}
          setCampaignToDelete={jest.fn()}
          campaignToDelete=""
          deleteModal={true}
          handleDraftDeletion={jest.fn()}
          toggleDeleteModal={jest.fn()}
        />
      </AppTheme>
    );
    const rowItem = screen.getByTestId("title0");
    fireEvent.click(rowItem);
  });
});
