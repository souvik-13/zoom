import { useParams } from "react-router-dom";

const Room = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Room {id}</h1>
    </>
  );
};

export default Room;
