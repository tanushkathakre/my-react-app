const STORAGE_KEY = 'expense_tracker_data';

export const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
