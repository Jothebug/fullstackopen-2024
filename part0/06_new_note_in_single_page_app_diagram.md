## 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
     participant browser
     participant server

     browser->>server: [POST] https://studies.cs.helsinki.fi/exampleapp/new_note_spa
     activate server
     Note right of browser: The browser sends a payload (the user input) to the server. The "Content-type: application/json" header of the request tells the server that the payload is represented in JSON format.
     server-->>browser: status code 201 (Created)
     deactivate server
```
