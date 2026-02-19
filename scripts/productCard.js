function makeProductCard(obj, target) {
  const article = document.createElement("article");
  article.classList.add("product-card");

  const imageBox = document.createElement("div");
  imageBox.classList.add("card-image-box");

  const img = document.createElement("img");
  img.src = obj.image.imageURL;
  img.alt = obj.image.imageAlt;
  img.loading = "lazy";

  const badge = document.createElement("span");
  badge.classList.add("category-badge");
  badge.textContent = obj.categoryBadge;

  imageBox.appendChild(img);
  imageBox.appendChild(badge);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  const metaRow = document.createElement("div");
  metaRow.classList.add("meta-row");

  const category = document.createElement("span");
  category.classList.add("product-category");
  category.innerHTML = obj.category;

  const price = document.createElement("span");
  price.classList.add("price-tag");
  price.textContent = obj.priceCurrency + obj.price;

  metaRow.appendChild(category);
  metaRow.appendChild(price);

  const title = document.createElement("h2");
  title.classList.add("product-title");
  title.textContent = obj.title;

  const description = document.createElement("p");
  description.classList.add("product-description");
  description.textContent = obj.description;

  const button = document.createElement("button");
  button.classList.add("add-to-cart-btn");
  button.onclick = () => addToCart(obj);

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-cart-plus");

  button.appendChild(icon);
  button.append(" Add to Cart");

  cardInfo.appendChild(metaRow);
  cardInfo.appendChild(title);
  cardInfo.appendChild(description);
  cardInfo.appendChild(button);

  article.appendChild(imageBox);
  article.appendChild(cardInfo);

  target.appendChild(article);
}

export default makeProductCard;
