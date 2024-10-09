import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ProjectDetailModal from '../details/[id]/ProjectDetailModal';
import AppTheme from '../../../../theme';

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

jest.mock("@mui/x-date-pickers/internals/demo", () => {
    return {
      DemoContainer: jest.fn(() => <></>),
    };
});

describe('ProjectDetailModal component', () => {
  it('renders correctly', () => {
    const info = {
    };
    const agreeButtonName:any = 'Agree';
    const open = true;
    const { getByTestId, getByText } = render(
      <AppTheme><ProjectDetailModal info={info} agreeButtonName={agreeButtonName} open={open} /></AppTheme>
    );

    expect(getByText('campaign.campaignDetail.modaldetail.heading.main')).toBeInTheDocument();
    expect(getByTestId('modal-onAgree')).toBeInTheDocument();
  });

  it('calls onAgree function when Agree button is clicked', async () => {
    const info = {
    };
    const agreeButtonName = 'Agree';
    const onAgree = jest.fn(); 
    const open = true;
    const { getByTestId } = render(
        <AppTheme><ProjectDetailModal info={info} agreeButtonName={agreeButtonName} open={open} onAgree={onAgree} /></AppTheme>
    );

    fireEvent.click(getByTestId('modal-onAgree'));

    await waitFor(() => {
      expect(onAgree).toHaveBeenCalled();
    });
  });
});
