import React from "react";
import ReactPlayer from "react-player";

function ReactvideoPlayer(props) {
  const youtubeUrl = "https://www.youtube.com/watch?v=";
  return (
    <div key={props.key}>
      <ReactPlayer
        controls={true}
        playing={false}
        url={youtubeUrl + props.v.key}
        width="750px"
        height="350px"
      ></ReactPlayer>
      {console.log(youtubeUrl)}
    </div>
  );
}
export default ReactvideoPlayer;
