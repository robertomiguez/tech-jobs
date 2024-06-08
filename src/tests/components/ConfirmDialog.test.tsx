import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog';

describe('ConfirmDialog Component', () => {
  test('renders ConfirmDialog component', () => {
    render(
      <MemoryRouter>
        <ConfirmDialog
          isOpen={true} // Set isOpen to true to render the dialog
          onClose={jest.fn()}
          onConfirm={jest.fn()}
        />
      </MemoryRouter>
    );
    // Check for the heading
    const headingElement = screen.getByText('Confirm Action');
    expect(headingElement).toBeInTheDocument();

    // Check for the button
    const buttonElement = screen.getByRole('button', { name: /Confirm/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
