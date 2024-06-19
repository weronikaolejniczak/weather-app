import { describe, expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { App } from '@/app';
import { SAVED_CITIES_KEY } from '@/constants';

describe('Dashboard', () => {
  /**
   * GIVEN I am on the dashboard
   * WHEN I enter an existing city in the search input
   * THEN I will see correct information about the city
   */
  test('WHEN I enter an existing city in the search input THEN I will see the correct information about the city', async () => {
    render(<App />);

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
    render(<App />);

    const searchInput = await screen.findByRole('textbox', { name: /city/i });
    const barcelonaTitle = await screen.findByText(/barcelona/i);

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'A non-existing city');

    const toast = await screen.findByText("This city doesn't exist!");

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
    render(<App />);

    const searchInput = await screen.findByRole('textbox', { name: /city/i });

    userEvent.click(searchInput);

    const dropdown = screen.queryByRole('menu', { name: /cities/i });

    expect(dropdown).not.toBeInTheDocument();
  });

  /**
   * GIVEN I am on the dashboard
   * AND I have entered some cities before ("Paris", "Warsaw")
   * WHEN I focus the search input
   * THEN I will see a list of autocomplete suggestions with the city names I have entered before
   */
  test('WHEN I focus the search input THEN I will see a list of autocomplete suggestions with the city names I have entered before', async () => {
    render(<App />);

    localStorage.setItem(SAVED_CITIES_KEY, "['Barcelona', 'Paris', 'Warsaw']");

    const searchInput = await screen.findByRole('textbox', { name: /city/i });

    userEvent.click(searchInput);

    const dropdown = await screen.findByRole('menu', { name: /cities/i });
    const barcelonaItem = within(dropdown).queryByRole('menuitem', {
      name: /barcelona/i,
    });
    const parisItem = await within(dropdown).findByRole('menuitem', {
      name: /paris/i,
    });
    const warsawItem = await within(dropdown).findByRole('menuitem', {
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
    render(<App />);

    localStorage.setItem(SAVED_CITIES_KEY, "['Paris', 'Warsaw']");

    const searchInput = await screen.findByRole('textbox', { name: /city/i });

    userEvent.click(searchInput);

    const dropdown = await screen.findByRole('menu', { name: /cities/i });
    const parisItem = await within(dropdown).findByRole('menuitem', {
      name: /paris/i,
    });

    userEvent.click(parisItem);

    const parisTitle = await screen.findByText(/paris/i);
    const barcelonaTitle = screen.queryByTestId(/barcelona/i);

    expect(parisTitle).toBeInTheDocument();
    expect(barcelonaTitle).not.toBeInTheDocument();
  });
});
