// variaveis para manipular o título da lista
const inputTitle = document.querySelector('[data-input="input-title"]');
const btnCheckTitle = document.querySelector('.btn-check-title');
const btnEdit = document.querySelector('.btn-edit');
const h1Header = document.querySelector('.header-title');
const containerInputTitle = document.querySelector('.container-input-title');
const h1HeaderContent = document.querySelector('.h1-header-content');

// variaveis para manipular a inserção de tarefas
const inputTask = document.querySelector('[data-task="input-task"]');
const btnAddNewTask = document.querySelector('[data-task="add-new-task"]');
const containerTaskList = document.querySelector('.container-task-list');

// remove o input que adiciona um novo título
const inputTitleNone = function () {
    const containerInput = document.querySelector('.container-input');
    const containerInputTask = document.querySelector('.container-input-task');
    containerInputTitle.classList.add('hide');
    containerInput.classList.add('container-input-title-hide');
    containerInputTask.classList.add('container-task-input-title-hide');
    btnEdit.classList.remove('hide');
};

// pega o texto do input
const getInputText = function (input, target) {
    let inputElementValue = input.value.trim();
    if (input.hasAttribute('data-input')) {
        inputTitleNone();
    }
    target.innerText = inputElementValue;   
};

// edita o conteudo do elemento
const editTextContent = function (currentElement, currentBtn, placeholder, deletElement) {
    currentElement.contentEditable = true;
    currentElement.classList.add('border-bottom')
    currentElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    currentElement.addEventListener('blur', function(){
        currentBtn.children[0].classList.replace('fa-check', 'fa-pen-to-square');
        sendTextContent(currentElement, placeholder, deletElement)
    })
};

// atualiza o conteudo do elemento
const sendTextContent = function (currentElement, placeholder, deletElement) {
    const trimmedText = currentElement.innerText.trim();
    if (trimmedText === '') {
        if(deletElement !== null){
            deleteTask(deletElement)
        }else{
            currentElement.textContent = placeholder
        }
    }
    currentElement.contentEditable = false;
    currentElement.classList.remove('border-bottom'); 
};

// verifica se o elemento está sendo editado
const editing = function (currentBtn, currentElement, placeholder, deletElement) {
    const isEditing = currentBtn.children[0].classList.contains('fa-pen-to-square');
    if (isEditing) {
        currentBtn.children[0].classList.replace('fa-pen-to-square', 'fa-check');
        editTextContent(currentElement, currentBtn, placeholder, deletElement);
    } else {
        currentBtn.children[0].classList.replace('fa-check', 'fa-pen-to-square');
        sendTextContent(currentElement, placeholder, deletElement);
    }
};

// botões reponsaveis por fazer a manipulação do título da lista
btnCheckTitle.addEventListener('click', function () {
    if(inputTitle.value.trim() !== ''){
        getInputText(inputTitle, h1Header);
    }
});

btnEdit.addEventListener('click', function () {
    editing(this, h1Header, 'Lista de Tarefas', null);
});

// função para marcar a tarfefa como concluida
const check = function (checkBtn) {
    checkBtn.classList.toggle('active');
    if (checkBtn.classList.contains('active')) {
        checkBtn.nextElementSibling.children[0].classList.add('line-through');
    } else {
        checkBtn.nextElementSibling.children[0].classList.remove('line-through')
    }
};

// função para deletar o item da lista
const deleteTask = function (deleteItem) {
    deleteItem.innerHTML = '';
    deleteItem.remove()
}

// função para criar um novo item da lista
const createTask = function () {
    const divListItem = document.createElement('div');
    divListItem.classList.add('list-item');
    containerTaskList.appendChild(divListItem);

    const divCheckBox = document.createElement('div');
    divCheckBox.classList.add('checkBox');
    divListItem.appendChild(divCheckBox)

    const divListContent = document.createElement('div')
    divListContent.classList.add('list-content')
    divListItem.appendChild(divListContent);

    const spanTaskContent = document.createElement('span');
    spanTaskContent.classList.add('task-content');
    divListContent.appendChild(spanTaskContent);

    const btnEditContent = document.createElement('button');
    btnEditContent.classList.add('edit-content');
    divListItem.appendChild(btnEditContent)

    const iconEdit = document.createElement('i');
    iconEdit.classList.add('fa-solid', 'fa-pen-to-square');
    btnEditContent.appendChild(iconEdit);

    const btnDeleteContent = document.createElement('button');
    btnDeleteContent.classList.add('delete-content');
    divListItem.appendChild(btnDeleteContent)

    const iconDelete = document.createElement('i');
    iconDelete.classList.add('fa-solid', 'fa-xmark');
    btnDeleteContent.appendChild(iconDelete);

    getInputText(inputTask, spanTaskContent, inputTask.value)
    inputTask.value = ''

    // botão responsavel por marcar a tarefa como concluida
    divCheckBox.addEventListener('click', function () {
        if (!this.nextElementSibling.children[0].classList.contains('border-bottom')) {
            check(this)
        }
    })

    // botão responsavel por editar um item da lista
    btnEditContent.addEventListener('click', function () {
        if (!divCheckBox.classList.contains('active')) {
            editing(this, spanTaskContent, divListItem);
        }
    })

    // botão resonsavel por deletar um item da lista
    btnDeleteContent.addEventListener('click', function () {
        deleteTask(divListItem);
    })
}

// botão responsavel por criar um item da lista
btnAddNewTask.addEventListener('click', function () {
    const inputElementValue = inputTask.value.trim()
    if (inputElementValue != '') {
        createTask()
    }
})

