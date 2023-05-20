import * as React from 'react';
import { Box,Button,Typography, Modal } from '@mui/material';
import { ModalMission } from "../../states";
import { useRecoilState } from "recoil";
import TwitterIcon from '@mui/icons-material/Twitter'; 
import NearIcon from "@assets/images/icons/Near.png"

export default function twitterModal() {
  const [twit, setTwit] = React.useState(true);
  const [open, setOpen] = useRecoilState(ModalMission); 
  const handleClose = () => setOpen(false);
  const openTwitter = () => {
    window.open('https://twitter.com/NEARProtocol' ,'blank')
    setTwit(false)
  }
  const completeMission = () => {
    // NFT 발행
    setOpen(false);
  }
  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" sx={{fontSize:'32px'}}>
            Follow NEAR_Protocol Twitter
          </Typography>
          <Button variant="outlined" fullWidth startIcon={<TwitterIcon />} disabled>Connect Twitter</Button>
          <Typography>You need to connect Twitter to access this quest</Typography>
          <Box sx={{display:'flex', width: '100%', alignItems:'center' }}>
            <img src={NearIcon.src} style={{width:'50px', height:'50px'}} alt="Near"/>
            <Box sx={{display:'flex', flexDirection:'column'}}> 
            <Typography sx={{fontSize:"1.5rem"}}>NEAR</Typography>
            <Typography sx={{fontSize:"0.5rem", color:'gray'}}>@NEARProtocol_app</Typography>
            </Box> 
            <Button onClick={openTwitter} variant="contained" sx={{width:'70px', height:'30px', marginLeft:'auto'}}>follow</Button>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Follow our twitter NEAR_app
          </Typography>
          <Button variant="outlined" fullWidth disabled={twit} onClick={completeMission}>Claim Reward</Button>
        </Box>
      </Modal> 
  );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    color:'#000',
    height:'400px',
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };