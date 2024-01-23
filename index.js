
// import relevant modules 

import express from "express" ;

import bodyParser from "body-parser" ;

// initialize application using express

const app = express () ;

// set the port

const port = 3000 ;

// configure application server 

app .listen (

	port ,

	() => {

		console .log ( `Server is running on http://localhost:${port}` ) ;

	}

) ;