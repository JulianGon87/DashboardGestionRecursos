const appState = {
    resources: [],
    stats: {
        hardware: 0,
        software: 0,
        totalValue: 0
    }
};

const DOM = {
    form: document.getElementById('resource-form'),
    inputs: {
        name: document.getElementById('resource-name'),
        type: document.getElementById('resource-type'),
        quantity: document.getElementById('resource-quantity'),
        value: document.getElementById('resource-value')
    },
    errors: {
        name: document.getElementById('error-name'),
        type: document.getElementById('error-type'),
        quantity: document.getElementById('error-quantity'),
        value: document.getElementById('error-value')
    },
    list: document.getElementById('resources-list'),
    stats: {
        totalCount: document.getElementById('total-count'),
        hardware: document.getElementById('stats-hardware'),
        software: document.getElementById('stats-software'),
        mobiliario: document.getElementById('stats-mobiliario'),
        insumo: document.getElementById('stats-insumo'),
        totalValue: document.getElementById('stats-total')
    }
};

const createResource = (name, type, quantity, value) => {
    return {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        name,
        type,
        quantity: Number(quantity),
        value: Number(value),
        createdAt: new Date()
    };
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(amount);
};

const setInputError = (inputKey, message) => {
    const input = DOM.inputs[inputKey];
    const errorSpan = DOM.errors[inputKey];

    if (message) {
        input.classList.add('error');
        errorSpan.textContent = message;
        return false;
    } else {
        input.classList.remove('error');
        errorSpan.textContent = '';
        return true;
    }
};

const validateField = (field, value, rules) => {
    if (rules.required && !value) return rules.requiredMsg;
    if (rules.minLength && value.length < rules.minLength) return rules.minLengthMsg;
    if (rules.min && Number(value) < rules.min) return rules.minMsg;
    return null;
};

const validateForm = () => {
    const { name, type, quantity, value } = DOM.inputs;
    const formValues = {
        name: name.value.trim(),
        type: type.value,
        quantity: quantity.value,
        value: value.value
    };

    let isValid = true;

    const errors = {
        name: validateField('name', formValues.name, {
            required: true, requiredMsg: 'El nombre es requerido',
            minLength: 3, minLengthMsg: 'El nombre debe tener al menos 3 caracteres'
        }),
        type: validateField('type', formValues.type, {
            required: true, requiredMsg: 'Debe seleccionar una categoría'
        }),
        quantity: validateField('quantity', formValues.quantity, {
            required: true, requiredMsg: 'La cantidad es requerida',
            min: 1, minMsg: 'La cantidad debe ser mayor a 0'
        }),
        value: validateField('value', formValues.value, {
            required: true, requiredMsg: 'El valor es requerido',
            min: 0, minMsg: 'El valor no puede ser negativo'
        })
    };

    Object.keys(errors).forEach(key => {
        if (!setInputError(key, errors[key])) isValid = false;
    });

    if (isValid) return formValues;
    return null;
};

const updateStats = () => {
    const getCategoryTotal = (type) => appState.resources
        .filter(r => r.type === type)
        .reduce((sum, r) => sum + r.quantity, 0);

    const hardwareCount = getCategoryTotal('hardware');
    const softwareCount = getCategoryTotal('software');
    const mobiliarioCount = getCategoryTotal('mobiliario');
    const insumoCount = getCategoryTotal('insumo');

    const totalItems = appState.resources.reduce((sum, r) => sum + r.quantity, 0);
    const totalValue = appState.resources.reduce((sum, r) => sum + (r.value * r.quantity), 0);

    if (DOM.stats.totalCount) DOM.stats.totalCount.textContent = totalItems;
    DOM.stats.hardware.textContent = hardwareCount;
    DOM.stats.software.textContent = softwareCount;
    DOM.stats.mobiliario.textContent = mobiliarioCount;
    DOM.stats.insumo.textContent = insumoCount;
    DOM.stats.totalValue.textContent = formatCurrency(totalValue);
};

const renderResources = () => {
    const container = DOM.list;
    container.innerHTML = '';

    if (appState.resources.length === 0) {
        container.innerHTML = `
            <tr class="empty-state-row">
                <td colspan="7">
                    <div class="empty-state">
                        <div class="empty-icon">
                             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                        </div>
                        <p>No hay recursos registrados</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    appState.resources.forEach(resource => {
        const tr = document.createElement('tr');
        tr.className = 'fade-in';

        tr.innerHTML = `
            <td><strong>${resource.name}</strong></td>
            <td><span class="badge ${resource.type}">${resource.type.toUpperCase()}</span></td>
            <td>${resource.quantity}</td>
            <td>${formatCurrency(resource.value)}</td>
            <td><strong>${formatCurrency(resource.value * resource.quantity)}</strong></td>
            <td><span class="status-indicator active">Activo</span></td>
            <td>
                <button class="btn-icon delete-btn" data-id="${resource.id}" title="Eliminar" style="cursor: pointer; background: none; border: none; color: #ff4757;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
            </td>
        `;

        const deleteBtn = tr.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => handleDelete(resource.id));

        container.appendChild(tr);
    });

    updateStats();
};

const handleAdd = (e) => {
    e.preventDefault();

    const data = validateForm();
    if (!data) return;

    const newResource = createResource(data.name, data.type, data.quantity, data.value);
    appState.resources.push(newResource);

    renderResources();

    DOM.form.reset();
    DOM.inputs.name.focus();
};

const handleDelete = (id) => {
    if (confirm('¿Está seguro de eliminar este recurso?')) {
        appState.resources = appState.resources.filter(r => r.id !== id);
        renderResources();
    }
};

const init = () => {
    DOM.form.addEventListener('submit', handleAdd);
    renderResources();
    console.log('App Initialized: Module 4 Ready');
};

document.addEventListener('DOMContentLoaded', init);
