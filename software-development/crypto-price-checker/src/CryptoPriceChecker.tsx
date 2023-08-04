import React, { useState } from 'react';
import { useGetCryptoPriceQuery } from './API/cryptoAPI';
import { TextField, Button, makeStyles, Grid, Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(3),
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
  },
  form: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  resultContainer: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: theme.spacing(2),
  },
  priceHighlight: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
}));

export const CryptoPriceChecker = () => {
  const classes = useStyles();
  const [currency, setCurrency] = useState('bitcoin');
  const [transactionDate, setTransactionDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [transactionPrice, setTransactionPrice] = useState('');
  const [comparison, setComparison] = useState(0);
  const [showPrice, setShowPrice] = useState(false);

  const { data = {}, isFetching } = useGetCryptoPriceQuery(currency);

  const calculateComparison = () => {
    if (data[currency]) {
      const quantityValue = parseFloat(quantity);
      const transactionPriceValue = parseFloat(transactionPrice);
      setComparison((data[currency]?.usd - transactionPriceValue) * quantityValue);
      setShowPrice(true);
    }
  };

  const handleCheckPrice = () => {
    calculateComparison();
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Crypto Price Checker
      </Typography>

      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Crypto currency"
              fullWidth
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheckPrice}
            >
              Check price
            </Button>
          </Grid>
        </Grid>
      </form>

      {isFetching ? (
        <div className={classes.loader}>
          <CircularProgress size={20} />
        </div>
      ) : (
        showPrice && data[currency] && (
          <div className={classes.resultContainer}>
            <Typography variant="h6" component="p">
              {currency} price is{' '}
              <span className={classes.priceHighlight}>${data[currency]?.usd}</span>
            </Typography>
            <br />
            <TextField
              label="Transaction Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
            />
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              inputProps={{ min: '0' }}
            />
            <TextField
              label="Transaction Price"
              type="number"
              fullWidth
              value={transactionPrice}
              onChange={(e) => setTransactionPrice(e.target.value)}
              inputProps={{ min: '0' }}
            />
            <Typography variant="body1" component="p">
              Comparison: ${comparison.toFixed(2)}
            </Typography>
          </div>
        )
      )}
    </div>
  );
};
