import axios from 'axios';

const DEFAULT_API_URL = 'https://script.google.com/macros/s/AKfycbxILzEmehgUmXUHYdq6X44QEQbRjBiJ3e75Lf9TM7e1BusYXl6XNpgYnyO2CgpdSBRg3g/exec';
const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || DEFAULT_API_URL;

const fallbackByAction = {
  getResults: [],
  getWeeklyResults: [],
  getAlumni: [],
  getTestimonials: [],
  getAnnouncements: [],
  getCourses: [],
  getGallery: []
};

const CACHE_PREFIX = 'coachingpro-sheet-cache:';

export function getCachedSheetData(action) {
  if (typeof window === 'undefined' || !window.localStorage) return [];

  try {
    const cached = JSON.parse(window.localStorage.getItem(`${CACHE_PREFIX}${action}`) || 'null');
    return Array.isArray(cached?.data) ? cached.data : [];
  } catch (error) {
    return [];
  }
}

export function mergeCourses(defaultCourses, sheetCourses) {
  const seen = new Set();
  return [...defaultCourses, ...sheetCourses].filter((course) => {
    const key = String(course.id || course.courseName || '').toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function cacheSheetData(action, data) {
  if (typeof window === 'undefined' || !window.localStorage || !Array.isArray(data)) return;

  try {
    window.localStorage.setItem(`${CACHE_PREFIX}${action}`, JSON.stringify({
      data,
      savedAt: Date.now()
    }));
  } catch (error) {
    // Cache is a speed boost only; full functionality must not depend on it.
  }
}

const normalizeResponse = (response, action) => {
  const payload = response?.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return fallbackByAction[action] || [];
};

export async function fetchSheetData(action) {
  if (!API_URL) return fallbackByAction[action] || [];

  try {
    const response = await axios.get(API_URL, { params: { action }, timeout: 30000 });
    const data = normalizeResponse(response, action).filter((item) => item.status !== 'inactive');
    cacheSheetData(action, data);
    return data;
  } catch (error) {
    console.warn(`Using cached ${action} data:`, error.message);
    return getCachedSheetData(action).length ? getCachedSheetData(action) : fallbackByAction[action] || [];
  }
}

export async function submitEnquiry(payload) {
  if (!API_URL) {
    return { success: true, message: 'Demo enquiry received. Connect Apps Script to save it.' };
  }

  const response = await axios.post(API_URL, { action: 'addEnquiry', ...payload });
  return response.data;
}
