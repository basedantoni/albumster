export const getTopAlbums = async (
  user: string,
  period:
    | "overall"
    | "7day"
    | "1month"
    | "3month"
    | "6month"
    | "12month" = "overall",
  limit: number = 100,
  page: number = 1
) => {
  let url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${user}&api_key=346fc4f9e9d3a87499ace876fd691447&format=json`;

  if (period) {
    url += `&period=${period}`;
  }
  if (limit) {
    url += `&limit=${limit}`;
  }
  if (page) {
    url += `&page=${page}`;
  }

  const response = await fetch(url);
  return response.json();
};
