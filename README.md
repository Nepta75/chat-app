# Context :
  Chat Application with Nextjs and json-server<br />
  This application using the cache of Apollo for user system login.<br />
  The cache apollo is cleared after refresh a page so please don't refresh the page and just navigate with navbar.<br />
  the messages are not automicaly updated after send new message (for recipient  user). One Alternative could be to use socket.io to solve this problem.<br />

  **you can find all users account in db.json file**
***
## before start server application:

`cp .env .env.local` (**after copying, you need to edit .env file**)<br />
`yarn install`</br>
`yarn start-server`<br />
`yarn dev`</br>

## start server:
`yarn dev`

## build server for production:
`yarn build`