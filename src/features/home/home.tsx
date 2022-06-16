import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { GetUserAPI } from "../../app/api/UserApi";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { RootState } from "../../app/store/store";
import ViewUser from "../user/view_user";

export default function HomePage() {
  const userData = useAppSelector((state: RootState) => state.userData);

  return (
    <>
      <Container>
        <ViewUser userData={userData} />
      </Container>
    </>
  );
}
