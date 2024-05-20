import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectAutoWidth({ selectCountry, setSelectCountry }) {
  function handleChange(event) {
    setSelectCountry(event.target.value);
  }

  return (
    <div>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Pays</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectCountry}
          onChange={handleChange}
          autoWidth
          label="Pays"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"DZ"}>Algeria</MenuItem>
          <MenuItem value={"TN"}>Tunisia</MenuItem>
          <MenuItem value={"ES"}>Spain</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
