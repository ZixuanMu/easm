import axios from 'axios';

export interface DataOverViewRes {
count: number,
growth: number,

}
export function getUserNum() {
  return axios.get('/api/dashboard/getUserNum');
}
export function getFootageNum() {
  return axios.get('/api/dashboard/getFootageNum');
}
export function getTrainingPercent() {
  return axios.get('/api/dashboard/getTrainingPercent');
}
export function getTrainingNum() {
  return axios.get('/api/dashboard/getTrainingNum');
}