import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {setDirection, setField} from './CurrenciesSlide';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';



export default function CurrenciesHeader() {

    const direction :string = useSelector((state : any) => state.currencies.direction);
    const field :string = useSelector((state : any) => state.currencies.field);

    const dispatch = useDispatch();

    return( 
        <Grid container style={{ marginLeft: '1%', marginRight: '1%', width :'98%'}}>
                <Grid item xs={6}>
                <FormControl style={{ minWidth: '90%'}}
                >
                    <InputLabel id="direction-label">Direction</InputLabel>
                    <Select
                    labelId="direction-label"
                    id="direction-select"
                    value={direction}
                    onChange={(e) => dispatch(setDirection(e.target.value))}
                    >
                    <MenuItem value={"asc"}>Asc</MenuItem>
                    <MenuItem value={"desc"}>Desc</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl style={{ minWidth: '90%'}}>
                        <InputLabel id="field-label">Fiel</InputLabel>
                        <Select
                        labelId="field-label"
                        id="field-select"
                        value={field}
                        onChange={(e) => dispatch(setField(e.target.value))}
                        >
                        <MenuItem value={"name"}>name</MenuItem>
                        <MenuItem value={"symbol"}>symbol</MenuItem>
                        <MenuItem value={"market_cap"}>market cap</MenuItem>
                        <MenuItem value={"price"}>price</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
        </Grid>

        
    )
   
}