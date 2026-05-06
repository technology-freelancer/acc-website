import axios from 'axios';

const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export const mockResults = [
  {
    id: 'r1',
    studentName: 'Aarav Sharma',
    className: 'Class 10',
    subject: 'Mathematics',
    testName: 'Algebra Weekly Test',
    marks: 48,
    totalMarks: 50,
    percentage: 96,
    rank: 1,
    date: '2026-04-28',
    photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    status: 'active'
  },
  {
    id: 'r2',
    studentName: 'Meera Iyer',
    className: 'Class 12',
    subject: 'Physics',
    testName: 'Mechanics Test',
    marks: 92,
    totalMarks: 100,
    percentage: 92,
    rank: 2,
    date: '2026-04-26',
    photoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    status: 'active'
  },
  {
    id: 'r3',
    studentName: 'Kabir Patel',
    className: 'JEE',
    subject: 'Chemistry',
    testName: 'Organic Revision',
    marks: 86,
    totalMarks: 90,
    percentage: 95.56,
    rank: 1,
    date: '2026-04-22',
    photoUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80',
    status: 'active'
  }
];

export const mockTestimonials = [
  {
    id: 't1',
    studentName: 'Riya Deshmukh',
    batch: 'Class 10 Foundation',
    message: 'The weekly tests, doubt sessions and personal feedback helped me become consistent and confident.',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    year: '2025',
    status: 'active'
  },
  {
    id: 't2',
    studentName: 'Aditya Rao',
    batch: 'JEE Target',
    message: 'Every chapter felt structured. My score improved because I always knew what to revise next.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    year: '2024',
    status: 'active'
  }
];

export const mockAnnouncements = [
  {
    id: 'a1',
    title: 'New NEET Weekend Batch',
    description: 'Admissions are open for the weekend foundation batch with limited seats.',
    date: '2026-05-10',
    type: 'Admission',
    status: 'active'
  },
  {
    id: 'a2',
    title: 'Parent Progress Meet',
    description: 'Monthly progress discussion for Class 10 and 12 students will be held this Sunday.',
    date: '2026-05-12',
    type: 'Event',
    status: 'active'
  }
];

export const mockCourses = [
  {
    id: 'c1',
    courseName: 'Class 10 Board Excellence',
    className: 'Class 10',
    subjects: 'Maths, Science, English',
    fees: '₹18,000',
    duration: '10 Months',
    description: 'Board-focused preparation with weekly tests, notes, and performance tracking.',
    status: 'active'
  },
  {
    id: 'c2',
    courseName: 'JEE Foundation',
    className: 'Class 11-12',
    subjects: 'Physics, Chemistry, Mathematics',
    fees: '₹55,000',
    duration: '1 Year',
    description: 'Concept-first JEE preparation with topic tests, mock exams, and doubt clearing.',
    status: 'active'
  },
  {
    id: 'c3',
    courseName: 'NEET Target Batch',
    className: 'Class 12 / Droppers',
    subjects: 'Physics, Chemistry, Biology',
    fees: '₹60,000',
    duration: '1 Year',
    description: 'Medical entrance coaching with NCERT depth, test analytics and revision plans.',
    status: 'active'
  }
];

const fallbackByAction = {
  getResults: [],
  getTestimonials: [],
  getAnnouncements: [],
  getCourses: []
};

const normalizeResponse = (response, action) => {
  const payload = response?.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return fallbackByAction[action] || [];
};

export async function fetchSheetData(action) {
  if (!API_URL) return fallbackByAction[action] || [];

  try {
    const response = await axios.get(API_URL, { params: { action }, timeout: 10000 });
    return normalizeResponse(response, action).filter((item) => item.status !== 'inactive');
  } catch (error) {
    console.warn(`Using mock ${action} data:`, error.message);
    return fallbackByAction[action] || [];
  }
}

export async function submitEnquiry(payload) {
  if (!API_URL) {
    return { success: true, message: 'Demo enquiry received. Connect Apps Script to save it.' };
  }

  const response = await axios.post(API_URL, { action: 'addEnquiry', ...payload });
  return response.data;
}
