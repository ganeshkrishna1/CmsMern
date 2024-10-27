import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import EventList from '../pages/events/EventList';
import { axiosInstance } from '../services/axiosInstance';
import { vi } from 'vitest';
import { isOrganizer } from '../services/localStorageInfo';
import { MemoryRouter } from 'react-router-dom';

// Mock axiosInstance and other modules
vi.mock('../services/axiosInstance');
vi.mock('../services/localStorageInfo');

// Mock useNavigate from react-router-dom
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom'); // Import actual module to preserve other exports
  return {
    ...actual, // Spread the actual exports
    useNavigate: () => navigateMock, // Mock useNavigate
  };
});

describe('EventList Component', () => {
  const eventsData = [
    { _id: '1', name: 'Concert', date: '2024-11-01', description: 'A great concert experience', venue: 'Main Hall' },
    { _id: '2', name: 'Workshop', date: '2024-11-05', description: 'An informative workshop', venue: 'Conference Room' },
  ];

  beforeEach(() => {
    // Mock isOrganizer to return true
    isOrganizer.mockReturnValue(true);
    // Mock the GET request to return events
    axiosInstance.get.mockResolvedValue({ data: eventsData });
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear any previous mock calls
  });

  test('fetches and displays all events', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <EventList />
        </MemoryRouter>
      );
    });

    // Wait for events to be displayed
    await waitFor(() => {
      expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
      expect(screen.getByText('Concert')).toBeInTheDocument();
      expect(screen.getByText('Workshop')).toBeInTheDocument();
    });
  });

  test('handles error when fetching events', async () => {
    axiosInstance.get.mockRejectedValueOnce(new Error('Error fetching events'));

    await act(async () => {
      render(
        <MemoryRouter>
          <EventList />
        </MemoryRouter>
      );
    });

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByText('Could not fetch events. Please try again.')).toBeInTheDocument();
    });
  });

  test('navigates to add event page when add event button is clicked', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <EventList />
        </MemoryRouter>
      );
    });

    // Click the add event button
    fireEvent.click(screen.getByTitle('AddEvents'));

    // Assert that the navigation occurred
    expect(navigateMock).toHaveBeenCalledWith('/events/new');
  });

  test('deletes an event', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <EventList />
        </MemoryRouter>
      );
    });

    // Wait for events to be displayed
    await waitFor(() => {
      expect(screen.getByText('Concert')).toBeInTheDocument();
      expect(screen.getByText('Workshop')).toBeInTheDocument();
    });

    // Simulate deleting the concert event
    const deleteButton = screen.getByTestId('1'); // Ensure this corresponds to your delete button's test ID
    fireEvent.click(deleteButton);

    // Assert that the event is removed from the document
    await waitFor(() => {
      expect(screen.queryByText('Concert')).not.toBeInTheDocument();
      expect(screen.getByText('Workshop')).toBeInTheDocument();
    });
  });
});
