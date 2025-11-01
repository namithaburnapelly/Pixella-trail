const base_url = 'https://pixella-ai-backend.vercel.app/api/v1';
export const environment = {
  production: true,
  registerURL: `${base_url}/auth/register`,
  loginUrl: `${base_url}/auth/login`,
  messageUrl: `${base_url}/message`,
  chatsUrl: `${base_url}/chat`,
};
