document.addEventListener("DOMContentLoaded", () => {
  const products = {
    1: { name: "Нежный пион", price: "175 BYN", img: "assets/IMG_0664.JPG", desc: "Объемный авторский букет из отборных розовых пионов. Каждая композиция собирается флористом индивидуально перед отправкой." },
    2: { name: "Голубая гортензия", price: "190 BYN", img: "assets/IMG_0665.JPG", desc: "Пышный монобукет из свежих голубых гортензий премиального качества в дизайнерской упаковке." },
    3: { name: "Светлая лилия", price: "125 BYN", img: "assets/IMG_0666.JPG", desc: "Изысканная композиция из белых и розовых лилий с тонким ненавязчивым ароматом." },
    4: { name: "Солнечная роза", price: "150 BYN", img: "assets/IMG_0667.JPG", desc: "Яркий и жизнерадостный большой букет отборных желтых роз с поздравительной открыткой." }
  };

  window.switchScreen = function(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
    window.scrollTo(0, 0);
  };

  window.openProduct = function(id) {
    const prod = products[id];
    if (!prod) return;

    document.getElementById("prod-img").src = prod.img;
    document.getElementById("prod-title").innerText = prod.name;
    document.getElementById("prod-price").innerText = prod.price;
    document.getElementById("prod-desc").innerText = prod.desc;

    window.currentProduct = prod;
    switchScreen('screen-product');
  };

  window.addToCart = function() {
    if (!window.currentProduct) window.currentProduct = products[1];
    const p = window.currentProduct;

    document.getElementById("cart-item-container").innerHTML = `
      <div style="display: flex; gap: 15px; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 15px; margin-bottom: 15px;">
        <img src="${p.img}" style="width: 70px; height: 70px; border-radius: 10px; object-fit: cover;">
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 15px;">${p.name}</div>
          <div style="color: var(--accent-dark); font-weight: bold; font-size: 14px; margin-top: 4px;">${p.price}</div>
        </div>
      </div>
    `;

    const numericPrice = parseInt(p.price);
    const total = numericPrice + 15;
    document.getElementById("cart-total").innerText = total + " BYN";
    document.getElementById("cart-final-price").innerText = total + " BYN";

    switchScreen('screen-cart');
  };

  const filterCheckboxes = document.querySelectorAll(".filter-checkbox");
  const productCards = document.querySelectorAll(".product-card");

  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const selected = Array.from(filterCheckboxes).filter(i => i.checked).map(i => i.value);
      productCards.forEach(card => {
        const cat = card.getAttribute("data-category");
        if (selected.length === 0 || selected.includes(cat)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobileDropdown');
    if (menu) {
      menu.classList.toggle('active');
    }
  };

  for (let i = 1; i <= 6; i++) {
    const toggleBtn = document.getElementById(`mobileMenuToggle${i}`);
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleMobileMenu);
    }
  }
});