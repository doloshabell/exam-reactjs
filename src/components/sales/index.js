import React, { useEffect, useState } from "react"
import { Storage } from "@capacitor/storage"
import { navigate } from "gatsby"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import Avatar from "@mui/material/Avatar"
import SearchIcon from "@mui/icons-material/Search"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Fab from "@mui/material/Fab"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import EventIcon from '@mui/icons-material/Event';
import SpeedIcon from '@mui/icons-material/Speed';
import Sidebar from "../sidebar"
import Loader from "../loader"
import axios from "axios"
import logo from "../../images/logo.png"

const IndexSales = (props) => {
  const [showSidebar, setShowSidebar] = useState(false)
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
  const [value, setValue] = useState(0)
  const [carList, setCarList] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    if (props.reloadList) {
      setLoading(true)
      Storage.get({ key: "user" })
        .then(user => {
          if (user.value) {
            user = JSON.parse(user.value)
            setSession(user)
            getCarList(user)
          }
        }, error => {
          console.log(error);
        }
        )
    }
  }, [props.reloadList])

  const getCarList = (user) => {
    setLoading(true)
    axios.get("https://us.izzibook.co.id/apilapakmobil/Car_info/offsetViewSales/0/0/0/0/0/0/0/20", {
      headers: {
        "Authorization": "Bearer " + user.token
      }
    })
      .then(function (response) {
        console.log(response)
        if (response && response.data) {
          setCarList(response.data)
        } else {
          setCarList([])
        }
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error)
        let message = "TERJADI KESALAHAN PADA SISTEM. MOHON COBA BEBERAPA SAAT LAGI"
        if (error && error.response && error.response.data) {
          console.log(error.response.data)
          if (error.response.data.message) {
            message = error.response.data.message
          }
        }
        setLoading(false)
        setAlert(true)
        setAlertMessage(message)
        if (error.response.status == 401) {
          setTimeout(function () {
            Storage.remove({ key: "user" })
              .then(user => {
                navigate("/login")
              }, error => {
                console.log(error)
              }
              )
          }, 2000)
        }
      })
  }

  const handleTabChange = (e, newTabValue) => {
    setValue(newTabValue)
    if (newTabValue == 1 && carList.length == 0) {
      getCarList(session)
    }
  }

  const hideSidebar = () => {
    setShowSidebar(false)
  }

  const goToProfile = () => {
    navigate("/profile");
  }

  return (
    <Box className="index">
      <Box sx={{ backgroundColor: "#132f61", color: "#fff", borderRadius: "0 0 15px 15px" }}>
        <Card sx={{ backgroundColor: "#132f61", color: "#fff", padding: "10px", boxShadow: "none" }}>
          <CardHeader
            sx={{ color: "#fff" }}
            avatar={<Avatar src={"https://us.izzibook.co.id/apilapakmobil" + session.employee_img}></Avatar>}
            title={"Hi, " + session.employee_name} subheader={session.position_name}
            onClick={() => goToProfile()}
          />
          <CardContent sx={{ paddingBottom: "0 !important" }}>
            <TextField
              fullWidth
              className="search"
              variant="outlined"
              size="small"
              placeholder="Cari Mobil..."
              sx={{
                backgroundColor: "#586c90",
                color: "#fff",
                borderRadius: "25px"
              }}
              inputProps={{
                startAdornment:
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
              }}
            />
          </CardContent>
        </Card>
        <Tabs value={value} sx={{ margin: "0 30px" }} onChange={handleTabChange}>
          <Tab label="Listing Mobil" sx={{ color: "#fff", textTransform: "none" }} />
        </Tabs>
      </Box>
      <br />
      <Box sx={{ display: value == 0 ? "block" : "none" }}>
        <Typography variant="h1" gutterBottom sx={{ fontSize: "30px", fontWeight: "bold", marginLeft: "30px" }}>Produk Terbaru</Typography>
        {carList.map((item) =>
          <Card sx={{ display: "flex", flexDirection: "row", boxShadow: "3", width: "95%", borderRadius: "0px 10px 10px 0px", marginBottom: "10px" }}>
            <CardMedia
              component="img"
              image={item.ImageFilename ? "https://us.izzibook.co.id/apilapakmobil/" + item.ImageFilename : logo}
              sx={{ width: "30%", height: "180px", objectFit: "contain", backgroundColor: item.ImageFilename ? "#fff" : "#132f61" }}
            />
            <CardContent sx={{ width: "65%" }}>
              <Typography variant="body2" gutterBottom>
                <strong>{item.BrandName.toUpperCase()} {item.CarVariant.toUpperCase()} {item.CarType.toUpperCase()}</strong><br />
              </Typography>
              <Typography variant="body2" gutterBottom>
                <EventIcon sx={{ color: "gray", verticalAlign: "middle", marginRight: "5px", marginLeft: "5px" }} />{item.YearMade} <SpeedIcon sx={{ color: "gray", verticalAlign: "middle", marginRight: "5px", marginLeft: "12px" }} />{item.CarSpeedometer}<br />
              </Typography>
              <br />
              <Button size="small" variant="contained" color="primary" sx={{ borderRadius: "25px", fontWeight: "bold", float: "right" }}>RP. {item.SellCreditPrice}</Button>
            </CardContent>
          </Card>
        )}
        <br /><br /><br />
      </Box>
      <Fab color="primary" sx={{ position: "fixed", bottom: "25px", right: "25px" }}><DirectionsCarIcon /></Fab>
      <Sidebar showSidebar={showSidebar} hideSidebar={() => hideSidebar()} />
      <Loader open={loading} />
      <Snackbar open={alert} message={alertMessage} action={<IconButton color="inherit" size="small" onClick={() => setAlert(false)}><CloseIcon fontSize="small" /></IconButton>} />
    </Box>
  )
}

export default IndexSales;