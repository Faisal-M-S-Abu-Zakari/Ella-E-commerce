import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Comments = ({ token }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(backendUrl + "/api/product/comments", {
        headers: { token },
      });
      if (res.data.success) setComments(res.data.comments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleDelete = async (productId, reviewId) => {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await axios.delete(
        `${backendUrl}/api/product/comments/${productId}/${reviewId}`,
        { headers: { token } }
      );
      if (res.data.success) loadComments();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader text="Loading comments..." />;

  return (
    <div>
      <div className="mb-4">
        <Link
          to="/"
          className="inline-block bg-gray-100 px-3 py-1 border rounded text-gray-700 text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <h2 className="mb-4 text-2xl">Product Comments</h2>
      {comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        <div className="gap-4 grid">
          {comments.map((c) => (
            <div
              key={c.reviewId}
              className="flex items-start gap-4 p-4 border rounded"
            >
              {c.avatar ? (
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="rounded-full w-12 h-12 object-cover"
                />
              ) : (
                <div className="flex justify-center items-center bg-gray-200 rounded-full w-12 h-12 text-gray-500 text-sm">
                  {c.name ? c.name.charAt(0) : "U"}
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">
                      {c.name}{" "}
                      <span className="text-muted text-sm">
                        on {c.productName}
                      </span>
                    </div>
                    <div className="text-muted text-sm">
                      {new Date(c.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">Rating: {c.rating}</div>
                    <button
                      onClick={() => handleDelete(c.productId, c.reviewId)}
                      className="bg-red-500 mt-2 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-2">{c.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
