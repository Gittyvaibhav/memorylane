// Arcjet is optional. Provide a lightweight stub with a `protect` method
// so the app can run without the Arcjet package installed or if API shape differs.
const aj = {
  protect: async (req) => ({ isDenied: () => false })
}

export default aj
