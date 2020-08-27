//* "token=value" 를 {foo:"bar"}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: { [key: string]: string } = {};
  if (cookieString) {
    //* "token=value"
    const itemString = cookieString?.split(/\s*;\s*/);
    itemString.forEach((pairs) => {
      //* ["token","value"]
      const pair = pairs.split(/\s*=\s*/);
      cookies[pair[0]] = pair.splice(1).join("=");
    });
  }
  return cookies;
};

//*string에서 number만 return 하는 함수
export const getNumber = (string: string) => {
  const numbers = string.match(/\d/g)?.join("");
  if (numbers) {
    return Number(numbers);
  }
  return null;
};

//* query string 만들기
export const makeQueryString = (baseUrl: string, queriesObject: Object) => {
  const keys = Object.keys(queriesObject);
  const values = Object.values(queriesObject);
  if (keys.length === 0) {
    return baseUrl;
  }
  let queryString = `${baseUrl}?`;
  let i = 0;
  while (i < keys.length) {
    queryString += `${keys[i]}=${values[i]}&`;
    i += 1;
  }
  //* 마지막 '&' 제거하기
  return queryString.slice(0, -1);
};
