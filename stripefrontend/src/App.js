import './App.css';
import StripeCheckout from "react-stripe-checkout";
import { useState } from 'react';
import stripe from "./stripe.png"

function App() {

  const[product , setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook"
  })

  const makePayment = token =>{
    const body = {
      token,
      product,
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch(`http://localhost:8080/payment`,{
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response =>{
      console.log("RESPONSE", response)
      const {status} = response;
      console.log("STATUS",status);
    })
    .catch(err => console.log(err) )

  }

  return (
    <div className="App">
      <header className="App-header">

        <img src={stripe} className="stripelogo" />
       
        <StripeCheckout 
          stripeKey={"pk_test_51MkJydSCFtjirD0jDCdv1Tmm86jgfzhR943o9NnIi8SfVdHKaDxZDWrFSrG25X50pmGK8DXAhRwhQejhAaGUbkTX00a0s6V0xR"}
          token={makePayment}
          name='Buy React'
          amount={product.price * 100}

        >
          <button className='btn-large pink' >Buy React in just ${product.price} </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
