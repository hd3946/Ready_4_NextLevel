import { useQuery } from "react-query";

export function useTwitter() {
  const apiKey =
    "AAAAAAAAAAAAAAAAAAAAAMIzngEAAAAAFHlzUPv6y%2Bhnf%2Fy3zkLZ%2FlGwOHc%3DM06KxskhhCyT41E5ozZGcjZ9m11NsC2HnYdefTlHDsTMT7Q9PA";
  const username = "Imomo6";
  const test = useQuery(
    ["avatar"],
    () =>
      fetch(
        `https://api.twitter.com/2/lists/:@OMOIM6/tweets`,
        {
          headers: { 
            Authorization: `Bearer ${apiKey}`,
          },
          credentials: "include",
        }
      ).then(async (res) => res.json()),
    { enabled: true }
  );
  return test;
}
