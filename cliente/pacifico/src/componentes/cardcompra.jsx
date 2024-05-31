import React from "react";
import { useState } from "react";

function CardCompra(){
  const [estado,setEstado]=React.useState(true);

const funcionManejo=()=>{
  setEstado(!estado);
  if(estado===true){
    console.log("compra realizada");
  }
  else{
    console.log("compra cancelada");
  
  }
}
console.log("este es el estado"+estado);
    return(<div className="card w-96 bg-base-100 shadow-xl image-full">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">Shoes!</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" onClick={funcionManejo}>Buy Now</button>
      </div>
    </div>
  </div>);
}

export default CardCompra;