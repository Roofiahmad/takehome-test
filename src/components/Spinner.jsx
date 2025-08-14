import React, { useContext } from "react";
import Context from "../context/Context";

const Spinner = () => {
  const { loading } = useContext(Context);
  return (
    <>
      {loading && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1000,
            // backgroundColor: "#ffffff19",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <b style={{ color: "#FFFFFF", opacity: 1 }}>Loading....</b>
        </div>
      )}
    </>
  );
};

export default Spinner;
