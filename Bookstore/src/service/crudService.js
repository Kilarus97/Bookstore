import AxiosConfig from "./AxiosConfig.js";



export async function getAllPublishers() {
  const response = await AxiosConfig.get('/publishers/');
  return response.data;
}

export async function getPublisherById(id) {
  const response = await AxiosConfig.get(`/publishers/${id}`);
  return response.data;
}

export async function getSortedPublishers(sortType) {
  const response = await AxiosConfig.get(`/publishers/sorted?sortType=${sortType}`);
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

export async function getAllBooks() {
  const response = await AxiosConfig.get('/books/');
  return response.data;
}

export async function getBookById(id) {
  const response = await AxiosConfig.get(`/books/${id}`);
  return response.data;
}

export async function createBook(productData) {
  const response = await AxiosConfig.post("/books/", productData);
  return response.data;
}

export async function updateBook(id, productData) {
  const response = await AxiosConfig.put(`/books/${id}`, productData);
  return response.data;
}

export async function deleteBook(id) {
  const response = await AxiosConfig.delete(`/books/${id}`);
  return response.data;
}

export async function getAllAuthors(pageIndex = 0, pageSize = 10) {
  const response = await AxiosConfig.get(`/Authors/paginated?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  return response.data;
}
