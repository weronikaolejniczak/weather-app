import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';

import { App } from '@/app';
import { SAVED_CITIES_KEY } from '@/constants';
import { TestProviders } from '@/providers';

describe('Dashboard', () => {
  beforeEach(() => {
    vi.spyOn(global.Storage.prototype, 'setItem');
    vi.spyOn(global.Storage.prototype, 'getItem');
    vi.spyOn(global.Storage.prototype, 'removeItem');
    vi.spyOn(global.Storage.prototype, 'clear');
  });

  afterEach(() => {
    localStorage.clear();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  /**
   * GIVEN I am on the dashboard
   * WHEN I enter an existing city in the search input
   * THEN I will see correct information about the city
   */
  test('WHEN I enter an existing city in the search input THEN I will see the correct information about the city', async () => {
    render(
      <TestProviders>
        <App />
      </TestProviders>,
    );

    const searchInput = await screen.findByRole('textbox', { name: /city/i });

    await screen.findByText(/barcelona/i);

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'Paris');

    const parisTitle = await screen.findByText(/paris/i);
    const barcelonaTitle = screen.queryByTestId(/barcelona/i);

    expect(parisTitle).toBeInTheDocument();
    expect(barcelonaTitle).not.toBeInTheDocument();
  });

  /**
   * GIVEN I am on the dashboard
   * WHEN I enter a non-existing city in the search input, e.g. "A non-existing city"
   * THEN I will see an error toast saying "This city doesn't exist!"
   * AND the previous data will be kept
   */
  test('WHEN I enter a non-existing city in the search input THEN I will see an error toast AND the previous data will be kept', async () => {
    render(
      <TestProviders>
        <App />
      </TestProviders>,
    );

    const searchInput = await screen.findByRole('textbox', { name: /city/i });
    const barcelonaTitle = await screen.findByText(/barcelona/i);

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'A non-existing city');

    const toast = await screen.findByText(/this city doesn't exist!/i);

    expect(barcelonaTitle).toBeInTheDocument();
    expect(toast).toBeInTheDocument();
  });

  /**
   * GIVEN I am on the dashboard
   * AND I have not entered any cities before
   * WHEN I focus the search input
   * THEN I will not see any autocomplete suggestions
   */
  test('WHEN I focus the search input THEN I will not see any autocomplete suggestions', async () => {
    render(
      <TestProviders>
        <App />
      </TestProviders>,
    );

    const searchInput = await screen.findByRole('textbox', { name: /city/i });

    userEvent.click(searchInput);

    const dropdown = screen.queryByRole('listbox', {
      name: /previous city searches/i,
    });

    expect(dropdown).not.toBeInTheDocument();
  });

  /**
   * GIVEN I am on the dashboard
   * AND I have entered some cities before ("Paris", "Warsaw")
   * WHEN I focus the search input
   * THEN I will see a list of autocomplete suggestions with the city names I have entered before
   */
  test('WHEN I focus the search input THEN I will see a list of autocomplete suggestions with the city names I have entered before', async () => {
    localStorage.setItem(SAVED_CITIES_KEY, `["barcelona", "paris", "warsaw"]`);

    render(
      <TestProviders>
        <App />
      </TestProviders>,
    );

    const searchInput = await screen.findByRole('textbox', { name: /city/i });

    userEvent.click(searchInput);

    const dropdown = await screen.findByRole('listbox', {
      name: /previous city searches/i,
    });
    const barcelonaItem = within(dropdown).queryByRole('option', {
      name: /barcelona/i,
    });
    const parisItem = await within(dropdown).findByRole('option', {
      name: /paris/i,
    });
    const warsawItem = await within(dropdown).findByRole('option', {
      name: /warsaw/i,
    });

    expect(barcelonaItem).not.toBeInTheDocument();
    expect(parisItem).toBeInTheDocument();
    expect(warsawItem).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
  });

  /**
   * GIVEN I am on the dashboard
   * AND I have entered some cities before ("Paris", "Warsaw")
   * WHEN I focus the search input
   * AND I click on an item from the autocomplete suggestions ("Paris")
   * THEN I will see the correct information about that city
   */
  test('WHEN I focus the search input AND I click on an item from the autocomplete suggestions THEN I will see the correct information about that city', async () => {
    localStorage.setItem(SAVED_CITIES_KEY, `["paris", "warsaw"]`);

    render(
      <TestProviders>
        <App />
      </TestProviders>,
    );

    const searchInput = await screen.findByRole('textbox', { name: /city/i });

    userEvent.click(searchInput);

    const dropdown = await screen.findByRole('listbox', {
      name: /previous city searches/i,
    });
    const parisItem = await within(dropdown).findByRole('option', {
      name: /paris/i,
    });

    userEvent.click(parisItem);

    const parisTitle = await screen.findByText(/paris/i);
    const barcelonaTitle = screen.queryByTestId(/barcelona/i);

    expect(parisTitle).toBeInTheDocument();
    expect(barcelonaTitle).not.toBeInTheDocument();
  });
});
