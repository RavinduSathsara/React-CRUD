import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import BackgroundLetterAvatars from "./BackgroundLetterAvatars";
import axios from "axios";

import Swal from "sweetalert2";

export default function NameList(props) {
  let fullName = props.firstName + " " + props.lastName;
  const show = () => {
    axios.delete("http://localhost:3500/api/students", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    Swal.fire(props.firstName + " Deleted !");
  };
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BackgroundLetterAvatars fullName={fullName} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={fullName} secondary={props.semester} />
        <IconButton aria-label="delete" onClick={show}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </List>
  );
}
