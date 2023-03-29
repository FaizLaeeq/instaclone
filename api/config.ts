import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';

const API_BASE = process.env.REACT_APP_API_URL;

export const baseQuery = retry(
  async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: `${API_BASE}`,
      prepareHeaders: (headers, { getState }) => {
        const { token } = (getState() as RootState).auth;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        // headers.set('ngrok-skip-browser-warning', 'true');
        return headers;
      },
    })(args, api, extraOptions);

    // if any error, need to try to call this api again
    if (result.error?.status === 503) {
      retry.fail(result.error);
    }
    return result;
  },
  {
    maxRetries: 0,
  }
);
