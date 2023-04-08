export var database = {
  filterCity: "London",
  filterDay: "Friday",
  filterTime: "Afternoon",
};

export const setDatabase = (payload) => {
  database = payload;
};
