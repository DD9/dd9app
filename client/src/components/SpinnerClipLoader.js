import React from 'react';
import { ClipLoader } from 'react-spinners';

const SpinnerClipLoader = () => (
  <div className="container py-5">
    <div className="py-5 px-3">
      <div className="row justify-content-center">
        <ClipLoader
          sizeUnit="px"
          size={150}
          color="#157FFB"
        />
      </div>
    </div>
  </div>
);

export default SpinnerClipLoader;
