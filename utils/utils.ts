export const dateFormatter = (dateSrc: string) => {
  const date = new Date(dateSrc.replace(/-/g, '/'));
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const dateToTimeFormatter = (dateSrc: Date) => {
  return `${dateSrc.getFullYear()}-${
    dateSrc.getMonth() + 1
  }-${dateSrc.getDate()} ${dateSrc.getHours()}:${dateSrc.getMinutes()}`;
};
