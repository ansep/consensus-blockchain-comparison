Dump the content of the database to sql inside the container:

```bash
sqlite3 pbft.db .dump
```

Or to csv file

```bash
sqlite3 -header -csv /data/pbft.db "select * from pbft;" > /data/pbft_export.csv
```
