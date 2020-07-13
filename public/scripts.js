const currentPage = location.pathname;
const menuItens = document.querySelectorAll(".menu div a ");
const listPages = document.querySelectorAll(".pagination");

for (item of menuItens) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    };
};

for (selectedPagination of listPages) {
    if (currentPage.includes(selectedPagination.getAttribute(`href`))) {
        currentPage.classList.add("paginationActive");
    }
}

function selecao() {
    // let select = document.getElementById("ddSelect");
    // let values = document.getElementsByTagName("option");
    // console.log(select);
    // console.log(values);
    // for (value of values) {
    //     if (id. == 'professor') {
    //         console.log('PROFESSOR');
    //     } else {
    //         console.log("Aluno");
    //     }
    // }

// let displayText = select.options[select.selectIndex].text;
// document.getElementById('algum id').value=displayText;
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;
                
        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            
            if (oldPage && currentPage - oldPage > 2) {
                pages.push('...');
            };

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1);
            }

            pages.push(currentPage);

            oldPage = currentPage;
        }
    }

    return pages;
}

function createPagination(pagination) {    
    const filter = pagination.dataset.filter;
    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const pages = paginate(page, total);

    let elements = '';

    for (let page of pages) {
        if (String(page).includes('...')) {
            elements += `<span${page}">${page}</span>`;
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
            } else {
                elements += `<a href="?page=${page}">${page}</a>`;
            }
        }
    }

    pagination.innerHTML = elements;
}

const pagination = document.querySelector('.pagination');

if (pagination) {
    createPagination(pagination);
}

/*
=============================================================================
const listPages = document.querySelectorAll(".pagination");

for (selectedPagination of listPages) {
    if (currentPage.includes(selectedPagination.getAttribute(`href`))) {
currentPage.classList.add("paginationActive");
    }
}
*/
