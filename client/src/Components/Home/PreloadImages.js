import React from 'react';
const Preload = require('react-preload').Preload;

const PreloadImages = () => {
  return (
      <Preload
          images={[
            "images/plumber.jpg",
            "images/filmtocat.png",
          ]}
          autoResolveDelay={3000}
          loadingIndicator={<div></div>}
          mountChildren={true}
          resolveOnError={true}>
        {/* preload more images when the parent ones finish */}
        <Preload
            images={[
              "https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png",
              "https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png",
              "https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png",
            ]}
            loadingIndicator={<div></div>}
            autoResolveDelay={3000}
            resolveOnError={true}>
          <div></div>
        </Preload>
      </Preload>
  )
};

export default PreloadImages;