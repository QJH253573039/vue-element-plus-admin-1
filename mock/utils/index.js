export const TOKEN = "sldflkdjflsjjs6+s5ff8we4f5s46we4r65w466465qw64e@dsfs6";
export const delay = timeout => new Promise(resolve=> {
  setTimeout(resolve, timeout);
})
export const checkToken = headers => {
  return !!headers.authorization;
}