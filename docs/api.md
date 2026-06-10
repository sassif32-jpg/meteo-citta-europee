# API utilizzate

Il progetto utilizza le API di Open-Meteo Forecast API per ottenere dati meteo da mostrare nella pagina.

-  https://api.open-meteo.com/v1/forecast

## Dettagli API

**Meteo**

- Temperatura attuale: fornisce le condizioni meteorologiche in tempo reale per le città indicate con temperatura in °C
- Velocità del vento: fornisce la velocità del vento in tempo reale in Km/h
- Codice meteo: serve a standardizzare e rendere comprensibili le previsioni dettagliate o le situazioni di allerta


**Città**

- Le città europee selezionate sono: Madrid, Dublino, Parigi e Firenze
- La pagina fornisce informazioni generali su la nazione di riferimento e la bandiera corrispondente

## Note

- Le API di Open-Meteo sono gratuite per uso non commerciale
- I dati si aggiornano ogni ora circa
- Per dati storici è disponibile l'endpoint separato: https://archive-api.open-meteo.com/v1/archive