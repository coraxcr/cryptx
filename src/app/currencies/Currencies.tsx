import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from "react-router-dom";
import './Currencies.css';
import { CurrencySummary, setPageNumber } from './CurrenciesSlide';
import CurrenciesHeader from './CurrenciesHeader';
import { RootState } from '../store/store'
import { formatCrypto } from '../utils'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

interface Column {
  id: 'name' | 'symbol' | 'market_cap' | 'price';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
  
const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'symbol', label: 'symbol', minWidth: 100 },
  { id: 'market_cap', label: 'market_cap', align : "right",  minWidth: 100, format: (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
  { id: 'price', label: 'price', align : "right", minWidth: 100, format: formatCrypto },
];

export default function Currencies() {

  const dispatch = useDispatch();
  const classes = useStyles();
  let history = useHistory();

  const {
    pageNumber,
    rowsPerPage,
    numberOfRows,
    isLoading, 
    isError,
    currencies
  } = useSelector((state: RootState) => state.currencies);


  const handleChangePage = (event: unknown, newPage: number) => {

      dispatch(setPageNumber(newPage));
  
  };

  function redirect(currencyId:number){

    history.push(`/currency/${currencyId}`);
  
  }

  return(
      <Paper className={`${classes.root} currrencies`}>
      <CurrenciesHeader></CurrenciesHeader>    
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: '100%'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && 
              <TableRow hover role="checkbox" tabIndex={-1} key={"loading"}>
                <TableCell colSpan={4} align="center">
                <CircularProgress />
                </TableCell>
              </TableRow>
            }
            {!isLoading && currencies.slice(pageNumber * rowsPerPage, pageNumber * rowsPerPage + rowsPerPage).map((currencySummary:CurrencySummary) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={currencySummary.name} onClick={() => redirect(currencySummary.id)}>
                  {columns.map((column) => {
                    const value = currencySummary[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {!isLoading && 
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component="div"
          count={numberOfRows}
          rowsPerPage={rowsPerPage}
          page={pageNumber}
          onChangePage={handleChangePage}
        />
      }
      <div>
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
      </Paper>
  )
}