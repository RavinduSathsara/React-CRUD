import React, { useState, useEffect } from "react";
import AppNavBar from "../components/AppNavBar";
import NameList from "../components/NameList";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import Swal from "sweetalert2";
const semesters = [
  {
    value: "Semester 1",
    label: "Semester 1",
  },
  {
    value: "Semester 2",
    label: "Semester 2",
  },
  {
    value: "Semester 3",
    label: "Semester 3",
  },
  {
    value: "Semester 4",
    label: "Semester 4",
  },
];

const Home = () => {
  const [friends, setFriends] = useState([{}]);
  const [firstname, setFirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [semester, setSemester] = React.useState("EUR");

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    getData();
  }, [friends]);

  const getData = () => {
    axios
      .get("http://localhost:3500/api/students", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => setFriends(res.data))
      .catch((err) => console.log(err));
  };

  const addFriend = async () => {
    if (firstname || lastname) {
      Swal.fire("Reacord added !");
      let res = await axios.post("http://localhost:3500/api/students", {
        firstName: firstname,
        lastName: lastname,
        semester: semester,
      });
    } else {
      Swal.fire("Please add data !");
    }
  };

  console.log(friends);

  return (
    <div>
      <AppNavBar />

      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            id="outlined-basic"
            label="First Name"
            variant="outlined"
          />
          <TextField
            value={lastname}
            onChange={(e) => setlastName(e.target.value)}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
          />
          <TextField
            id="outlined-select-semester"
            select
            label="Select"
            value={semester}
            onChange={handleChange}
            helperText="Please select your semester"
          >
            {semesters.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Button
          onClick={addFriend}
          sx={{
            m: 1,
          }}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </form>

      {friends.map((friend) => (
        <NameList
          firstName={friend.firstName}
          lastName={friend.lastName}
          semester={friend.semester}
        />
      ))}
    </div>
  );
};

export default Home;
