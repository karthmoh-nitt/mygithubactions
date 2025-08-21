// Environment configuration for Playwright tests
export interface EnvironmentConfig {
  baseUrl: string;
  tenantId: string;
  environment: string;
  apiBaseUrl: string;
  timeout: number;
  retries: number;
}

// Get environment variables with fallbacks
const getEnvVar = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue;
};

// Detect environment from branch name
const detectEnvironmentFromBranch = (): string => {
  const branch = process.env.GITHUB_REF_NAME || process.env.BRANCH || '';
  
  if (branch.includes('main') || branch.includes('master')) {
    return 'production';
  } else if (branch.includes('develop') || branch.includes('staging')) {
    return 'staging';
  } else if (branch.includes('feature') || branch.includes('dev')) {
    return 'development';
  }
  
  return 'staging'; // default
};

// Environment configurations
export const environments: Record<string, EnvironmentConfig> = {
  development: {
    baseUrl: getEnvVar('BASE_URL', 'https://karthik-com.applaudhcm.com/'),
    tenantId: getEnvVar('TENANT_ID', 'dev'),
    environment: 'development',
    apiBaseUrl: getEnvVar('API_BASE_URL', 'https://karthik-com.applaudhcm.com/'),
    timeout: 30000,
    retries: 1
  },
  staging: {
    baseUrl: getEnvVar('BASE_URL', 'https://karthik.applaud-test.com/'),
    tenantId: getEnvVar('TENANT_ID', 'uat'),
    environment: 'uat',
    apiBaseUrl: getEnvVar('API_BASE_URL', 'https://karthik.applaud-test.com/'),
    timeout: 60000,
    retries: 2
  },
  production: {
    baseUrl: getEnvVar('BASE_URL', 'https://karthik-com.applaudhcm.com/'),
    tenantId: getEnvVar('TENANT_ID', 'prod'),
    environment: 'production',
    apiBaseUrl: getEnvVar('API_BASE_URL', 'https://karthik-com.applaudhcm.com/'),
    timeout: 90000,
    retries: 3
  }
};

// Get current environment configuration
export const getCurrentConfig = (): EnvironmentConfig => {
  // Priority: 1. Environment variable, 2. Branch detection, 3. Default
  const env = getEnvVar('ENVIRONMENT', detectEnvironmentFromBranch());
  return environments[env] || environments.staging;
};

// Helper functions
export const getTenantUrl = (path: string = ''): string => {
  const config = getCurrentConfig();
  return `${config.baseUrl}/${config.tenantId}${path}`;
};

export const getApiUrl = (endpoint: string = ''): string => {
  const config = getCurrentConfig();
  return `${config.apiBaseUrl}${endpoint}`;
};

// Export current config for easy access
export const config = getCurrentConfig();
