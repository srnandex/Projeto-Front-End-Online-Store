const minSizes = {
  mobileM: '320px',
  mobileL: '425px',
};

const maxSizes = {
  mobileM: '425px',
  mobileL: '768px',
};

const device = {
  mobileL: `and (min-device-width: 
    ${minSizes.mobileL}) and (max-device-width: ${maxSizes.mobileL})`,
  mobileM: `and (min-device-width: 
    ${minSizes.mobileM}) and (max-device-width: ${maxSizes.mobileM})`,
};

export default device;
