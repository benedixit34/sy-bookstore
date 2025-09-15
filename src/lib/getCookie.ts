import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const getCookie = () => {

    const [library, setLibrary] = useState<any[]>([]);
    useEffect(() => {
    const cookieLibrary = Cookies.get("library");
    if (cookieLibrary) {
      try {
        setLibrary(JSON.parse(cookieLibrary));
      } catch (err) {
        console.error("Failed to parse cart cookie", err);
      }
    }
  }, []);

  return library

}