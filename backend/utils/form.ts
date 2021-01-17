export const validateForm = (data: Record<string, any>, optionalFields?: string[]) => {
  for (const key of Object.keys(data)) {
    const val = data[key]
    // empty string is allowed
    if (val === undefined || val === null) {
      if (optionalFields && optionalFields.includes(key)) {
        continue
      }
      throw 'FORM_INCOMPLETE'
    }
  }
}
