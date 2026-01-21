import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});
