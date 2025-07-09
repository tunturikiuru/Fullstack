sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: 302 - uudelleenohjauspyyntö osoitteeseen /exampleapp/notes
    deactivate server

    Note left of server: palvelin käsittelee lähetetyn tiedon

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML-documentti
    deactivate server

    Note right of browser: HTML-dokumentissa ohjeet css- ja javascript-tiedoston hakemiseen
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: css-tiedosto
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript-tiedosto
    deactivate server

    Note right of browser: JavaScript-tiedosto ohjaa json-datan hakemiseen
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: json-sivun sisältö
    deactivate server    

    Note right of browser: JS-koodi liittää json-tiedot sivuun selaimessa