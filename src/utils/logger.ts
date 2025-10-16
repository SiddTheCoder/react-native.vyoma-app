// src/utils/logger.ts

type LogLevel = "log" | "info" | "warn" | "error" | "debug";

interface LogStyle {
  emoji: string;
  color: string;
}

const LOG_STYLES: Record<LogLevel, LogStyle> = {
  log: { emoji: "📝", color: "#6B7280" },
  info: { emoji: "ℹ️", color: "#3B82F6" },
  warn: { emoji: "⚠️", color: "#F59E0B" },
  error: { emoji: "🔴", color: "#EF4444" },
  debug: { emoji: "🐛", color: "#8B5CF6" },
};

class Logger {
  private isDevelopment = __DEV__;

  private formatMessage(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toLocaleTimeString();
    const { emoji } = LOG_STYLES[level];

    return {
      prefix: `${emoji} [${timestamp}] [${level.toUpperCase()}]`,
      message,
      data,
    };
  }

  log(message: string, data?: any) {
    if (!this.isDevelopment) return;
    const formatted = this.formatMessage("log", message, data);
    console.log(formatted.prefix, formatted.message, data || "");
  }

  info(message: string, data?: any) {
    if (!this.isDevelopment) return;
    const formatted = this.formatMessage("info", message, data);
    console.info(formatted.prefix, formatted.message, data || "");
  }

  warn(message: string, data?: any) {
    if (!this.isDevelopment) return;
    const formatted = this.formatMessage("warn", message, data);
    console.warn(formatted.prefix, formatted.message, data || "");
  }

  error(message: string, error?: any) {
    const formatted = this.formatMessage("error", message, error);
    console.error(formatted.prefix, formatted.message);

    if (error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    }
  }

  debug(message: string, data?: any) {
    if (!this.isDevelopment) return;
    const formatted = this.formatMessage("debug", message, data);
    console.debug(formatted.prefix, formatted.message, data || "");
  }

  // API call logger
  api(method: string, url: string, data?: any, response?: any) {
    if (!this.isDevelopment) return;
    console.group(`🌐 API ${method.toUpperCase()} ${url}`);
    if (data) console.log("📤 Request:", data);
    if (response) console.log("📥 Response:", response);
    console.groupEnd();
  }

  // Redux action logger
  redux(action: string, payload?: any, state?: any) {
    if (!this.isDevelopment) return;
    console.group(`🔄 Redux Action: ${action}`);
    if (payload) console.log("Payload:", payload);
    if (state) console.log("New State:", state);
    console.groupEnd();
  }
}

export const logger = new Logger();

// Usage example in your component:
// import { logger } from '@/src/utils/logger';
// logger.info('Component mounted');
// logger.error('Failed to fetch data', error);
// logger.api('POST', '/check-email', { email: 'test@test.com' });
