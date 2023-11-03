const loadNotepad = async (padId) => {
  if (padId) {
    try {
      const response = await fetch(`http://localhost:3000/api/load/${padId}`);
      return response.json();
    } catch (error) {
      console.error("There was an error:", error);
    }
  }
};

export default loadNotepad;
