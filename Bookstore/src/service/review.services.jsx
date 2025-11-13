import AxiosConfig from "./AxiosConfig.js";

export async function addReview(reviewData) {
  const token = localStorage.getItem("token");
    const response = await AxiosConfig.post("/Review", reviewData);
    return response.data;
}

export async function getReviewsByBookId(bookId) {
    const response = await AxiosConfig.get(`/Review/${bookId}`);
    return response.data.$values;
}