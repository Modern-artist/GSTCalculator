import React, { useState } from "react";
import { Box, containerClasses } from "@mui/system";
import { Select, MenuItem, OutlinedInput, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { SectionScore } from "../../../composite";
import { primaryIndustry } from "../../../data/gst";
import { useDispatch } from "react-redux";
import { changeValueGst } from "../../../features/gst";
export default function Mgpis() {
  const [sectionScore, setsectionScore] = useState(0);
  // // number of inward bounce group transactions
  // const [nibgt, setnibgt] = useState(0)
  // // number of debit group transactions
  // const [ndcgt, setndcgt] = useState(0)
  // // number of debit group transactions
  // const [ndcgt, setndcgt] = useState(0)
  const [pIndus, setpIndus] = useState("");
  const [sIndus, setsIndus] = useState("");
  const [sType, setsType] = useState("");
  const [pindOptions, setpindOptions] = useState([...primaryIndustry]);
  const [sindOptions, setsindOptions] = useState([]);
  const dispatch = useDispatch();
  const handleCalculateIcbr = () => {
    dispatch(changeValueGst({ value: sectionScore, type: "pis" }));
    console.log("value dispatched for pis");
  };

  const handlePindusChange = (value) => {
    const temp = pindOptions.map((x) => x.value);
    var i = temp.indexOf(value);
    setsindOptions(pindOptions[i].secondary);
  };
  const handleSindusChange = (value) => {
    console.log(value);
    const temp = sindOptions.map((x) => x.value);
    var i = temp.indexOf(value);
    setsType(sindOptions[i].type);
    setsectionScore(sindOptions[i].ccScore);
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
                GST | PRIMARY INDUSTRY SCORE
              </Typography>
              <br />

              <Box sx={{ marginTop: "0px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <FormControl sx={{ m: 1, width: "100%" }}>
                      <InputLabel id="demo-multiple-name-label">
                        Primary Industry
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={pIndus}
                        onChange={(e) => {
                          setpIndus(e.target.value);
                          handlePindusChange(e.target.value);
                        }}
                        input={<OutlinedInput label="Name" />}
                        // MenuProps={MenuProps}
                      >
                        {pindOptions.map((name, i) => (
                          <MenuItem
                            key={name.value + Math.random()}
                            value={name.value}
                            // style={getStyles(name, personName, theme)}
                          >
                            {name.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl sx={{ m: 1, width: "100%" }}>
                      <InputLabel id="demo-multiple-name-label">
                        Secondary Industry
                      </InputLabel>
                      <Select
                        disabled={sindOptions.length > 0 ? false : true}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={sIndus}
                        onChange={(e) => {
                          setsIndus(e.target.value);
                          handleSindusChange(e.target.value);
                          handleCalculateIcbr();
                        }}
                        input={<OutlinedInput label="Name" />}
                        // MenuProps={MenuProps}
                      >
                        {sindOptions.map((name) => (
                          <MenuItem
                            key={name.value + Math.random()}
                            value={name.value}
                            // style={getStyles(name, personName, theme)}
                          >
                            {name.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl sx={{ m: 1, width: "100%" }}>
                      <TextField
                        disabled={true}
                        type={"text"}
                        placeholder="type"
                        sx={{ width: "100%" }}
                        name="text"
                        value={sType}
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
