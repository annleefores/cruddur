import "./ProfileInfo.css";
import { ReactComponent as ElipsesIcon } from "./svg/elipses.svg";
import React from "react";
import { Auth } from "aws-amplify";
import ProfileAvatar from "./ProfileAvatar";

// [TODO] Authenication

export default function ProfileInfo(props) {
  const [popped, setPopped] = React.useState(false);

  const click_pop = (event) => {
    setPopped(!popped);
  };

  const signOut = async () => {
    try {
      localStorage.removeItem("access_token");
      await Auth.signOut({ global: true });
      window.location.href = "/";
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const classes = () => {
    let classes = ["profile-info-wrapper"];
    if (popped == true) {
      classes.push("popped");
    }
    return classes.join(" ");
  };

  return (
    <div className={classes()}>
      <div className="profile-dialog">
        <button onClick={signOut}>Sign Out</button>
      </div>
      <div className="profile-info" onClick={click_pop}>
        <ProfileAvatar id={props.user.cognito_user_uuid} />
        <div className="profile-desc">
          <div className="profile-display-name">
            {props.user.display_name || "My Name"}
          </div>
          <div className="profile-username">
            @{props.user.handle || "handle"}
          </div>
        </div>
        <ElipsesIcon className="icon" />
      </div>
    </div>
  );
}
