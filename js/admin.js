const modulesGrid = document.getElementById('modulesAdminGrid');
const editForm = document.getElementById('editModuleForm');
const createBtn = document.getElementById('createModuleBtn');
const changeLangBtn = document.getElementById('changeLangBtn');
const saveBtn = document.getElementById('saveBtn');
const deleteBtn = document.getElementById('deleteModuleBtn');
const cancelBtn = document.getElementById('cancelBtn');
const langSelect = document.getElementById('lang-select');
const langSelectorWrapper = document.getElementById('langSelectorWrapper');
const contentWrapper = document.getElementById('contentWrapper');
const langDisplay = document.getElementById('langDisplay');
const moduleTypeSelect = document.getElementById('moduleType');
let coursesData = {};
let currentLang = '';
let sortableInstance = null;
let hasUnsavedChanges = false;

const langMap = {
  en: 'Inglés',
  fr: 'Francés'
};

async function loadCourses() {
    const enCourse = await fetch('course_en.json').then(res => res.json());
    const frCourse = await fetch('course_fr.json').then(res => res.json());
    coursesData.en = enCourse;
    coursesData.fr = frCourse;
    setupInitialView();
}

function setupInitialView() {
    langSelectorWrapper.style.display = 'flex';
    contentWrapper.style.display = 'none';
    editForm.style.display = 'none';
    if (sortableInstance) {
        sortableInstance.destroy();
        sortableInstance = null;
    }
    hasUnsavedChanges = false;
}

function renderModules(modules) {
    modulesGrid.innerHTML = '';
    modules.forEach(mod => {
        const card = document.createElement('div');
        card.className = 'module-card';
        card.dataset.id = mod.id;
        card.innerHTML = `
            ${mod.thumbnail ? `<img src="${mod.thumbnail}" alt="Thumbnail">` : ''}
            <h3>${mod.name}</h3>
            <div class="module-details">
                <p><strong>ID:</strong> ${mod.id}</p>
                <p><strong>Tipo:</strong> ${mod.type}</p>
            </div>
            <div class="module-actions">
                <button class="btn-edit" data-id="${mod.id}">⚙️</button>
            </div>
        `;
        modulesGrid.appendChild(card);
    });

    if (sortableInstance) {
        sortableInstance.destroy();
    }

    sortableInstance = Sortable.create(modulesGrid, {
        draggable: '.module-card',
        onEnd: function (evt) {
            const oldIndex = evt.oldIndex;
            const newIndex = evt.newIndex;
            if (oldIndex !== newIndex) {
                const modules = [...coursesData[currentLang].modules];
                const movedModule = modules.splice(oldIndex, 1)[0];
                modules.splice(newIndex, 0, movedModule);
                coursesData[currentLang].modules = modules;
                hasUnsavedChanges = true;
            }
        }
    });
}

function showEditForm(module = {}) {
    editForm.style.display = 'block';
    createBtn.style.display = 'none';
    changeLangBtn.style.display = 'none';
    saveBtn.style.display = 'none';
    modulesGrid.classList.add('grid-disabled');

    document.getElementById('moduleId').value = '';
    document.getElementById('moduleName').value = '';
    moduleTypeSelect.value = 'video';
    document.getElementById('moduleThumbnail').value = '';
    document.getElementById('specificFields').innerHTML = '';

    if (Object.keys(module).length !== 0) {
        document.getElementById('moduleId').value = module.id;
        document.getElementById('moduleName').value = module.name;
        moduleTypeSelect.value = module.type;
        moduleTypeSelect.setAttribute('disabled', true);
        moduleTypeSelect.setAttribute('title', 'No puedes modificar el tipo. Si quieres hacerlo, crea un nuevo módulo.');
        document.getElementById('moduleThumbnail').value = module.thumbnail;
        document.getElementById('moduleId').setAttribute('readonly', true);
        deleteBtn.style.display = 'inline-block';
    } else {
        document.getElementById('moduleId').removeAttribute('readonly');
        deleteBtn.style.display = 'none';
        moduleTypeSelect.removeAttribute('disabled');
        moduleTypeSelect.removeAttribute('title');
    }

    updateSpecificFields(module);
}

function updateSpecificFields(module = {}) {
    const specificFieldsDiv = document.getElementById('specificFields');
    specificFieldsDiv.innerHTML = '';

    let fields = '';
    const defaultSound = currentLang === 'en' ? 'Try again.' : 'Réessaie.';

    switch(moduleTypeSelect.value) {
        case 'video':
            fields = `
                <label for="moduleUrl">URL del Video (embed):</label>
                <input type="text" id="moduleUrl" value="${module.url || ''}">
            `;
            specificFieldsDiv.innerHTML = fields;
            break;
        case 'flashcards':
            renderFlashcardFields(module.items);
            break;
        case 'reading':
            fields = `
                <label for="moduleFile">Archivo (ruta):</label>
                <input type="text" id="moduleFile" value="${module.items?.[0]?.file || ''}">
            `;
            specificFieldsDiv.innerHTML = fields;
            break;
        case 'quiz':
            renderQuizFields(module.questions);
            break;
        case 'dragdrop':
            fields = `
                <label for="moduleFrom">Desde (ID de módulo):</label>
                <input type="text" id="moduleFrom" value="${module.from || ''}">
                <label for="moduleIncorrectSound">Sonido de incorrecto:</label>
                <input type="text" id="moduleIncorrectSound" value="${module.incorrectSound || defaultSound}" readonly>
            `;
            specificFieldsDiv.innerHTML = fields;
            break;
    }
    
    const inputs = editForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            hasUnsavedChanges = true;
        });
    });
}

function renderFlashcardFields(items = []) {
    const specificFieldsDiv = document.getElementById('specificFields');
    specificFieldsDiv.innerHTML = `
        <label>Items de Flashcard:</label>
        <div id="flashcardItemsContainer"></div>
    `;
    const container = document.getElementById('flashcardItemsContainer');

    items.forEach((item, index) => {
        addFlashcardItem(container, item, index + 1);
    });

    addNewFlashcardPlaceholder(container);
}

function addFlashcardItem(container, item, number) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'flashcard-item';
    itemDiv.innerHTML = `
        <div class="flashcard-item-header">
            <h4>Item #${number}</h4>
            <button type="button" class="btn-remove-item">❌</button>
        </div>
        <input type="text" name="icon" placeholder="Icono (ej: icons/hello.gif)" value="${item.icon || ''}">
        <input type="text" name="spell" placeholder="Palabra (ej: hello)" value="${item.spell || ''}">
        <input type="text" name="pron" placeholder="Pronunciación (ej: [həˈloʊ])" value="${item.pron || ''}">
    `;
    container.appendChild(itemDiv);

    itemDiv.querySelector('.btn-remove-item').addEventListener('click', () => {
        itemDiv.remove();
        updateFlashcardNumbers(container);
        hasUnsavedChanges = true;
    });
    
    itemDiv.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            hasUnsavedChanges = true;
        });
    });
}

function addNewFlashcardPlaceholder(container) {
    const placeholderDiv = document.createElement('div');
    placeholderDiv.className = 'flashcard-item flashcard-placeholder';
    placeholderDiv.innerHTML = `
        <div class="flashcard-item-header">
            <h4></h4>
        </div>
        <input type="text" name="icon" placeholder="Nuevo icono...">
        <input type="text" name="spell" placeholder="Nueva palabra...">
        <input type="text" name="pron" placeholder="Nueva pronunciación...">
    `;
    container.appendChild(placeholderDiv);
    updateFlashcardNumbers(container);

    const spellInput = placeholderDiv.querySelector('input[name="spell"]');
    spellInput.addEventListener('input', function onInput() {
        if (this.value.trim() !== '') {
            placeholderDiv.classList.remove('flashcard-placeholder');
            
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'btn-remove-item';
            removeBtn.textContent = '❌';
            placeholderDiv.querySelector('.flashcard-item-header').appendChild(removeBtn);

            removeBtn.addEventListener('click', () => {
                placeholderDiv.remove();
                updateFlashcardNumbers(container);
            });

            addNewFlashcardPlaceholder(container);
            spellInput.removeEventListener('input', onInput);
        }
    });
}

function updateFlashcardNumbers(container) {
    const items = container.querySelectorAll('.flashcard-item');
    items.forEach((item, index) => {
        const title = item.querySelector('.flashcard-item-header h4');
        if (title) {
            title.textContent = `Item #${index + 1}`;
        }
    });
}

function renderQuizFields(questions = []) {
    const specificFieldsDiv = document.getElementById('specificFields');
    specificFieldsDiv.innerHTML = `
        <label>Preguntas de Quiz:</label>
        <div id="quizQuestionsContainer"></div>
    `;
    const container = document.getElementById('quizQuestionsContainer');
    
    questions.forEach((q, index) => {
        addQuizQuestion(container, q, index + 1);
    });
    
    addNewQuizQuestionPlaceholder(container);
}

function addQuizQuestion(container, question, number) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question-item';
    questionDiv.innerHTML = `
        <div class="quiz-question-header">
            <h4>Pregunta #${number}</h4>
            <button type="button" class="btn-remove-item">❌</button>
        </div>
        <input type="text" name="questionText" placeholder="Texto de la pregunta..." value="${question.question || ''}">
        <div class="quiz-options-container"></div>
    `;
    container.appendChild(questionDiv);

    const optionsContainer = questionDiv.querySelector('.quiz-options-container');
    (question.options || []).forEach(opt => {
        addQuizOption(optionsContainer, opt.text, opt.isCorrect);
    });
    addNewQuizOptionPlaceholder(optionsContainer);
    
    const removeBtn = questionDiv.querySelector('.btn-remove-item');
    removeBtn.addEventListener('click', () => {
        questionDiv.remove();
        updateQuizNumbers(container);
        hasUnsavedChanges = true;
    });

    const questionInput = questionDiv.querySelector('input[name="questionText"]');
    questionInput.addEventListener('input', () => {
        hasUnsavedChanges = true;
    });
}

function addNewQuizQuestionPlaceholder(container) {
    const placeholderDiv = document.createElement('div');
    placeholderDiv.className = 'quiz-question-item quiz-placeholder';
    placeholderDiv.innerHTML = `
        <div class="quiz-question-header">
            <h4></h4>
        </div>
        <input type="text" name="questionText" placeholder="Nueva pregunta...">
        <div class="quiz-options-container"></div>
    `;
    container.appendChild(placeholderDiv);
    updateQuizNumbers(container);
    
    const questionInput = placeholderDiv.querySelector('input[name="questionText"]');
    questionInput.addEventListener('input', function onInput() {
        if (this.value.trim() !== '') {
            hasUnsavedChanges = true;
            placeholderDiv.classList.remove('quiz-placeholder');
            
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'btn-remove-item';
            removeBtn.textContent = '❌';
            placeholderDiv.querySelector('.quiz-question-header').appendChild(removeBtn);
            
            const currentValue = this.value;
            const cursorPosition = this.selectionStart;

            const newQuestionInput = document.createElement('input');
            newQuestionInput.type = 'text';
            newQuestionInput.name = 'questionText';
            newQuestionInput.placeholder = "Texto de la pregunta...";
            newQuestionInput.value = currentValue;
            this.replaceWith(newQuestionInput);

            newQuestionInput.addEventListener('input', () => {
                hasUnsavedChanges = true;
            });
            
            removeBtn.addEventListener('click', () => {
                placeholderDiv.remove();
                updateQuizNumbers(container);
                hasUnsavedChanges = true;
            });
            
            addNewQuizOptionPlaceholder(placeholderDiv.querySelector('.quiz-options-container'));
            addNewQuizQuestionPlaceholder(container);
            
            newQuestionInput.focus();
            newQuestionInput.setSelectionRange(cursorPosition, cursorPosition);

            newQuestionInput.removeEventListener('input', onInput);
        }
    });
}

function addQuizOption(container, text = '', isCorrect = false) {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'quiz-option-item';
    if (isCorrect) {
        optionDiv.classList.add('correct');
    }
    optionDiv.innerHTML = `
        <input type="text" name="optionText" placeholder="Texto de la opción..." value="${text}">
        <button type="button" class="btn-correct-option">✅</button>
        <button type="button" class="btn-remove-item">❌</button>
    `;
    container.appendChild(optionDiv);

    const correctBtn = optionDiv.querySelector('.btn-correct-option');
    correctBtn.addEventListener('click', () => {
        container.querySelectorAll('.quiz-option-item').forEach(opt => opt.classList.remove('correct'));
        optionDiv.classList.add('correct');
        hasUnsavedChanges = true;
    });

    const removeBtn = optionDiv.querySelector('.btn-remove-item');
    removeBtn.addEventListener('click', () => {
        optionDiv.remove();
        hasUnsavedChanges = true;
    });

    const optionInput = optionDiv.querySelector('input[name="optionText"]');
    optionInput.addEventListener('input', () => {
        hasUnsavedChanges = true;
    });
}

function addNewQuizOptionPlaceholder(container) {
    const placeholderDiv = document.createElement('div');
    placeholderDiv.className = 'quiz-option-item quiz-placeholder';
    placeholderDiv.innerHTML = `
        <input type="text" name="optionText" placeholder="Nueva opción...">
    `;
    container.appendChild(placeholderDiv);
    
    const optionInput = placeholderDiv.querySelector('input[name="optionText"]');
    optionInput.addEventListener('input', function onInput() {
        if (this.value.trim() !== '') {
            hasUnsavedChanges = true;
            const currentValue = this.value;
            const cursorPosition = this.selectionStart;

            placeholderDiv.classList.remove('quiz-placeholder');
            
            placeholderDiv.innerHTML = `
                <input type="text" name="optionText" placeholder="Texto de la opción..." value="${currentValue}">
                <button type="button" class="btn-correct-option">✅</button>
                <button type="button" class="btn-remove-item">❌</button>
            `;
            
            const newOptionInput = placeholderDiv.querySelector('input[name="optionText"]');
            const correctBtn = placeholderDiv.querySelector('.btn-correct-option');
            const removeBtn = placeholderDiv.querySelector('.btn-remove-item');

            correctBtn.addEventListener('click', () => {
                container.querySelectorAll('.quiz-option-item').forEach(opt => opt.classList.remove('correct'));
                placeholderDiv.classList.add('correct');
                hasUnsavedChanges = true;
            });
            
            removeBtn.addEventListener('click', () => {
                placeholderDiv.remove();
                hasUnsavedChanges = true;
            });

            newOptionInput.addEventListener('input', () => {
                hasUnsavedChanges = true;
            });

            addNewQuizOptionPlaceholder(container);
            optionInput.removeEventListener('input', onInput);
            
            newOptionInput.focus();
            newOptionInput.setSelectionRange(cursorPosition, cursorPosition);
        }
    });
}

function updateQuizNumbers(container) {
    const items = container.querySelectorAll('.quiz-question-item:not(.quiz-placeholder)');
    items.forEach((item, index) => {
        const title = item.querySelector('.quiz-question-header h4');
        if (title) {
            title.textContent = `Pregunta #${index + 1}`;
        }
    });
}


function getModuleFromForm() {
    const id = document.getElementById('moduleId').value;
    const name = document.getElementById('moduleName').value;
    const type = moduleTypeSelect.value;
    const thumbnail = document.getElementById('moduleThumbnail').value;

    const module = { id, name, type, thumbnail };

    switch(type) {
        case 'video':
            module.url = document.getElementById('moduleUrl').value;
            break;
        case 'flashcards':
            const flashcardItems = [];
            const flashcardItemDivs = document.querySelectorAll('#flashcardItemsContainer .flashcard-item:not(.flashcard-placeholder)');
            flashcardItemDivs.forEach(div => {
                const icon = div.querySelector('input[name="icon"]').value.trim();
                const spell = div.querySelector('input[name="spell"]').value.trim();
                const pron = div.querySelector('input[name="pron"]').value.trim();
                if (spell) {
                    flashcardItems.push({
                        icon: icon,
                        spell: spell,
                        pron: pron
                    });
                }
            });
            module.items = flashcardItems;
            break;
        case 'reading':
            module.items = [{ file: document.getElementById('moduleFile').value }];
            break;
        case 'quiz':
            const quizQuestions = [];
            const questionDivs = document.querySelectorAll('#quizQuestionsContainer .quiz-question-item:not(.quiz-placeholder)');
            
            let hasError = false;
            questionDivs.forEach((qDiv, index) => {
                const questionText = qDiv.querySelector('input[name="questionText"]').value.trim();
                if (questionText) {
                    const options = [];
                    qDiv.querySelectorAll('.quiz-option-item:not(.quiz-placeholder)').forEach(oDiv => {
                        const optionText = oDiv.querySelector('input[name="optionText"]').value.trim();
                        if (optionText) {
                            options.push({
                                text: optionText,
                                isCorrect: oDiv.classList.contains('correct')
                            });
                        }
                    });
                    
                    if (options.length < 3) {
                        alert(`La Pregunta #${index + 1} debe tener al menos 3 opciones.`);
                        hasError = true;
                        return;
                    }
                    
                    const correctOptions = options.filter(opt => opt.isCorrect);
                    if (correctOptions.length !== 1) {
                         alert(`La Pregunta #${index + 1} debe tener exactamente 1 respuesta correcta.`);
                        hasError = true;
                        return;
                    }
                    
                    quizQuestions.push({
                        question: questionText,
                        options: options
                    });
                }
            });

            if (hasError) {
                return null;
            }

            module.questions = quizQuestions;
            break;
        case 'dragdrop':
            module.from = document.getElementById('moduleFrom').value;
            module.incorrectSound = document.getElementById('moduleIncorrectSound').value;
            break;
    }

    return module;
}

function cancelEdit() {
    editForm.style.display = 'none';
    createBtn.style.display = 'block';
    changeLangBtn.style.display = 'block';
    saveBtn.style.display = 'block';
    modulesGrid.classList.remove('grid-disabled');
    moduleTypeSelect.removeAttribute('disabled');
    moduleTypeSelect.removeAttribute('title');
    hasUnsavedChanges = false;
}

function deleteModule(id) {
    if (!confirm(`¿Estás seguro de que quieres eliminar el módulo con ID: ${id}?`)) {
        return;
    }
    const modules = coursesData[currentLang].modules;
    coursesData[currentLang].modules = modules.filter(mod => mod.id !== id);
    renderModules(coursesData[currentLang].modules);
    cancelEdit();
    hasUnsavedChanges = true;
}

modulesGrid.addEventListener('click', (e) => {
    if (hasUnsavedChanges) {
        if (!confirm('¡Atención! Tienes cambios sin guardar. Si continuas, los perderás. ¿Estás seguro de que quieres continuar?')) {
            return;
        }
    }
    const id = e.target.closest('.module-card').dataset.id;
    if (e.target.classList.contains('btn-edit')) {
        const moduleToEdit = coursesData[currentLang].modules.find(mod => mod.id === id);
        showEditForm(moduleToEdit);
        editForm.scrollIntoView({ behavior: 'smooth' });
    } else if (e.target.classList.contains('btn-delete')) {
        deleteModule(id);
    }
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newModule = getModuleFromForm();
    if (!newModule) return;

    const modules = coursesData[currentLang].modules;
    const existingIndex = modules.findIndex(mod => mod.id === newModule.id);

    if (existingIndex > -1) {
        modules[existingIndex] = newModule;
    } else {
        modules.push(newModule);
    }

    renderModules(modules);
    cancelEdit();
    hasUnsavedChanges = true;
});

moduleTypeSelect.addEventListener('change', () => updateSpecificFields());

langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    if (currentLang) {
      langSelectorWrapper.style.display = 'none';
      contentWrapper.style.display = 'block';
      langDisplay.textContent = '- ' + langMap[currentLang];
      renderModules(coursesData[currentLang].modules);
    }
});

createBtn.addEventListener('click', () => {
    if (hasUnsavedChanges) {
        if (!confirm('¡Atención! Tienes cambios sin guardar. Si continuas, los perderás. ¿Estás seguro de que quieres continuar?')) {
            return;
        }
    }
    showEditForm();
});

cancelBtn.addEventListener('click', cancelEdit);
deleteBtn.addEventListener('click', () => deleteModule(document.getElementById('moduleId').value));

changeLangBtn.addEventListener('click', () => {
    if (hasUnsavedChanges) {
        if (!confirm('¡Atención! Tienes cambios sin guardar. ¿Estás seguro de que quieres descartarlos y cambiar de idioma?')) {
            return;
        }
    }
    setupInitialView();
    langSelect.value = '';
    langDisplay.textContent = '';
});

saveBtn.addEventListener('click', () => {
    const courseToSave = coursesData[currentLang];
    const dataStr = JSON.stringify(courseToSave, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `course_${currentLang}_actualizado.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Archivo descargado. Por favor, reemplaza el archivo original en tu carpeta para guardar los cambios de forma permanente.');
    hasUnsavedChanges = false;
});

window.onbeforeunload = function() {
    if (hasUnsavedChanges) {
        return 'Tienes cambios sin guardar. Si sales de la página, los perderás.';
    }
};

loadCourses();