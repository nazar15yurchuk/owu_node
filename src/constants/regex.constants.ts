export const regexConstants: { [key: string]: RegExp } = {
  EMAIL: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};
