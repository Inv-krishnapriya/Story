import AppTheme from "@/theme";

import { act, render, screen } from "@testing-library/react";
import VideoList from "../delivery/page";
import { researchService } from "@/common/apiUrls";

const deliveryList = {
  errorCode: {},
  message: "interviews listed successfully",
  data: [
    {
      title: "completed campaign",
      startsAt: "2024-02-15T00:00:00+00:00",
      endsAt: "2024-03-10T00:00:00+00:00",
      monitorCount: 4,
      campaignId: "1d97fb90d13a4f0583e07c6cad846f52",
    },
    {
      title: "completed campaign",
      startsAt: "2024-02-15T00:00:00+00:00",
      endsAt: "2024-03-10T00:00:00+00:00",
      monitorCount: 4,
      campaignId: "1d97fb90d13a4f0583e07c6cad846f52",
    },
    {
      title: "completed campaign",
      startsAt: "2024-02-15T00:00:00+00:00",
      endsAt: "2024-03-10T00:00:00+00:00",
      monitorCount: 4,
      campaignId: "1d97fb90d13a4f0583e07c6cad846f52",
    },
  ],
  serviceHealth: {},
  pages: {
    pageSize: 10,
    totalPages: 1,
    currentPage: 1,
  },
};

jest.mock("axios");
jest.mock("../../../common/apiUrls", () => ({
  researchService: {
    getDeliveryList: jest.fn(() => Promise.resolve({ data: { data: "" } })),
  },
}));

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useParams: jest.fn().mockReturnValue({ id: 123456 }),
}));

describe("Home page", () => {
  beforeEach(async () => {
    await act(async () => {
      (researchService.getDeliveryList as jest.Mock).mockResolvedValue({
        data: deliveryList,
      });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <VideoList />
        </AppTheme>
      );
    });

    expect(screen.getByText("delivery.title")).toBeInTheDocument();
  });
});
