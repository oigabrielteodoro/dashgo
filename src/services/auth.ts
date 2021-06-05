import axios, { AxiosError } from 'axios';

import { GetServerSidePropsContext } from 'next';

import { parseCookies, setCookie } from 'nookies';

import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

type FailedRequestQueue = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

let isRefreshing = false;
let failedRequestsQueue: FailedRequestQueue[] = [];

export function setupApiClient(context?: GetServerSidePropsContext) {
  let cookies = parseCookies(context);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['dashgo.token']}`
    }
  })
  
  api.interceptors.response.use(response => response, (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response?.data?.code === 'token.expired') {
        cookies = parseCookies(context);
  
        const { 'dashgo.refreshToken': refreshToken } = cookies;
        const originalConfig = error.config;
        
        if (!isRefreshing) {
          isRefreshing = true;
  
          api.post('/refresh', {
            refreshToken,
          }).then(response => {
            const { token } = response.data;
    
            setCookie(context, 'dashgo.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            }); 
      
            setCookie(context, 'dashgo.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            });
    
            api.defaults.headers.Authorization = `Bearer ${token}`;
  
            failedRequestsQueue.forEach(request => request.onSuccess(token));
            failedRequestsQueue = [];
          }).catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err));
            failedRequestsQueue = [];
  
            if (process.browser) {
              signOut();
            }
          }).finally(() => {
            isRefreshing = false;
          })
        }
  
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`;
  
              resolve(api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            }
          }) 
        }) 
      } else {
        if (process.browser) {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
    }
  
    return Promise.reject(error);
  })

  return api;
}