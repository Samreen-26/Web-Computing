import React, { useState } from "react";

function RegistrationForm() {
const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
gender: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};
const handleSubmit = (e) => {
e.preventDefault();
alert(`Registration Successful!\n\nName: ${formData.name}\nEmail: $
{formData.email}`);
};
return (
<div className="container mt-5">
<div className="card shadow p-4" style={{ maxWidth: "500px", margin: "auto" }}>
<h2 className="text-center mb-4">Registration Form</h2>
<form onSubmit={handleSubmit}>
<div className="mb-3">
<label className="form-label">Full Name</label>
<input

type="text"
className="form-control"
name="name"
value={formData.name}
onChange={handleChange}
required
/>
</div>
<div className="mb-3">
<label className="form-label">Email address</label>
<input
type="email"
className="form-control"
name="email"
value={formData.email}
onChange={handleChange}
required
/>
</div>
<div className="mb-3">
<label className="form-label">Password</label>
<input
type="password"
className="form-control"
name="password"
value={formData.password}
onChange={handleChange}
required
/>
</div>

<div className="mb-3">
<label className="form-label">Gender</label>
<select
className="form-select"
name="gender"
value={formData.gender}
onChange={handleChange}
required
>
<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>
</select>
</div>
<button type="submit" className="btn btn-primary w-100">
Register
</button>
</form>
</div>
</div>
);}
export default RegistrationForm;