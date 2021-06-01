import { Random } from "mockjs";
export const TOKEN = "sldflkdjflsjjs6+s5ff8we4f5s46we4r65w466465qw64e@dsfs6";
export const delay = timeout => new Promise(resolve=> {
  setTimeout(resolve, timeout);
})
export const checkToken = headers => {
  return !!headers.authorization;
}
export const getRandomArrayElements = (arr) => {
  let count = Random.integer(1, arr.length)
  let  shuffled = arr.slice(0)
  let i = arr.length
  let min = i - count
  let temp;
  let index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

export const sample = arr => arr[Math.floor(Math.random() * arr.length)];