# meteo-citta-europee

Questa repository serve per creare una dashboard meteo che utilizza le API di Open-Meteo Forecast API per popolare il sito con città europee e relativi dati meteo con aggiunta di info sulle città.
Il progetto è un esempio di sito statico.
Il sito è disponibile su GIthub.


## Funzionalità

IL progetto espone queste funzionalità:

- sito statico con multipagina
- homepage che riassume il sito
- pagina meteo che mostra il meteo ricavato dalle API
- pagina città che mostra i dati relativi alle città previste dalle API con relative informazioni
- integra un design responsive per anche dispositivi mobili

## Tecnologie utilizzate

- HTML
- CSS & Bootstrap (per il design e la responsività)
- JavaScript (per fetchare i dati dalle API)
- API di Open-Meteo Forecast API per le previsioni meteo e per le informazioni sulle città

## Requisiti

- Un browser moderno
- Connessione internet (per Boostrap e fetchare api)
- API di Open-Meteo Forecast API per le previsioni meteo

## API remote utilizzate

- https://api.open-meteo.com/v1/forecast

## Struttura

Il progetto è organizzato in questo modo:

root_repo/
|__ index.html # homepage del sito
|__ meteo.html # pagina con il meteo delle città
|__ citta.html # pagina con informazioni sulle città e bandiere
|__ style.css # stile del sito
|__ script.js # script JavaScript per fetchare i dati
|__ script_cityinfo.js # script JavaScript per fetchare informazioni sulle città
|__ docs/ # cartella relativa a tutta la documentazione
|   |__ Installazione.md # guida all'installazione
|   |__ API.md # dettagli sulle API utilizzate
|   |__ faq.md # domande frequenti
|__ README.md # questo file di documentazione

## Documentazione

- [Guida all'installazione](docs/Installazione.md)
- [Dettagli sulle API](docs/API.md)
- [Domande frequenti](docs/faq.md)

## Autore
L'auotore di questa repository è Francesca Sassi

## Licenza

Il progetto utilizza questa Licenza:

Ho scelto questo tipo di Licenza perchè è una Licenza di software libero che non impone restrizioni sull'uso, permette la modifica e la redistribuzione verso gli altri utenti.

MIT License
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.