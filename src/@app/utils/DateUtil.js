import moment from "moment";

export const convertDate = (stringToConvert) => {
    return moment(new Date(stringToConvert)).format("DD/MM/YYYY");
};

export const convertDateTime = (stringToConvert) => {
  return moment(new Date(stringToConvert)).format("DD/MM/YYYY HH:mm");
};
export const convertDateTime2 = (stringToConvert) => {
  return moment(new Date(stringToConvert)).format("DD-MM-YYYY HH:mm");
};


export const convertTime =(hour,minute,second) => {
  return moment(hour+":" +minute+":" +second,"HH:mm:ss")
};
export const convertTimeByString =(stringToConvert) => {
    return moment(new Date(stringToConvert)).format("HH:mm");
  };
  

export  const getDate = (dateOfBirth) => {
    return moment(dateOfBirth);
};

export   const splitTimeString = (time) => {
    const timeSplit = time.split(".");
    return timeSplit[0].slice(0, 5);
  };

export  const formatDatePicker = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

export  const formatTimePicker = (str) => {
    var date = new Date(str);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var second = ("0" + date.getSeconds()).slice(-2);
    return [hours, minutes, second].join(":");
  };