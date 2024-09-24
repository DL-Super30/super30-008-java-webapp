import { useState } from "react";
import axios from "axios";

export default function OpportunityForm({ onClose }) {
  const [formData, setFormData] = useState({
    id: "",
    date: "",
    name: "",
    phone: "",
    email: "",
    Leadstatus: "Not Contacted",
    Opportunitystatus: "",
    Opportunitystage: "",
    DemoAttendedstage: "",
    Visitedstage: "",
    LostOpportunityReason: "",
    Leadsource: "",
    course: "",
    stack: "",
    fee: "",
    classMode: "",
    batchTimings: "",
    nextFollowUp: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const id = Date.now().toString();
    const currentDate = new Date().toLocaleDateString('en-GB');

    const updatedFormData = { ...formData, id, date: currentDate.replace(/\//g, '-') };

    console.log("Submitting form data:", updatedFormData);

    try {
      const response = await axios.post("http://localhost:3000/opportunities", updatedFormData);
      console.log("Server response:", response);
      if (response.status === 201) {
        setSuccessMessage("Opportunity created successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          onClose();
        }, 3000);
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Unexpected server response. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Opportunity:", error);
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred.";
      alert(`There was an error submitting the form: ${errorMessage}`);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[100vh] flex flex-col">
        <div className="flex gap-4 items-center justify-between p-4 md:p-5 border-b rounded-t">
          <img
            alt="header image"
            width="44"
            height="44"
            className="w-10 h-9"
            src="https://crm.skillcapital.ai/_next/static/media/employee_contact.2d215fd6.svg"
          />
          <h2 className="text-2xl font-semibold">Create Opportunity</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          {successMessage && (
            <div className="mb-4 p-4 bg-green-200 text-green-800 rounded">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
              <label className="font-medium text-base">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Phone"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Fee Quoted</label>
              <input
                type="text"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Fee Quoted"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Batch Timings</label>
              <select
                name="batchTimings"
                value={formData.batchTimings}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select</option>
                <option value="7AM-8AM">7AM-8AM</option>
                <option value="8AM-9AM">8AM-9AM</option>
                <option value="9AM-10AM">9AM-10AM</option>
                <option value="10AM-11AM">10AM-11AM</option>
                <option value="11AM-12PM">11AM-12PM</option>
                <option value="12PM-1PM">12PM-1PM</option>
                <option value="1PM-2PM">1PM-2PM</option>
                <option value="2PM-3PM">2PM-3PM</option>
                <option value="3PM-4PM">3PM-4PM</option>
                <option value="4PM-5PM">4PM-5PM</option>
                <option value="5PM-6PM">5PM-6PM</option>
                <option value="6PM-7PM">6PM-7PM</option>
                <option value="7PM-8PM">7PM-8PM</option>
                <option value="8PM-9PM">8PM-9PM</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Lead Status</label>
              <select
                name="Leadstatus"
                value={formData.Leadstatus}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Not Contacted">Not Contacted</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Opportunity Status</label>
              <select
                name="Opportunitystatus"
                value={formData.Opportunitystatus}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select</option>
                <option value="Visiting">Visiting</option>
                <option value="visited">visited</option>
                <option value="Demo Attended">Demo Attended</option>
                <option value="Lost Opportunity">Lost Opportunity</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Opportunity Stage</label>
              <select
                name="Opportunitystage"
                value={formData.Opportunitystage}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Select Opportunity Stage">Select Opportunity Stage</option>
                <option value="None">None</option>
                <option value="Advanced Discussion">Advanced Discussion</option>
                <option value="Ready to join">Ready to join</option>
                <option value="Visiting">Visiting</option>
                <option value="Fees Negotiation">Fees Negotiation</option>
                <option value="Batch Allocation">Batch Allocation</option>
                <option value="Intrested in Demo">Intrested in Demo</option>
                <option value="Need Time This week">Need Time This week</option>
                <option value="Need Time Next week">Need Time Next week</option>
                <option value="Need Time This Month">Need Time This Month</option>
                <option value="Need Time Next Month">Need Time Next Month</option>
                <option value="Special Requirements">Special Requirements</option>
                <option value="Payment Link Sent">Payment Link Sent</option>
                <option value="Closed Won(Registered)">Closed Won(Registered)</option>
                <option value="Busy & Asked a call back">Busy & Asked a call back</option>
                <option value="Closed Lost">Closed Lost</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Demo Attended Stage</label>
              <select
                name="DemoAttendedstage"
                value={formData.DemoAttendedstage}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Select Opportunity Stage">Select Demo Attended Stage</option>
                <option value="None">None</option>
                <option value="Advanced Discussion">Advanced Discussion</option>
                <option value="Ready to join">Ready to join</option>
                <option value="Call Not Answered">Call Not Answered</option>
                <option value="Visiting">Visiting</option>
                <option value="Fees Negotiation">Fees Negotiation</option>
                <option value="Batch Allocation">Batch Allocation</option>
                <option value="Need Time This week">Need Time This week</option>
                <option value="Need Time Next week">Need Time Next week</option>
                <option value="Need Time This Month">Need Time This Month</option>
                <option value="Need Time Next Month">Need Time Next Month</option>
                <option value="Special Requirements">Special Requirements</option>
                <option value="Closed Won(Registered)">Closed Won(Registered)</option>
                <option value="Closed Lost(Cold Lead)">Closed Lost(Cold Lead)</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Visited Stage</label>
              <select
                name="Visitedstage"
                value={formData.Visitedstage}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Select Opportunity Stage">Select Visited Stage</option>
                <option value="None">None</option>
                <option value="Ready to join">Ready to join</option>
                <option value="Call Not Answered">Call Not Answered</option>
                <option value="Fees Negotiation">Fees Negotiation</option>
                <option value="Batch Allocation">Batch Allocation</option>
                <option value="Intrested in Demo">Intrested in Demo</option>
                <option value="Need Time This week">Need Time This week</option>
                <option value="Need Time Next week">Need Time Next week</option>
                <option value="Need Time This Month">Need Time This Month</option>
                <option value="Need Time Next Month">Need Time Next Month</option>
                <option value="Special Requirements">Special Requirements</option>
                <option value="Closed Won(Registered)">Closed Won(Registered)</option>
                <option value="Closed Lost(Cold Lead)">Closed Lost(Cold Lead)</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Lost Opportunity Reason</label>
              <select
                name="LostOpportunityReason"
                value={formData.LostOpportunityReason}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Select Lost Opportunity Reason">Select Lost Opportunity Reason</option>
                <option value="None">None</option>
                <option value="Invalid Number">Invalid Number</option>
                <option value="Not Intrested">Not Intrested</option>
                <option value="Joined Another Institute">Joined Another Institute</option>
                <option value="Asking Free Course">Asking Free Course</option>
                <option value="Pay After Placement">Pay After Placement</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Stack</label>
              <select
                name="stack"
                value={formData.stack}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Stack</option>
                <option value="Life Skills">Life Skills</option>
                <option value="HR">HR</option>
                <option value="Study Abroad">Study Abroad</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Lead Source</label>
              <select
                name="Leadsource"
                value={formData.Leadsource}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Lead Source</option>
                <option value="None">None</option>
                <option value="Walk In">Walk In</option>
                <option value="Student Referral">Student Referral</option>
                <option value="Demo">Demo</option>
                <option value="Website">Website</option>
                <option value="Website Chat">Website Chat</option>
                <option value="Inbound Call">Inbound Call</option>
                <option value="Google AdWords">Google AdWords</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Google My Business">Google My Business</option>
                <option value="Whatsapp-Skill Capital">Whatsapp-Skill Capital</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Select Course">Select Course</option>
                <option value="HR Business Partner">HR Business Partner</option>
                <option value="HR Generalist Core HR">HR Generalist Core HR</option>
                <option value="HR Analytics">HR Analytics</option>
                <option value="Spoken English">Spoken English</option>
                <option value="Public Speaking">Public Speaking</option>
                <option value="Communication">Communication</option>
                <option value="Soft Skills">Soft Skills</option>
                <option value="Personality Development">Personality Development</option>
                <option value="IELTS">IELTS</option>
                <option value="TOEFL">TOEFL</option>
                <option value="PTE">PTE</option>
                <option value="GRE">GRE</option>
                <option value="GMAT">GMAT</option>
                <option value="Recruitment Specialist">Recruitment Specialist</option>
                <option value="Payroll Specialist">Payroll Specialist</option>
                <option value="Learning and Development">Learning and Development</option>
                <option value="Finance">Finance</option>
                <option value="Competitive Exams">Competitive Exams</option>
                <option value="HR Manager">HR Manager</option>
              </select>
            </div>

            <div className="flex flex-col col-span-2">
              <label className="font-medium text-base">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="4"
                placeholder="Description"
              />
            </div>

            <div className="col-span-2 flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}