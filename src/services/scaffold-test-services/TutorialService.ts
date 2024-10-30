/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "../http/http-common.ts";
import ITutorialData from "../../types/scaffold-test-types/Tutorial.ts";

const getAll = () => {
  return http.get<Array<ITutorialData>>("/tutorials");
};

const get = (id: any) => {
  return http.get<ITutorialData>(`/tutorials/${id}`);
};

const create = (data: ITutorialData) => {
  return http.post<ITutorialData>("/tutorials", data);
};

const update = (id: any, data: ITutorialData) => {
  return http.put<any>(`/tutorials/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/tutorials`);
};

const findByTitle = (title: string) => {
  return http.get<Array<ITutorialData>>(`/tutorials?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;
