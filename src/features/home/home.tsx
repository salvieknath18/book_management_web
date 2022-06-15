import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { GetUserAPI } from "../../app/api/UserApi";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { RootState } from "../../app/store/store";
import ViewUser from "../user/view_user";


export default function HomePage() {
  const [userData, setUserdata] = useState({});
  const dispatch = useAppDispatch();
  const { id, name, email, role } = useAppSelector((state: RootState) => state.userData);

  
  const data = {id: "", name: "", email: "", role: ""}

  // useEffect(() => {
  //   data.id = id,
  //   data.name = name,
  //   data.email = email,
  //   data.role = role
  //   setUserdata(data)
  // }, []);


  return (
    <>
      <Container>
        <ViewUser userData={userData}/>
      </Container>
        
   </>
  )
}

