export const getPaginationNumbers = (currentPage, totalPages) => {
    let pages = [];
    if (totalPages <= 4) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        let startPage = Math.max(currentPage - 1, 1);
        let endPage = startPage + 3;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - 3);  
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
    }
    return pages;
};
