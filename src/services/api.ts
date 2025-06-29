import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:32832',
  timeout: 10000,
  headers: {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
  },
  validateStatus: (status) => (status >= 200 && status < 300) || status === 302,
});

api.interceptors.response.use(
  (response) => {
    if (response.status === 302 && response.data) {
      return {
        ...response,
        status: 200,
        statusText: 'OK',
        data: response.data,
      };
    }
    return response;
  },
  (error) => {
    let errorMessage = 'Erro na requisição';

    if (error.response) {
      errorMessage = `Erro ${error.response.status}: ${error.response.statusText || 'Erro no servidor'}`;
      if (error.response.data) {
        errorMessage += ` - ${JSON.stringify(error.response.data)}`;
      }
    } else if (error.request) {
      errorMessage = 'Sem resposta do servidor';
    }

    console.error('Erro API:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
