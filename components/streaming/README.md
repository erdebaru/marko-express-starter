# Streaming Components

Components located inside this folder streams datas to the browser.
Typically component structures are built with below structure.

```javascript
  streaming/
    <component-name>
      renderer.js - Handles the stream rendering.
      template.marko - UI
```

Note: Streaming components are strictly server-side rendered. So be careful to only use in cases where it is not to be rendered on the client-side.
