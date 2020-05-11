import React, {useEffect, }  from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { RootState } from '../cryptx-redux/store'
import { Currency as CurrencyEntity, CurrencyState, fetchCurrency} from './CurrencySlide';


export default function Currency(props : { id : number}) {

    const {
        isLoading,
        isError,
        errorMessage,
        currency,
    } = useSelector((state: RootState) : CurrencyState => state.currency);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchCurrency(props.id))
    }, [dispatch]);
    
    return( 
        <div>
            <Grid container spacing={1}>
                {isLoading &&
                    <Grid item xs={12}>
                        <LinearProgress variant="query" />
                    </Grid>
                }
                {currency &&
                    <Grid item xs={12}>
                        <div>{currency.id}</div>
                        <div>{currency.name}</div>
                        <div>{currency.name}</div>
                        <div>{isLoading}</div>
                        kndsfknbdfskjdfskjdfsjdfsnjdfskjdfskjdfskjdfsdfskjdfs
                        <Paper>{currency.name}</Paper>
                    </Grid>
                }
            </Grid>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={isError}
                autoHideDuration={6000}
                message={`Something was wrong!`}
            />
        </div>
    )
}