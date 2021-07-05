export default () => {
  const date = new Date().toLocaleDateString().split("/");
  const inter = [];
  date.forEach((val, i) => (inter[2 - i] = val));
  return inter.join("-");
};
