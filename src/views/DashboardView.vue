<template>
  <div class="dashboard-grid">
    <section class="card glass-panel input-section">
      <div class="card-header">
        <h3>Nuevo Recurso</h3>
        <p class="subtitle">Ingrese los detalles del recurso a gestionar</p>
      </div>

      <form @submit.prevent="handleAdd" class="resource-form">
        <div class="form-group">
          <label for="resource-name">Nombre del Recurso</label>
          <input type="text" id="resource-name" v-model="form.name" placeholder="Ej: Laptop Dell XPS" autocomplete="off" :class="{ error: errors.name }">
          <span class="error-msg" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="resource-type">Categoría</label>
          <div class="select-wrapper">
            <select id="resource-type" v-model="form.type" :class="{ error: errors.type }">
              <option value="" disabled>Seleccione una categoría</option>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="mobiliario">Mobiliario</option>
              <option value="insumo">Insumo</option>
            </select>
          </div>
          <span class="error-msg" v-if="errors.type">{{ errors.type }}</span>
        </div>

        <div class="form-group">
          <label for="resource-quantity">Cantidad</label>
          <input type="number" id="resource-quantity" v-model.number="form.quantity" placeholder="1" min="1" :class="{ error: errors.quantity }">
          <span class="error-msg" v-if="errors.quantity">{{ errors.quantity }}</span>
        </div>

        <div class="form-group">
          <label for="resource-value">Valor Estimado (CLP)</label>
          <input type="number" id="resource-value" v-model.number="form.value" placeholder="0" min="0" :class="{ error: errors.value }">
          <span class="error-msg" v-if="errors.value">{{ errors.value }}</span>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <template v-if="!isSubmitting">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Agregar Recurso
            </template>
            <template v-else>
              Guardando...
            </template>
          </button>
        </div>
      </form>
    </section>

    <section class="card glass-panel display-section">
      <div class="card-header flex-header">
        <div>
          <h3>Inventario Actual</h3>
          <p class="subtitle">Lista de recursos en memoria local</p>
        </div>
        <div class="stats-badge">
          <span>{{ totalItems }}</span> Items
        </div>
      </div>

      <div class="table-container">
        <table class="resource-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Valor Unitario</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="resources.length === 0" class="empty-state-row">
              <td colspan="7">
                <div class="empty-state">
                  <div class="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <p>No hay recursos registrados</p>
                </div>
              </td>
            </tr>
            <tr v-for="resource in sortedResources" :key="resource.id" class="fade-in">
              <td><strong>{{ resource.name }}</strong></td>
              <td><span class="badge" :class="resource.type">{{ resource.type.toUpperCase() }}</span></td>
              <td>{{ resource.quantity }}</td>
              <td>{{ formatCurrency(resource.value) }}</td>
              <td><strong>{{ formatCurrency(resource.value * resource.quantity) }}</strong></td>
              <td><span class="status-indicator active">Activo</span></td>
              <td>
                <button class="btn-icon delete-btn" @click="handleDelete(resource.id)" title="Eliminar" style="cursor: pointer; background: none; border: none; color: #ff4757;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="stats-grid">
      <section class="card glass-panel stats-card">
        <div class="stat-info">
          <span class="stat-label">Hardware</span>
          <strong class="stat-value">{{ hardwareCount }}</strong>
        </div>
      </section>

      <section class="card glass-panel stats-card">
        <div class="stat-info">
          <span class="stat-label">Software</span>
          <strong class="stat-value">{{ softwareCount }}</strong>
        </div>
      </section>

      <section class="card glass-panel stats-card">
        <div class="stat-info">
          <span class="stat-label">Mobiliario</span>
          <strong class="stat-value">{{ mobiliarioCount }}</strong>
        </div>
      </section>

      <section class="card glass-panel stats-card">
        <div class="stat-info">
          <span class="stat-label">Insumo</span>
          <strong class="stat-value">{{ insumoCount }}</strong>
        </div>
      </section>

      <section class="card glass-panel stats-card">
        <div class="stat-info">
          <span class="stat-label">Valor Total</span>
          <strong class="stat-value">{{ formatCurrency(totalValue) }}</strong>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const API_URL = 'https://6993a28cfade7a9ec0f3214f.mockapi.io/DGRv1/recursos'


const resources = ref([])
const isSubmitting = ref(false)

const form = ref({
  name: '',
  type: '',
  quantity: 1,
  value: 0
})

const errors = ref({
  name: '',
  type: '',
  quantity: '',
  value: ''
})


const sortedResources = computed(() => {
  return [...resources.value].sort((a, b) => b.id - a.id)
})

const getCategoryTotal = (type) => resources.value
    .filter(r => r.type === type)
    .reduce((sum, r) => sum + r.quantity, 0)

const hardwareCount = computed(() => getCategoryTotal('hardware'))
const softwareCount = computed(() => getCategoryTotal('software'))
const mobiliarioCount = computed(() => getCategoryTotal('mobiliario'))
const insumoCount = computed(() => getCategoryTotal('insumo'))

const totalItems = computed(() => resources.value.reduce((sum, r) => sum + r.quantity, 0))
const totalValue = computed(() => resources.value.reduce((sum, r) => sum + (r.value * r.quantity), 0))


const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(amount)
}

const validateField = (field, value, rules) => {
  if (rules.required && !value) return rules.requiredMsg;
  if (rules.minLength && String(value).length < rules.minLength) return rules.minLengthMsg;
  if (rules.min && Number(value) < rules.min) return rules.minMsg;
  return null;
}

const validateForm = () => {

  errors.value = { name: '', type: '', quantity: '', value: '' }

  const formValues = {
    name: form.value.name.trim(),
    type: form.value.type,
    quantity: Number(form.value.quantity),
    value: Number(form.value.value)
  }

  let isValid = true

  const nameError = validateField('name', formValues.name, { required: true, requiredMsg: 'El nombre es requerido', minLength: 3, minLengthMsg: 'El nombre debe tener al menos 3 caracteres'})
  if (nameError) { errors.value.name = nameError; isValid = false }

  const typeError = validateField('type', formValues.type, { required: true, requiredMsg: 'Debe seleccionar una categoría'})
  if (typeError) { errors.value.type = typeError; isValid = false }

  const quantityError = validateField('quantity', formValues.quantity, { required: true, requiredMsg: 'La cantidad es requerida', min: 1, minMsg: 'La cantidad debe ser mayor a 0'})
  if (quantityError) { errors.value.quantity = quantityError; isValid = false }

  const valueError = validateField('value', formValues.value, { required: true, requiredMsg: 'El valor es requerido', min: 0, minMsg: 'El valor no puede ser negativo'})
  if (valueError) { errors.value.value = valueError; isValid = false }

  return isValid ? formValues : null
}


const fetchResources = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error('Error de conexión')
    const data = await response.json()
    resources.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
    alert('Hubo un error al cargar los datos. Por favor revise su conexión.')
  }
}

const apiCreateResource = async (resourceData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resourceData)
    })
    if (!response.ok) throw new Error('Error creating resource')
    await fetchResources()
    return true
  } catch (error) {
    console.error('Error creating resource:', error)
    alert('Error al guardar el recurso.')
    return false
  }
}

const apiDeleteResource = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Error deleting resource')
    await fetchResources()
  } catch (error) {
    console.error('Error deleting resource:', error)
    alert('Error al eliminar el recurso.')
  }
}


const handleAdd = async () => {
  const data = validateForm()
  if (!data) return

  isSubmitting.value = true
  const success = await apiCreateResource(data)
  isSubmitting.value = false

  if (success) {
    form.value = { name: '', type: '', quantity: 1, value: 0 }
    errors.value = { name: '', type: '', quantity: '', value: '' }
    document.getElementById('resource-name')?.focus()
  }
}

const handleDelete = async (id) => {
  if (confirm('¿Confirma que desea eliminar este recurso permanentemente?')) {
    await apiDeleteResource(id)
  }
}


onMounted(() => {
  fetchResources()
})
</script>

<style scoped>

</style>
