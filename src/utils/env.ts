import Constants from "expo-constants";

const fallbackUrl = "http://localhost:8000/api/v1";

export function getApiBaseUrl() {
  const envUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  const extraUrl = Constants.expoConfig?.extra?.apiBaseUrl;

  return envUrl ?? extraUrl ?? fallbackUrl;
}
