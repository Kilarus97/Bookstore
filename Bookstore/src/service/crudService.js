import AxiosConfig from "./AxiosConfig.js";



export async function getAllPublishers() {
  const response = await AxiosConfig.get('/publishers/');
  return response.data;
}

export async function getPublisherById(id) {
  const response = await AxiosConfig.get(`/publishers/${id}`);
  return response.data;
}

export async function createPublisher(productData) {
  const response = await AxiosConfig.post("/publishers/", productData);
  return response.data;
}

export async function updatePublisher(id, productData) {
  const response = await AxiosConfig.put(`/publishers/${id}`, productData);
  return response.data;
}

export async function deletePublisher(id) {
  const response = await AxiosConfig.delete(`/publishers/${id}`);
  return response.data;
}