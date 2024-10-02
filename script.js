const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenu = document.getElementById('close-menu');




        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });


        //quantity button
        const qtyInput = document.getElementById('qty');
        const plusBtn = document.getElementById('plus');
        const minusBtn = document.getElementById('minus');

        // Increase quantity value
        plusBtn.addEventListener('click', () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        });

        // Decrease quantity value but not below 1
        minusBtn.addEventListener('click', () => {
            if (qtyInput.value > 0) {
                qtyInput.value = parseInt(qtyInput.value) - 1;
            }
        });


        //thumbnail
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImg = document.getElementById('displayed-image');


        thumbnails.forEach(thumbnail =>{
            thumbnail.addEventListener('click', () => {
                thumbnails.forEach( t => t.classList.remove('border-orange-500'));

                thumbnail.classList.add('border-orange-500');


                mainImg.style.opacity = '0';

                setTimeout(() =>{
                    mainImg.src = thumbnail.getAttribute('data-image');
                    mainImg.style.opacity = '1';
                }, 300);
            });
        });


        //mobile image slider

        const images = [
            'images/image-product-1.jpg',
            'images/image-product-2.jpg',
            'images/image-product-3.jpg',
            'images/image-product-4.jpg'
        ];
    
        let currentIndex = 0;
        const displayedImage = document.getElementById('displayed-image');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
    
        // Function to update the image
        function updateImage(index) {
            displayedImage.src = images[index];
        }
    
        // Next Button
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage(currentIndex);
        });
    
        // Previous Button
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage(currentIndex);
        });


        //lightbox

            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightbox-image');
            const closeLightbox = document.getElementById('close-lightbox');
            const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
            const lightboxNextBtn = document.getElementById('lightbox-next-btn');
            const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
        
            let currentImageIndex = 0;
        
            // Open lightbox 
            displayedImage.addEventListener('click', function () {
                if (window.innerWidth >= 640) { 
                    lightbox.classList.remove('hidden');
                    lightboxImage.src = displayedImage.src;
                }
            });
        
            // Close lightbox
            closeLightbox.addEventListener('click', function () {
                lightbox.classList.add('hidden');
            });
        
            // Update lightbox image
            function updateLightboxImage(index) {
                lightboxImage.src = images[index];
                currentImageIndex = index;
            }
        
          
            lightboxThumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', function () {
                    updateLightboxImage(index);
                });
            });
        
            lightboxNextBtn.addEventListener('click', function () {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightboxImage(currentImageIndex);
            });
        
            lightboxPrevBtn.addEventListener('click', function () {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightboxImage(currentImageIndex);
            });
        
        
            //cart

const cartBtn = document.getElementById("cart");
const cartContent = document.getElementById("cart-content");
const addToCartButton = document.getElementById("add-to-cart");
const cartItemsContainer = document.getElementById("cart-items");
const checkoutButton = document.getElementById("checkout");
const cartCount = document.getElementById("cart-count"); 

let totalItems = 0;

let cart = [];

cartBtn.addEventListener("click", () => {
    cartContent.classList.toggle("hidden");
});

// Add to cart functionality
addToCartButton.addEventListener("click", () => {
    const qty = parseInt(qtyInput.value);
    if (qty > 0) {
        addToCart(qty);
        qtyInput.value = 0;  
    } else {
        alert("Please select a quantity greater than 0.");
    }
});


// Function to add items to the cart
function addToCart(quantity) {
    const item = {
        name: "Fall Limited Edition Sneakers",
        price: 125.00,
        quantity: quantity,
        totalPrice: 125.00 * quantity,
        image: "images/image-product-1-thumbnail.jpg"
    };

    cart = [item]; 
    updateCartUI();
}

// Function to update the cart UI and badge
function updateCartUI() {
    cartItemsContainer.innerHTML = "";  
    totalItems = 0; 
    checkoutButton.classList.remove("hidden");

    if (cart.length > 0) {
        cart.forEach((item, index) => {
            totalItems += item.quantity;  
            
            // Update cart content
            const cartItemHTML = `
                <div class="flex items-center justify-between gap-2 px-2">
                    <img src="${item.image}" class="w-12 h-12 rounded-md" alt="${item.name}">
                    <div>
                        <p class="text-sm">${item.name}</p>
                        <p class="text-sm">$${item.price.toFixed(2)} x ${item.quantity} <span class="font-bold ">    $${item.totalPrice}</span> </p>
                    </div>
                    <button class="text-red-500" data-index="${index}" onclick="removeItem(${index})">
                        <img src="images/icon-delete.svg" alt="Remove">
                    </button>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });
    } else {
        cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
        checkoutButton.classList.add("hidden");
    }


    cartCount.textContent = totalItems > 0 ? totalItems : '';
    cartCount.classList.toggle("hidden", totalItems === 0);
}

// Function to remove an item from the cart
function removeItem(index) {
    cart[index].quantity--; 
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); 
    }
    updateCartUI(); 
}

