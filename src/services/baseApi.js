
const API_BASE_URL = 'http://localhost:5045/api';

/**
 * Generic POST request function
 * @param {string} path - API path (e.g., "/getnationalities")
 * @param {object} body - Request payload
 * @returns {Promise<any>} Response JSON
 */
const post = async (path, body = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add auth token if needed:
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
};

export default { post };
