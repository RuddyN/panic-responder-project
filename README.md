# panic-responder-project

👋🏾 Welcome to the Panic Responder Project

You can find a quick [DEMO](https://drive.google.com/file/d/1y5bPhFYo4OWku4lyuFfTQV00hmdf3RxR/view?usp=sharing) here

This project consist of three parts

1. Backend: A `node.js` + `express.js` application to handle API requests
   listening at

   ```
   http://localhost:3000
   ```

2. Frontend: A `react` + `vite` application as a back office application for alert management

   ```
   http://localhost:5173/
   ```

3. Mobile: A `expo` + `react-native` application to simulate the partner app that will use our API
   ```
   http://localhost:8081
   ```

## How to run all three applications

Ensure the node version is

```
  node version >= 24
```

To install all application

```
// in directory ./panic-responder-project

yarn install-all
```

To start all the applications

```
// in directory ./panic-responder-project

yarn run-all
```
