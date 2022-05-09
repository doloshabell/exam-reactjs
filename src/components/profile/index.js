import React, { useEffect, useState } from "react"
import { Storage } from "@capacitor/storage"
import { Avatar, Box, Card, CardHeader, IconButton, InputAdornment, InputLabel, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import PersonIcon from '@mui/icons-material/Person';
import CallSharpIcon from '@mui/icons-material/CallSharp';
import LockIcon from '@mui/icons-material/Lock';
import { navigate } from "gatsby"
import Sidebar from "../sidebar"
import Loader from "../loader"
import ChangePassword from "../changepassword"

const IndexProfile = (props) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [session, setSession] = useState({
    expired_at: 0,
    employee_code: "",
    employee_name: "",
    position_name: "",
    status: 1,
    token: "",
    username: "",
    employee_img: ""
  })
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const noHandphone = "0871234567893"
  const password = "123"
  console.log(session);

  useEffect(() => {
    if (props.reloadList) {
      setLoading(true)
      Storage.get({ key: "user" })
        .then(user => {
          if (user.value) {
            user = JSON.parse(user.value)
            setSession(user)
          }
        }, error => {
          console.log(error);
        }
        )
    }
    setLoading(false)
  }, [props.reloadList])

  const hideSidebar = () => {
    setShowSidebar(false)
  }

  const openChangePassword = () => {
    setShowChangePassword(true)
  }

  const hideChangePassword = () => {
    setShowChangePassword(false)
  }

  const backToHome = () => {
    navigate("/")
  }

  const logout = () => {
    Storage.remove({ key: "user" })
      .then(user => {
        navigate("/login")
      }, error => {
        console.log(error)
      }
      )
  }

  return (
    <Box className="index">
      <Box sx={{ backgroundColor: "#132f61", color: "#fff", paddingBottom: "15px", borderRadius: "0 0 15px 15px" }}>
        <Typography variant="body2" gutterBottom sx={{ verticalAlign: "top", fontSize: "27px", fontWeight: "bold", marginLeft: "20px", paddingTop: "15px" }}>
          <IconButton onClick={() => backToHome()}>
            <ArrowBackIosRoundedIcon sx={{ verticalAlign: "middle", color: "white" }} />
          </IconButton>
          User Profile
          <IconButton onClick={logout} sx={{float: "right", margin: "0 20px 0 0"}}>
            <LogoutRoundedIcon sx={{ color:"white", verticalAlign: "middle" }} />
          </IconButton>
        </Typography>
      </Box>
      <Card sx={{ backgroundColor: "#b8c4db", borderRadius: "0", color: "#fff", padding: "25px", marginTop: "-15px", position: "relative", zIndex: "-1", boxShadow: "none" }}>
        <CardHeader
          sx={{ color: "#fff" }}
          avatar={<Avatar sx={{ width: 120, height: 120, marginTop: "30px", marginBottom: "20px" }} src={"https://us.izzibook.co.id/apilapakmobil/" + session.employee_img}></Avatar>}
          title={<Typography variant="body2" gutterBottom sx={{ fontWeight: "bold", fontSize: "18px", color: "black", marginTop: "10px" }}><PersonIcon sx={{ color: "black", verticalAlign: "middle", margin: "0 8px 0 0", fontSize: "30px" }} />{session.employee_name}</Typography>}
          subheader={<Typography variant="body2" gutterBottom sx={{ fontWeight: "bold", fontSize: "18px", color: "black", marginTop: "25px" }}><CallSharpIcon sx={{ color: "black", verticalAlign: "middle", margin: "0 8px 0 0", fontSize: "30px" }} />0871234567893</Typography>}
        />
      </Card>
      <br />
      <Box sx={{ margin: "10px 30px" }}>
        <Stack>
          <InputLabel>Nama</InputLabel>
          <TextField fullWidth disabled variant="standard" value={session.employee_name} />
          <br />
          <InputLabel>Jabatan</InputLabel>
          <TextField fullWidth disabled variant="standard" value={session.position_name} />
          <br />
          <InputLabel>Nomor Handphone</InputLabel>
          <TextField fullWidth disabled variant="standard" value={noHandphone} />
          <br />
          <InputLabel>Alamat</InputLabel>
          <TextField fullWidth disabled variant="standard" value={""} />
          <br />
          <InputLabel>Password</InputLabel>
          <TextField
            required
            fullWidth
            disabled
            type={"password"}
            variant="standard"
            value={password}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton onClick={() => openChangePassword()}>
                    <LockIcon />
                  </IconButton>
                </InputAdornment>
            }}
          />
          <br />
          <InputLabel>Kode</InputLabel>
          <TextField fullWidth disabled variant="standard" value={session.employee_code} />
          <br />
        </Stack>
      </Box>
      <Sidebar showSidebar={showSidebar} hideSidebar={() => hideSidebar()} />
      <ChangePassword showChangePassword={showChangePassword} hideChangePassword={() => hideChangePassword()} />
      <Loader open={loading} />
    </Box>
  )
}

export default IndexProfile;