import React from 'react';
import { ClipLoader } from 'react-spinners';

const SpinnerClipLoader = ({ size = 150, outerSpacingClasses = 'py-5 px-3', innerSpacingClasses = 'py-5' }) => (
  <div className={`container ${outerSpacingClasses}`}>
    <div className={`row justify-content-center ${innerSpacingClasses}`}>
      <ClipLoader
        sizeUnit="px"
        size={size}
        color="#157FFB"
      />
    </div>
  </div>
);

export default SpinnerClipLoader;
