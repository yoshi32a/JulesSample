import type { Journal } from './types';

const API_URL = 'http://localhost:3000/api/journals';

export const fetchJournals = async (): Promise<Journal[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createJournal = async (journal: Omit<Journal, 'id' | 'date'>): Promise<Journal> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(journal),
  });
  return response.json();
};

export const updateJournal = async (id: string, journal: Partial<Journal>): Promise<Journal> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(journal),
  });
  return response.json();
};

export const deleteJournal = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
