import React, { FC, useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
//@ts-ignore
import * as Finnhub from 'finnhub';
import { Console } from 'console';

interface IStocks {
  stocks: string[];
}

type TypeQuotes = {
  item: string;
  c: string;
  d: string;
  dp: string;
  h: string;
  l: string;
  o: string;
  pc: string;
};

const Stocks: FC<IStocks> = ({ stocks = [] }) => {
  const API_KEY = 'c9fj7jqad3iampagitu0';
  // const quotes: any[] = [];
  const [quotes, setQuotes] = useState<TypeQuotes[]>([]);

  const api_key = Finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = API_KEY;
  const finnhubClient = new Finnhub.DefaultApi();

  useEffect(() => {
    stocks.map((item) => {
      finnhubClient.quote(item, (error: any, data: any, response: any) => {
        console.log(data);
        setQuotes((oldArray: any) => [
          ...oldArray,
          {
            item: item,
            c: data?.c,
            d: data?.d,
            dp: data?.dp,
            h: data?.dh,
            l: data?.l,
            o: data?.o,
            pc: data?.pc,
          },
        ]);
      });
    });
  }, [stocks]);

  console.log(quotes);

  return (
    <div className={styles.stocks_container}>
      {quotes.map((item: any, index) => {
        return (
          <div key={index} className={styles.card_stock}>
            <text className={styles.title}>{item.item}</text>
            <text className={styles.quotes}>Current price: {item.c}</text>
            <text className={styles.quotes}>Change: {item.d}</text>
            <text className={styles.quotes}>Percent change: {item.dp}</text>
            <text className={styles.quotes}>
              High price of the day: {item.h}
            </text>
            <text className={styles.quotes}>
              Low price of the day: {item.l}
            </text>
            <text className={styles.quotes}>
              Open price of the day: {item.o}
            </text>
            <text className={styles.quotes}>
              Previous close price: {item.pc}
            </text>
          </div>
        );
      })}
    </div>
  );
};

export default Stocks;
