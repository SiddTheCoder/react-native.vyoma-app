// src/api/axiosConfig.ts
import axios, { AxiosError } from "axios";
import { logger } from "@/src/utils/logger";

const API_END_POINT = "http://192.168.1.88:3000/api/mobile";

const apiClient = axios.create({
  baseURL: API_END_POINT,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    logger.info(`🌐 ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
      data: config.data,
    });
    return config;
  },
  (error) => {
    logger.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    logger.info(
      `✅ ${response.config.method?.toUpperCase()} ${response.config.url}`,
      {
        status: response.status,
        data: response.data,
      }
    );
    return response;
  },
  (error: AxiosError) => {
    // Enhanced error logging
    if (error.response) {
      // Server responded with error status
      logger.error("API Error Response:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      // Request made but no response
      logger.error("Network Error - No Response:", {
        url: error.config?.url,
        message: "Please check your internet connection",
      });
    } else {
      // Error in request setup
      logger.error("Request Setup Error:", {
        message: error.message,
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;

// Updated usage in your SignupWithCredentials component:
/*
import apiClient from '@/src/api/axiosConfig';

const checkUniqueEmail = async () => {
  try {
    const res = await apiClient.post('/check-email-availablity', {
      email: data.email,
    });
    logger.info("Email check successful", res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error("Email check failed", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
      
      // Show user-friendly error
      setMessage(
        error.response?.data?.message || 
        "Failed to check email. Please try again."
      );
    }
  }
};
*/
