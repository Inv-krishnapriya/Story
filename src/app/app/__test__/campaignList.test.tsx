import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Campaign from "../campaign/page";
import { researchService, ticketService } from "../../../common/apiUrls";
import AppTheme from "../../../theme";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { act } from "react-dom/test-utils";

// Mock your API calls and dependencies
jest.mock("@/common/apiUrls", () => ({
  researchService: {
    getCampaigns: jest.fn(() =>
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
}));

// Mock components that are used in Campaign
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: jest.fn() }),
}));
// Mocking the API service
jest.mock("../../../common/apiUrls", () => ({
  ticketService: {
    getUserDetails: jest.fn(() => Promise.resolve({ data: { data: {} } })),
  },
  researchService: {
    getCampaignDetail: jest.fn(() => Promise.resolve({ data: { data: {} } })),
  },
}));
jest.mock("axios");

describe("Campaign Page", () => {
  describe("Default case", () => {
    const mockDispatch = jest.fn();
    beforeAll(() => {
      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      (useSelector as jest.Mock).mockImplementation(
        (selector: (state: any) => any) =>
          selector({
            global: {
              language: "jp",
            },
            ui: {},
            campaign: {
              campaignList: {
                pageSize: 10,
                totalPages: 5,
                currentPage: 1,
                data: [
                  {
                    id: "de98c0e501374468a59dd69d69441aa5",
                    title: "multiple users",
                    startsAt: "2023-12-13 00:00:00",
                    endsAt: "2024-01-12 00:00:00",
                    status: 2,
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
                    status: 0,
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
                    status: 0,
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
                    status: 1,
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
                    status: 1,
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
                    status: 1,
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
                    startsAt: "2023-12-13 00:00:00",
                    endsAt: "2024-01-12 00:00:00",
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
                ],
              },
            },
          })
      );
      (ticketService.getUserDetails as any).mockResolvedValue({
        data: {
          errorCode: "",
          message: "success",
          data: {
            tickets: {
              availableTickets: 762,
              lockedTickets: 727,
              unlockedTickets: 35,
            },
            campaigns: {
              draftedCampaign: 63,
              publishedCampaign: 19,
            },
          },
        },
      });
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("renders without crashing", async () => {
      render(
        <AppTheme>
          <Campaign />
        </AppTheme>
      );
      const createButton = screen.getByTestId("campaign-create");
      const title = screen.getByTestId("title0");
      const paginationButton = screen.getByTestId("mint-pagination-3");

      const tab = screen.getByTestId("MuiTab1");
      await act(async () => {
        fireEvent.click(title);
        fireEvent.click(paginationButton);
        fireEvent.click(tab);
      });
      fireEvent.click(createButton);
    });

    // it("handles page change correctly", async () => {
    //   const { getByText } = render(
    //     <AppTheme>
    //       <Campaign />
    //     </AppTheme>
    //   );

    //   // Mock API response
    //   (researchService.getCampaigns as any).mockResolvedValueOnce({
    //     data: {
    //       /* mock campaign data */
    //     },
    //   });

    //   // Trigger page change

    //   // Wait for API call to complete
    //   await waitFor(() => {
    //     // Add assertions based on the expected behavior
    //   });
    // });

    // it("handles campaign creation correctly", async () => {
    //   const { getByText } = render(
    //     <AppTheme>
    //       <Campaign />
    //     </AppTheme>
    //   );

    //   // Mock user data with no drafted campaigns
    //   (ticketService.getUserDetails as any).mockResolvedValueOnce({
    //     data: { tickets: {}, campaigns: {} },
    //   });

    //   // Trigger campaign creation

    //   // Wait for the modal to open
    //   await waitFor(() => {
    //     // Add assertions based on the expected behavior
    //   });
    // });

    // Add more test cases as needed
  });

  describe("Campaign component 100 drafts", () => {
    const mockDispatch = jest.fn();
    beforeEach(() => {
      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      (useSelector as jest.Mock).mockImplementation(
        (selector: (state: any) => any) =>
          selector({
            global: {
              language: "jp",
            },
            ui: {},
            campaign: {
              campaignList: {
                pageSize: 10,
                totalPages: 5,
                currentPage: 1,
                data: [],
              },
            },
          })
      );
      (ticketService.getUserDetails as any).mockResolvedValue({
        data: {
          errorCode: "",
          message: "success",
          data: {
            tickets: {
              availableTickets: 762,
              lockedTickets: 727,
              unlockedTickets: 35,
            },
            campaigns: {
              draftedCampaign: 100,
              publishedCampaign: 19,
            },
          },
        },
      });
    });

    it("renders without crashing", async () => {
      await act(async () => {
        render(
          <AppTheme>
            <Campaign />
          </AppTheme>
        );
      });
      const createButton = screen.getByTestId("campaign-create");
      fireEvent.click(createButton);
    });
  });
});
