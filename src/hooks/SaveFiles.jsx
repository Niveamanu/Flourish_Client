import api from "../api/api";

/**
 * Save files to the backend.
 * @param {Object} params
 * @param {File|null} params.bankDeposit - The bank deposit file (single file or null)
 * @param {File[]} params.remittances - Array of remittance files
 * @param {string} params.user - Current user identifier
 * @returns {Promise<any>}
 */
export default async function saveFiles({ bankDeposit, remittances, user }) {
  const formData = new FormData();

  if (bankDeposit) {
    formData.append("files_", bankDeposit);
    formData.append("types", "bank");
  }

  remittances.forEach((file) => {
    formData.append("files_", file);
    formData.append("types", "remit");
  });

  formData.append("user", user);

  // Replace with your actual endpoint
  const endpoint = "/upload/files";

  const response = await api.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
}
