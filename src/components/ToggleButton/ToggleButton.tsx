import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import classes from "./ToggleButton.module.scss";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { ThemeMode } from "../App/App";

interface IToggleButton {
  setThemeMode: Dispatch<SetStateAction<ThemeMode>>
}

const ToggleButton: React.FC<IToggleButton> = ({setThemeMode}) => {
  const [isToggled, toggle] = useState(false);

  const handleToggle = useCallback(() => {
    toggle(!isToggled);
    setThemeMode(!isToggled ? ThemeMode.dark : ThemeMode.light);
  }, [setThemeMode, isToggled]);

  return (
    <label className={classes.label}>
      <input type="checkbox" defaultChecked={isToggled} onClick={handleToggle} className={classes.input}/>
      <span className={classes.span}>
        {isToggled ? <CiLight className={classes.light_icon}/> : <MdDarkMode className={classes.dark_icon}/>}
      </span>
    </label>
  );
}

export default ToggleButton;