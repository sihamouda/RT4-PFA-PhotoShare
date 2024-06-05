import React from 'react';

const Checkout:React.FC = () => {
  return (
    <>
       <main className="container mt-5 flex-grow-1">  {/* flex-grow-1 expands content */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>Checkout</h2>
            <p>Abstract painting</p>
            <img src="image5.jpg" alt="Product image" className="img-fluid w-10 h-10 mb-3" /> {/* Add styling classes */}
            <p>Size: 11 x 14 inches.</p>
            <hr />
            <form>
              <div className="form-group">
                <input type="text" className="form-control" id="nameOnCard" placeholder="Enter name on card" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="cardNumber" placeholder="Enter card number" />
              </div>
              <div className="form-row">
                <div className="col">
                  <input type="text" className="form-control" id="expirationMonth" placeholder="MM/YY" />
                </div>
                <div className="col">
                  <input type="text" className="form-control" id="cvv" placeholder="CVV" />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-primary mt-3">Buy for $25</button>
              </div>
              </form>
          </div>
        </div>
      </main>
    </>
  )
}
export default Checkout;