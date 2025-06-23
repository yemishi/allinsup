import { useEffect } from "react";

const Analytics = () => {
  const GA_ID = import.meta.env.VITE_GA_ID;

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !GA_ID) return;

    const script1 = document.createElement("script");
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [GA_ID]);

  return null;
};

export default Analytics;
