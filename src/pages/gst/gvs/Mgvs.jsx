import React, { useState } from "react";
import { Box } from "@mui/system";
import { Select, MenuItem, OutlinedInput, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { SectionScore } from "../../../composite";
import { changeValueGst } from "../../../features/gst";
import { numberOfYears } from "../../../helpers/date";

export default function Mgvs() {
  const [sectionScore, setsectionScore] = useState(0);
  const dispatch = useDispatch();

  let bvYears = 0;
  var score = 0;
  const handleCalculateIcbr = (b) => {
    // var a = document.querySelector(".byears");
    var a = numberOfYears(b);
    if (a >= 5) {
      score = 50;
      setsectionScore(50);
    } else if (a < 5 && a >= 3) {
      score = 30;
      setsectionScore(40);
    } else if (a < 3 && a >= 2) {
      score = 20;

      setsectionScore(20);
    } else {
      score = 0;

      setsectionScore(0);
    }
    dispatch(changeValueGst({ value: score, type: "vs" }));
  };

  return (
    <>
      <Box
        sx={{
          padding: "0px 10px",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <div className="flex">
          <div className="flex-grow">
            <Box sx={{ padding: "0px 0px" }}>
              <Typography
                variant="h7"
                sx={{ fontWeight: 800, color: "#1e1a55" }}
              >
                GST | Vintage Score
              </Typography>

              <Box sx={{ marginTop: "0px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl sx={{ m: 1, width: "100%" }}>
                      <TextField
                        type={"date"}
                        // label="Buisness Vintage Years"
                        sx={{ width: "100%" }}
                        name="email"
                        onChange={(e) => {
                          bvYears = e.target.value;
                          handleCalculateIcbr(bvYears);
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </div>
          <div className="score">{sectionScore}</div>
        </div>
      </Box>
    </>
  );
}
