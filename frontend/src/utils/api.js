import axios from 'axios';

 
const PRODUCTION_URL = 'https://foxy-dev.vercel.app/api';
const LOCAL_URL = 'http://localhost:5000/api';

// Automatically detect environment
const isDevelopment = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_URL = isDevelopment ? LOCAL_URL : PRODUCTION_URL;

// ... existing code ...
export const fetchProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
};

export const fetchBasics = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/basics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching basics data:', error);
    throw error;
  }
};

export const fetchSkills = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/skills`);
    return response.data;
  } catch (error) {
    console.error('Error fetching skills data:', error);
    throw error;
  }
};

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects data:', error);
    throw error;
  }
};

export const fetchEducation = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/education`);
    return response.data;
  } catch (error) {
    console.error('Error fetching education data:', error);
    throw error;
  }
};

export const fetchWork = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/work`);
    return response.data;
  } catch (error) {
    console.error('Error fetching work data:', error);
    throw error;
  }
};

export const fetchLanguages = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/languages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching languages data:', error);
    throw error;
  }
};

export const fetchInterests = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/interests`);
    return response.data;
  } catch (error) {
    console.error('Error fetching interests data:', error);
    throw error;
  }
};

export const fetchCertificates = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/certificates`);
    return response.data;
  } catch (error) {
    console.error('Error fetching certificates data:', error);
    throw error;
  }
};
