document.addEventListener('DOMContentLoaded', () => {
    
    // Завдання № 1 -----------------------------------------------------------------
    document.addEventListener('keydown', function(e){
        if (e.code == 'KeyE' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            let divElement = document.querySelector('.div-text');
            let divText = divElement.textContent;
            divElement.outerHTML = `<textarea>${divText}</textarea>`;
        } 
        if (e.code == 'KeyS' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            let textareaElement = document.querySelector('textarea');
            let tetextareaElementText = textareaElement.value;
            console.log(tetextareaElementText);
            textareaElement.outerHTML = `<div>${tetextareaElementText}</div>`;
        }
    });


    // Завдання № 2 -----------------------------------------------------------------
    const TABLE = document.querySelector('.table'),
        HEADERS = TABLE.querySelectorAll('th'),
        TABLE_BODY = TABLE.querySelector('tbody'),
        ROWS = TABLE_BODY.querySelectorAll('tr');
    // Направление сортировки
    const directions = Array.from(HEADERS).map(function(header) {
        return '';
    });
    // Преобразовать содержимое данной ячейки в заданном столбце
    const transform = function(index, content) {
        // Получить тип данных столбца
        const TYPE = HEADERS[index].getAttribute('data-type');
        switch (TYPE) {
            case 'number':
                return parseFloat(content);
            case 'string':
            default:
                return content
        }
    };
    const sortColumn = function(index) {
        // Получить текущее направление
        const direction = directions[index] || 'asc';
        // Фактор по направлению
        const multiplier = (direction === 'asc') ? 1 : -1;
        const newRows = Array.from(ROWS);
        newRows.sort(function(rowA, rowB) {
            const cellA = rowA.querySelectorAll('td')[index].innerHTML;
            const cellB = rowB.querySelectorAll('td')[index].innerHTML;
            const a = transform(index, cellA);
            const b = transform(index, cellB);    
            switch (true) {
                case a > b: return 1 * multiplier;
                case a < b: return -1 * multiplier;
                case a === b: return 0;
            }
        });
        // Удалить старые строки
        [].forEach.call(ROWS, function(row) {
            TABLE_BODY.removeChild(row);
        });
        // Поменять направление
        directions[index] = direction === 'asc' ? 'desc' : 'asc';
        // Добавить новую строку
        newRows.forEach(function(newRow) {
            TABLE_BODY.appendChild(newRow);
        });
    };
    // Обойти циклом все заголовки
    [].forEach.call(HEADERS, function(header, index) {
        header.addEventListener('click', function() {
            sortColumn(index);
        });
    });


    // Завдання № 3 -----------------------------------------------------------------
    const BLOCK = document.querySelector('.block');
    const SPAN = BLOCK.querySelector('.span');
    SPAN.addEventListener('mousedown', resizingBlock);
    function resizingBlock () {
        document.addEventListener('mousemove', changeSize);
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', changeSize);
        });
        function changeSize(event) {
            BLOCK.style.width = `${event.pageX + BLOCK.offsetLeft}px`;
            BLOCK.style.height = `${event.pageY - BLOCK.offsetTop}px`;
        };
    };

});