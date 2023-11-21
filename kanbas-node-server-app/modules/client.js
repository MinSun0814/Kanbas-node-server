import axios from "axios";
const COURSES_URL = "http://localhost:4000/api/courses";
export const findModulesForCourse = async (courseId) => {
  const response = await axios
  .get(`${COURSES_URL}/${courseId}/modules`);
  return response.data;
};
