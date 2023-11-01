"use client";

const Load = ({ params }) => {
  const padId = params.id;

  const loadNotepad = async () => {
    console.log(padId);
    try {
      const response = await fetch(`/api/notepad/${padId}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  return (
    <div>
      <button onClick={() => loadNotepad()}>Load {padId}</button>
    </div>
  );
};

export default Load;
