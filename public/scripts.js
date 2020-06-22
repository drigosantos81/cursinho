const currentPage = location.pathname;
const menuItens = document.querySelectorAll(".menu div a ");

for (item of menuItens) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    };
};

// let select = document.getElementById("ddSelect");
// let displayText = select.options[select.selectIndex].text;
// document.getElementById('algum id').value=displayText;