import React from "react";

function PointsBox(props: any) {

  return (
    <div className="pointsBox">
      <h2>
        Score: {props.totalPoints.current}
      </h2>
      
    </div>
  )
}

export default PointsBox;