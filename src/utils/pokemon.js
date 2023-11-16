export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    // fetchでデータを取得 → json形式で返す → resolve関数の引数に渡すことでreturnに返される
    fetch(url)
    .then((res) => res.json())
    .then((data) => resolve(data));
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => resolve(data));
  })
};