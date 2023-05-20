import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled as MuiStyled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { ModalMission } from "../../../states";
import { useRecoilState, useSetRecoilState } from "recoil";
import RewardIcon from "@assets/images/icons/xpicon.png"

export default function missionCard({
  data,
  title = "Near Onboard",
  missionTitle = "Defi Confirmed Interest 365% Drip Community Opens",
  rewards = 50,
}) {
  const [open, setOpen] = useRecoilState(ModalMission); 
  const handleOpen = () => { 
    setOpen(true)
  };

  return (
    <Box sx={{ width: "400px", margin: "10px" }} onClick={handleOpen} >

      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <img src={data.src} width={50} height={50} alt="" />
          <Typography variant="span" component="div">
            {missionTitle}
          </Typography>
          <div style={{display: 'flex',justifyContent: 'flex-end'}}>
          <img src={RewardIcon.src} width={20} height={20} alt="" />
          <CustomText>{rewards}</CustomText>
          </div> 
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained">Once</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

const CustomText = MuiStyled(Typography)({
  textAlign: "right",
  color: "blue",
  fontSize: "16px",
  ":before": {
    fontSize: "14px",
    content: '"REWARDS: "',
    color: "#000",
  },
  ":after": {
    content: '"XP"',
    color: "#000",
  },
});
