const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7VGzNu38TR_Xi0W6gaqQl14lGHFXZasZxGwafnVACpJRp6mBADGAzwwFWeyGnZW7CDg/exec";
const MY_PHONE = "2349039325964";

async function loadProducts() {
    const dynamicGrid = document.querySelector('#dynamic-items');
    
    try {
        // Fetch fresh data from Google
        const response = await fetch(SCRIPT_URL + "?t=" + new Date().getTime());
        const products = await response.json();
        
        let html = ""; 

        products.forEach((item, index) => {
            // We skip the first 2 items from the sheet if you've already put them in the HTML
            // Or just load them all—it won't hurt!
            if(item.name) {
                html += `
                <div class="item-card">
                    <div class="badge">${item.badge}</div>
                    <img src="${item.image}" alt="${item.name}">
                    <div class="info">
                        <h3>${item.name.toUpperCase()}</h3>
                        <p class="price">₦${Number(item.price). toLocalString()}</p>
                        <button onclick="sendToWhatsApp('${item.name}', '${item.price}')">Order on WhatsApp</button>
                    </div>
                </div>`;
            }
        });
       // This injects the new items BELOW your instant items
        dynamicGrid.innerHTML = html;

    } catch (error) {
        console.error("Vault Connection Error:", error);
    }
}

function sendToWhatsApp(name, price) {
    const message = `Hello Candice Clothing! 🛍️\n\nI want to order:\nItem: ${name}\nPrice: ₦${price}\n\nIs this available?`;
    window.open(`https://wa.me/${MY_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
}

function generalChat() {
    const message = encodeURIComponent("Hello Candice! I'm browsing your vault and have a question.");
    window.open(`https://wa.me/${MY_PHONE}?text=${message}`, '_blank');
}

// Initial load when the page opens
loadProducts();
