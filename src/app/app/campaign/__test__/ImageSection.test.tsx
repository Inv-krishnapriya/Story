import { render, screen, waitFor } from '@testing-library/react';
import ImageSection from '../details/[id]/ImageSection';

describe('ImageSection component', () => {
  const imageData = { fileUrl: 'https://example.com/image.jpg' };

  it('renders image when loaded', async () => {
    render(<ImageSection imageData={imageData} />);    
    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    await waitFor(() => screen.getByAltText('404'));
  });
});
