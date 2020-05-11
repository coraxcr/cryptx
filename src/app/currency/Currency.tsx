import React, {useEffect, }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import {  makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { RootState } from '../store/store'
import { CurrencyState, fetchCurrency} from './CurrencySlide';
import { formatCrypto } from '../utils'


const useCurrencyStyles = makeStyles((theme: Theme) => createStyles({
    info: {
      color: theme.palette.info.main,
    },
}));


export default function Currency(props : { id : number}) {
    
    const theme = useCurrencyStyles();
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrency(props.id))
    }, [dispatch]);

    const {
        isLoading,
        isError,
        currency,
    } = useSelector((state: RootState) : CurrencyState => state.currency);

    return( 
        <div className="currency">
            <Grid container spacing={1}>
                {isLoading &&
                    <Grid item xs={12}>
                        <LinearProgress variant="query" />
                    </Grid>
                }
                {currency &&
                    <Grid item xs={12} >
                        <TableContainer component={Paper}>
                            <Table aria-label="spanning table" text-align="left">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={4}>
                                        <span><b>{currency.name} ({currency.symbol})</b> id: {currency.id},  {currency.is_active ? "active": "not active"} and {currency.is_fiat ? "fiat": "not fiat"} currency</span>
                                    </TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow> 
                                        <TableCell colSpan={1}><b>Suppply</b></TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Circulating:</span> {formatCrypto(currency.circulating_supply)}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Total: </span>  {formatCrypto(currency.total_supply)}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Max: </span> {currency.max_supply}</TableCell>
                                    </TableRow>
                                    <TableRow> 
                                        <TableCell colSpan={1}><span className={theme.info}>Added on: </span> {moment(currency.date_added).format("MMM Do YY")}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Updated on: </span>  {moment(currency.last_updated).format("MMM Do YY")}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Market pairs: </span> {currency.num_market_pairs}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>CMC rank: </span> {currency.cmc_rank}</TableCell>
                                    </TableRow>
                                    <TableRow> 
                                        {currency.tags.length != 0 &&
                                        <TableCell colSpan={4}><span className={theme.info}>Tags:</span>  {currency.tags.map((tag,i) => (<span key={i}>{tag}</span>))}</TableCell>
                                        }
                                    </TableRow>
                                    {currency.platform 
                                    &&
                                    <TableRow> 
                                        <TableCell align="center" colSpan={4}><b>Platform:</b> {currency.platform.name}</TableCell>
                                    </TableRow>
                                    }
                                    {currency.platform 
                                    &&
                                    <TableRow> 
                                        <TableCell colSpan={1}><span className={theme.info}>Id: </span> {currency.platform.id}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Slug:</span>  {currency.platform.slug}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Symbol: </span>  {currency.platform.symbol}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Address: </span>  {currency.platform.token_address}</TableCell>
                                    </TableRow>
                                    }
                                    <TableRow> 
                                        <TableCell colSpan={4} align="center"><b>Quote USD</b></TableCell>
                                    </TableRow>
                                    <TableRow> 
                                        <TableCell colSpan={1}><span className={theme.info}>Price: </span> {formatCrypto(currency.quote.USD.price)}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Market Cap: </span>  <span className={theme.info}></span> {formatCrypto(currency.quote.USD.market_cap)}</TableCell>
                                        <TableCell colSpan={2}><span className={theme.info}>Last updated:  </span> <span className={theme.info}></span> {moment(currency.quote.USD.last_updated).format("MMM Do YY")}</TableCell>
                                    </TableRow>
                                    <TableRow> 
                                        <TableCell colSpan={1}><span className={theme.info}>Volume 24h: </span> {currency.quote.USD.volume_24h}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Percent change 1h:</span>  {currency.quote.USD.percent_change_1h}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Percent change 24h:</span>  {currency.quote.USD.percent_change_24h}</TableCell>
                                        <TableCell colSpan={1}><span className={theme.info}>Percent change 7d:</span>  {currency.quote.USD.percent_change_7d}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
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