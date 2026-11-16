import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // זמני: הכתובת הראשית של הדומיין מפנה לדף ההרשמה ל-IN/OUT,
      // עד שדף הבית יעבור עדכון. בכתובת vercel.app דף הבית ממשיך להופיע.
      {
        source: "/",
        has: [{ type: "host", value: "(www\\.)?makom-linshom\\.com" }],
        destination: "/in-out",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
