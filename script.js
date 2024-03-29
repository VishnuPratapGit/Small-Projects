const cart = document.getElementById("cart");
const cartNumber = document.getElementById("count").querySelector("span");
const items = document.getElementById("items");
const citems = document.getElementById("cartItems");
const clearStorage = document.getElementById("clearStorage");

const data = [
    { name: "apple", pieces: 23 },
    { name: "banana", pieces: 12 },
    { name: "pears", pieces: 10 },
    { name: "oranges", pieces: 30 },
    { name: "apple", pieces: 23 },
    { name: "banana", pieces: 12 },
    { name: "grapes", pieces: 10 },
    { name: "oranges", pieces: 30 },
    { name: "blueberries", pieces: 30 },
];

//group all data in unique objects
const uniqueData = (dataArr) => {
    const counts = {};
    dataArr.forEach((element) => {
        const key = element.name;
        if (counts[key]) {
            counts[key].pieces += element.pieces;
        } else {
            counts[key] = element;
        }
    });
    return counts;
}

const newData = Object.values(uniqueData(data));

function createFruitElement(item) {
    const element = document.createElement("div");
    element.className = "fruits";
    element.id = item.name;
    element.innerHTML = `<h3>${item.name} = ${item.pieces}</h3>`;
    return element;
}

let cartArray = [];

newData.forEach((item, index) => {
    const element = createFruitElement(item);
    const button = document.createElement("button");
    button.className = "addButton";
    button.innerHTML = "Add To Cart";
    button.addEventListener("click", () => {
        cartArray.push(item);
        cartArray = Object.values(uniqueData(cartArray));
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
        if (!citems.querySelector(`#${item.name}`)) {
            const cartElement = createFruitElement(item);
            citems.appendChild(cartElement);
            cartNumber.innerHTML = cartArray.length;
        } else {
            const prevElement = citems.querySelector(`#${item.name}`);
            prevElement.remove();
            const cartElement = createFruitElement(item);
            citems.appendChild(cartElement);
            cartNumber.innerHTML = cartArray.length;
        }
    });
    items.appendChild(element);
    element.append(button);
});

cart.addEventListener("click", (e) => {
    if (citems.style.opacity == 0) {
        citems.style.display = "flex";
        setTimeout(() => {
            citems.style.opacity = 1;
        }, 100);
    } else {
        citems.style.opacity = 0;
        setTimeout(() => {
            citems.style.display = "none";
        }, 100);
    }
});

window.addEventListener("load", () => {
    const loacalStorageData = localStorage.getItem("cartArray");
    if (loacalStorageData != null) {
        cartArray = JSON.parse(loacalStorageData);
    }
    cartArray.forEach((item) => {
        cartElement = createFruitElement(item);
        citems.appendChild(cartElement);
        cartNumber.innerHTML = cartArray.length;
    });
});

clearStorage.onclick = function () {
    localStorage.clear();
    window.location.reload();
};

