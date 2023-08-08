import React from "react";
import ReactBingMap, {
  Pushpin,
  Polyline,
  Layer
} from "@3acaga/react-bing-maps";

import ReactDOM from "react-dom";


const key = "Ao93YLyuFpHiqjMr6D0LN5ISC_BtP8etVqcntCxFioHHVxpyrE0999Ous0x1FEUY";

const start = {
  latitude: 0,
  longitude: 0
};

const end = {
  latitude: 50,
  longitude: 50
};

const BingMap = () => {
  return (
    <div style={{ height: 600 }}>
      <ReactBingMap apiKey={key}>
        <Pushpin location={start} />

        <Polyline path={[start, end]} />

        <Pushpin location={end} />
      </ReactBingMap>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<BingMap />, rootElement);

export default BingMap
