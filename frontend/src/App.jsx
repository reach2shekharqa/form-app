import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchRecords = useCallback(async () => {
    try {
      const response = await axios.get("https://form-app-backend-q407.onrender.com/api/forms");

      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `https://form-app-backend-q407.onrender.com/api/forms/${editingId}`,
          formData
        );

        alert("Record updated successfully!");
      } else {
        await axios.post(
          "https://form-app-backend-q407.onrender.com/api/forms",
          formData
        );

        alert("Form submitted successfully!");
      }

      setEditingId(null);

      setFormData({
        name: "",
        email: "",
      });

      fetchRecords();

    } catch (error) {
      console.error(error);
      alert("Failed to save record");
    }
  };

  // removed unused `updateRecord` function (handled via submitForm when editing)

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`https://form-app-backend-q407.onrender.com/api/forms/${id}`);
      fetchRecords();
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h1>User Registration Form</h1>

      <form onSubmit={submitForm}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
        </div>

        <br />

        <button type="submit">
  {editingId ? "Update Record" : "Submit"}
</button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h2>Submitted Records</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: '20px' }}
      >
        <thead style={{ textAlign: 'left', backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Created At</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>

        <tbody id="records-body">
          {records.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                No records found. Please submit a new form to see the table populated.
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.id}>
                <td style={{ padding: '10px' }}>{record.id}</td>
                <td style={{ padding: '10px' }}>{record.name}</td>
                <td style={{ padding: '10px' }}>{record.email}</td>
                <td style={{ padding: '10px' }}>
                  {new Date(record.created_at).toLocaleString()}
                </td>
                <td style={{ padding: '10px' }}>
                  <button
                    onClick={() => {
                      setEditingId(record.id);
                      setFormData({ name: record.name, email: record.email });
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteRecord(record.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;