const loadNotepad = async (padId) => {
  if (padId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notepad/${padId}`
      );
      return response.json();
    } catch (error) {
      console.error("There was an error:", error);
    }
  }
};

const Load = async ({ params }) => {
  const padId = params.id;
  const padData = await loadNotepad(padId);
  const notepad = padData.notepad;

  return (
    <div>
      <h1>{notepad.name}</h1>
    </div>
  );
};

export default Load;
