import { Link } from "react-router-dom";

function JobCard({ id, name, company, location, logo, tags }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <Link to={`/app/jobs/${id}`}>
        <div className="flex items-center mb-3">
          <img
            src={logo || "https://via.placeholder.com/40"}
            alt="logo"
            className="w-10 h-10 object-contain rounded mr-3"
          />
          <div>
            <h4 className="font-semibold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-600">{company}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">{location}</p>
        <div className="flex flex-wrap gap-2 text-xs text-blue-600">
          {(Array.isArray(tags) ? tags : []).map((tag, index) => (
            <span key={index} className="bg-blue-100 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default JobCard;
