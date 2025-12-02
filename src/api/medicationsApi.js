// src/api/medicationsApi.js
const baseUrl = 'https://your-api-url.vercel.app' // <-- EDIT INI

export async function fetchMedications() {
  const res = await fetch(`${baseUrl}/api/medications`)

  if (!res.ok) {
    throw new Error(`Gagal memuat data medications (status ${res.status})`)
  }

  return res.json()
}

export async function fetchMedicationById(id) {
  const res = await fetch(`${baseUrl}/api/medications/${id}`)

  if (!res.ok) {
    throw new Error(`Gagal memuat detail medication (status ${res.status})`)
  }

  return res.json()
}
