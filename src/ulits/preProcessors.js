const currentTime = new Date().getTime();

const generateDocIdByTime = (item, index) => {
    item._id = `${currentTime + index}`;
};

export {generateDocIdByTime};
