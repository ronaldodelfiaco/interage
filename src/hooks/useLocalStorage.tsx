import { useEffect, useState } from "react";
import { themeSettingsProps } from "../theme";

const useLocalStorage = (key: string, initialValue: any) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    const getData = window.localStorage.getItem(key);
    if (getData) {
      setData((getData));
    }
  }, [key]);

  const storeData = (updateValue: any | themeSettingsProps) => {
    setData(updateValue);
    try {
      window.localStorage.setItem(key, JSON.stringify(updateValue));
    } catch (error) {
      console.error("Pouco espaço na memoria");
    }
  };

  return { data, storeData };
};

export default useLocalStorage;
