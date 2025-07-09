sequenceDiagram
    participant browser
    participant server

    Note right of browser: JS-koodin luoma tapahtumakäsittelijä estää lomakkeen normaalin lähetyksen

    Note right of browser: tapahtumakäsittelijä käsittelee tiedon ja lähettää sen palvelimelle

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 created - muistiinpanon luonti onnistui
    deactivate server

    Note right of browser: tapahtumakäsittelijä päivittää käyttäjän sivun lomakkeen datalla
