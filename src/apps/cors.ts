const allowedOrigins = [
  "https://staging.market-topia.my.id",
  "http://localhost:3000",
];

export const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
