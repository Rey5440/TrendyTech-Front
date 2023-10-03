const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { useEffect, useState } from "react";

const ReviewAdmin = () => {

    const [allReviews, setAllReviews] = useState([]);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`${VITE_BACKEND_URL}/users/getreviews`)
                setAllReviews(response.data)
                setRefresh(false)
            } catch (error) {
                console.error("Error al obtener reviews", error);
            }
        }
        fetchData()
    }, [refresh])

    const handleSetReview = async (event) => {
        try {
            const res = await axios.post(`${VITE_BACKEND_URL}/users/showreview`, {reviewId: event.target.value})
            setAllReviews(res.data)
            setRefresh(true)
        } catch (error) {
            console.error("error al updatear booleano isVisible", error);
        }
    }

    return (
        <div>
            <h1>esto es review de admin</h1>
            {allReviews.length > 0 && allReviews.map(review => (
                <div key={review.id}>
                    <h2>ID {review.createdAt}</h2>
                    <h2>{String(review.isVisible)}</h2>
                    <h2>{review.productId}</h2>
                    <h2>{review.punctuation}</h2>
                    <h2>{review.updatedAt}</h2>
                    <h2>{review.text}</h2>
                    <h2>{review.userId}</h2>
                    <button onClick={handleSetReview} value={review.id}>boton</button>
                </div>
            ))}
        </div>
    )
}

export default ReviewAdmin;