function revealCartBody(arr, target) {
  console.log("reveal Cart");

  target.innerHTML = `<section class="cart-section" id="shopping-cart">
      <h2 class="section-title">Your Cart (${arr.length}) Items</h2>

      <div class="cart-container">
        <div class="cart-items-list" id="cart-items-list"></div>

      <aside class="cart-summary" id="cartSummarySection">
          
        </aside>   
      </div>
      

    </section>`;
}

export default revealCartBody;
