import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingComponent() {
  return (
    <div>
      {" "}
      <CircularProgress color="secondary" sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        
      }}/>
    </div>
  );
}

export default LoadingComponent;
