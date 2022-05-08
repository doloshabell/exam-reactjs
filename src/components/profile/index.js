import React, { useEffect, useState } from "react"
import { Storage } from "@capacitor/storage"
import Box from "@mui/material/Box"
import Sidebar from "../sidebar"
import Loader from "../loader"

const IndexProfile = (props) => {
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
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
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
  }, [props.reloadList])

  const hideSidebar = () => {
    setShowSidebar(false)
  }

  return (
    <Box className="index">
      <Box sx={{ backgroundColor: "#132f61", color: "#fff", borderRadius: "0 0 15px 15px" }}>
      
      </Box>
      <Sidebar showSidebar={showSidebar} hideSidebar={() => hideSidebar()} />
      <Loader open={loading} />
    </Box>
  )
}

export default IndexProfile;