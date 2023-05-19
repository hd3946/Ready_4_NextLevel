import { Box, Button } from "@mui/material";
import { useTwitter } from "../hooks/query/useTwitter";

export default function twitter() {
  const { data: twit } = useTwitter()
  
  console.log("twit", twit);
  return (
    <Box>
      <h1>Twitter</h1>

      <Button>트위터 라이크 체크</Button>
      <Button>트위터 리트윗 체크</Button>
    </Box>
  );
}
