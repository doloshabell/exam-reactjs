import React, { useState } from "react"
import { Box, Button, Drawer, IconButton, InputAdornment, InputLabel, Stack, TextField, Typography } from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

const ChangePassword = (props) => {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const submitButton = () => {
    setOldPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
    props.hideChangePassword()
  }

  return (
    <Drawer anchor="bottom" variant="temporary" open={props.showChangePassword} onClose={() => props.hideChangePassword()}>
      <Box sx={{ margin: "25px 30px" }}>
        <Typography variant="body2" gutterBottom sx={{ color: "#109f9f", fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>Ganti Password</Typography>
        <Stack>
          <InputLabel>Password Lama</InputLabel>
          <TextField
            fullWidth
            required
            type={showOldPassword ? "text" : "password"}
            variant="standard"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowOldPassword(!showOldPassword)}>
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            }}
          />
          <br />
          <InputLabel>Password Baru</InputLabel>
          <TextField
            fullWidth
            required
            type={showNewPassword ? "text" : "password"}
            variant="standard"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            }}
          />
          <br />
          <InputLabel>Konfirmasi Password Baru</InputLabel>
          <TextField
            fullWidth
            required
            type={showConfirmNewPassword ? "text" : "password"}
            variant="standard"
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                    {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            }}
          />
          <br />
          <Button fullWidth variant="contained" type="submit" color="primary" sx={{ borderRadius: "25px", fontWeight: "bold" }}
            onClick={() => submitButton()}>SUBMIT</Button>
        </Stack>
      </Box>
      <br />
    </Drawer>
  )
}

export default ChangePassword;