export default function IsDoctor ()  {
    const role = localStorage.getItem("role");
    return role === "doctor" 
}