import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Storage } from "@capacitor/storage"

const Auth = () => {
	useEffect(() => {
		Storage.get({ key: "user" })
			.then(user => {
				if (!user.value) {
					navigate("/login")
				}
				else {
					let value = JSON.parse(user.value)
					console.log(value)
					console.log(value.expired_at)
					console.log(value.position_name)
					console.log(new Date().getTime())
					if (value.expired_at >= new Date().getTime()) {
						navigate("/login")
					}
					else {
						if (window.location.pathname === "/") {
							if (value.position_name === "Purchasing") {
								navigate("/purchasing")
							} else if (value.position_name === "Salesman") {
								navigate("/sales")
							}
						}
					}
				}
			}, error => {
				navigate("/login")
			}
			)
	}, [])

	return (
		<div></div>
	)
}

export default Auth