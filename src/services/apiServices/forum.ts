import {  CommentFormData, CommnetReply, commnets, forumquestion } from "@/types/forum";
import api from "./api";


export const fetchAllForum = async (courseId: number):Promise<CommentFormData> => {
  const url = `api/v1/forum-question/get-by-course/${courseId}`;
  const method = "get";
  const res = await api({ url, method });
  // console.log(res, "res data of forum");
  return res.data;
};

export const createForum = async (data: {question: string,
  userId: number,
  courseId: number,
  tab: string,
  step: string}):Promise<forumquestion> => {
  const url = `api/v1/forum-question/create`;
  const method = "post";
  const res = await api({ url, data, method });
  // console.log(res.data, "res.data");
  return res.data;
};

export const createReply = async (data: {reply: string,
  userId: number,
  commentId: number,
}):Promise<CommnetReply> => {
  const url = `api/v1/forum-question/comment-reply`;
  const method = "put";
  const res = await api({ url, data, method });
  return res.data;
};


interface Commnets {
  comment?: string;
  forumQuestionId: number;
  userId: number;
}

export const createCommnets = async (data: {comment: string,
  forumQuestionId: number,
  userId: number,}):Promise<Commnets> => {
  const url = `api/v1/forum-question/create-comment`;
  const method = "post";
  const res = await api({ url, data, method });
  return res.data;
};
export const fetchAllCommnets = async (id: number):Promise<commnets> => {
  const url = `api/v1/forum-question/get-comment-by-question/${id}`;
  const method = "get";
  const res = await api({ url, method });
  // console.log(res, "res data of forum");
  return res.data;
};








