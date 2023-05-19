import CloseIcon from '@mui/icons-material/Close'
import { Button, Typography, Box } from '@mui/material' 
import { styled as MuiStyled } from '@mui/material/styles'
import { useState } from 'react'
import { useConnect } from 'wagmi'
import { WalletCard } from '../components/WalletCard'

export const SModalContainer = MuiStyled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  text-align: center;
`

export const SContentBox = MuiStyled('div')`
  background-color: #fff;
  padding: 10px;
  cursor: default;
  z-index: 2;
  max-height: 530px; 
`

const ModalContents = MuiStyled(SContentBox)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center'
}))

const CustomCloseIcon = MuiStyled(CloseIcon)({
  ' &.MuiSvgIcon-root': {
    width: '20px',
    height: '20px'
  }
})

const CustomButton = MuiStyled(Button)({
  marginLeft: '20px',
  ' & span': {
    color: '#797E90',
    background: '#F4F5F6',
    borderRadius: '30px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px'
  }
})

const ModalParentBox = MuiStyled(Box)(() => ({
  position: 'relative',
  padding: '40px',
  width: '450px',
  height: '500px'
}))

const ModalBox = MuiStyled(Box)(() => ({
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%'
}))

export function LoginModal({ closePortal }) {
  const { connectors } = useConnect()
  const [selected, setSelected] = useState({ target: '', isPending: false })

  return ( 
    <ModalParentBox>
      <ModalBox>
        <Box style={{ position: 'absolute', top: -5, right: 28.5 }}>
          <CustomButton aria-label="close" onClick={closePortal} endIcon={<CustomCloseIcon />} disableRipple />
        </Box>

        <ModalContents>
          <Box sx={{ flex: 1, display: 'grid', alignItems: 'center' }}>
            <Typography sx={{ fontStyle: 'normal', fontWeight: 500, fontSize: '24px', lineHeight: '36px' }}>
              Choose Your Wallet
            </Typography>
          </Box>

          <Box sx={{ flex: 1, textAlign: 'center', fontSize: '12px', fontWeight: 400, margin: 'auto' }}>
            <p style={{ margin: 0 }}>Select The Wallet You Have And Connect It. </p>
            <p style={{ width: '310px', margin: 0 }}>
              <strong>Connect Your Wallet</strong> To Participate In The Sale And Mint List Registration.
            </p>
          </Box>
          <Box style={{ flex: 4, display: 'grid', padding: '20px' }}>
            {connectors.map((x, i) => (
              <WalletCard
                key={i}
                connector={x}
                closeModal={closePortal}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Box>
        </ModalContents>
      </ModalBox> 
      </ModalParentBox>
  )
}
