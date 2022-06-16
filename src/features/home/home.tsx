import { Container } from "react-bootstrap";
import { useAppSelector } from "../../app/store/hooks";
import { RootState } from "../../app/store/store";
import ViewUser from "../user/view_user";

export default function HomePage() {
  const userData = useAppSelector((state: RootState) => state.userData);

  return (
    <>
      <Container>
        <ViewUser userData={userData} notHomeRequest={false} />
      </Container>
    </>
  );
}
